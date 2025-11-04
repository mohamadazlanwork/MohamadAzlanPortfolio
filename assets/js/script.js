// ===============================
// Portfolio JavaScript
// ===============================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initProjectFilters();
    initContactForm();
    initAnimations();
    initTypingEffect();
    initPageLoadAnimations();
    initScrollAnimations();
});

// ===============================
// Navigation Functions
// ===============================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===============================
// Scroll Effects
// ===============================
function initScrollEffects() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; 
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat');
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

// ===============================
// Project Filters
// ===============================
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.getElementById('projects-grid');

    // Sample project data
    const projects = [
        {
             title: "Lithan Academy Learner Analytics Dashboard",
    description: "Visualizing learner performance, placements, and program engagement through data-driven insights.",
    image: "https://github.com/mohamadazlanwork/Logoall/blob/main/Lithan%20Academy.jpg?raw=true",
    technologies: ["Power BI", "DAX", "Data Modeling"],
    categories: ["Lithan Academy"],
    liveUrl: "https://mohamadazlanwork.github.io/Lithan_Academy/",
    githubUrl: "https://github.com/mohamadazlanwork/Powerbi_Dashboard"
        },
        {
            title: "CIMB HR Experience Journey",
    description:
      "Highlights my achievements at CIMB in employer branding, HR analytics, and recruitment operations.",
    image:
      "https://github.com/mohamadazlanwork/Logoall/blob/main/CIMB%201.jpg?raw=true",
    technologies: [
      "Employer Branding",
      "Power BI",
      "HR Analytics",
      "Recruitment Operations",
      "Employee Engagement",
    ],
    categories: ["CIMB"],
    liveUrl: "https://mohamadazlanwork.github.io/Cimb/",
    githubUrl: "https://github.com/mohamadazlanwork/Cimb"
        },
        {
            title: "Bumi Armada Workforce Flow Tracker",
  description:"Designed an HR lifecycle interface to track onboarding, training readiness, and exit timelines",
  image:"https://github.com/mohamadazlanwork/Logoall/blob/main/Bumi%20Picture%20Backgorun.jpg?raw=true",
  technologies: [
    "Google Sheets API",
    "JavaScript",
    "Chart.js",
    "Glassmorphism UI",
    "Live Data Visualization"
  ],
  categories: ["HR Analytics"],
  liveUrl: "https://mohamadazlanwork.github.io/BumiArmada/",
  githubUrl: "https://github.com/mohamadazlanwork/BumiArmada"
        },
        {
            title: "Acclime Hiring Operations Monitor",
            description: "An interactive recruitment dashboard tracking interview stages using demo data.",
            image: "https://github.com/mohamadazlanwork/Logoall/blob/main/acclime-recruitment-tracker.vercel.app.png?raw=true",
            technologies: ["Google Sheets API", "Talent Acquisition", "Data Visualization"],
            categories: ["frontend", "dashboard"],
            liveUrl: "https://acclime-recruitment-tracker.vercel.app/",
            githubUrl: "https://github.com/mohamadazlanwork/Acclime_Recruitment_Tracker"
        },
        {
            title: "Review-Recommendation",
            description: "Showcasing authentic Google and LinkedIn testimonials from learners and peers",
            image: "https://github.com/mohamadazlanwork/Logoall/blob/main/Screenshot%202025-11-04%20201321.jpg?raw=true", // replace if you have a different cover
            technologies: ["Google Reviews", "LinkedIn Recommendations","Portfolio Integration"],
            categories: ["Testimonials", "Professional Reviews"],
            liveUrl: "https://mohamadazlanwork.github.io/Review-Recommendation/",
            githubUrl: "https://github.com/mohamadazlanwork/Review-Recommendation"
       } 
    ];

    // Render initial projects
    renderProjects(projects);

    // Add filter event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            const filter = this.getAttribute('data-filter');
            const filteredProjects = filter === 'all' 
                ? projects 
                : projects.filter(project => project.categories.includes(filter));

            renderProjects(filteredProjects);
        });
    });

    function renderProjects(projectsToRender) {
        projectsGrid.innerHTML = '';
        
        projectsToRender.forEach((project, index) => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
            
            // Add staggered animation
            setTimeout(() => {
                projectCard.classList.add('animate-in');
            }, index * 100);
        });
    }

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card animate-element';
        card.setAttribute('data-category', project.categories.join(' '));
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/400x200?text=Project+Image'">
                <div class="project-overlay">
                    ${project.liveUrl !== '#' ? `<a href="${project.liveUrl}" class="project-link" target="_blank" aria-label="View live project">
                        <i class="fas fa-external-link-alt"></i>
                    </a>` : ''}
                    <a href="${project.githubUrl}" class="project-link" target="_blank" aria-label="View source code">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        return card;
    }
}

