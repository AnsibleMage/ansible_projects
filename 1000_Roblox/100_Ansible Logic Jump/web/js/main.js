/* ==============================================
   Ansible Logic Jump — Forest Sprint Premium
   Main JavaScript (Vanilla, No Dependencies)
   ============================================== */

(function () {
    'use strict';

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const SCROLL_THRESHOLD = 50;

    function handleNavbarScroll() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Smooth scroll with navbar offset ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            var navHeight = navbar.offsetHeight;
            var targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        });
    });

    // --- Scroll animations (IntersectionObserver) ---
    var fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all immediately
        fadeElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Particle System (Falling Leaves) ---
    var canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var PARTICLE_COUNT = 40;
    var animationId = null;

    // Check for reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas() {
        var hero = document.getElementById('hero');
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Green shades for leaves
    var leafColors = [
        'rgba(58, 125, 21, 0.6)',
        'rgba(51, 128, 51, 0.5)',
        'rgba(80, 160, 40, 0.4)',
        'rgba(100, 180, 60, 0.3)',
        'rgba(191, 204, 191, 0.2)'
    ];

    function createParticle() {
        return {
            x: randomRange(0, canvas.width),
            y: randomRange(-canvas.height * 0.1, 0),
            size: randomRange(3, 8),
            speedY: randomRange(0.3, 1.2),
            speedX: randomRange(-0.5, 0.5),
            drift: randomRange(0.5, 2),
            driftSpeed: randomRange(0.005, 0.02),
            angle: randomRange(0, Math.PI * 2),
            rotation: randomRange(0, Math.PI * 2),
            rotationSpeed: randomRange(-0.02, 0.02),
            color: leafColors[Math.floor(Math.random() * leafColors.length)],
            opacity: randomRange(0.3, 0.8)
        };
    }

    function initParticles() {
        particles = [];
        for (var i = 0; i < PARTICLE_COUNT; i++) {
            var p = createParticle();
            // Spread initial Y across canvas
            p.y = randomRange(0, canvas.height);
            particles.push(p);
        }
    }

    function drawLeaf(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Simple leaf shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function updateParticle(p) {
        p.angle += p.driftSpeed;
        p.x += p.speedX + Math.sin(p.angle) * p.drift * 0.3;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Reset when below canvas
        if (p.y > canvas.height + p.size) {
            p.y = -p.size * 2;
            p.x = randomRange(0, canvas.width);
            p.opacity = randomRange(0.3, 0.8);
        }

        // Wrap horizontally
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function (p) {
            updateParticle(p);
            drawLeaf(p);
        });

        animationId = requestAnimationFrame(animate);
    }

    // Only run particles if motion is allowed
    if (!prefersReducedMotion) {
        resizeCanvas();
        initParticles();
        animate();

        window.addEventListener('resize', function () {
            resizeCanvas();
            initParticles();
        });
    }

    // Listen for motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (e) {
        if (e.matches) {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            resizeCanvas();
            initParticles();
            animate();
        }
    });
})();
