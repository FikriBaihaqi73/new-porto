<template>
    <section class="relative py-20 bg-gray-900 text-white text-center flex items-center justify-center min-h-screen overflow-hidden">
      <canvas id="particle-canvas" class="particle-canvas"></canvas>
  
      <div class="relative z-10 container mx-auto px-4 max-w-4xl">
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
            href="/resume.pdf"
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
  
  let particles = [];
  let mouse = { x: 0, y: 0 };
  let canvas, ctx;
  let animationFrameId;
  
  // === Particle System ===
  const createParticles = () => {
    particles = [];
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  };
  
  const resizeCanvas = () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
    animationFrameId = requestAnimationFrame(animateParticles);
  };
  
  const handleMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };
  
  // === Text Animations ===
  onMounted(() => {
    console.log("Component mounted");
    
    // Canvas setup
    canvas = document.getElementById("particle-canvas");
    if (canvas) {
      ctx = canvas.getContext("2d");
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("mousemove", handleMouseMove);
      animateParticles();
      console.log("Particle system initialized");
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
  });
  
  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("mousemove", handleMouseMove);
  });
  </script>
  
  <style scoped>
  .particle-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  </style>