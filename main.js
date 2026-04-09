document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Matrix Background
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
        ctx.fillStyle = '#00ff41'; 
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

    // Hero Load
    const heroTl = gsap.timeline();
    heroTl.from('.nav-anim', { y: -100, opacity: 0, duration: 1.2, ease: "power4.out" })
          .from('.block-reveal', { y: 50, scale: 0.8, opacity: 0, duration: 1, stagger: 0.15, ease: "elastic.out(1, 0.7)" }, "-=0.8")
          .from('.hero-img', { scale: 0.5, rotationY: 45, opacity: 0, filter: "blur(20px)", duration: 1.5, ease: "power3.out" }, "-=1");

    // 3D Tilt (For standard tilt cards)
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            gsap.to(card, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, duration: 0.4, ease: "power2.out" });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        });
    });

    // Scroll Triggers
    const animateSection = (triggerClass, yOffset) => {
        gsap.from(triggerClass, {
            scrollTrigger: {
                trigger: triggerClass,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: yOffset,
            scale: 0.9,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.5)"
        });
    };

    animateSection('.section-title', 50);
    animateSection('.cyber-card', 100);
    animateSection('.exp-item', 60);
    
    // CONTACT FORM VISIBILITY FIX
    gsap.from('.contact-box', {
        scrollTrigger: {
            trigger: '#contact',
            start: "top 95%", 
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // --- NEW: MAGNETIC MOUSE FOLLOW FOR HERO IMAGE ---
    const heroImgContainer = document.querySelector('.magnetic-box');
    const heroSection = document.getElementById('home');

    if (heroImgContainer && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Normalize coordinates (-1 to 1)
            const moveX = (e.clientX - centerX) / (rect.width / 2);
            const moveY = (e.clientY - centerY) / (rect.height / 2);
            
            gsap.to(heroImgContainer, {
                x: moveX * 25, 
                y: moveY * 25,
                rotationY: moveX * 12,
                rotationX: -moveY * 12,
                transformPerspective: 1000,
                ease: "power2.out",
                duration: 0.5
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            gsap.to(heroImgContainer, {
                x: 0,
                y: 0,
                rotationY: 0,
                rotationX: 0,
                ease: "elastic.out(1, 0.4)",
                duration: 1
            });
        });
    }
});