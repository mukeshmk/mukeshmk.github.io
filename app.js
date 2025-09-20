// Portfolio Website JavaScript

// Global functions that need to be available immediately
window.showSection = showSection;
window.scrollToContact = scrollToContact;
window.handleDownloadCV = handleDownloadCV;
window.showComingSoonMessage = showComingSoonMessage;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initNavigation();
    initScrollBehavior();
    initInteractiveElements();
    
    // Show home section by default
    showSection('home');
});

/**
 * Show specific section and hide others
 * @param {string} sectionId - The ID of the section to show
 */
function showSection(sectionId) {
    console.log(`Switching to section: ${sectionId}`);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log(`Section ${sectionId} is now active`);
    } else {
        console.error(`Section ${sectionId} not found`);
    }
    
    // Update active navigation link
    updateActiveNavLink(sectionId);
    
    // Update page title based on section
    updatePageTitle(sectionId);
    
    // Update URL hash without scrolling
    if (window.history && window.history.pushState) {
        window.history.pushState(null, null, `#${sectionId}`);
    }
    
    // Scroll to top when switching sections
    scrollToTop();
}

/**
 * Update active navigation link
 * @param {string} sectionId - The current section ID
 */
function updateActiveNavLink(sectionId) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section link
    const currentLink = Array.from(navLinks).find(link => {
        return link.textContent.toLowerCase().trim() === sectionId.toLowerCase() ||
               (sectionId === 'home' && link.textContent.toLowerCase().trim() === 'home');
    });
    
    if (currentLink) {
        currentLink.classList.add('active');
    }
}

/**
 * Update page title based on current section
 * @param {string} sectionId - The current section ID
 */
function updatePageTitle(sectionId) {
    const titles = {
        home: 'Mukesh Arambakam - ML Engineer Portfolio',
        cv: 'CV - Mukesh Arambakam',
        blog: 'Blog - Mukesh Arambakam'
    };
    
    document.title = titles[sectionId] || titles.home;
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Scroll to contact section
 */
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // If contact section doesn't exist as separate element, scroll to footer
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

/**
 * Handle CV download functionality
 */
function handleDownloadCV() {
    // Show message about CV download
    showMessage('CV download functionality will be implemented soon. For now, you can print this page or contact me directly for a PDF version.', 'info');
    
    // Alternative: Open print dialog for CV section
    // setTimeout(() => {
    //     window.print();
    // }, 1000);
}

/**
 * Show coming soon message for blog posts
 */
function showComingSoonMessage() {
    showMessage('Blog post coming soon! Check back later for updates.', 'info');
}

/**
 * Show a temporary message to the user
 * @param {string} text - Message text
 * @param {string} type - Message type (info, success, error, warning)
 */
function showMessage(text, type = 'info') {
    // Remove any existing messages
    const existingMessage = document.querySelector('.temp-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create a temporary message
    const message = document.createElement('div');
    message.className = 'temp-message';
    message.textContent = text;
    
    // Style the message
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-surface);
        color: var(--color-text);
        padding: var(--space-16) var(--space-24);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        border: 2px solid var(--color-primary);
        max-width: 400px;
        text-align: center;
        font-weight: var(--font-weight-medium);
        animation: fadeInOut 3s ease-in-out;
    `;
    
    // Add animation styles
    if (!document.querySelector('#temp-message-styles')) {
        const style = document.createElement('style');
        style.id = 'temp-message-styles';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (message && message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    console.log('Initializing navigation...');
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else {
            showSection('home');
        }
    });
    
    // Check initial hash on page load
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
    } else {
        showSection('home');
    }
    
    console.log('Navigation initialized');
}

/**
 * Initialize scroll behavior and smooth scrolling
 */
function initScrollBehavior() {
    // Add smooth scrolling to the document
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

/**
 * Initialize interactive elements
 */
function initInteractiveElements() {
    console.log('Initializing interactive elements...');
    
    // Add hover effects to cards
    initCardHoverEffects();
    
    // Initialize skill tag interactions
    initSkillTagInteractions();
    
    // Initialize form elements if any
    initFormElements();
    
    // Initialize accessibility features
    initAccessibilityFeatures();
    
    console.log('Interactive elements initialized');
}

/**
 * Initialize card hover effects
 */
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.highlight-card, .blog-card, .contact-item, .skill-category');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
}

/**
 * Initialize skill tag interactions
 */
function initSkillTagInteractions() {
    const skillTags = document.querySelectorAll('.skill-tag, .blog-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Add a subtle animation when clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            console.log(`Tag clicked: ${this.textContent}`);
        });
        
        // Add hover effect
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Initialize form elements
 */
function initFormElements() {
    // Handle email and phone links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Email link clicked:', this.href);
            // The browser will handle opening the default email client
        });
    });
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Phone link clicked:', this.href);
            // The browser will handle the phone call on mobile devices
        });
    });
}

/**
 * Initialize accessibility features
 */
function initAccessibilityFeatures() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Allow navigation with keyboard shortcuts
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    showSection('home');
                    break;
                case '2':
                    e.preventDefault();
                    showSection('cv');
                    break;
                case '3':
                    e.preventDefault();
                    showSection('blog');
                    break;
            }
        }
        
        // Escape key to go back to home
        if (e.key === 'Escape') {
            showSection('home');
        }
    });
    
    // Add focus indicators for keyboard navigation
    const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

/**
 * Initialize performance optimizations
 */
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll events here if needed
        }, 100);
    });
    
    // Preload sections for faster navigation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        // Force browser to parse the section content
        section.offsetHeight;
    });
}

/**
 * Initialize analytics tracking (placeholder)
 */
function initAnalytics() {
    // Placeholder for analytics tracking
    console.log('Analytics tracking initialized (placeholder)');
    
    // Track section views
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                console.log(`Section viewed: ${sectionId}`);
                // Add your analytics tracking here
                // gtag('event', 'page_view', { page_title: sectionId });
            }
        });
    });
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * Utility function to debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing additional features...');
    
    initPerformanceOptimizations();
    initAnalytics();
    
    // Test that all sections exist
    const sections = ['home', 'cv', 'blog'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            console.log(`✓ Section ${sectionId} found`);
        } else {
            console.error(`✗ Section ${sectionId} not found`);
        }
    });
    
    console.log('Portfolio website fully initialized');
});

// Export functions for global access
window.PortfolioApp = {
    showSection,
    updateActiveNavLink,
    scrollToTop,
    scrollToContact,
    handleDownloadCV,
    showComingSoonMessage,
    showMessage
};