<template>
  <footer id="footer-section" class="relative bg-gray-900 text-white border-t-2 border-blue-500 overflow-hidden">
    <!-- Animated Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="grid-pattern"></div>
    </div>

    <!-- Main Footer Content -->
    <div class="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
      <!-- Top Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        
        <!-- Brand Section -->
        <div class="lg:col-span-2 footer-animate brand-section">
          <div class="bg-gray-800 border border-blue-600 rounded-lg p-6 shadow-lg">
            <h3 class="text-2xl font-bold text-blue-400 font-outfit mb-4">[ SYSTEM INFO ]</h3>
            <div class="space-y-2 font-mono text-sm">
              <p class="text-green-400">STATUS: <span class="text-white">ONLINE</span></p>
              <p class="text-green-400">VERSION: <span class="text-white">2024.1.0</span></p>
              <p class="text-green-400">UPTIME: <span class="text-white" ref="uptimeDisplay">00:00:00</span></p>
              <p class="text-green-400">LOCATION: <span class="text-white">Indonesia</span></p>
            </div>
            <div class="mt-4 p-3 bg-gray-700 rounded border border-blue-500">
              <p class="text-blue-300 text-sm font-inter">
                "Code is like humor. When you have to explain it, it's bad." - Cory House
              </p>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-animate quick-links">
          <div class="bg-gray-800 border border-blue-600 rounded-lg p-6 shadow-lg h-full">
            <h4 class="text-xl font-bold text-blue-400 font-outfit mb-4">[ NAVIGATION ]</h4>
            <nav class="space-y-3">
              <a href="#hero-section" class="nav-link block text-gray-300 hover:text-blue-400 transition-colors font-mono text-sm">
                → Home
              </a>
              <a href="#about-section" class="nav-link block text-gray-300 hover:text-blue-400 transition-colors font-mono text-sm">
                → About
              </a>
              <a href="#projects-section" class="nav-link block text-gray-300 hover:text-blue-400 transition-colors font-mono text-sm">
                → Projects
              </a>
              <a href="#contact" class="nav-link block text-gray-300 hover:text-blue-400 transition-colors font-mono text-sm">
                → Contact
              </a>
            </nav>
          </div>
        </div>

        <!-- Social & Contact -->
        <div class="footer-animate social-section">
          <div class="bg-gray-800 border border-blue-600 rounded-lg p-6 shadow-lg h-full">
            <h4 class="text-xl font-bold text-blue-400 font-outfit mb-4">[ CONNECT ]</h4>
            <div class="space-y-4">
              <!-- Social Links -->
              <div class="space-y-3">
                <a href="#" class="social-link flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all duration-200 group">
                  <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                  <span class="font-mono text-sm">Twitter</span>
                </a>

                <a href="#" class="social-link flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all duration-200 group">
                  <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span class="font-mono text-sm">LinkedIn</span>
                </a>

                <a href="#" class="social-link flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all duration-200 group">
                  <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <span class="font-mono text-sm">GitHub</span>
                </a>
              </div>

              <!-- Contact Info -->
              <div class="pt-4 border-t border-gray-700">
                <p class="text-xs text-gray-400 font-mono mb-2">CONTACT_MODE:</p>
                <a href="mailto:fikri@example.com" class="text-blue-400 hover:text-blue-300 font-mono text-sm block">
                  fikri@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-gray-700 pt-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Copyright -->
          <div class="footer-animate copyright-section">
            <p class="text-gray-400 font-mono text-sm">
              © 2024 M Fikri Baihaqi. All rights reserved.
            </p>
            <p class="text-xs text-gray-500 font-mono mt-1">
              Built with Vue.js • Powered by Coffee ☕
            </p>
          </div>

          <!-- Tech Stack -->
          <div class="footer-animate tech-stack">
            <div class="flex gap-2 flex-wrap">
              <span class="px-2 py-1 bg-gray-700 text-blue-300 rounded text-xs font-mono border border-gray-600">
                Vue.js
              </span>
              <span class="px-2 py-1 bg-gray-700 text-blue-300 rounded text-xs font-mono border border-gray-600">
                Tailwind
              </span>
              <span class="px-2 py-1 bg-gray-700 text-blue-300 rounded text-xs font-mono border border-gray-600">
                GSAP
              </span>
            </div>
          </div>

          <!-- Status Indicator -->
          <div class="footer-animate status-indicator">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-green-400 font-mono text-xs">SYSTEM_ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll to Top Button -->
    <button 
      ref="scrollToTopBtn"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 opacity-0 pointer-events-none z-50"
    >
      <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
    </button>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const uptimeDisplay = ref(null);
