/**
 * Dream AI - Complete Integrated Script
 * Includes: Glass Header, Smooth Scroll, Active Link Tracking, & Staggered Reveal
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. FROSTED GLASS HEADER EFFECT
    const header = document.querySelector("header");

    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            // State: Scrolled - Slightly darker, high blur
            header.style.background = "rgba(0, 0, 0, 0.7)"; 
            header.style.backdropFilter = "blur(15px)";
            header.style.webkitBackdropFilter = "blur(15px)"; 
            header.style.borderBottom = "1px solid rgba(0, 212, 255, 0.2)";
            header.style.padding = "15px 8%"; // Slightly shrinks header on scroll
        } else {
            // State: Top - Very transparent, light blur
            header.style.background = "rgba(0, 0, 0, 0.3)";
            header.style.backdropFilter = "blur(10px)";
            header.style.webkitBackdropFilter = "blur(10px)";
            header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
            header.style.padding = "20px 8%";
        }
    };

    window.addEventListener("scroll", handleHeaderScroll);


    // 2. ACTIVE LINK TRACKING (SCROLL SPY)
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    const scrollSpy = () => {
        let current = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            // Triggers highlight when section is 150px from the top
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", scrollSpy);


    // 3. SMOOTH SCROLLING FOR BUTTONS & LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // 4. STAGGERED REVEAL ANIMATIONS (Intersection Observer)
    // This makes content "materialize" as you scroll to it
    const revealElements = document.querySelectorAll(".service-box, .portfolio-card, .contact-card");

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                // Stop observing once the animation has played
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // 5. INITIALIZE ON LOAD
    // Runs these once immediately in case user refreshes in the middle of the page
    handleHeaderScroll();
    scrollSpy();
});