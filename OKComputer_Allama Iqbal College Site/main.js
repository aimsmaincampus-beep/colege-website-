// Allama Iqbal Model School & College - Main JavaScript
// Advanced Interactive Features and Animations

class AIMSWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupParticleBackground();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupStatisticsCounter();
        this.setupNewsTicker();
        this.setupInteractiveElements();
        this.setupFormHandlers();
        this.setupMobileMenu();
    }

    // Particle Background System
    setupParticleBackground() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticle = () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push(createParticle());
            }
        };

        const updateParticles = () => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            });
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(251, 191, 36, ${particle.opacity})`;
                ctx.fill();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const distance = Math.sqrt(
                        Math.pow(particle.x - otherParticle.x, 2) +
                        Math.pow(particle.y - otherParticle.y, 2)
                    );

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(251, 191, 36, ${0.1 * (1 - distance / 100)})`;
                        ctx.stroke();
                    }
                });
            });
        };

        const animate = () => {
            updateParticles();
            drawParticles();
            animationId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        initParticles();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // Navigation System
    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation highlighting
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('text-yellow-400');
                        link.classList.add('text-gray-300');
                    });
                    
                    const activeLink = document.querySelector(`a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.remove('text-gray-300');
                        activeLink.classList.add('text-yellow-400');
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('card-hover')) {
                        anime({
                            targets: element,
                            translateY: [50, 0],
                            opacity: [0, 1],
                            duration: 800,
                            easing: 'easeOutCubic',
                            delay: anime.stagger(100)
                        });
                    }
                    
                    if (element.classList.contains('glass')) {
                        anime({
                            targets: element,
                            scale: [0.9, 1],
                            opacity: [0, 1],
                            duration: 1000,
                            easing: 'easeOutElastic(1, .8)'
                        });
                    }
                    
                    animateOnScroll.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.card-hover, .glass').forEach(element => {
            element.style.opacity = '0';
            animateOnScroll.observe(element);
        });
    }

    // Statistics Counter Animation
    setupStatisticsCounter() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // News Ticker Animation
    setupNewsTicker() {
        const newsTicker = document.getElementById('news-ticker');
        if (!newsTicker) return;

        const animateNewsTicker = () => {
            anime({
                targets: newsTicker,
                translateX: [-newsTicker.offsetWidth, window.innerWidth],
                duration: 30000,
                easing: 'linear',
                loop: true
            });
        };

        // Start animation when page loads
        setTimeout(animateNewsTicker, 2000);
    }

    // Interactive Elements
    setupInteractiveElements() {
        // Button hover effects
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('mouseenter', () => {
                anime({
                    targets: button,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            button.addEventListener('mouseleave', () => {
                anime({
                    targets: button,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });

        // Card hover effects
        document.querySelectorAll('.card-hover').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    rotateY: 5,
                    rotateX: 5,
                    duration: 600,
                    easing: 'easeOutCubic'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    rotateY: 0,
                    rotateX: 0,
                    duration: 600,
                    easing: 'easeOutCubic'
                });
            });
        });

        // Campus card interactions
        document.querySelectorAll('.campus-card').forEach(card => {
            card.addEventListener('click', () => {
                const campusName = card.querySelector('h3').textContent;
                this.showCampusModal(campusName);
            });
        });
    }

    // Campus Modal
    showCampusModal(campusName) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="glass rounded-2xl p-8 max-w-2xl mx-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-yellow-400">${campusName}</h3>
                    <button class="close-modal text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>
                <div class="space-y-4 text-gray-300">
                    <p>This campus features state-of-the-art facilities including modern classrooms, science laboratories, computer labs, library, and sports facilities.</p>
                    <p>Programs offered include Science, Arts, Computer Science, and Commerce streams with specialized coaching for competitive exams.</p>
                    <div class="flex space-x-4 mt-6">
                        <button class="btn-primary px-6 py-2 rounded-full text-sm font-bold">Take Virtual Tour</button>
                        <button class="btn-secondary px-6 py-2 rounded-full text-sm font-bold">Contact Campus</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Form Handlers
    setupFormHandlers() {
        // Contact form submission
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });

        // Input field animations
        document.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', () => {
                anime({
                    targets: input,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            input.addEventListener('blur', () => {
                anime({
                    targets: input,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        } text-white`;
        notification.textContent = message;

        document.body.appendChild(notification);

        anime({
            targets: notification,
            translateX: [400, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });

        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 400],
                opacity: [1, 0],
                duration: 500,
                easing: 'easeInCubic',
                complete: () => {
                    document.body.removeChild(notification);
                }
            });
        }, 4000);
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on links
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                });
            });
        }
    }

    // Utility Methods
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Campus Data Management
class CampusManager {
    constructor() {
        this.campuses = [
            {
                id: 'main',
                name: 'Main Campus - Sakhakot',
                location: 'Sakhakot, Malakand District',
                students: 2000,
                faculty: 80,
                established: 1995,
                programs: ['Science', 'Arts', 'Computer Science', 'Commerce'],
                facilities: ['Modern Labs', 'Library', 'Sports Complex', 'Mosque'],
                achievements: ['Best School Award 2023', '98% Pass Rate', 'Olympiad Winners'],
                image: 'resources/hero-main-campus.jpg'
            },
            {
                id: 'batkhela',
                name: 'Campus 2 - Batkhela',
                location: 'Batkhela, Malakand District',
                students: 800,
                faculty: 35,
                established: 2005,
                programs: ['Science', 'Arts', 'Commerce'],
                facilities: ['Science Labs', 'Computer Lab', 'Library'],
                achievements: ['Regional Champions', 'Academic Excellence'],
                image: 'resources/computer-lab.jpg'
            },
            {
                id: 'dargai',
                name: 'Campus 3 - Dargai',
                location: 'Dargai, Malakand District',
                students: 600,
                faculty: 28,
                established: 2010,
                programs: ['Arts', 'Commerce', 'Computer Science'],
                facilities: ['Arts Studio', 'Computer Lab', 'Library'],
                achievements: ['Cultural Awards', 'Community Service'],
                image: 'resources/science-lab.jpg'
            }
        ];
    }

