document.addEventListener("DOMContentLoaded", function() {
    // Loading Screen
    const loader = document.getElementById('loader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Active navigation link
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: counter,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Swiper Gallery
    if (typeof Swiper !== 'undefined') {
        new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
    }

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => item.getAttribute('data-src'));

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            lightboxImg.src = this.getAttribute('data-src');
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    lightboxPrev.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex];
    });

    lightboxNext.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex];
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight') {
                lightboxNext.click();
            }
        }
    });

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form submissions
    const contactForm = document.getElementById('contact-form');
    const registerForm = document.getElementById('register-form');

    // Contact Form Submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending Message...';
        submitBtn.disabled = true;

        // Add submission date
        document.getElementById('contact_submission_date').value = new Date().toLocaleString();

        // Get form data
        const formData = new FormData(this);

        // Submit to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success with Formspree
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;

                alert(`✅ Message sent successfully!

From: ${name}
Email: ${email}
Phone: ${phone}

Thank you for contacting Maths Magic!
We will get back to you soon.

Your message has been sent to: ankushkumbhkar563@gmail.com`);

                this.reset();
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Form submission failed');
                });
            }
        })
        .catch(error => {
            console.error('Formspree error:', error);
            alert(`❌ There was an error sending your message: ${error.message}

Please try again or contact us directly:
📧 Email: ankushkumbhkar563@gmail.com
📞 Phone: +91 9174202063
📱 WhatsApp: +91 9174202063`);
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });

    // Registration Form Submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting Registration...';
        submitBtn.disabled = true;

        // Add submission date
        document.getElementById('submission_date').value = new Date().toLocaleString();

        // Get form data
        const formData = new FormData(this);

        // Submit to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success with Formspree
                const studentName = document.getElementById('student-name').value;
                const studentClass = document.getElementById('student-class').value;
                const parentName = document.getElementById('parent-name').value;
                const parentContact = document.getElementById('parent-contact').value;

                alert(`🎉 Registration submitted successfully!

Student: ${studentName} (Class ${studentClass})
Parent: ${parentName}
Contact: ${parentContact}

Thank you for registering with Maths Magic!
We will contact you soon with further details.

Your registration has been sent to: ankushkumbhkar563@gmail.com`);

                this.reset();
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Registration submission failed');
                });
            }
        })
        .catch(error => {
            console.error('Formspree error:', error);
            alert(`❌ There was an error submitting your registration: ${error.message}

Please try again or contact us directly:
📧 Email: ankushkumbhkar563@gmail.com
📞 Phone: +91 9174202063
📱 WhatsApp: +91 9174202063`);
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });

    // Add floating animation to course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        gsap.to(card, {
            y: -10,
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.2
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.home');
        const speed = scrolled * 0.5;

        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add hover effect to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('img'), {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('img'), {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Mobile menu close on link click
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    console.log('Maths Magic website loaded successfully! 🎉');
});
