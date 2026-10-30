/**
 * BlogSpace - Data Layer & LocalStorage Management
 * Handles persistent mock data, data initialization, and CRUD operations.
 */

// LocalStorage Keys
const STORAGE_KEYS = {
  POSTS: 'blogspace_posts_v1',
  USERS: 'blogspace_users_v1',
  CURRENT_USER: 'blogspace_current_user_v1',
  COMMENTS: 'blogspace_comments_v1',
  LIKES: 'blogspace_likes_v1'
};

// Preset Sample Blog Posts
const INITIAL_BLOGS = [
  {
    id: 'post-101',
    authorId: 'user-demo-1',
    authorName: 'Alex Morgan',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'The Architecture of Scalable Web Applications in 2026',
    excerpt: 'Explore modern frontend architecture, decoupling microservices, and how modern engineering teams balance innovation with stability.',
    content: `
      <h2>The Shift in Frontend Systems</h2>
      <p>Modern web applications have evolved far past simple server-rendered pages or bloated single-page monoliths. In 2026, the focus has shifted dramatically toward modularity, edge computing, and resilient component design.</p>
      
      <blockquote>"Architecture is not just about organizing code; it is about organizing human communication and building systems that can safely adapt to tomorrow's unknown requirements."</blockquote>

      <h3>1. Embracing Micro-Frontends Responsibly</h3>
      <p>While micro-frontends gained widespread adoption, engineering organizations learned that over-fragmentation creates more friction than cohesion. Successful modern architectures use federated modules with shared design systems and strict API contracts.</p>

      <h3>2. Edge Rendering & Global Latency</h3>
      <p>By computing logic at the nearest CDN edge node, round-trip times are slashed from hundreds of milliseconds to single digits. This guarantees snappy page loads even on cellular networks.</p>

      <h3>Key Takeaways</h3>
      <ul>
        <li>Keep your core design system strictly versioned and decoupled.</li>
        <li>Treat user performance and accessibility as non-negotiable architectural requirements.</li>
        <li>Use progressive enhancement so core reading experiences never break.</li>
      </ul>
    `,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80',
    tags: ['Architecture', 'WebDev', 'Cloud'],
    status: 'published',
    createdAt: '2026-10-24T09:30:00.000Z',
    updatedAt: '2026-10-24T09:30:00.000Z',
    readTime: '5 min read',
    views: 1420,
    likes: 94
  },
  {
    id: 'post-102',
    authorId: 'user-demo-2',
    authorName: 'Dr. David Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Demystifying Generative AI: From Transformers to Real-World Agents',
    excerpt: 'A comprehensive yet accessible guide to how transformer models, reasoning loops, and autonomous agents are reshaping creative industries.',
    content: `
      <h2>Beyond the Hype: How Modern AI Really Works</h2>
      <p>Artificial Intelligence has moved beyond simple predictive models. Today, generative models and autonomous agents are transforming how we write, analyze data, and build software.</p>

      <h3>The Evolution of Transformer Architectures</h3>
      <p>The core mechanism that powers large models is self-attention. Instead of processing text one token at a time in isolation, the transformer examines the contextual relationship between every word in a sentence simultaneously.</p>

      <blockquote>"Generative models do not simply reproduce patterns—they synthesize knowledge across disparate domains, creating novel solutions to complex tasks."</blockquote>

      <h3>Practical Implications for Developers</h3>
      <p>Rather than replacing engineers, modern AI models serve as intelligent copilot systems that automate boilerplate code, catch subtle bugs, and allow teams to focus on core product design.</p>
    `,
    category: 'Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    tags: ['AI', 'MachineLearning', 'Future'],
    status: 'published',
    createdAt: '2026-10-22T14:15:00.000Z',
    updatedAt: '2026-10-22T14:15:00.000Z',
    readTime: '6 min read',
    views: 2890,
    likes: 185
  },
  {
    id: 'post-103',
    authorId: 'user-demo-1',
    authorName: 'Alex Morgan',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Clean Code in Vanilla JavaScript: Design Patterns You Need to Know',
    excerpt: 'Master foundational patterns like Module, Observer, and Factory in native JavaScript without relying on heavy framework abstractions.',
    content: `
      <h2>The Enduring Power of Vanilla JavaScript</h2>
      <p>Frameworks come and go, but the web platform remains. Writing robust, expressive Vanilla JavaScript not only deepens your mental model of the browser runtime, but also creates lightweight applications that run anywhere.</p>

      <h3>1. The Revealing Module Pattern</h3>
      <p>Encapsulate state and expose only what is strictly necessary using closures and object literals:</p>
      <pre><code>const CounterModule = (() => {
  let count = 0;
  return {
    increment: () => ++count,
    getValue: () => count
  };
})();</code></pre>

      <h3>2. The Observer Pattern for Reactive UI</h3>
      <p>You do not need a 40kb state library to sync your UI. A lightweight custom event dispatcher or Pub/Sub store can keep your components cleanly separated.</p>

      <h3>Why This Matters</h3>
      <p>Understanding native browser APIs (such as DOM MutationObserver, IntersectionObserver, and Custom Events) lets you build resilient software that will still work ten years from now.</p>
    `,
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&auto=format&fit=crop&q=80',
    tags: ['JavaScript', 'Coding', 'WebDev'],
    status: 'published',
    createdAt: '2026-10-20T11:00:00.000Z',
    updatedAt: '2026-10-20T11:00:00.000Z',
    readTime: '4 min read',
    views: 1950,
    likes: 132
  },
  {
    id: 'post-104',
    authorId: 'user-demo-3',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    title: 'Deep Work in a Distracted World: The 4-Hour Focus Routine',
    excerpt: 'How high-performing creators and knowledge workers protect their attention, eliminate cognitive fatigue, and achieve deep creative flow.',
    content: `
      <h2>The Scarcity of Uninterrupted Attention</h2>
      <p>In an era of relentless push notifications, chat pings, and algorithmic feeds, sustained deep focus is no longer just a skill—it is an extraordinary competitive advantage.</p>

      <h3>The Science of Cognitive Switching Cost</h3>
      <p>Every time you glance at an incoming message while working on a complex problem, your brain leaves behind "attention residue". It can take up to 23 minutes to regain full cognitive momentum.</p>

      <h3>Building Your Daily Deep Work Block</h3>
      <ol>
        <li><strong>Timebox 90-minute blocks:</strong> Align your focus sessions with ultradian biological rhythms.</li>
        <li><strong>Physical boundary ritual:</strong> Close all browser tabs, turn phone to grayscale, and set status to away.</li>
        <li><strong>Defined output goal:</strong> Never sit down to "work"; sit down to write a specific section or resolve a single bug.</li>
      </ol>
    `,
    category: 'Productivity',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&auto=format&fit=crop&q=80',
    tags: ['Productivity', 'Habits', 'Focus'],
    status: 'published',
    createdAt: '2026-10-18T08:20:00.000Z',
    updatedAt: '2026-10-18T08:20:00.000Z',
    readTime: '4 min read',
    views: 3120,
    likes: 240
  },
  {
    id: 'post-105',
    authorId: 'user-demo-4',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    title: 'The Art of Mindful Living in Urban Environments',
    excerpt: 'Simple strategies to foster peace, cultivate daily gratitude, and remain grounded amidst the chaos of modern metropolitan life.',
    content: `
      <h2>Finding Stillness in the Noise</h2>
      <p>City living offers vibrant culture, diverse communities, and endless career opportunities. But without intentional boundaries, the constant sensory stimulation can quietly drain our vitality.</p>

      <blockquote>"Peace is not the absence of noise; it is the presence of equanimity within the noise."</blockquote>

      <h3>Small Micro-Practices for Daily Balance</h3>
      <ul>
        <li><strong>Morning Sunlight Exposure:</strong> Step outside for 10 minutes before looking at a digital screen to regulate cortisol.</li>
        <li><strong>Analog Walking:</strong> Take evening strolls without headphones or podcasts; simply observe your surroundings.</li>
        <li><strong>Green Sanctuary:</strong> Introduce living plants and natural light to your living and working space.</li>
      </ul>
    `,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80',
    tags: ['Mindfulness', 'Wellness', 'Life'],
    status: 'published',
    createdAt: '2026-10-15T16:45:00.000Z',
    updatedAt: '2026-10-15T16:45:00.000Z',
    readTime: '3 min read',
    views: 1820,
    likes: 110
  },
  {
    id: 'post-106',
    authorId: 'user-demo-5',
    authorName: 'Kavita Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Rethinking Higher Education: Self-Directed Learning in the Digital Age',
    excerpt: 'Why curiosity-driven projects, open-source collaboration, and peer learning networks are outperforming traditional static curricula.',
    content: `
      <h2>The Demise of the 4-Year Monolith</h2>
      <p>Knowledge was once scarce and gatekept behind high university tuition. Today, the world's most cutting-edge research and educational resources are available freely to anyone with an internet connection.</p>

      <h3>From Passive Memorization to Active Creation</h3>
      <p>Employers increasingly value demonstrable portfolio projects, open contributions, and verified problem-solving ability over credentials written on paper.</p>

      <h3>How to Design Your Own Curriculum</h3>
      <ol>
        <li>Define an ambitious capstone project first (reverse-engineer what you need to learn).</li>
        <li>Join active developer or creator communities for feedback and peer accountability.</li>
        <li>Publish your learning in public—writing articles teaches you more than passive reading.</li>
      </ol>
    `,
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1000&auto=format&fit=crop&q=80',
    tags: ['Education', 'Learning', 'Growth'],
    status: 'published',
    createdAt: '2026-10-12T13:10:00.000Z',
    updatedAt: '2026-10-12T13:10:00.000Z',
    readTime: '5 min read',
    views: 2150,
    likes: 175
  },
  {
    id: 'post-107',
    authorId: 'user-demo-1',
    authorName: 'Alex Morgan',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Draft: Thoughts on Quantum Computing and Cryptography',
    excerpt: 'An early draft exploring post-quantum encryption standards and what developers should prepare for.',
    content: `<h2>Preparing for the Quantum Era</h2><p>This is a working draft post saved in the author dashboard. It demonstrates draft state management.</p>`,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1000&auto=format&fit=crop&q=80',
    tags: ['Quantum', 'Security'],
    status: 'draft',
    createdAt: '2026-10-26T17:00:00.000Z',
    updatedAt: '2026-10-26T17:00:00.000Z',
    readTime: '2 min read',
    views: 0,
    likes: 0
  }
];

