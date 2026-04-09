// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Initial Page Load Animation (Hero Section)
const heroTl = gsap.timeline();

// Fade down the nav bar
heroTl.from('.nav-anim', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

// Stagger reveal the text blocks
heroTl.from('.block-reveal', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.7)"
}, "-=0.5");

// Pop in the profile image
heroTl.from('.hero-img', {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: "elastic.out(1, 0.5)"
}, "-=0.8");

// 2. Scroll Animations (Skills Section)
gsap.from('.skill-card', {
    scrollTrigger: {
        trigger: '.skill-grid',
        start: "top 80%",
    },
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.2)"
});

// 3. Scroll Animations (Experience Timeline)
gsap.from('.exp-item', {
    scrollTrigger: {
        trigger: '.exp-timeline',
        start: "top 80%",
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: "power3.out"
});

// 4. Scroll Animations (Projects Section)
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.project-grid',
        start: "top 75%",
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.2)"
});

// 5. Scroll Animation (Contact Form)
gsap.from('.contact-box', {
    scrollTrigger: {
        trigger: '#contact',
        start: "top 80%",
    },
    scale: 0.9,
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

// 6. Subtle Floating Mouse Effect for Hero Image
document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    
    gsap.to('.hero-img', {
        x: x,
        y: y,
        duration: 1,
        ease: "power1.out"
    });
});