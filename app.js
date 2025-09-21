// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    
    // Theme Management
    class ThemeManager {
        constructor() {
            this.themeToggle = document.getElementById('themeToggle');
            this.theme = this.getStoredTheme() || this.getSystemTheme();
            this.init();
        }

        init() {
            console.log('Initializing theme manager with theme:', this.theme);
            this.applyTheme(this.theme);
            this.setupToggle();
            this.setupSystemThemeListener();
        }

        getSystemTheme() {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        getStoredTheme() {
            return localStorage.getItem('portfolio-theme');
        }

        setStoredTheme(theme) {
            localStorage.setItem('portfolio-theme', theme);
        }

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            if (this.themeToggle) {
                this.themeToggle.checked = theme === 'dark';
                this.updateToggleIcon(theme);
            }
        }

        updateToggleIcon(theme) {
            const icon = this.themeToggle?.nextElementSibling?.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }
        }

        setupToggle() {
            if (this.themeToggle) {
                this.themeToggle.addEventListener('change', (e) => {
                    const newTheme = e.target.checked ? 'dark' : 'light';
                    console.log('Theme changed to:', newTheme);
                    this.theme = newTheme;
                    this.applyTheme(newTheme);
                    this.setStoredTheme(newTheme);
                });
            }
        }

        setupSystemThemeListener() {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!this.getStoredTheme()) {
                    const systemTheme = e.matches ? 'dark' : 'light';
                    this.theme = systemTheme;
                    this.applyTheme(systemTheme);
                }
            });
        }
    }

    // Single Page Application Navigation
    class SPANavigation {
        constructor() {
            this.currentSection = 'home';
            this.sections = ['home', 'cv', 'projects', 'blog', 'contact'];
            this.init();
        }

        init() {
            console.log('Initializing SPA navigation...');
            this.setupNavigationLinks();
            this.setupHashNavigation();
            this.showInitialSection();
        }

        setupNavigationLinks() {
            // Handle all navigation links
            const navLinks = document.querySelectorAll('[data-section]');
            console.log('Found navigation links:', navLinks.length);
            
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = e.currentTarget.getAttribute('data-section');
                    console.log('Navigation clicked:', section);
                    this.navigateToSection(section);
                });
            });

            // Handle navbar brand link
            const brandLink = document.querySelector('.navbar-brand');
            if (brandLink) {
                brandLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToSection('home');
                });
            }
        }

        setupHashNavigation() {
            window.addEventListener('hashchange', () => {
                const hash = window.location.hash.slice(1);
                if (this.sections.includes(hash)) {
                    this.showSection(hash);
                }
            });

            window.addEventListener('popstate', () => {
                const hash = window.location.hash.slice(1) || 'home';
                if (this.sections.includes(hash)) {
                    this.showSection(hash);
                }
            });
        }

        showInitialSection() {
            const hash = window.location.hash.slice(1);
            const initialSection = this.sections.includes(hash) ? hash : 'home';
            console.log('Showing initial section:', initialSection);
            this.showSection(initialSection);
        }

        navigateToSection(section) {
            console.log('Navigating to section:', section);
            history.pushState({}, '', `#${section}`);
            this.showSection(section);
        }

        showSection(section) {
            console.log('Showing section:', section);
            
            // Hide all sections
            const allSections = document.querySelectorAll('.section');
            allSections.forEach(sec => {
                sec.classList.remove('active');
            });

            // Show target section
            const targetSection = document.getElementById(section);
            if (targetSection) {
                targetSection.classList.add('active');
                this.currentSection = section;
                this.updateActiveNavLink(section);
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // If showing blog section, ensure overview is visible
                if (section === 'blog') {
                    this.showBlogOverview();
                }
            } else {
                console.error('Section not found:', section);
            }

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }

        updateActiveNavLink(section) {
            // Remove active class from all nav links
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to current section link
            const activeLink = document.querySelector(`[data-section="${section}"].nav-link`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }

        showBlogOverview() {
            // Hide all blog posts
            document.querySelectorAll('.blog-post-content').forEach(post => {
                post.style.display = 'none';
            });

            // Show blog overview
            const blogOverview = document.getElementById('blog-overview');
            if (blogOverview) {
                blogOverview.style.display = 'block';
            }
        }
    }

    // Blog Management
    class BlogManager {
        constructor() {
            this.currentPost = null;
            this.init();
        }

        init() {
            console.log('Initializing blog manager...');
            this.setupBlogNavigation();
        }

        setupBlogNavigation() {
            // Handle blog card clicks
            const blogCards = document.querySelectorAll('.blog-card');
            console.log('Found blog cards:', blogCards.length);
            
            blogCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    const postId = card.getAttribute('data-post');
                    console.log('Blog card clicked:', postId);
                    this.showBlogPost(postId);
                });

                // Handle "Read More" button clicks
                const readMoreBtn = card.querySelector('.btn');
                if (readMoreBtn) {
                    readMoreBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const postId = card.getAttribute('data-post');
                        this.showBlogPost(postId);
                    });
                }
            });
        }

        showBlogPost(postId) {
            console.log('Showing blog post:', postId);
            
            // Hide blog overview
            const blogOverview = document.getElementById('blog-overview');
            if (blogOverview) {
                blogOverview.style.display = 'none';
            }

            // Show specific blog post
            const blogPost = document.getElementById(`blog-post-${postId}`);
            if (blogPost) {
                blogPost.style.display = 'block';
                this.currentPost = postId;
                
                // Scroll to top of blog post
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
            }
        }

        showBlogOverview() {
            console.log('Showing blog overview');
            
            // Hide all blog posts
            document.querySelectorAll('.blog-post-content').forEach(post => {
                post.style.display = 'none';
            });

            // Show blog overview
            const blogOverview = document.getElementById('blog-overview');
            if (blogOverview) {
                blogOverview.style.display = 'block';
                this.currentPost = null;

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }

    // Utility Functions
    class Utils {
        static animateOnScroll() {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, { threshold: 0.1 });

                document.querySelectorAll('.card, .experience-item, .contact-item').forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(el);
                });
            }
        }

        static setupKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                // Handle Escape key to go back in blog
                if (e.key === 'Escape') {
                    if (window.blogManager && window.blogManager.currentPost) {
                        window.blogManager.showBlogOverview();
                    }
                }
            });
        }

        static setupNavbarScrollEffect() {
            let lastScrollTop = 0;
            const navbar = document.querySelector('.navbar');
            
            if (navbar) {
                window.addEventListener('scroll', () => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    if (scrollTop > 100) {
                        navbar.style.boxShadow = '0 2px 20px var(--shadow-color)';
                    } else {
                        navbar.style.boxShadow = 'none';
                    }
                    
                    lastScrollTop = scrollTop;
                });
            }
        }
    }

    // Initialize Application
    try {
        console.log('Starting application initialization...');
        
        // Initialize core components
        const themeManager = new ThemeManager();
        const navigation = new SPANavigation();
        const blogManager = new BlogManager();

        // Make blog manager globally accessible
        window.blogManager = blogManager;
        window.showBlogOverview = () => blogManager.showBlogOverview();

        // Setup utilities
        Utils.setupKeyboardNavigation();
        Utils.setupNavbarScrollEffect();

        // Animate on scroll (with delay to prevent initial flash)
        setTimeout(() => {
            Utils.animateOnScroll();
        }, 1000);

        console.log('Portfolio website initialized successfully');
        
        // Store references globally for debugging
        window.portfolioApp = {
            themeManager,
            navigation,
            blogManager
        };

    } catch (error) {
        console.error('Error initializing application:', error);
    }
});

// Global helper functions
function showBlogPost(postId) {
    if (window.blogManager) {
        window.blogManager.showBlogPost(postId);
    }
}

function showBlogOverview() {
    if (window.blogManager) {
        window.blogManager.showBlogOverview();
    }
}