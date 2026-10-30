/**
 * BlogSpace - Global Application Script
 * Controls navigation, mobile drawers, homepage interactive filters, and global UI elements.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Auth state in Navbar
  Auth.renderNavAuthState();

  // 2. Mobile Menu Drawer Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 3. Homepage Post Explorer Logic (if present on page)
  const blogGridEl = document.getElementById('blog-grid');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const sortSelect = document.getElementById('sort-select');
  const categoryChips = document.querySelectorAll('.category-chip');
  const activeFilterCountEl = document.getElementById('active-filter-count');

  if (blogGridEl) {
    let currentCategory = 'All';
    let currentSearch = '';
    let currentSort = 'latest';

    function updateGrid() {
      const allPublished = getPublishedPosts();
      const filtered = Blog.filterPosts(allPublished, currentCategory, currentSearch, currentSort);
      Blog.renderBlogGrid(filtered, blogGridEl);

      if (activeFilterCountEl) {
        activeFilterCountEl.textContent = `Showing ${filtered.length} of ${allPublished.length} articles`;
      }

      // Show/hide clear search button
      if (clearSearchBtn) {
        clearSearchBtn.style.display = currentSearch ? 'block' : 'none';
      }
    }

    // Search input listener
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        updateGrid();
      });
    }

    // Clear search button
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        currentSearch = '';
        updateGrid();
        if (searchInput) searchInput.focus();
      });
    }

    // Sort select listener
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        updateGrid();
      });
    }

    // Category chips click listener
    categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentCategory = chip.getAttribute('data-category') || 'All';
        updateGrid();
      });
    });

    // Initial render
    updateGrid();
  }

  // 4. Newsletter Subscription Form Handler
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (!emailInput) return;

      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
      }

      // Success feedback
      showToast('Thank you for subscribing! Check your inbox for our weekly digest.', 'success');
      emailInput.value = '';
    });
  }

  // 5. Smooth scroll to explore
  const exploreCtaBtn = document.getElementById('hero-explore-btn');
  if (exploreCtaBtn) {
    exploreCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const exploreSection = document.getElementById('explore-section');
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
