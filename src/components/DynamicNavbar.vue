<template>
  <nav class="dynamic-navbar">
    <!-- Dynamic Island (collapsed state) -->
    <div 
      :class="[
        'dynamic-island',
        isExpanded ? 'expanded' : 'collapsed'
      ]"
      @click="toggleNavbar"
    >
      <!-- Collapsed Content -->
      <div v-if="!isExpanded" class="island-content">
        <div class="island-orb"></div>
        <span class="island-text">Menu</span>
        <div class="island-runes">
          <span class="rune">⚡</span>
          <span class="rune">✦</span>
        </div>
      </div>

      <!-- Expanded Navigation -->
      <div v-if="isExpanded" class="expanded-nav">
        <!-- Close Button -->
        <button @click.stop="closeNavbar" class="close-btn">
          <span class="close-icon">✕</span>
        </button>

        <!-- Fantasy Header -->
        <div class="nav-header">
          <div class="magic-circle">
            <div class="inner-circle"></div>
            <div class="rune-ring">
              <span class="floating-rune">⚡</span>
              <span class="floating-rune">✦</span>
              <span class="floating-rune">◆</span>
              <span class="floating-rune">※</span>
            </div>
          </div>
          <h3 class="nav-title">Portal Navigation</h3>
          <p class="nav-subtitle">Choose your path, adventurer</p>
        </div>

        <!-- Navigation Items -->
        <ul class="nav-items">
          <li class="nav-item">
            <a href="/#hero-section" @click="navigateAndClose($event, false)" class="nav-link">
              <span class="nav-text">Home</span>
              <div class="nav-effect"></div>
            </a>
          </li>
          <li class="nav-item">
            <a href="/#about-section" @click="navigateAndClose($event, false)" class="nav-link">
              <span class="nav-text">About</span>
              <div class="nav-effect"></div>
            </a>
          </li>
          <li class="nav-item">
            <a href="/#projects-section" @click="navigateAndClose($event, false)" class="nav-link">
              <span class="nav-text">Projects</span>
              <div class="nav-effect"></div>
            </a>
          </li>
          <li class="nav-item">
            <NuxtLink to="/projects" @click="navigateAndClose($event, true)" class="nav-link">
              <span class="nav-text">All Projects</span>
              <div class="nav-effect"></div>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <a href="/#footer-section" @click="navigateAndClose($event, false)" class="nav-link">
              <span class="nav-text">Contact</span>
              <div class="nav-effect"></div>
            </a>
          </li>
        </ul>

        <!-- Fantasy Footer -->
        <div class="nav-footer">
          <div class="mana-bar">
            <div class="mana-fill"></div>
          </div>
          <span class="status-text">Navigation Portal Active</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register GSAP plugins
if (process.client) {
  gsap.registerPlugin(ScrollToPlugin)
}

const isExpanded = ref(false)

