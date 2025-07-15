// Global variables
let currentSection = 'welcome';
let currentImageIndex = 0;
let isPlaying = false;
const galleryImages = [
    'Meett.png',
    'Stare.png',
    'Class.png',
    'hug.png',
    'Night.png',
    'Kiss.png'
];

// DOM elements
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const blowCandlesBtn = document.getElementById('blowCandles');
const candles = document.querySelector('.candles');
const celebrationButton = document.getElementById('celebrationButton');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeNavigation();
    initializeGallery();
    initializeCandleBlowing();
    initializeCelebrationEffects();
    initializeAgeDisplay();
    
    // Start with welcome section
    navigateToSection('welcome');
});

// Create floating particles
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particles = ['💕', '💖', '✨', '🌟', '💫', '🎀', '🌸', '🦋'];
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 400);
    }
}

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            navigateToSection(section);
        });
    });
    
    // Music toggle
    musicToggle.addEventListener('click', toggleMusic);
    
    // Smooth scrolling for navigation
    document.addEventListener('click', (e) => {
        if (Math.abs(e.deltaY) > 50) {
            e.preventDefault();
            if (e.deltaY > 0) {
                navigateNext();
            } else {
                navigatePrev();
            }
        }
    }, { passive: false });
}

// Navigation functions
function navigateToSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
        
        // Update navigation active state
        updateActiveNavLink(sectionName);
        
        // Trigger section-specific animations
        triggerSectionAnimations(sectionName);
    }
}

function updateActiveNavLink(sectionName) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionName) {
            link.classList.add('active');
        }
    });
}

function navigateNext() {
    const sections = ['welcome', 'message', 'gallery', 'memories', 'wishes'];
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    navigateToSection(sections[nextIndex]);
}

function navigatePrev() {
    const sections = ['welcome', 'message', 'gallery', 'memories', 'wishes'];
    const currentIndex = sections.indexOf(currentSection);
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
    navigateToSection(sections[prevIndex]);
}

// Music functionality
function toggleMusic() {
    if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.remove('playing');
        isPlaying = false;
    } else {
        backgroundMusic.play().catch(e => {
            console.log('Audio play failed:', e);
        });
        musicToggle.classList.add('playing');
        isPlaying = true;
    }
}

// Initialize gallery functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
        updateLightboxImage();
    });
    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    });
    
    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight') {
                lightboxNext.click();
            }
        }
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.style.display = 'block';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function updateLightboxImage() {
    lightboxImage.src = galleryImages[currentImageIndex];
}

// Initialize candle blowing functionality
function initializeCandleBlowing() {
    blowCandlesBtn.addEventListener('click', () => {
        blowCandles();
    });
}

function blowCandles() {
    candles.classList.add('blown');
    blowCandlesBtn.textContent = '🎉 Wish Made! 🎉';
    blowCandlesBtn.disabled = true;
    
    // Create confetti effect
    createConfetti();
    
    // Reset after 5 seconds
    setTimeout(() => {
        candles.classList.remove('blown');
        blowCandlesBtn.textContent = '💨 Make a Wish & Blow!';
        blowCandlesBtn.disabled = false;
    }, 5000);
}

// Initialize celebration effects
function initializeCelebrationEffects() {
    celebrationButton.addEventListener('click', () => {
        createMassiveConfetti();
        celebrationButton.textContent = '🎊 Celebrating! 🎊';
        celebrationButton.disabled = true;
        
        setTimeout(() => {
            celebrationButton.textContent = '🎊 Start the Celebration! 🎊';
            celebrationButton.disabled = false;
        }, 5000);
    });
}

// Confetti creation functions
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b9d', '#ffd700', '#e8b4cb', '#ffadc6'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }, i * 50);
    }
}

function createMassiveConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b9d', '#ffd700', '#e8b4cb', '#ffadc6', '#ffe0e6'];
    
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 25);
    }
}