// ===============================
// Contact Form with EmailJS
// ===============================
function initContactForm() {
    // EmailJS Configuration 
    const emailjsConfig = {
        publicKey: atob("REpEeW42NTV1R2k3bjFlV0U="),
        serviceId: atob("c2VydmljZV84amw3Mmhl"), 
        templateId: atob("dGVtcGxhdGVfbHo0OHdkMg==")
    };
    
    if (!emailjsConfig.publicKey || !emailjsConfig.serviceId || !emailjsConfig.templateId) {
        console.error("EmailJS configuration not found. Please check config.js file.");
        return;
    }
    
    if (typeof emailjs !== 'undefined') {
        emailjs.init(emailjsConfig.publicKey);
    } else {
        console.error("EmailJS library not loaded");
        return;
    }
    
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Send email using EmailJS
        const templateParams = {
            name: name,
            from_name: name,
            email: email,
            from_email: email,
            message: message,
            subject: subject,
            title: subject 
        };
        
        emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, templateParams)
            .then(function(response) {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            }, function(error) {
                showNotification('Failed to send message. Please try again.', 'error');
            })
            .finally(function() {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
    
    function validateForm(name, email, subject, message) {

        clearFormErrors();
        
        let isValid = true;
        
        // Validate name
        if (name.trim().length < 2) {
            showFieldError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (subject.trim().length < 3) {
            showFieldError('subject', 'Subject must be at least 3 characters long');
            isValid = false;
        }
        
        // Validate message
        if (message.trim().length === 0) {
            showFieldError('message', 'Message cannot be empty');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        field.style.borderColor = '#ef4444';
        
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }
    
    function clearFormErrors() {
        const fields = ['name', 'email', 'subject', 'message'];
        fields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            field.style.borderColor = '';
            
            const errorMessage = field.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    }
}

// ===============================
// Animations
// ===============================
function initAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .typing-cursor {
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .project-card {
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.5s ease-out;
        }
        
        .project-card.animate-in {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// ===============================
// Typing Effect
// ===============================
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        const typingTexts = [
            'HR Business Partner',
            'Talent Acquisition Specialist',
            'HR Analytics',
            'HR Operations'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeText() {
            const currentText = typingTexts[textIndex];
            
            if (isDeleting) {
                subtitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                subtitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
            }
            
            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(typeText, typingSpeed);
        }
        
        // Start typing effect after a delay
        setTimeout(typeText, 1000);
    }
}

// ===============================
// Utility Functions
// ===============================
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transition: transform 0.4s ease-out;
        font-weight: 500;
        font-size: 1rem;
        min-width: 280px;
        text-align: center;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in - slide down from top
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Auto remove - slide back up
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(-100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 3000);
}

// Throttle function for scroll events
function throttle(func, wait) {
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

// Debounce function for resize events
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

// ===============================
// Performance Optimizations
// ===============================

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add scroll performance optimization
let ticking = false;

function updateOnScroll() {
    updateActiveNavLink();
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

// ===============================
// Page Load Animations
// ===============================
function initPageLoadAnimations() {
    // Add page-loaded class after a short delay
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
}

// ===============================
// Scroll Animations
// ===============================
function initScrollAnimations() {
    // Add animate-on-scroll class to elements
    const animateElements = [
        '.section-title',
        '.section-subtitle', 
        '.about-text',
        '.about-stats',
        '.skill-category',
        '.project-card',
        '.timeline-item',
        '.contact-form',
        '.footer'
    ];
    
    animateElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('animate-on-scroll');
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Add staggered animation delay for multiple elements
                const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
                const index = Array.from(siblings).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
}

// Enhanced smooth scrolling
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===============================
// My Details Modal Functions
// ===============================
function openDetailsModal() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
    
    // Animate language proficiency bars
    setTimeout(() => {
        const proficiencyBars = document.querySelectorAll('.proficiency-fill');
        proficiencyBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }, 300);
}

function closeDetailsModal() {
    const modal = document.getElementById('detailsModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('detailsModal');
        if (modal && modal.classList.contains('active')) {
            closeDetailsModal();
        }
    }
});

window.addEventListener('scroll', requestTick);