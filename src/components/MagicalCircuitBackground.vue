<template>
  <div class="magical-circuit-background">
    <canvas ref="circuitCanvas" class="circuit-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const circuitCanvas = ref(null)
let animationFrameId = null
let circuitCtx = null
let particles = []
let connections = []
let orbs = []

// Circuit configuration
const config = {
  lineWidth: 1,
  lineColor: 'rgba(59, 130, 246, 0.3)',
  activeLineColor: 'rgba(96, 165, 250, 0.8)',
  orbRadius: 3,
  orbColor: 'rgba(59, 130, 246, 0.8)',
  activeOrbColor: 'rgba(96, 165, 250, 1)',
  connectionDistance: 100,
  particleCount: 50,
  orbCount: 15,
  animationSpeed: 0.5
}

// Initialize the circuit background
const initCircuit = () => {
  if (!circuitCanvas.value) return
  
  const canvas = circuitCanvas.value
  circuitCtx = canvas.getContext('2d')
  
  // Set canvas size
  resizeCanvas()
  
  // Create orbs (magical circles)
  createOrbs()
  
  // Create particles for moving effects
  createParticles()
  
  // Start animation
  animate()
  
  // Handle window resize
  window.addEventListener('resize', resizeCanvas)
}

// Resize canvas to fit container
const resizeCanvas = () => {
  if (!circuitCanvas.value) return
  
  const canvas = circuitCanvas.value
  const container = canvas.parentElement
  
  if (container) {
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
  }
}

// Create magical orbs (solar system elements)
const createOrbs = () => {
  orbs = []
  const canvas = circuitCanvas.value
  
  if (!canvas) return
  
  for (let i = 0; i < config.orbCount; i++) {
    orbs.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: config.orbRadius + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      distance: 20 + Math.random() * 50,
      centerX: Math.random() * canvas.width,
      centerY: Math.random() * canvas.height,
      active: Math.random() > 0.7
    })
  }
}

// Create moving particles for circuit lines
const createParticles = () => {
  particles = []
  const canvas = circuitCanvas.value
  
  if (!canvas) return
  
  for (let i = 0; i < config.particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: 0.5 + Math.random() * 1.5,
      active: Math.random() > 0.5
    })
  }
}

// Update particle positions
const updateParticles = () => {
  const canvas = circuitCanvas.value
  if (!canvas) return
  
  particles.forEach(particle => {
    // Move particle
    particle.x += particle.vx * config.animationSpeed
    particle.y += particle.vy * config.animationSpeed
    
    // Boundary check - wrap around
    if (particle.x < 0) particle.x = canvas.width
    if (particle.x > canvas.width) particle.x = 0
    if (particle.y < 0) particle.y = canvas.height
    if (particle.y > canvas.height) particle.y = 0
    
    // Randomly activate/deactivate
    if (Math.random() < 0.01) {
      particle.active = !particle.active
    }
  })
}

// Update orb positions (solar system motion)
const updateOrbs = () => {
  orbs.forEach(orb => {
    // Move in circular pattern (solar system effect)
    orb.angle += orb.speed * 0.01 * config.animationSpeed
    orb.x = orb.centerX + Math.cos(orb.angle) * orb.distance
    orb.y = orb.centerY + Math.sin(orb.angle) * orb.distance
    
    // Randomly activate/deactivate
    if (Math.random() < 0.005) {
      orb.active = !orb.active
    }
  })
}

// Draw circuit connections between nearby particles
const drawConnections = () => {
  if (!circuitCtx) return
  
  // Draw connections between orbs
  for (let i = 0; i < orbs.length; i++) {
    for (let j = i + 1; j < orbs.length; j++) {
      const dx = orbs[i].x - orbs[j].x
      const dy = orbs[i].y - orbs[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < config.connectionDistance) {
        const alpha = 1 - distance / config.connectionDistance
        circuitCtx.beginPath()
        circuitCtx.strokeStyle = orbs[i].active || orbs[j].active 
          ? config.activeLineColor 
          : `rgba(59, 130, 246, ${alpha * 0.3})`
        circuitCtx.lineWidth = config.lineWidth
        circuitCtx.moveTo(orbs[i].x, orbs[i].y)
        circuitCtx.lineTo(orbs[j].x, orbs[j].y)
        circuitCtx.stroke()
      }
    }
  }
  
  // Draw connections between particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < config.connectionDistance / 2) {
        const alpha = 1 - distance / (config.connectionDistance / 2)
        circuitCtx.beginPath()
        circuitCtx.strokeStyle = particles[i].active || particles[j].active 
          ? config.activeLineColor 
          : `rgba(59, 130, 246, ${alpha * 0.2})`
        circuitCtx.lineWidth = config.lineWidth / 2
        circuitCtx.moveTo(particles[i].x, particles[i].y)
        circuitCtx.lineTo(particles[j].x, particles[j].y)
        circuitCtx.stroke()
      }
    }
  }
}

// Draw orbs (magical circles)
const drawOrbs = () => {
  if (!circuitCtx) return
  
  orbs.forEach(orb => {
    circuitCtx.beginPath()
    circuitCtx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
    circuitCtx.fillStyle = orb.active ? config.activeOrbColor : config.orbColor
    circuitCtx.fill()
    
    // Add glow effect for active orbs
    if (orb.active) {
      circuitCtx.beginPath()
      circuitCtx.arc(orb.x, orb.y, orb.radius * 2, 0, Math.PI * 2)
      const gradient = circuitCtx.createRadialGradient(
        orb.x, orb.y, orb.radius,
        orb.x, orb.y, orb.radius * 2
      )
      gradient.addColorStop(0, 'rgba(96, 165, 250, 0.5)')
      gradient.addColorStop(1, 'rgba(96, 165, 250, 0)')
      circuitCtx.fillStyle = gradient
      circuitCtx.fill()
    }
  })
}

// Draw particles
const drawParticles = () => {
  if (!circuitCtx) return
  
  particles.forEach(particle => {
    circuitCtx.beginPath()
    circuitCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    circuitCtx.fillStyle = particle.active 
      ? 'rgba(96, 165, 250, 0.8)' 
      : 'rgba(59, 130, 246, 0.4)'
    circuitCtx.fill()
  })
}

// Main animation loop
const animate = () => {
  if (!circuitCtx || !circuitCanvas.value) return
  
  const canvas = circuitCanvas.value
  circuitCtx.clearRect(0, 0, canvas.width, canvas.height)
  
  // Update positions
  updateParticles()
  updateOrbs()
  
  // Draw elements
  drawConnections()
  drawOrbs()
  drawParticles()
  
  animationFrameId = requestAnimationFrame(animate)
}

// Cleanup
const cleanup = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', resizeCanvas)
}

// Lifecycle
onMounted(() => {
  initCircuit()
})

onUnmounted(() => {
  cleanup()
})

// Expose methods for parent components to control
defineExpose({
  resizeCanvas
})
</script>

<style scoped>
.magical-circuit-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.circuit-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>