// Initialize age display with animation
function initializeAgeDisplay() {
    const ageNumber = document.querySelector('.age-number');
    const targetAge = 20; // You can change this to the actual age
    let currentAge = 0;
    
    const ageInterval = setInterval(() => {
        currentAge++;
        ageNumber.textContent = currentAge;
        
        if (currentAge >= targetAge) {
            clearInterval(ageInterval);
            // Add celebration effect when age is reached
            ageNumber.style.animation = 'pulse 1s ease-in-out 3';
        }
    }, 100);
}

// Section-specific animations
function triggerSectionAnimations(sectionName) {
    switch (sectionName) {
        case 'welcome':
            animateWelcomeSection();
            break;
        case 'message':
            animateMessageSection();
            break;
        case 'gallery':
            animateGallerySection();
            break;
        case 'memories':
            animateMemoriesSection();
            break;
        case 'wishes':
            animateWishesSection();
            break;
    }
}

function animateWelcomeSection() {
    const elements = document.querySelectorAll('#welcome .main-title, #welcome .subtitle, #welcome .age-display, #welcome .cta-button, #welcome .hero-image');
    elements.forEach((el, index) => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = `fadeInUp 1s ease-out ${index * 0.3}s both`;
    });
}

function animateMessageSection() {
    const cake = document.querySelector('.birthday-cake');
    cake.style.animation = 'none';
    cake.offsetHeight;
    cake.style.animation = 'cakeFloat 3s ease-in-out infinite';
}

function animateGallerySection() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateMemoriesSection() {
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

function animateWishesSection() {
    const wishCards = document.querySelectorAll('.wish-card');
    wishCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate final message
    const finalMessage = document.querySelector('.final-message');
    finalMessage.style.opacity = '0';
    finalMessage.style.transform = 'scale(0.9)';
    setTimeout(() => {
        finalMessage.style.transition = 'all 0.8s ease';
        finalMessage.style.opacity = '1';
        finalMessage.style.transform = 'scale(1)';
    }, 800);
}

// Utility functions for smooth animations
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Auto-advance slideshow for certain sections (optional)
let autoAdvanceInterval;

function startAutoAdvance() {
    autoAdvanceInterval = setInterval(() => {
        if (currentSection === 'gallery') {
            // Auto-advance gallery if no user interaction
            const nextIndex = (currentImageIndex + 1) % galleryImages.length;
            if (lightbox.style.display === 'block') {
                currentImageIndex = nextIndex;
                updateLightboxImage();
            }
        }
    }, 5000);
}

function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
    }
}

// Handle touch events for mobile navigation
let touchStartY = 0;
let touchEndY = 0;



function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - next section
            navigateNext();
        } else {
            // Swipe down - previous section
            navigatePrev();
        }
    }
}

// Preload images for better performance
function preloadImages() {
    galleryImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload when page loads
document.addEventListener('DOMContentLoaded', preloadImages);

// Cleanup function for performance
function cleanup() {
    // Remove old particles and confetti
    const particles = document.querySelectorAll('.particle');
    const confetti = document.querySelectorAll('.confetti');
    
    particles.forEach(particle => {
        if (particle.offsetTop > window.innerHeight + 100) {
            particle.remove();
        }
    });
    
    confetti.forEach(conf => {
        if (conf.offsetTop > window.innerHeight + 100) {
            conf.remove();
        }
    });
}

// Run cleanup periodically
setInterval(cleanup, 10000);

// Handle visibility change to pause/resume animations
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (isPlaying) {
            backgroundMusic.pause();
        }
        stopAutoAdvance();
    } else {
        if (isPlaying) {
            backgroundMusic.play().catch(e => console.log('Audio resume failed:', e));
        }
        startAutoAdvance();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display !== 'block') {
        switch (e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                navigateNext();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigatePrev();
                break;
            case '1':
                navigateToSection('welcome');
                break;
            case '2':
                navigateToSection('message');
                break;
            case '3':
                navigateToSection('gallery');
                break;
            case '4':
                navigateToSection('memories');
                break;
            case '5':
                navigateToSection('wishes');
                break;
            case 'm':
            case 'M':
                toggleMusic();
                break;
        }
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Birthday website loaded with age 20! 🎉');
    startAutoAdvance();
});
