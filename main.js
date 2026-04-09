document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Matrix Digital Rain Effect for Background
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(3, 3, 3, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0'; 
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 50);

    // 2. Initial Page Load Animation (Hero Section)
    const heroTl = gsap.timeline();

    heroTl.from('.nav-anim', { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
          .from('.block-reveal', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.5")
          .from('.hero-img', { scale: 0.9, opacity: 0, filter: "blur(10px)", duration: 1, ease: "power3.out" }, "-=0.6");

    // 3. Reusable ScrollTrigger function
    const animateSection = (triggerClass, yOffset) => {
        gsap.from(triggerClass, {
            scrollTrigger: {
                trigger: triggerClass,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: yOffset,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        });
    };

    // Initialize Scroll Animations
    animateSection('.section-title', 30);
    animateSection('.cyber-card', 50);
    animateSection('.exp-item', 30);
    
    // Contact Box specific animation
    gsap.from('.contact-box', {
        scrollTrigger: {
            trigger: '#contact',
            start: "top 80%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});