const toggleNavbar = () => {
  isExpanded.value = !isExpanded.value
  
  // Prevent body scroll when expanded
  if (process.client) {
    if (isExpanded.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
}

const closeNavbar = () => {
  isExpanded.value = false
  if (process.client) {
    document.body.style.overflow = ''
  }
}

const navigateAndClose = async (event, isPageChange = false) => {
  const currentRoute = useRoute()
  const router = useRouter()
  
  if (isPageChange) {
    // Teleportation effect for page changes
    createTeleportationEffect()
    setTimeout(() => {
      closeNavbar()
    }, 600) // Wait for teleportation effect
  } else {
    // Handle navigation based on current page
    event.preventDefault() // Always prevent default for anchor links
    
    const target = event.target.closest('a')
    const href = target?.getAttribute('href')
    
    if (href && href.includes('#')) {
      const sectionId = href.split('#')[1]
      
      // Check if we're on projects page and need to go to home
      if (currentRoute.path === '/projects') {
        // Navigate to home page first, then scroll to section
        createTeleportationEffect()
        closeNavbar() // Close navbar immediately
        
        setTimeout(async () => {
          await router.push('/')
          
          // Wait for page to load and DOM to be ready
          await nextTick()
          
          setTimeout(() => {
            const section = document.getElementById(sectionId)
            if (section) {
              // Smooth scroll with GSAP
              if (process.client) {
                gsap.to(window, {
                  duration: 1.2,
                  scrollTo: {
                    y: section.offsetTop - 80, // Account for navbar height
                    autoKill: false
                  },
                  ease: "power2.inOut"
                })
              }
            }
          }, 200)
        }, 500)
        
        return
      } else {
        // Same page navigation - smooth scroll
        const section = document.getElementById(sectionId)
        
        if (section) {
          // Enhanced smooth scroll with GSAP
          if (process.client) {
            gsap.to(window, {
              duration: 1.2,
              scrollTo: {
                y: section.offsetTop - 80, // Account for navbar height
                autoKill: false
              },
              ease: "power2.inOut"
            })
          }
        }
        
        setTimeout(() => {
          closeNavbar()
        }, 300)
      }
    }
  }
}

const createTeleportationEffect = () => {
  // Create teleportation visual effect
  const navbar = document.querySelector('.dynamic-island')
  if (!navbar) return
  
  // Add teleportation classes
  navbar.classList.add('teleporting')
  
  // Create particle burst effect
  createParticleBurst()
  
  // Create screen flash
  createScreenFlash()
  
  // Remove effect after animation
  setTimeout(() => {
    navbar.classList.remove('teleporting')
  }, 800)
}

const createParticleBurst = () => {
  const particleContainer = document.createElement('div')
  particleContainer.className = 'teleport-particles'
  document.body.appendChild(particleContainer)
  
  // Create multiple particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div')
    particle.className = 'teleport-particle'
    particle.style.left = '50%'
    particle.style.top = '50px'
    
    // Random direction and distance
    const angle = (i / 20) * Math.PI * 2
    const distance = 100 + Math.random() * 200
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance
    
    particle.style.setProperty('--end-x', `${x}px`)
    particle.style.setProperty('--end-y', `${y}px`)
    
    particleContainer.appendChild(particle)
  }
  
  // Remove particles after animation
  setTimeout(() => {
    document.body.removeChild(particleContainer)
  }, 1000)
}

const createScreenFlash = () => {
  const flash = document.createElement('div')
  flash.className = 'teleport-flash'
  document.body.appendChild(flash)
  
  setTimeout(() => {
    flash.classList.add('active')
  }, 100)
  
  setTimeout(() => {
    document.body.removeChild(flash)
  }, 600)
}

// Close on escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isExpanded.value) {
    closeNavbar()
  }
}

onMounted(() => {
  if (process.client) {
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Dynamic Navbar Container */
.dynamic-navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  font-family: 'Press Start 2P', 'Press Start 2P Fallback', monospace;
}

/* Dynamic Island Base */
.dynamic-island {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f172a 100%);
  border: 2px solid #3b82f6;
  border-radius: 25px;
  box-shadow: 
    0 8px 32px rgba(59, 130, 246, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.1),
    0 0 20px rgba(59, 130, 246, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.dynamic-island::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
  transition: left 0.6s;
}

.dynamic-island:hover::before {
  left: 100%;
}

/* Collapsed State */
.dynamic-island.collapsed {
  width: 140px;
  height: 50px;
  border-radius: 25px;
}

.dynamic-island.collapsed:hover {
  transform: scale(1.05);
  box-shadow: 
    0 12px 40px rgba(59, 130, 246, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.1),
    0 0 30px rgba(59, 130, 246, 0.3);
}

/* Expanded State */
.dynamic-island.expanded {
  width: max-content;
  min-width: 500px;
  height: 120px;
  border-radius: 20px;
  cursor: default;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f172a 100%);
}

/* Island Content (Collapsed) */
.island-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 8px;
  padding: 0 16px;
}

.island-orb {
  width: 12px;
  height: 12px;
  background: linear-gradient(45deg, #60a5fa, #3b82f6);
  border-radius: 50%;
  animation: pulse 2s infinite;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
}

.island-text {
  color: #e2e8f0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.island-runes {
  display: flex;
  gap: 4px;
}

.rune {
  color: #60a5fa;
  font-size: 12px;
  animation: float 3s ease-in-out infinite;
}

.rune:nth-child(2) {
  animation-delay: 1s;
}

/* Expanded Navigation */
.expanded-nav {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  gap: 24px;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #ef4444;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.3);
  transform: rotate(90deg);
}

.close-icon {
  color: #ef4444;
  font-size: 12px;
  font-weight: bold;
}

/* Nav Header */
.nav-header {
  text-align: center;
  flex-shrink: 0;
}

.magic-circle {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto 12px;
}

.inner-circle {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  position: relative;
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.5),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);
}

.rune-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  width: 76px;
  height: 76px;
  animation: rotate 10s linear infinite;
}

.floating-rune {
  position: absolute;
  color: #60a5fa;
  font-size: 12px;
  animation: float 2s ease-in-out infinite;
}

.floating-rune:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); }
.floating-rune:nth-child(2) { top: 50%; right: 0; transform: translateY(-50%); animation-delay: 0.5s; }
.floating-rune:nth-child(3) { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 1s; }
.floating-rune:nth-child(4) { top: 50%; left: 0; transform: translateY(-50%); animation-delay: 1.5s; }

