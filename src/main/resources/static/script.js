// Modern Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initTypingEffect();
    initContactForm();
    initActiveNavLinks();
});

// Scroll-based Navbar Styling
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Typing effect in Hero Section
function initTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const phrases = [
        'Full Stack Developer',
        'Java & Spring Boot Specialist',
        'Mathematics Graduate',
        'Problem Solver & Clean Coder'
    ];
    
    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, characterIndex - 1);
            characterIndex--;
            typingSpeed = 50; // speed up when deleting
        } else {
            textElement.textContent = currentPhrase.substring(0, characterIndex + 1);
            characterIndex++;
            typingSpeed = 100;
        }

        // Handle phrase completion
        if (!isDeleting && characterIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // wait before deleting
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // wait before next phrase
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Contact Form AJAX Handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    const responseToast = document.getElementById('formResponse');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable button while sending
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/contact/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                responseToast.textContent = "Thank you! Your message has been received successfully.";
                responseToast.className = "form-response-toast success";
                form.reset();
            } else {
                throw new Error('Server responded with an error');
            }
        } catch (error) {
            responseToast.textContent = "Something went wrong. Please try emailing me directly at abimanim311@gmail.com";
            responseToast.className = "form-response-toast error";
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Auto-hide toast after 8 seconds
            setTimeout(() => {
                responseToast.style.display = 'none';
            }, 8000);
        }
    });
}

// Dynamic Active State for Navigation Links
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}