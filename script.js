// Variables pour la détection du scroll direction sur mobile
let lastScrollTop = 0;
let isScrolling = false;
const nav = document.querySelector('nav');
const isMobile = () => window.innerWidth <= 768;

// Fonction pour gérer l'affichage/masquage de la navbar
function handleNavbarScroll() {
    if (!isMobile()) return; // Ne s'applique que sur mobile
    
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Éviter les micro-mouvements
    if (Math.abs(lastScrollTop - currentScroll) <= 5) return;
    
    // Si on descend ET qu'on a dépassé la hauteur de la navbar
    if (currentScroll > lastScrollTop && currentScroll > nav.offsetHeight) {
        // Scroll vers le bas - cacher la navbar
        nav.classList.add('nav-hidden');
    } else if (currentScroll < lastScrollTop) {
        // Scroll vers le haut - montrer la navbar
        nav.classList.remove('nav-hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Pour Safari mobile
}

// Optimisation avec requestAnimationFrame
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            handleNavbarScroll();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Réinitialiser lors du redimensionnement
window.addEventListener('resize', () => {
    if (!isMobile()) {
        nav.classList.remove('nav-hidden');
    }
});

// Animation au scroll pour les sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation à toutes les sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Animation supplémentaire pour les cartes au survol
document.addEventListener('DOMContentLoaded', () => {
    // Animation des cartes horaires
    const scheduleCards = document.querySelectorAll('.schedule-card');
    scheduleCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Animation des étapes d'adhésion
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'scale(1)';
        }, index * 200);
    });

    // Animation des cartes de contact
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Corriger le problème d'état active sur mobile
    if (isMobile()) {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            // Supprimer l'état :active après le touch
            link.addEventListener('touchend', function() {
                this.blur(); // Enlever le focus
                setTimeout(() => {
                    this.classList.remove('active');
                }, 100);
            });
            
            // Gérer les clics normaux
            link.addEventListener('click', function() {
                if (isMobile()) {
                    this.blur(); // Enlever le focus immédiatement
                }
            });
        });
    }
});

// Effet de surbrillance sur le menu lors du scroll (amélioré)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    // Nettoyer tous les états actifs d'abord
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Sur mobile, forcer la suppression de l'état :active
        if (isMobile()) {
            link.blur();
        }
    });
    
    // Appliquer l'état actif au lien correspondant
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});
