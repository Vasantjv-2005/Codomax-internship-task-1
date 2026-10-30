/**
 * BlogSpace - Dashboard Management Module
 * Controls author metrics, posts CRUD actions, status toggling, and delete confirmation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Guard page - redirect if not logged in
  if (!Auth.requireAuth()) return;

  const currentUser = Auth.getCurrentUser();
  Auth.renderNavAuthState();

  // 2. DOM Elements
  const userNameEl = document.getElementById('dash-user-name');
  const userEmailEl = document.getElementById('dash-user-email');
  const userAvatarEl = document.getElementById('dash-user-avatar');
  const welcomeNameEl = document.getElementById('welcome-user-name');

  const statTotalEl = document.getElementById('stat-total-posts');
  const statPublishedEl = document.getElementById('stat-published-posts');
  const statDraftsEl = document.getElementById('stat-drafts-posts');
  const statViewsEl = document.getElementById('stat-total-views');

  const postsTableBody = document.getElementById('dash-posts-tbody');
  const searchInput = document.getElementById('dash-search-input');
  const categoryFilter = document.getElementById('dash-category-filter');
  const tabFilterBtns = document.querySelectorAll('.tab-filter-btn');

  // Delete modal elements
  const deleteModal = document.getElementById('delete-modal');
  const deletePostTitleSpan = document.getElementById('delete-post-title');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
  const closeDeleteModalBtn = document.getElementById('close-delete-modal-btn');

  let activeStatusTab = 'all'; // 'all', 'published', 'draft'
  let postToDeleteId = null;

  // 3. Populate User Profile Header
  if (currentUser) {
    if (userNameEl) userNameEl.textContent = currentUser.name;
    if (userEmailEl) userEmailEl.textContent = currentUser.email;
    if (welcomeNameEl) welcomeNameEl.textContent = currentUser.name.split(' ')[0];
    if (userAvatarEl && currentUser.avatar) {
      userAvatarEl.src = currentUser.avatar;
      userAvatarEl.alt = currentUser.name;
    }
  }

  // 4. Load Author's Posts
  function getAuthorPosts() {
    const allPosts = getAllPosts();
    // Return posts authored by this user
    return allPosts.filter(p => p.authorId === currentUser.id);
  }

  // 5. Update Statistics
  function updateDashboardStats() {
    const authorPosts = getAuthorPosts();
    const published = authorPosts.filter(p => p.status === 'published');
    const drafts = authorPosts.filter(p => p.status === 'draft');
    const totalViews = authorPosts.reduce((acc, p) => acc + (p.views || 0), 0);

    if (statTotalEl) statTotalEl.textContent = authorPosts.length;
    if (statPublishedEl) statPublishedEl.textContent = published.length;
    if (statDraftsEl) statDraftsEl.textContent = drafts.length;
    if (statViewsEl) statViewsEl.textContent = totalViews.toLocaleString();
  }

  // 6. Render Author Posts Table
  function renderPosts() {
    const authorPosts = getAuthorPosts();
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const category = categoryFilter ? categoryFilter.value : 'All';

    // Apply filters
    let filtered = authorPosts.filter(p => {
      // Status filter
      if (activeStatusTab !== 'all' && p.status !== activeStatusTab) {
        return false;
      }
      // Category filter
      if (category !== 'All' && p.category !== category) {
        return false;
      }
      // Search filter
      if (query && !p.title.toLowerCase().includes(query) && !(p.excerpt || '').toLowerCase().includes(query)) {
        return false;
      }
      return true;
    });

    if (!postsTableBody) return;

    if (filtered.length === 0) {
      postsTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="padding: 3rem 1.5rem; text-align: center;">
            <div class="empty-state" style="border: none; padding: 1rem; margin: 0 auto;">
              <div class="empty-state-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h3 class="empty-state-title" style="font-size: 1.15rem;">No Posts Found</h3>
              <p class="empty-state-desc" style="font-size: 0.85rem; margin-bottom: 1.25rem;">
                ${authorPosts.length === 0 ? "You haven't written any posts yet. Start sharing your knowledge today!" : "No posts matched your current search or filter criteria."}
              </p>
              ${authorPosts.length === 0 ? `<a href="create-blog.html" class="btn btn-primary btn-sm">+ Create Your First Post</a>` : ''}
            </div>
          </td>
        </tr>
      `;
      return;
    }

    postsTableBody.innerHTML = filtered.map(post => {
      const isPublished = post.status === 'published';
      const statusBadge = isPublished
        ? `<span class="badge badge-published">Published</span>`
        : `<span class="badge badge-draft">Draft</span>`;

      const categoryBadge = `<span class="badge ${Blog.getCategoryClass(post.category)}">${sanitizeHTML(post.category || 'General')}</span>`;
      const updatedDate = formatDate(post.updatedAt || post.createdAt);

      return `
        <tr data-id="${post.id}">
          <td>
            <div class="table-post-item">
              <img 
                src="${post.image || Blog.DEFAULT_THUMBNAIL}" 
                alt="${sanitizeHTML(post.title)}" 
                class="table-thumb" 
                onerror="this.onerror=null;this.src='${Blog.DEFAULT_THUMBNAIL}';"
              />
              <div class="table-post-title">
                <a href="${isPublished ? `post.html?id=${post.id}` : `create-blog.html?id=${post.id}`}">
                  ${sanitizeHTML(post.title)}
                </a>
              </div>
            </div>
          </td>
          <td>${categoryBadge}</td>
          <td>${statusBadge}</td>
          <td>
            <span style="font-weight: 600; color: var(--text-main);">${post.views || 0}</span>
            <span style="font-size: 0.75rem; color: var(--text-light);"> views</span>
          </td>
          <td style="color: var(--text-muted); font-size: 0.85rem;">${updatedDate}</td>
          <td>
            <div class="table-actions">
              ${isPublished 
                ? `<a href="post.html?id=${post.id}" class="btn btn-secondary btn-sm" title="View Article" target="_blank">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                   </a>`
                : `<button class="btn btn-outline btn-sm toggle-status-btn" data-id="${post.id}" data-action="publish" title="Publish Draft">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                     Publish
                   </button>`
              }
              <a href="create-blog.html?id=${post.id}" class="btn btn-secondary btn-sm" title="Edit Post">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </a>
              <button class="btn btn-danger-outline btn-sm delete-btn" data-id="${post.id}" data-title="${sanitizeHTML(post.title)}" title="Delete Post">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach dynamic listeners for action buttons
    attachTableListeners();
  }

  // 7. Attach Dynamic Row Listeners
  function attachTableListeners() {
    // Quick Publish / Status toggle
    document.querySelectorAll('.toggle-status-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const updated = updatePost(id, { status: 'published' });
        if (updated) {
          showToast(`"${updated.title}" has been published!`, 'success');
          updateDashboardStats();
          renderPosts();
        }
      });
    });

    // Delete Post Trigger
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        postToDeleteId = btn.getAttribute('data-id');
        const title = btn.getAttribute('data-title');
        if (deletePostTitleSpan) deletePostTitleSpan.textContent = `"${title}"`;
        if (deleteModal) deleteModal.classList.add('active');
      });
    });
  }

  // 8. Delete Confirmation Modal Handlers
  function hideDeleteModal() {
    if (deleteModal) deleteModal.classList.remove('active');
    postToDeleteId = null;
  }

  if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', hideDeleteModal);
  if (closeDeleteModalBtn) closeDeleteModalBtn.addEventListener('click', hideDeleteModal);

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      if (postToDeleteId) {
        const deleted = deletePost(postToDeleteId);
        if (deleted) {
          showToast('Article deleted successfully.', 'info');
          updateDashboardStats();
          renderPosts();
        } else {
          showToast('Failed to delete post.', 'error');
        }
      }
      hideDeleteModal();
    });
  }

  // 9. Filter & Search Event Handlers
  if (searchInput) {
    searchInput.addEventListener('input', () => renderPosts());
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => renderPosts());
  }

  tabFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeStatusTab = btn.getAttribute('data-status');
      renderPosts();
    });
  });

  // Initial dashboard load
  updateDashboardStats();
  renderPosts();
});
