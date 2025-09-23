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
            <NuxtLink to="/#hero-section" @click="navigateAndClose" class="nav-link">
              <span class="nav-text">Home</span>
              <div class="nav-effect"></div>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/#about-section" @click="navigateAndClose" class="nav-link">
              <span class="nav-text">About</span>
              <div class="nav-effect"></div>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/#projects-section" @click="navigateAndClose" class="nav-link">
              <span class="nav-text">Projects</span>
              <div class="nav-effect"></div>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/projects" @click="navigateAndClose" class="nav-link">
              <span class="nav-text">All Projects</span>
              <div class="nav-effect"></div>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/#footer-section" @click="navigateAndClose" class="nav-link">
              <span class="nav-text">Contact</span>
              <div class="nav-effect"></div>
            </NuxtLink>
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
import { ref, onMounted, onUnmounted } from 'vue'

const isExpanded = ref(false)

const toggleNavbar = () => {
  isExpanded.value = !isExpanded.value
  
  // Prevent body scroll when expanded
  if (isExpanded.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeNavbar = () => {
  isExpanded.value = false
  document.body.style.overflow = ''
}

const navigateAndClose = (event) => {
  // Small delay to allow smooth closing animation
  setTimeout(() => {
    closeNavbar()
  }, 300)
}

// Close on escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isExpanded.value) {
    closeNavbar()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
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
  font-family: 'Inter', sans-serif;
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

/* Animations */
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
    width: max-content;
    min-width: 90vw;
    height: 110px;
  }
  
  .island-text {
    font-size: 13px;
  }
  
  .nav-title {
    font-size: 14px;
  }
  
  .nav-link {
    padding: 8px 12px;
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
    width: 92vw;
    height: 100px;
  }
  
  .expanded-nav {
    padding: 14px;
  }
  
  .nav-items {
    gap: 8px;
  }
  
  .nav-link {
    padding: 6px 10px;
  }
  
  .nav-text {
    font-size: 11px;
  }
}
</style>