const scrollToTopBtn = ref(null);
let startTime = Date.now();
let uptimeInterval;
let scrollObserver;

// Update uptime counter
const updateUptime = () => {
  const now = Date.now();
  const diff = now - startTime;
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  if (uptimeDisplay.value) {
    uptimeDisplay.value.textContent = 
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
};

// Scroll to top function
const scrollToTop = () => {
  if (process.client) {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0 },
      ease: "power2.inOut"
    });
  }
};

// Setup scroll observer for scroll-to-top button
const setupScrollObserver = () => {
  let lastScrollY = 0;
  
  const handleScroll = () => {
    if (typeof window === 'undefined') return;
    const currentScrollY = window.scrollY;
    const shouldShow = currentScrollY > 500; // Show after scrolling 500px
    
    if (scrollToTopBtn.value) {
      if (shouldShow) {
        gsap.to(scrollToTopBtn.value, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(scrollToTopBtn.value, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
    
    lastScrollY = currentScrollY;
  };
  
  if (process.client) {
    window.addEventListener('scroll', handleScroll);
  }
  
  return () => {
    if (process.client) {
      window.removeEventListener('scroll', handleScroll);
    }
  };
};

const setupClientSideFooterEffects = () => {
  // Start uptime counter
  startTime = Date.now();
  updateUptime();
  uptimeInterval = setInterval(updateUptime, 1000);
  
  // Setup scroll observer
  const cleanupScroll = setupScrollObserver();
  
  // Check if mobile device
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  
  if (!isMobile) {
    // Only add animations on desktop
    gsap.set(".footer-animate", { opacity: 0, y: 30 });
    
    // Footer entrance animation
    gsap.to(".brand-section", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".brand-section",
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse"
      }
    });
    
    gsap.to(".quick-links", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.1,
      scrollTrigger: {
        trigger: ".quick-links",
        start: "top 90%",
        end: "bottom 10%", 
        toggleActions: "play reverse play reverse"
      }
    });
    
    gsap.to(".social-section", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: ".social-section",
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse"
      }
    });
    
    gsap.to(".copyright-section", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.3,
      scrollTrigger: {
        trigger: ".copyright-section", 
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse"
      }
    });
    
    gsap.to(".tech-stack", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out", 
      delay: 0.4,
      scrollTrigger: {
        trigger: ".tech-stack",
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse"
      }
    });
    
    gsap.to(".status-indicator", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.5,
      scrollTrigger: {
        trigger: ".status-indicator",
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse"
      }
    });
  }
  // Mobile: Elements are visible immediately
  
  onUnmounted(() => {
    if (uptimeInterval) {
      clearInterval(uptimeInterval);
    }
    
    if (cleanupScroll) {
      cleanupScroll();
    }
    
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  });
};

onMounted(() => {
  if (process.client) {
    setupClientSideFooterEffects();
  }
});
</script>

<style scoped>
/* Font families */
.font-outfit {
  font-family: 'Press Start 2P', 'Press Start 2P Fallback', monospace;
}

.font-inter {
  font-family: 'Press Start 2P', 'Press Start 2P Fallback', monospace;
}

.font-mono {
  font-family: 'Press Start 2P', 'Press Start 2P Fallback', monospace;
}

/* Grid background pattern */
.grid-pattern {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(20px, 20px); }
}

/* Hover effects */
.nav-link:hover {
  transform: translateX(5px);
}

.social-link:hover {
  transform: translateX(3px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .lg\:col-span-2 {
    grid-column: span 1;
  }
  
  /* Simplify mobile layout */
  .container {
    padding: 2rem 1rem;
  }
  
  .bg-gray-800 {
    padding: 1rem;
  }
  
  /* Hide complex animations on mobile */
  .grid-pattern {
    display: none;
  }
  
  /* Larger touch targets */
  .nav-link,
  .social-link {
    padding: 0.75rem 0;
    font-size: 0.9rem;
  }
  
  /* Stack items vertically on mobile */
  .flex.flex-col.md\:flex-row {
    gap: 1.5rem;
  }
  
  .tech-stack .flex {
    justify-content: center;
  }
  
  /* Simplify scroll to top button */
  .fixed.bottom-6.right-6 {
    bottom: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1.5rem 0.75rem;
  }
  
  .text-2xl {
    font-size: 1.25rem;
  }
  
  .text-xl {
    font-size: 1rem;
  }
}
</style>