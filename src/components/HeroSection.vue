<template>
    <section id="hero-section" class="relative py-20 bg-gray-900 text-white text-center flex items-center justify-center min-h-screen overflow-hidden">
      <canvas id="particle-canvas" class="particle-canvas"></canvas>
  
      <div class="relative z-10 container mx-auto px-4 max-w-4xl hero-content">
        <h1 class="text-6xl md:text-7xl font-extrabold mb-4">
          <span id="name-text" class="text-blue-500">MUHAMMAD FIKRI BAIHAQI</span>
        </h1>
        <p id="tagline-text" class="text-2xl md:text-3xl font-light leading-relaxed mb-10 min-h-[4rem]">Loading...</p>
  
        <div id="button-container" class="flex flex-col sm:flex-row justify-center gap-6">
          <NuxtLink
            to="/projects"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform hover:scale-105"
          >
            Lihat Proyek
          </NuxtLink>
          <a
            href="https://drive.google.com/file/d/1WR4Dq0el-_uHTK3QQn9ORF8x4C6w-U8T/view?usp=sharing"
            download
            class="inline-block border-2 border-white hover:border-blue-500 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform hover:scale-105"
          >
            Unduh CV
          </a>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted } from "vue";
  import gsap from "gsap";
  import { Observer } from "gsap/Observer";
  
  let particles = [];
  let dustParticles = [];
  let mouse = { x: 0, y: 0 };
  let canvas, ctx, dustCanvas, dustCtx;
  let animationFrameId;
  let scrollObserver;
  let isTransitioning = false;
  
  // === Particle System ===
  const createParticles = () => {
    particles = [];
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  };
  
  const resizeCanvas = () => {
    if (!canvas || typeof window === 'undefined') return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    if (dustCanvas) {
      dustCanvas.width = window.innerWidth;
      dustCanvas.height = window.innerHeight;
    }
    
    createParticles();
  };
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.baseSize = this.size;
      this.baseColor = { r: 255, g: 255, b: 255, a: 0.6 };
      this.color = `rgba(${this.baseColor.r}, ${this.baseColor.g}, ${this.baseColor.b}, ${this.baseColor.a})`;
    }
  
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
  
      if (!canvas) return; // Guard for SSR
      if (this.x + this.size > canvas.width || this.x - this.size < 0) this.speedX *= -1;
      if (this.y + this.size > canvas.height || this.y - this.size < 0) this.speedY *= -1;
  
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      const attractionRadius = 150;
      const repulsionRadius = 50;
  
      if (distance < attractionRadius) {
        const factor = 1 - distance / attractionRadius;
        this.size = this.baseSize + 5 * factor;
        this.color = `rgba(${this.baseColor.r},${this.baseColor.g},${this.baseColor.b},${this.baseColor.a + (0.9 - this.baseColor.a) * factor})`;
        this.x += dx * 0.005;
        this.y += dy * 0.005;
      } else {
        this.size = this.baseSize;
        this.color = `rgba(${this.baseColor.r},${this.baseColor.g},${this.baseColor.b},${this.baseColor.a})`;
      }
  
      if (distance < repulsionRadius) {
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * (repulsionRadius - distance) * 0.1;
        this.y -= Math.sin(angle) * (repulsionRadius - distance) * 0.1;
      }
    }
  
    draw() {
      if (!ctx) return; // Guard for SSR
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  const animateParticles = () => {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    
    // Animate dust particles
    animateDustParticles();
    
    animationFrameId = requestAnimationFrame(animateParticles);
  };
  
  const handleMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  // === Dust Particle System ===
  class DustParticle {
    constructor(x, y, color = 'rgba(59, 130, 246, 0.8)') {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 3; // Reduced speed for smoother effect
      this.vy = (Math.random() - 0.5) * 3;
      this.life = 1;
      this.decay = Math.random() * 0.015 + 0.008; // Faster decay
      this.size = Math.random() * 2.5 + 0.8; // Slightly smaller particles
      this.color = color;
      this.gravity = 0.04; // Slightly stronger gravity
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.life -= this.decay;
      this.vx *= 0.98; // Faster deceleration
      this.vy *= 0.98;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  const createDustExplosion = (element, direction = 'down') => {
    if (!dustCanvas || !dustCtx) return;
    
    const rect = element.getBoundingClientRect();
    const particleCount = 150;
    const colors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(96, 165, 250, 0.8)', 
      'rgba(147, 197, 253, 0.8)',
      'rgba(255, 255, 255, 0.6)'
    ];

    // Create dust particles from element bounds
    for (let i = 0; i < particleCount; i++) {
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const particle = new DustParticle(x, y, color);
      
      // Adjust particle movement based on scroll direction
      if (direction === 'down') {
        particle.vy = Math.random() * 3 + 1; // Particles fall down
        particle.vx = (Math.random() - 0.5) * 6;
      } else {
        particle.vy = -(Math.random() * 3 + 1); // Particles rise up
        particle.vx = (Math.random() - 0.5) * 6;
      }
      
      dustParticles.push(particle);
    }

    // Add screen shake effect
    gsap.to(element, {
      x: '+=5',
      yoyo: true,
      repeat: 5,
      duration: 0.1,
      ease: 'power2.inOut'
    });
  };

  const animateDustParticles = () => {
    if (!dustCtx || !dustCanvas) return;
    
    dustCtx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
    
    dustParticles = dustParticles.filter(particle => {
      particle.update();
      particle.draw(dustCtx);
      return !particle.isDead();
    });
  };

  const setupScrollObserver = () => {
    let lastScrollY = 0;
    let scrollDirection = 'down';
    
    scrollObserver = Observer.create({
      target: typeof window !== 'undefined' ? window : null,
      type: 'scroll,touch',
      onChangeY: (self) => {
        if (isTransitioning || typeof window === 'undefined') return;
        
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
        
        const heroSection = document.getElementById('hero-section');
        const aboutSection = document.querySelector('#about-section, section:nth-of-type(2)');
        
        if (!heroSection) return;
        
        const heroRect = heroSection.getBoundingClientRect();
        const scrollThreshold = window.innerHeight * 0.5; // Reduced threshold for faster response
        
        // Check if we're scrolling past the hero section
        if (scrollDirection === 'down' && heroRect.bottom < scrollThreshold) {
          if (!heroSection.classList.contains('dissolving')) {
            isTransitioning = true;
            heroSection.classList.add('dissolving');
            
            // Create dust explosion
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
              createDustExplosion(heroContent, 'down');
            }
            
            // Clean dissolve animation without glitch effects
            gsap.to(heroContent, {
              opacity: 0,
              scale: 0.9,
              filter: 'blur(6px)',
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => {
                setTimeout(() => {
                  isTransitioning = false;
                }, 100);
              }
            });
          }
        }
        
        // Check if we're scrolling back up to hero section with faster response
        else if (scrollDirection === 'up' && heroRect.top > -(window.innerHeight * 0.2)) { // More responsive threshold
          if (heroSection.classList.contains('dissolving')) {
            isTransitioning = true;
            heroSection.classList.remove('dissolving');
            
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
              // Create reformation effect
              createDustExplosion(heroContent, 'up');
              
              // Clean reform animation without glitch effects
              gsap.to(heroContent, {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                  setTimeout(() => {
                    isTransitioning = false;
                  }, 100);
                }
              });
            }
          }
        }
      }
    });
  };
  
  // === Text Animations ===
  
  const setupClientSideEffects = () => {
    console.log("Component mounted");
    
    // Check if mobile device
    const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
    
    // Canvas setup (desktop only)
    if (!isMobile) {
      canvas = document.getElementById("particle-canvas");
      dustCanvas = document.getElementById("dust-canvas");
      
      if (canvas) {
        ctx = canvas.getContext("2d");
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);
        animateParticles();
        console.log("Particle system initialized");
      }
      
      if (dustCanvas) {
        dustCtx = dustCanvas.getContext("2d");
        console.log("Dust canvas initialized");
      }
      
      // Setup scroll observer for dust effects (desktop only)
      setupScrollObserver();
    }
  
    // Wait a bit for DOM to be ready
    setTimeout(() => {
      console.log("Starting text animations");
      
      // Get all relevant elements
      const nameTextElement = document.getElementById("name-text");
      const taglineTextElement = document.getElementById("tagline-text");
      const buttonContainer = document.getElementById("button-container");
  
      console.log("Elements found:", {
        nameTextElement: !!nameTextElement,
        taglineTextElement: !!taglineTextElement,
        buttonContainer: !!buttonContainer
      });
  
      if (!nameTextElement || !taglineTextElement || !buttonContainer) {
        console.error("Required elements not found");
        return;
      }
  
      // Taglines for the typing effect
      const taglines = [
        "Aku bukan wajah di layar, aku bayangan di balik setiap klik.",
        "Antarmuka adalah ilusi, backend adalah kenyataan yang kugenggam.", 
        "Jika frontend adalah panggung, maka aku adalah dalang di balik tirai."
      ];
  
      if (isMobile) {
        // Simple mobile version - no complex animations
        nameTextElement.textContent = "MUHAMMAD FIKRI BAIHAQI";
        taglineTextElement.textContent = taglines[0];
        
        // Simple fade in
        gsap.set([nameTextElement, taglineTextElement, buttonContainer], { opacity: 0 });
        gsap.to([nameTextElement, taglineTextElement, buttonContainer], {
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out"
        });
        
        // Simple tagline cycling (no character animation)
        let currentIndex = 0;
        setInterval(() => {
          currentIndex = (currentIndex + 1) % taglines.length;
          gsap.to(taglineTextElement, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              taglineTextElement.textContent = taglines[currentIndex];
              gsap.to(taglineTextElement, { opacity: 1, duration: 0.3 });
            }
          });
        }, 3000);
        
        return;
      }
  
      // Desktop animations (keep existing complex animations)
      // Setup name with individual character spans
      const name = "MUHAMMAD FIKRI BAIHAQI";
      nameTextElement.innerHTML = "";
      
      for (let i = 0; i < name.length; i++) {
        const span = document.createElement('span');
        span.textContent = name.charAt(i);
        span.style.opacity = '0';
        nameTextElement.appendChild(span);
      }
  
      console.log("Name spans created:", nameTextElement.children.length);
  
      // Start animations immediately - no initial hiding
      gsap.set(nameTextElement.children, { opacity: 0, y: 20 });
      gsap.set(taglineTextElement, { opacity: 0, y: 20 });
      gsap.set(buttonContainer, { opacity: 0, y: 20 });
  
      console.log("Initial states set");
  
      // Create timeline
      const tl = gsap.timeline();
  
      // Function to animate the name typing and deleting effect
      const animateNameSequence = () => {
        const nameTl = gsap.timeline({ repeat: -1, repeatDelay: 3 }); // Loop indefinitely with 3-second delay
  
        // Animate name characters in
        nameTl.to(nameTextElement.children, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          onComplete: () => console.log("Name animation complete")
        });
  
        // Animate name characters out after a delay
        nameTl.to(nameTextElement.children, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.in",
          delay: 3, // Wait 3 seconds after appearing before deleting
          onComplete: () => console.log("Name animation out complete")
        });
      };
  
      // Initial animation for tagline and buttons
      tl.to(taglineTextElement, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => console.log("Tagline container shown")
      }, "+=0.5"); // Delay after name starts
  
      tl.to(buttonContainer, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => console.log("Buttons shown")
      }, "+=1"); // Delay after tagline shown
  
      // Start the name animation loop
      animateNameSequence();
  
      // Start tagline cycling
      let currentIndex = 0;
      
      const cycleTagline = () => {
        console.log("Cycling tagline to index:", currentIndex);
        const currentTagline = taglines[currentIndex];
        
        // Clear and setup new tagline
        taglineTextElement.innerHTML = "";
        for (let i = 0; i < currentTagline.length; i++) {
          const span = document.createElement('span');
          span.textContent = currentTagline.charAt(i);
          span.style.opacity = '0';
          taglineTextElement.appendChild(span);
        }
  
        // Animate in
        gsap.fromTo(taglineTextElement.children, 
          { opacity: 0, y: 10 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: "power1.out",
            onComplete: () => {
              // Wait then animate out
              setTimeout(() => {
                gsap.to(taglineTextElement.children, {
                  opacity: 0,
                  y: -10,
                  duration: 0.2,
                  stagger: 0.01,
                  ease: "power1.in",
                  onComplete: () => {
                    currentIndex = (currentIndex + 1) % taglines.length;
                    setTimeout(cycleTagline, 300);
                  }
                });
              }, 2000);
            }
          }
        );
      };
  
      // Start tagline cycle after initial animations
      setTimeout(() => {
        console.log("Starting tagline cycle");
        cycleTagline();
      }, 2000);
  
    }, 100); // Small delay to ensure DOM is ready
  };
  
  onMounted(() => {
    if (process.client) {
      setupClientSideEffects();
    }
  });
  
  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    if (scrollObserver) {
      scrollObserver.kill();
    }
    
    // Only remove listeners if they were added (desktop only)
    if (process.client && typeof window !== 'undefined' && window.innerWidth > 768) {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    }
  });
  </script>
  
  <style scoped>
  /* Press Start 2P Font Family */
  #hero-section,
  #hero-section * {
    font-family: 'Press Start 2P', 'Press Start 2P Fallback', monospace;
  }
  
  .particle-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .dust-canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 15;
    pointer-events: none;
  }
  
  /* Mobile optimizations */
  @media (max-width: 768px) {
    .particle-canvas,
    .dust-canvas {
      display: none; /* Hide canvas on mobile for performance */
    }
    
    #hero-section {
      padding: 3rem 1rem; /* Reduce padding */
      min-height: 80vh; /* Reduce height */
    }
    
    .hero-content h1 {
      font-size: 2.5rem; /* Smaller text */
      line-height: 1.1;
    }
    
    .hero-content p {
      font-size: 1.1rem; /* Smaller tagline */
      min-height: 2rem;
    }
    
    #button-container {
      flex-direction: column;
      gap: 1rem;
    }
    
    #button-container a {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .hero-content h1 {
      font-size: 2rem;
    }
    
    .hero-content p {
      font-size: 1rem;
    }
  }
  </style>