// Default Demonstration User
const DEFAULT_DEMO_USER = {
  id: 'user-demo-1',
  name: 'Alex Morgan',
  email: 'alex@blogspace.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: 'Senior Software Engineer, Tech Writer & Open Source Enthusiast based in San Francisco.',
  joinedDate: 'October 2025'
};

// Default Sample Comments
const INITIAL_COMMENTS = [
  {
    id: 'comment-1',
    postId: 'post-101',
    authorName: 'Michael Scott',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    text: 'Fantastic breakdown! The point about modular micro-frontends hitting diminishing returns really resonated with my team.',
    date: '2 days ago'
  },
  {
    id: 'comment-2',
    postId: 'post-101',
    authorName: 'Sophia Lee',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    text: 'Edge rendering with zero layout shift is pure magic. Great article Alex!',
    date: '1 day ago'
  },
  {
    id: 'comment-3',
    postId: 'post-102',
    authorName: 'Devon Patel',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    text: 'Clear, concise, and avoids all the unnecessary buzzwords. Sharing this with our product managers.',
    date: '3 days ago'
  }
];

/**
 * Data Store Initialization
 */
function initDataStore() {
  try {
    if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_BLOGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([DEFAULT_DEMO_USER]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(INITIAL_COMMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LIKES)) {
      localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(['post-101']));
    }
  } catch (e) {
    console.error('LocalStorage initialization error:', e);
  }
}