.nav-title {
  color: #f1f5f9;
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 2px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.nav-subtitle {
  color: #94a3b8;
  font-size: 10px;
  margin: 0;
  font-style: italic;
}

/* Navigation Items */
.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  background: rgba(30, 64, 175, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #e2e8f0;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.nav-link:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: #3b82f6;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.nav-text {
  font-size: 14px;
  font-weight: 600;
}

.nav-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.nav-link:hover .nav-effect {
  left: 100%;
}

/* Nav Footer */
.nav-footer {
  text-align: center;
  flex-shrink: 0;
}

.mana-bar {
  width: 80px;
  height: 4px;
  background: rgba(30, 64, 175, 0.3);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 6px;
}

.mana-fill {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 2px;
  animation: pulse 2s infinite;
}

.status-text {
  color: #94a3b8;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Teleportation Effects */
.dynamic-island.teleporting {
  animation: teleportPulse 0.8s ease-in-out;
  transform: translateX(-50%) scale(1.2);
  box-shadow: 
    0 0 50px rgba(59, 130, 246, 0.8),
    0 0 100px rgba(59, 130, 246, 0.6),
    0 0 150px rgba(59, 130, 246, 0.4);
}

.teleport-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.teleport-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: linear-gradient(45deg, #60a5fa, #3b82f6);
  border-radius: 50%;
  animation: particleBurst 0.8s ease-out forwards;
  box-shadow: 0 0 6px rgba(59, 130, 246, 0.8);
}

.teleport-flash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  opacity: 0;
  pointer-events: none;
  z-index: 9998;
  transition: opacity 0.3s ease;
}

.teleport-flash.active {
  opacity: 1;
}

/* Animations */
@keyframes teleportPulse {
  0% { 
    transform: translateX(-50%) scale(1);
    filter: brightness(1);
  }
  25% {
    transform: translateX(-50%) scale(1.1);
    filter: brightness(1.5) hue-rotate(90deg);
  }
  50% {
    transform: translateX(-50%) scale(1.3);
    filter: brightness(2) hue-rotate(180deg);
  }
  75% {
    transform: translateX(-50%) scale(1.1);
    filter: brightness(1.5) hue-rotate(270deg);
  }
  100% { 
    transform: translateX(-50%) scale(1);
    filter: brightness(1) hue-rotate(360deg);
  }
}

@keyframes particleBurst {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--end-x), var(--end-y)) scale(0.2);
  }
}

/* Existing Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .dynamic-navbar {
    top: 16px;
  }
  
  .dynamic-island.collapsed {
    width: 120px;
    height: 44px;
  }
  
  .dynamic-island.expanded {
    width: calc(100vw - 40px); /* Adjust width to fit screen with some margin */
    min-width: unset; /* Remove min-width constraint */
    height: auto; /* Allow height to adjust based on content */
    max-height: 80vh; /* Prevent it from taking too much height */
    overflow-y: auto; /* Enable scroll if content overflows */
    padding: 16px; /* Add some padding */
  }
  
  .island-text {
    font-size: 13px;
  }
  
  .nav-header {
    margin-bottom: 16px; /* Add margin below header */
  }
  
  .nav-title {
    font-size: 14px;
  }
  
  .expanded-nav {
    flex-direction: column; /* Stack items vertically */
    gap: 10px; /* Adjust gap */
    padding: 10px; /* Reduce padding */
    align-items: flex-start; /* Align items to the start */
  }
  
  .nav-items {
    flex-direction: column; /* Stack nav items vertically */
    gap: 8px; /* Reduce gap between nav items */
    width: 100%; /* Take full width */
    align-items: flex-start; /* Align items to the start */
  }
  
  .nav-item {
    width: 100%; /* Ensure nav items take full width */
  }
  
  .nav-link {
    padding: 8px 12px;
    justify-content: flex-start; /* Align text to start */
  }
  
  .nav-text {
    font-size: 12px;
  }
  
  /* Simplified animations on mobile */
  .dynamic-island::before,
  .nav-effect {
    display: none;
  }
  
  .floating-rune,
  .rune-ring {
    animation: none;
  }
  
  .magic-circle {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .dynamic-island.expanded {
    width: calc(100vw - 32px); /* Adjust width for smaller screens */
    padding: 12px; /* Reduce padding */
  }
  
  .expanded-nav {
    padding: 8px; /* Further reduce padding */
    gap: 6px; /* Further reduce gap */
  }
  
  .nav-items {
    gap: 6px;
  }
  
  .nav-link {
    padding: 6px 10px;
  }
  
  .nav-text {
    font-size: 10px;
  }
}
</style>