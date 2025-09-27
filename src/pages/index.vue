<template>
    <div class="relative z-0 min-h-screen">
      <MagicalCircuitBackground />
      <div class="relative z-10">
        <DynamicNavbar />
        <HeroSection />
        <AboutMeSection />
        <ProjectsSection />
        <ExperienceSection />
        <FooterSection />
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted } from 'vue';
  import gsap from 'gsap';
  import DynamicNavbar from '../components/DynamicNavbar.vue';
  import HeroSection from '../components/HeroSection.vue';
  import AboutMeSection from '../components/AboutMeSection.vue';
  import ExperienceSection from '../components/ExperienceSection.vue';
  import ProjectsSection from '../components/ProjectsSection.vue';
  import FooterSection from '../components/FooterSection.vue';
  import MagicalCircuitBackground from '../components/MagicalCircuitBackground.vue';
  
  // Simple navigation handler for card stacking system
  const handleGlobalNavigation = (direction) => {
    console.log(`🌍 Simple navigation: ${direction}`);
    
    // Check if projects section is in control mode
    if (process.client && window.isProjectsBlocked) {
      console.log('⏸️ Projects section is in control, ignoring global navigation');
      return;
    }
    
    // Simple scroll-based navigation
    const heroSection = document.getElementById('hero-section');
    const aboutSection = document.getElementById('about-section');
    
    if (direction === 'up' && aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else if (direction === 'down' && aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  onMounted(() => {
    // Disable ScrollSmoother to allow pure card stacking
    console.log('🃏 Card stacking mode - ScrollSmoother disabled');
    
    // Expose minimal navigation functions
    if (process.client) {
      window.globalNavigation = handleGlobalNavigation;
    }
    
    // No ScrollTrigger section detection - let projects handle its own navigation
    console.log('📋 Section detection disabled - projects has full control');
  });
  
  onUnmounted(() => {
    // Cleanup global navigation
    if (process.client && window.globalNavigation) {
      delete window.globalNavigation;
    }
  });
  </script>