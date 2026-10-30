/**
 * BlogSpace - Demonstration Authentication Module
 * 
 * DISCLAIMER FOR LEARNERS:
 * This module uses browser localStorage to simulate authentication for educational and 
 * frontend demonstration purposes only. Client-side authentication is NOT secure for 
 * production use. In a production system, password hashing (e.g. bcrypt/argon2), 
 * HTTP-only cookies, JWT verification, and authorization checks MUST be handled on a 
 * secure backend server.
 */

const Auth = (() => {
  // Check if a user is currently logged in
  function getCurrentUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error fetching current user:', e);
      return null;
    }
  }

  // Get all registered demonstration users
  function getUsers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [DEFAULT_DEMO_USER];
    } catch (e) {
      return [DEFAULT_DEMO_USER];
    }
  }

  // Demonstration Login
  function login(email, password, rememberMe = false) {
    return new Promise((resolve, reject) => {
      // Simulate network latency for realistic UX
      setTimeout(() => {
        const cleanEmail = email.trim().toLowerCase();
        const users = getUsers();
        
        // Find user by email
        const user = users.find(u => u.email.toLowerCase() === cleanEmail);

        if (!user) {
          // If it is the default demo account alex@blogspace.io with password 'alex123', allow instant sign in
          if (cleanEmail === 'alex@blogspace.io' && password === 'alex123') {
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_DEMO_USER));
            resolve(DEFAULT_DEMO_USER);
            return;
          }
          reject(new Error('No account found with this email address. Please register.'));
          return;
        }

        // Demo password check: verify mock hash or demo password
        // In real backend, bcrypt.compare(password, user.passwordHash)
        if (user.password && user.password !== btoa(password) && password !== 'alex123') {
          reject(new Error('Incorrect password. Please try again or use the demo credentials.'));
          return;
        }

        // Save active session
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
        
        if (rememberMe) {
          localStorage.setItem('blogspace_remembered_email', cleanEmail);
        } else {
          localStorage.removeItem('blogspace_remembered_email');
        }

        resolve(user);
      }, 600);
    });
  }

  // Demonstration Registration
  function register(fullName, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cleanEmail = email.trim().toLowerCase();
        const cleanName = fullName.trim();
        const users = getUsers();

        // Check for duplicate email
        if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
          reject(new Error('An account with this email address already exists. Please log in.'));
          return;
        }

        // Create new user (using base64 obfuscation for demo - real apps need backend bcrypt!)
        const newUser = {
          id: 'user-' + Date.now(),
          name: cleanName,
          email: cleanEmail,
          password: btoa(password), // Simulated demonstration encoding ONLY
          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
          bio: 'Passionate writer and reader on BlogSpace.',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

        // Automatically log in newly registered user
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));

        resolve(newUser);
      }, 700);
    });
  }

  // Logout
  function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.location.href = 'index.html';
  }

  // Auth Guard for protected pages (Dashboard & Create Blog)
  function requireAuth(redirectUrl = 'login.html') {
    const user = getCurrentUser();
    if (!user) {
      const currentPath = encodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
      window.location.href = `${redirectUrl}?redirect=${currentPath}`;
      return false;
    }
    return true;
  }

  // Update navigation items based on auth state
  function renderNavAuthState() {
    const navActions = document.getElementById('nav-actions-container');
    if (!navActions) return;

    const user = getCurrentUser();

    if (user) {
      navActions.innerHTML = `
        <a href="create-blog.html" class="btn btn-primary btn-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Write Post
        </a>
        <div class="user-nav-dropdown">
          <a href="dashboard.html" class="user-avatar-btn" title="Go to Dashboard">
            <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" alt="${user.name}" class="user-avatar" />
            <span class="user-nav-name">${user.name.split(' ')[0]}</span>
          </a>
        </div>
        <button id="logout-btn" class="btn btn-secondary btn-sm" title="Log Out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
      `;

      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          logout();
        });
      }
    } else {
      navActions.innerHTML = `
        <a href="login.html" class="btn btn-secondary btn-sm">Log In</a>
        <a href="register.html" class="btn btn-primary btn-sm">Get Started</a>
      `;
    }
  }

  // Toggle Password Field Visibility
  function setupPasswordToggle(inputId, toggleBtnId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(toggleBtnId);
    if (!input || !btn) return;

    btn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.innerHTML = isPassword 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
  }

  return {
    getCurrentUser,
    login,
    register,
    logout,
    requireAuth,
    renderNavAuthState,
    setupPasswordToggle
  };
})();
