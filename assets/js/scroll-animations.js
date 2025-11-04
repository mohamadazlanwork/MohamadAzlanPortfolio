// Scroll-triggered animations using Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    // Configuration for the intersection observer
    const observerConfig = {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
    };

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.classList.add('animate-in');
                
                // For elements with staggered children
                if (entry.target.classList.contains('stagger-children')) {
                    const children = entry.target.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100); // 100ms delay between each child
                    });
                }
                
            }
        });
    }, observerConfig);

    // Elements to animate on scroll - target existing sections
    const animateElements = document.querySelectorAll([
        '#about',
        '#about .about-content',
        '#about .about-text',
        '#about .about-image',
        '#about .about-stats',
        '#about .stat',
        '#skills',
        '#skills .skill-category',
        '#projects',
        '#projects .project-card',
        '#experience',
        '#experience .timeline-item',
        '#education',
        '#education .timeline-item',
        '#contact',
        '#contact .contact-content'
    ].join(','));

    // Start observing elements
    animateElements.forEach(element => {
        if (element) {
            // Add initial hidden state
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        }
    });

    // Special handling for stats (staggered animation)
    const aboutStats = document.querySelector('#about .about-stats');
    if (aboutStats) {
        aboutStats.classList.add('stagger-children');
        const stats = aboutStats.querySelectorAll('.stat');
        stats.forEach(stat => {
            stat.classList.add('animate-child');
        });
    }

    // Special handling for skill categories (staggered animation)
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillsSection.classList.add('stagger-children');
        const skillCategories = skillsSection.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            category.classList.add('animate-child');
        });
    }

    // Special handling for project cards (staggered animation)
    const projectsGrid = document.querySelector('#projects .projects-grid');
    if (projectsGrid) {
        projectsGrid.classList.add('stagger-children');
        const projectCards = projectsGrid.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.classList.add('animate-child');
        });
    }

    // Special handling for timeline items with alternating animations
    const experienceTimelineItems = document.querySelectorAll('#experience .timeline-item');
    experienceTimelineItems.forEach((item, index) => {
        // Add alternating fade directions
        if (index % 2 === 0) {
            item.classList.add('fade-left');
        } else {
            item.classList.add('fade-right');
        }
    });

    // Special handling for education timeline items with alternating animations
    const educationTimelineItems = document.querySelectorAll('#education .timeline-item');
    educationTimelineItems.forEach((item, index) => {
        // Add alternating fade directions
        if (index % 2 === 0) {
            item.classList.add('fade-left');
        } else {
            item.classList.add('fade-right');
        }
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll progress indicator
    function updateScrollProgress() {
        const scrolled = window.pageYOffset;
        const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxHeight) * 100;
        
        // Update progress bar if it exists
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #60a5fa);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', updateScrollProgress);
    
    // Initial call to set progress
    updateScrollProgress();
});