    getCampus(id) {
        return this.campuses.find(campus => campus.id === id);
    }

    getAllCampuses() {
        return this.campuses;
    }

    searchCampuses(query) {
        return this.campuses.filter(campus => 
            campus.name.toLowerCase().includes(query.toLowerCase()) ||
            campus.location.toLowerCase().includes(query.toLowerCase()) ||
            campus.programs.some(program => program.toLowerCase().includes(query.toLowerCase()))
        );
    }
}

// Program Data Management
class ProgramManager {
    constructor() {
        this.programs = [
            {
                id: 'ai-programming',
                name: 'AI & Programming Club',
                icon: '💻',
                description: 'Learn coding, artificial intelligence, and software development with expert mentors.',
                students: 150,
                achievements: ['5 National Awards', 'Mobile App Competition Winners', 'Coding Olympiad Champions'],
                activities: ['Weekly Coding Sessions', 'Hackathons', 'Project Development', 'Industry Visits'],
                coordinator: 'Mr. Ahmed Khan',
                email: 'ai-club@aimscsakhakot.edu.pk'
            },
            {
                id: 'science-research',
                name: 'Science & Research',
                icon: '🔬',
                description: 'Advanced laboratories and research programs with participation in national science Olympiads.',
                students: 200,
                achievements: ['3 Gold Medals', 'International Olympiad Participants', 'Research Publications'],
                activities: ['Lab Experiments', 'Research Projects', 'Science Fairs', 'Olympiad Training'],
                coordinator: 'Dr. Sarah Ahmad',
                email: 'science@aimscsakhakot.edu.pk'
            },
            {
                id: 'debate-modelun',
                name: 'Debate & Model UN',
                icon: '🎤',
                description: 'Develop public speaking, critical thinking, and diplomatic skills through competitive debate.',
                students: 120,
                achievements: ['8 Championships', 'National Debate Winners', 'Model UN Best Delegates'],
                activities: ['Weekly Debates', 'Public Speaking Workshops', 'Model UN Conferences', 'Guest Speakers'],
                coordinator: 'Ms. Fatima Shah',
                email: 'debate@aimscsakhakot.edu.pk'
            }
        ];
    }

    getProgram(id) {
        return this.programs.find(program => program.id === id);
    }

    getAllPrograms() {
        return this.programs;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const website = new AIMSWebsite();
    const campusManager = new CampusManager();
    const programManager = new ProgramManager();

    // Make managers globally available
    window.campusManager = campusManager;
    window.programManager = programManager;

    // Add scroll-to-top functionality
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Add scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-yellow-500 text-gray-900 rounded-full shadow-lg opacity-0 transition-opacity duration-300 z-40';
    scrollTopBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll-to-top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
        }
    });

    // Performance optimization
    const optimizeScroll = AIMSWebsite.throttle(() => {
        // Scroll-based animations can be added here
    }, 16);

    window.addEventListener('scroll', optimizeScroll);

    console.log('🎓 AIMS College Website Loaded Successfully!');
});