// Ensure store is ready
initDataStore();

/**
 * Post Operations
 */
function getAllPosts() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POSTS);
    return data ? JSON.parse(data) : INITIAL_BLOGS;
  } catch (e) {
    console.error('Failed to read posts from localStorage:', e);
    return INITIAL_BLOGS;
  }
}

function getPublishedPosts() {
  return getAllPosts().filter(p => p.status === 'published');
}

function getPostById(id) {
  const posts = getAllPosts();
  return posts.find(p => p.id === id) || null;
}

function saveNewPost(postData) {
  const posts = getAllPosts();
  const newPost = {
    ...postData,
    id: 'post-' + Date.now(),
    views: 0,
    likes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  return newPost;
}

function updatePost(id, updatedFields) {
  const posts = getAllPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return null;

  posts[index] = {
    ...posts[index],
    ...updatedFields,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  return posts[index];
}

function deletePost(id) {
  let posts = getAllPosts();
  const initialLength = posts.length;
  posts = posts.filter(p => p.id !== id);
  if (posts.length !== initialLength) {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return true;
  }
  return false;
}

function incrementPostViews(id) {
  const posts = getAllPosts();
  const post = posts.find(p => p.id === id);
  if (post) {
    post.views = (post.views || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return post.views;
  }
  return 0;
}

function isPostLiked(id) {
  try {
    const likes = JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKES) || '[]');
    return likes.includes(id);
  } catch (e) {
    return false;
  }
}

function toggleLikePost(id) {
  try {
    let likes = JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKES) || '[]');
    const posts = getAllPosts();
    const post = posts.find(p => p.id === id);
    let liked = false;

    if (likes.includes(id)) {
      likes = likes.filter(item => item !== id);
      if (post && post.likes > 0) post.likes--;
      liked = false;
    } else {
      likes.push(id);
      if (post) post.likes = (post.likes || 0) + 1;
      liked = true;
    }

    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return { liked, totalLikes: post ? post.likes : 0 };
  } catch (e) {
    console.error('Failed to toggle like:', e);
    return { liked: false, totalLikes: 0 };
  }
}

/**
 * Comments Operations
 */
function getPostComments(postId) {
  try {
    const comments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || '[]');
    return comments.filter(c => c.postId === postId);
  } catch (e) {
    return [];
  }
}

function addPostComment(postId, authorName, text, avatar) {
  try {
    const comments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || '[]');
    const newComment = {
      id: 'comment-' + Date.now(),
      postId,
      authorName: authorName.trim() || 'Anonymous Reader',
      authorAvatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      text: sanitizeHTML(text.trim()),
      date: 'Just now'
    };
    comments.push(newComment);
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    return newComment;
  } catch (e) {
    console.error('Error adding comment:', e);
    return null;
  }
}

/**
 * Utility: HTML Sanitizer to prevent XSS in client-rendered user content
 */
function sanitizeHTML(str) {
  if (!str) return '';
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

/**
 * Utility: Calculate approximate reading time
 */
function calculateReadingTime(text) {
  if (!text) return '1 min read';
  const clean = text.replace(/<[^>]*>/g, ' ');
  const words = clean.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

/**
 * Utility: Format date to friendly readable format
 */
function formatDate(isoString) {
  if (!isoString) return 'Recent';
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    return 'Recent';
  }
}

/**
 * Global Toast Notification Helper
 */
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✓';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
