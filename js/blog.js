/**
 * BlogSpace - Blog Rendering & Interaction Logic
 * Manages post grids, category styling, search & filter, and post views.
 */

const Blog = (() => {
  // Category styling map
  const CATEGORY_MAP = {
    'Technology': 'badge-tech',
    'Programming': 'badge-programming',
    'Artificial Intelligence': 'badge-ai',
    'Lifestyle': 'badge-lifestyle',
    'Education': 'badge-education',
    'Productivity': 'badge-productivity'
  };

  // Safe Category Class
  function getCategoryClass(category) {
    return CATEGORY_MAP[category] || 'badge-default';
  }

  // Fallback image in case external URL fails
  const DEFAULT_THUMBNAIL = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80';

  /**
   * Render a list of blog cards into a container
   */
  function renderBlogGrid(posts, containerEl) {
    if (!containerEl) return;

    if (!posts || posts.length === 0) {
      containerEl.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <h3 class="empty-state-title">No Articles Found</h3>
          <p class="empty-state-desc">We couldn't find any articles matching your search criteria. Try a different keyword or category.</p>
          <button id="reset-filters-btn" class="btn btn-secondary btn-sm">Clear All Filters</button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          const searchInput = document.getElementById('search-input');
          if (searchInput) searchInput.value = '';
          const activeChip = document.querySelector('.category-chip.active');
          if (activeChip) activeChip.classList.remove('active');
          const allChip = document.querySelector('[data-category="All"]');
          if (allChip) allChip.classList.add('active');
          renderBlogGrid(getPublishedPosts(), containerEl);
        });
      }
      return;
    }

    containerEl.innerHTML = posts.map(post => {
      const badgeClass = getCategoryClass(post.category);
      const readTime = post.readTime || calculateReadingTime(post.content);
      const formattedDate = formatDate(post.createdAt);
      const tagsHtml = (post.tags || []).slice(0, 3).map(tag => `<span class="tag-badge">#${sanitizeHTML(tag)}</span>`).join('');

      return `
        <article class="blog-card" data-id="${post.id}">
          <a href="post.html?id=${post.id}" class="blog-card-thumb-link" aria-label="Read ${sanitizeHTML(post.title)}">
            <span class="badge ${badgeClass} blog-card-category-badge">${sanitizeHTML(post.category || 'General')}</span>
            <img 
              src="${post.image || DEFAULT_THUMBNAIL}" 
              alt="${sanitizeHTML(post.title)}" 
              class="blog-card-thumb" 
              loading="lazy"
              onerror="this.onerror=null;this.src='${DEFAULT_THUMBNAIL}';"
            />
          </a>

          <div class="blog-card-content">
            <div class="blog-card-meta">
              <span class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${readTime}
              </span>
              <span>•</span>
              <span class="meta-item">${formattedDate}</span>
            </div>

            <h3 class="blog-card-title">
              <a href="post.html?id=${post.id}">${sanitizeHTML(post.title)}</a>
            </h3>

            <p class="blog-card-desc">${sanitizeHTML(post.excerpt || '')}</p>

            <div class="blog-card-tags">
              ${tagsHtml}
            </div>

            <div class="blog-card-footer">
              <div class="blog-card-author">
                <img 
                  src="${post.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" 
                  alt="${sanitizeHTML(post.authorName)}" 
                  class="author-thumb" 
                  onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';"
                />
                <span class="author-name">${sanitizeHTML(post.authorName || 'Staff Writer')}</span>
              </div>

              <a href="post.html?id=${post.id}" class="read-more-link">
                Read
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Filter and search utility
   */
  function filterPosts(posts, category = 'All', searchQuery = '', sortBy = 'latest') {
    let results = [...posts];

    // Filter by category
    if (category && category !== 'All') {
      results = results.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by search query (title, excerpt, tags, author)
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(p => {
        const titleMatch = (p.title || '').toLowerCase().includes(q);
        const excerptMatch = (p.excerpt || '').toLowerCase().includes(q);
        const authorMatch = (p.authorName || '').toLowerCase().includes(q);
        const tagMatch = (p.tags || []).some(t => t.toLowerCase().includes(q));
        return titleMatch || excerptMatch || authorMatch || tagMatch;
      });
    }

    // Sort
    if (sortBy === 'latest') {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'views') {
      results.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'likes') {
      results.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    return results;
  }

  return {
    renderBlogGrid,
    filterPosts,
    getCategoryClass,
    DEFAULT_THUMBNAIL
  };
})();
