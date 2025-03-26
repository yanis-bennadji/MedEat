// Wait for all components to load before initializing functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality after components are loaded
    initializeFunctionality();
});

// Function to initialize all functionality
function initializeFunctionality() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .card, .testimonial-card').forEach(element => {
        observer.observe(element);
    });

    // Mobile menu functionality
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'md:hidden text-gray-600 hover:text-blue-600 p-2';
    mobileMenuButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    `;

    const nav = document.querySelector('nav');
    if (nav) {
        const navLinks = nav.querySelector('.hidden');
        if (navLinks) {
            nav.insertBefore(mobileMenuButton, navLinks);
            
            // Create mobile menu container
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu hidden';
            mobileMenu.innerHTML = `
                <div class="p-4">
                    <div class="flex justify-between items-center mb-8">
                        <div class="text-2xl font-bold text-[#1A7363]">MedEat</div>
                        <button class="close-menu text-gray-600 hover:text-blue-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="flex flex-col space-y-4">
                        <a href="#how-it-works" class="text-gray-600 hover:text-blue-600 py-2">Comment ça marche</a>
                        <a href="#mission" class="text-gray-600 hover:text-blue-600 py-2">Notre mission</a>
                        <a href="#blog" class="text-gray-600 hover:text-blue-600 py-2">Blog</a>
                        <a href="#download" class="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors text-center">
                            Télécharger MedEat
                        </a>
                    </div>
                </div>
            `;
            
            document.body.appendChild(mobileMenu);
            
            // Toggle mobile menu
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
            
            // Close mobile menu
            const closeButton = mobileMenu.querySelector('.close-menu');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    document.body.style.overflow = '';
                });
            }
            
            // Close mobile menu when clicking links
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        let lastScroll = 0;

        const updateHeader = () => {
            const currentScroll = window.pageYOffset;
            const isAtTop = currentScroll <= 50;

            if (isAtTop) {
                header.classList.remove('bg-white', 'shadow-md');
            } else {
                header.classList.add('bg-white', 'shadow-md');
            }

            lastScroll = currentScroll;
        };

        // Initial check
        updateHeader();
        
        // Update on scroll
        window.addEventListener('scroll', updateHeader);
    }

    // Add hover effect to cards
    document.querySelectorAll('.card, .testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover-scale');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-scale');
        });
    });

    // Form validation and submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your backend
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
            this.reset();
        });
    }
} 