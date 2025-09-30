// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing SEO-optimized portfolio application...');
    
    // Theme Management with enhanced accessibility
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
            this.setupKeyboardSupport();
        }

        getSystemTheme() {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        getStoredTheme() {
            try {
                return localStorage.getItem('portfolio-theme');
            } catch (e) {
                console.warn('LocalStorage not available, using system theme');
                return null;
            }
        }

        setStoredTheme(theme) {
            try {
                localStorage.setItem('portfolio-theme', theme);
            } catch (e) {
                console.warn('LocalStorage not available, theme preference not saved');
            }
        }

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            if (this.themeToggle) {
                this.themeToggle.checked = theme === 'dark';
                this.updateToggleIcon(theme);
                this.updateToggleAriaLabel(theme);
            }
            
            // Update meta theme-color for mobile browsers
            this.updateThemeColor(theme);
        }

        updateToggleIcon(theme) {
            const icon = this.themeToggle?.nextElementSibling?.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun';
                    icon.setAttribute('aria-hidden', 'true');
                } else {
                    icon.className = 'fas fa-moon';
                    icon.setAttribute('aria-hidden', 'true');
                }
            }
        }

        updateToggleAriaLabel(theme) {
            if (this.themeToggle) {
                const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
                this.themeToggle.setAttribute('aria-label', label);
            }
        }

        updateThemeColor(theme) {
            let metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (!metaThemeColor) {
                metaThemeColor = document.createElement('meta');
                metaThemeColor.name = 'theme-color';
                document.head.appendChild(metaThemeColor);
            }
            metaThemeColor.content = theme === 'dark' ? '#121212' : '#ffffff';
        }

        setupToggle() {
            if (this.themeToggle) {
                this.themeToggle.addEventListener('change', (e) => {
                    const newTheme = e.target.checked ? 'dark' : 'light';
                    console.log('Theme changed to:', newTheme);
                    this.theme = newTheme;
                    this.applyTheme(newTheme);
                    this.setStoredTheme(newTheme);
                    
                    // Announce theme change to screen readers
                    this.announceThemeChange(newTheme);
                });
            }
        }

        setupKeyboardSupport() {
            if (this.themeToggle) {
                this.themeToggle.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.themeToggle.checked = !this.themeToggle.checked;
                        this.themeToggle.dispatchEvent(new Event('change'));
                    }
                });
            }
        }

        announceThemeChange(theme) {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `Switched to ${theme} theme`;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
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

    // Enhanced Single Page Application Navigation with SEO support
    class SPANavigation {
        constructor() {
            this.currentSection = 'home';
            this.sections = ['home', 'cv', 'projects', 'blog', 'contact'];
            this.init();
        }

        init() {
            console.log('Initializing enhanced SPA navigation...');
            this.setupNavigationLinks();
            this.setupHashNavigation();
            this.setupKeyboardNavigation();
            this.showInitialSection();
        }

        setupNavigationLinks() {
            // Handle all navigation links with enhanced accessibility
            const navLinks = document.querySelectorAll('[data-section]');
            console.log('Found navigation links:', navLinks.length);
            
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = e.currentTarget.getAttribute('data-section');
                    console.log('Navigation clicked:', section);
                    this.navigateToSection(section);
                });

                // Enhanced keyboard navigation
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const section = e.currentTarget.getAttribute('data-section');
                        this.navigateToSection(section);
                    }
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

        setupKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                // Alt + number keys for quick section navigation
                if (e.altKey && !e.ctrlKey && !e.shiftKey) {
                    const keyMap = {
                        '1': 'home',
                        '2': 'cv', 
                        '3': 'projects',
                        '4': 'blog',
                        '5': 'contact'
                    };
                    
                    if (keyMap[e.key]) {
                        e.preventDefault();
                        this.navigateToSection(keyMap[e.key]);
                    }
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
            
            // Update document title for SEO
            this.updateDocumentTitle(section);
        }

        showSection(section) {
            console.log('Showing section:', section);
            
            // Hide all sections
            const allSections = document.querySelectorAll('.section');
            allSections.forEach(sec => {
                sec.classList.remove('active');
                sec.setAttribute('aria-hidden', 'true');
            });

            // Show target section
            const targetSection = document.getElementById(section);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.setAttribute('aria-hidden', 'false');
                this.currentSection = section;
                this.updateActiveNavLink(section);
                
                // Focus management for accessibility
                this.manageFocus(targetSection);
                
                // Scroll to top with smooth behavior
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // If showing blog section, ensure overview is visible
                if (section === 'blog') {
                    this.showBlogOverview();
                }

                // Update page description for SEO
                this.updatePageDescription(section);
                
            } else {
                console.error('Section not found:', section);
            }

            // Close mobile menu if open
            this.closeMobileMenu();
        }

        manageFocus(section) {
            // Focus the main heading of the section for screen readers
            const heading = section.querySelector('h1');
            if (heading) {
                // Make heading focusable temporarily
                heading.setAttribute('tabindex', '-1');
                heading.focus();
                
                // Remove tabindex after focus
                heading.addEventListener('blur', () => {
                    heading.removeAttribute('tabindex');
                }, { once: true });
            }
        }

        updateDocumentTitle(section) {
            const titleMap = {
                'home': 'Mukesh Arambakam - Senior Machine Learning Engineer & Software Developer',
                'cv': 'CV - Mukesh Arambakam | Senior Machine Learning Engineer & Software Developer',
                'projects': 'Projects - Mukesh Arambakam | Senior Machine Learning Engineer & Software Developer',
                'blog': 'Technical Blog - Mukesh Arambakam | ML Engineering Insights',
                'contact': 'Contact - Mukesh Arambakam | Get In Touch'
            };

            if (titleMap[section]) {
                document.title = titleMap[section];
            }
        }

        updatePageDescription(section) {
            const descriptionMap = {
                'home': 'Senior Machine Learning Engineer with with 7+ years of Software Development experience, including 5 years specializing in Natural Language Processing, Neural Machine Translation, and Generative AI in Dublin, Ireland.',
                'cv': 'Detailed curriculum vitae of Mukesh Arambakam, Senior Machine Learning Engineer with expertise in Python, PyTorch, FastMCP and GenAI Systems.',
                'projects': 'Explore projects including Home Lab Infrastructure, ML and AI usecases, etc.',
                'blog': 'Technical blog posts about machine learning, neural networks, GenAI, and software development best practices.',
                'contact': 'Get in touch with Mukesh Arambakam for machine learning consulting, software development, or technical collaboration opportunities.'
            };

            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription && descriptionMap[section]) {
                metaDescription.content = descriptionMap[section];
            }
        }

        updateActiveNavLink(section) {
            // Remove active class from all nav links
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            });

            // Add active class to current section link
            const activeLink = document.querySelector(`[data-section="${section}"].nav-link`);
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.setAttribute('aria-current', 'page');
            }
        }

        closeMobileMenu() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }

        showBlogOverview() {
            // Hide all blog posts
            document.querySelectorAll('.blog-post-content').forEach(post => {
                post.style.display = 'none';
                post.setAttribute('aria-hidden', 'true');
            });

            // Show blog overview
            const blogOverview = document.getElementById('blog-overview');
            if (blogOverview) {
                blogOverview.style.display = 'block';
                blogOverview.setAttribute('aria-hidden', 'false');
            }
        }
    }

    // Enhanced Blog Management with structured data updates
    class BlogManager {
        constructor() {
            this.currentPost = null;
            this.init();
        }

        init() {
            console.log('Initializing enhanced blog manager...');
            this.setupBlogNavigation();
        }

        setupBlogNavigation() {
            // Handle blog card clicks with enhanced accessibility
            const blogCards = document.querySelectorAll('.blog-card');
            console.log('Found blog cards:', blogCards.length);
            
            blogCards.forEach((card, index) => {
                // Make cards keyboard accessible
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', `Read blog post: ${card.querySelector('.card-title').textContent}`);
                
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    const postId = card.getAttribute('data-post');
                    console.log('Blog card clicked:', postId);
                    this.showBlogPost(postId);
                });

                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const postId = card.getAttribute('data-post');
                        this.showBlogPost(postId);
                    }
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
                blogOverview.setAttribute('aria-hidden', 'true');
            }

            // Show specific blog post
            const blogPost = document.getElementById(`blog-post-${postId}`);
            if (blogPost) {
                blogPost.style.display = 'block';
                blogPost.setAttribute('aria-hidden', 'false');
                this.currentPost = postId;
                
                // Update document title for SEO
                const postTitle = blogPost.querySelector('h1').textContent;
                document.title = `${postTitle} | Mukesh Arambakam - Machine Learning Engineer`;
                
                // Focus the blog post heading
                const heading = blogPost.querySelector('h1');
                if (heading) {
                    heading.setAttribute('tabindex', '-1');
                    heading.focus();
                    heading.addEventListener('blur', () => {
                        heading.removeAttribute('tabindex');
                    }, { once: true });
                }
                
                // Scroll to top of blog post
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
                
                // Update URL hash for deep linking
                history.pushState({}, '', `#blog/post-${postId}`);
            }
        }

        showBlogOverview() {
            console.log('Showing blog overview');
            
            // Hide all blog posts
            document.querySelectorAll('.blog-post-content').forEach(post => {
                post.style.display = 'none';
                post.setAttribute('aria-hidden', 'true');
            });

            // Show blog overview
            const blogOverview = document.getElementById('blog-overview');
            if (blogOverview) {
                blogOverview.style.display = 'block';
                blogOverview.setAttribute('aria-hidden', 'false');
                this.currentPost = null;

                // Reset document title
                document.title = 'Technical Blog - Mukesh Arambakam | ML Engineering Insights';
                
                // Reset URL hash
                history.pushState({}, '', '#blog');

                // Focus the blog heading
                const heading = document.getElementById('blog-heading');
                if (heading) {
                    heading.setAttribute('tabindex', '-1');
                    heading.focus();
                    heading.addEventListener('blur', () => {
                        heading.removeAttribute('tabindex');
                    }, { once: true });
                }

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }

    // Enhanced Utility Functions
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
                
                // Skip to content functionality
                if (e.key === 'Tab' && !e.shiftKey) {
                    const skipLink = document.querySelector('.sr-only-focusable');
                    if (skipLink && document.activeElement === document.body) {
                        skipLink.focus();
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
                        navbar.setAttribute('data-scrolled', 'true');
                    } else {
                        navbar.style.boxShadow = 'none';
                        navbar.setAttribute('data-scrolled', 'false');
                    }
                    
                    lastScrollTop = scrollTop;
                });
            }
        }

        static setupSEOEnhancements() {
            // Add structured data tracking for user interactions
            const trackInteraction = (type, element) => {
                // This could be used for analytics or user behavior tracking
                console.log(`User interaction: ${type} on`, element);
            };

            // Track project card interactions
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', () => trackInteraction('project_view', card));
            });

            // Track blog interactions
            document.querySelectorAll('.blog-card').forEach(card => {
                card.addEventListener('click', () => trackInteraction('blog_read', card));
            });

            // Track external link clicks
            document.querySelectorAll('a[target="_blank"]').forEach(link => {
                link.addEventListener('click', () => trackInteraction('external_link', link));
            });
        }

        static setupAccessibilityEnhancements() {
            // Add ARIA labels to dynamically generated content
            const updateARIA = () => {
                // Update skill tags with proper ARIA labels
                document.querySelectorAll('.skill-tag').forEach((tag, index) => {
                    if (!tag.getAttribute('aria-label')) {
                        tag.setAttribute('aria-label', `Skill: ${tag.textContent}`);
                    }
                });

                // Ensure all images have alt text or are marked as decorative
                document.querySelectorAll('img').forEach(img => {
                    if (!img.alt && !img.getAttribute('aria-hidden')) {
                        img.setAttribute('aria-hidden', 'true');
                    }
                });
            };

            updateARIA();
            
            // Setup focus trap for modals (if any are added later)
            const setupFocusTrap = (container) => {
                const focusableElements = container.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                if (focusableElements.length === 0) return;
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                container.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        if (e.shiftKey && document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        } else if (!e.shiftKey && document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                });
            };

            // Apply focus trap to any modal-like elements
            document.querySelectorAll('[role="dialog"]').forEach(setupFocusTrap);
        }
    }

    // Initialize Application with enhanced features
    try {
        console.log('Starting SEO-optimized portfolio application initialization...');
        
        // Initialize core components
        const themeManager = new ThemeManager();
        const navigation = new SPANavigation();
        const blogManager = new BlogManager();

        // Make blog manager globally accessible
        window.blogManager = blogManager;
        window.showBlogOverview = () => blogManager.showBlogOverview();

        // Setup utilities and enhancements
        Utils.setupKeyboardNavigation();
        Utils.setupNavbarScrollEffect();
        Utils.setupSEOEnhancements();
        Utils.setupAccessibilityEnhancements();

        // Animate on scroll (with delay to prevent initial flash)
        setTimeout(() => {
            Utils.animateOnScroll();
        }, 1000);

        console.log('SEO-optimized portfolio website initialized successfully');
        
        // Store references globally for debugging
        window.portfolioApp = {
            themeManager,
            navigation,
            blogManager,
            version: '2.0.0-seo'
        };

        // Add performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Page loaded in ${loadTime}ms`);
            });
        }

    } catch (error) {
        console.error('Error initializing SEO-optimized application:', error);
        
        // Fallback error reporting
        const errorReport = {
            error: error.message,
            stack: error.stack,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };
        console.error('Error report:', errorReport);
    }
});

// Global helper functions with enhanced accessibility
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

// Service Worker registration for PWA capabilities (if needed)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        // Uncomment if you add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}
