<template>
  <section id="projects-section" class="py-16 bg-gray-900 text-white flex items-center justify-center min-h-screen relative">
    <!-- Magical Circuit Background -->
    <MagicalCircuitBackground />
    <div class="container mx-auto px-4 max-w-7xl projects-content relative z-10">
      <!-- Header with Hybrid Info -->
      <div class="text-center mb-12 border-b border-blue-600 pb-6">
        <h2 class="text-5xl md:text-6xl font-extrabold text-blue-400 font-outfit mb-4">[ FEATURED PROJECTS ]</h2>
        <p class="text-xl text-blue-300 font-inter mb-2">Pilihan Proyek Unggulan - Status: AKTIF</p>
        <div class="flex items-center justify-center gap-4 text-sm text-gray-400 font-mono">
          <span class="w-1 h-1 bg-blue-400 rounded-full"></span>
        </div>
      </div>

      <div v-if="loadingProjects" class="text-center text-blue-300 text-lg">Loading featured projects...</div>
      <div v-else-if="projectsError" class="text-center text-red-500 text-lg">{{ projectsError }}</div>
      <div v-else-if="!projects.length" class="text-center text-gray-400 text-lg">No featured projects found.</div>
      <div v-else class="projects-stack-container">
        <!-- Left Side Projects -->
        <div class="side-projects left-projects">
          <div 
            v-for="(project, index) in getLeftProjects()" 
            :key="`left-${project.id}`"
            :class="[
              'side-project-card cursor-pointer transition-all duration-500 rounded-lg overflow-hidden border-2 transform hover:scale-105',
              'border-blue-400/50 bg-gray-800/70 hover:border-blue-400 hover:bg-gray-800'
            ]"
            @click="selectProject(getOriginalIndex(project.id))"
          >
            <div class="p-4">
              <!-- Project Image -->
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-32 object-cover rounded border border-blue-400/50 mb-3"
              >
              
              <!-- Project Info -->
              <div class="text-center">
                <span class="text-blue-300 font-mono text-xs mb-1 block">{{ String(getOriginalIndex(project.id) + 1).padStart(2, '0') }}</span>
                <h4 class="text-yellow-300 font-bold text-sm mb-2">{{ project.title }}</h4>
                <div class="w-full bg-gray-700 rounded-full h-2 mb-1">
                  <div 
                    class="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full transition-all duration-500"
                    :style="{ width: project.progress + '%' }"
                  ></div>
                </div>
                <span class="text-xs text-gray-400 font-mono">{{ project.progress }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Project Card - Center -->
        <div class="main-project-display" ref="mainProjectDisplay" v-if="currentProject">
          <div class="bg-gray-800 border-2 border-blue-500 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/20">
            <!-- Window Header -->
            <div class="flex items-center justify-between p-4 border-b border-blue-600 bg-gray-900">
              <div class="flex items-center gap-3">
                <div class="flex gap-2">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span class="text-blue-300 font-mono text-sm">PROJECT_{{ String(currentIndex + 1).padStart(3, '0') }}.exe</span>
              </div>
              <div class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                {{ currentProject?.status }}
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-6">
              <!-- Project Image -->
              <div class="mb-6 relative">
                <img 
                  :src="currentProject?.image" 
                  :alt="currentProject?.title"
                  class="w-full h-48 object-cover rounded-lg border border-blue-400 shadow-lg"
                >
                <div class="absolute top-3 right-3 bg-black/80 text-blue-300 px-3 py-1 rounded text-xs font-mono">
                  {{ currentProject?.type }}
                </div>
              </div>

              <!-- Project Info -->
              <div class="space-y-4">
                <h3 class="text-3xl font-bold text-yellow-300">{{ currentProject?.title }}</h3>
                <p class="text-gray-300 text-sm leading-relaxed">{{ currentProject?.description }}</p>
                
                <!-- Tech Stack -->
                <div>
                  <h4 class="text-blue-300 font-semibold text-sm mb-2">TECH STACK:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="tech in currentProject?.techStack" 
                      :key="tech"
                      class="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div>
                  <div class="flex justify-between text-xs mb-2">
                    <span class="text-blue-300 font-mono">PROGRESS</span>
                    <span class="text-green-400 font-mono font-bold">{{ currentProject?.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-3 border border-blue-600 overflow-hidden">
                    <div 
                      class="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full transition-all duration-1000 relative"
                      :style="{ width: currentProject?.progress + '%' }"
                    >
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4 pt-2">
                  <a 
                    v-if="currentProject?.liveUrl"
                    :href="currentProject?.liveUrl"
                    target="_blank"
                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                  >
                    [ VIEW LIVE ]
                  </a>
                  <span
                    v-else
                    class="flex-1 bg-gray-600 text-gray-400 font-bold py-3 px-6 rounded-lg text-center cursor-not-allowed opacity-70"
                  >
                    [ NO LIVE LINK ]
                  </span>
                  <a 
                    v-if="currentProject?.githubUrl"
                    :href="currentProject?.githubUrl"
                    target="_blank"
                    class="flex-1 border-2 border-blue-500 hover:border-blue-400 hover:bg-blue-500/10 text-blue-300 hover:text-blue-200 font-bold py-3 px-6 rounded-lg text-center transition-all duration-200 transform hover:scale-105"
                  >
                    [ SOURCE ]
                  </a>
                  <span
                    v-else
                    class="flex-1 border-2 border-gray-500 text-gray-400 font-bold py-3 px-6 rounded-lg text-center cursor-not-allowed opacity-70"
                  >
                    [ NO SOURCE LINK ]
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side Projects -->
        <div class="side-projects right-projects">
          <div 
            v-for="(project, index) in getRightProjects()" 
            :key="`right-${project.id}`"
            :class="[
              'side-project-card cursor-pointer transition-all duration-500 rounded-lg overflow-hidden border-2 transform hover:scale-105',
              'border-blue-400/50 bg-gray-800/70 hover:border-blue-400 hover:bg-gray-800'
            ]"
            @click="selectProject(getOriginalIndex(project.id))"
          >
            <div class="p-4">
              <!-- Project Image -->
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-32 object-cover rounded border border-blue-400/50 mb-3"
              >
              
              <!-- Project Info -->
              <div class="text-center">
                <span class="text-blue-300 font-mono text-xs mb-1 block">{{ String(getOriginalIndex(project.id) + 1).padStart(2, '0') }}</span>
                <h4 class="text-yellow-300 font-bold text-sm mb-2">{{ project.title }}</h4>
                <div class="w-full bg-gray-700 rounded-full h-2 mb-1">
                  <div 
                    class="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full transition-all duration-500"
                    :style="{ width: project.progress + '%' }"
                  ></div>
                </div>
                <span class="text-xs text-gray-400 font-mono">{{ project.progress }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Controls -->
      <div v-if="!loadingProjects && !projectsError && projects.length" class="flex flex-col items-center mt-8 space-y-4">
        <!-- Mobile Navigation Controls -->
        <div class="md:hidden">
          <!-- Indicators for Mobile -->
          <div class="flex justify-center gap-1 mb-4">
            <div 
              v-for="(project, index) in projects" 
              :key="`indicator-${project.id}`"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300 cursor-pointer',
                currentIndex === index ? 'bg-blue-500 scale-150' : 'bg-blue-400/40 hover:bg-blue-400'
              ]"
              @click="selectProject(index)"
            ></div>
          </div>
          
          <!-- Mobile Manual Controls -->
          <div class="flex gap-3 justify-center mb-4">
            <button 
              @click="slideProjects('prev')"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-mono text-base transition-all duration-200 transform hover:scale-105"
            >
              ← PREV
            </button>
            <button 
              @click="slideProjects('next')"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-mono text-base transition-all duration-200 transform hover:scale-105"
            >
              NEXT →
            </button>
          </div>
        </div>
        
        <!-- Status with Hybrid Info -->
        <div class="text-center">
          <p class="text-blue-300 text-sm font-mono mb-1">
            FEATURED PROJECT {{ currentIndex + 1 }} / {{ projects.length }}
          </p>
          <p class="text-xs text-gray-400 font-mono mb-2 hidden md:block">
            Click Side Projects: Navigate • Main Project: Focus
          </p>
          <p class="text-xs text-gray-400 font-mono mb-2 md:hidden">
            Use Controls: Navigate • Touch: Select
          </p>
          <NuxtLink 
            to="/projects" 
            class="inline-block text-sm text-blue-400 hover:text-blue-300 transition-colors underline font-mono bg-blue-600/10 hover:bg-blue-600/20 px-4 py-2 rounded-lg"
          >
            [ VIEW ALL {{ totalProjectsCount }} PROJECTS ]
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import MagicalCircuitBackground from './MagicalCircuitBackground.vue'

const mainProjectDisplay = ref<HTMLElement | null>(null);
const previewStack = ref(null);
const currentIndex = ref(0);

let isTransitioning = false;
let projectsVisited = new Set<number>();
let animationTimeline: gsap.core.Timeline | null = null;

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  status: string;
  progress: number;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
}

// Computed property for current project
const currentProject = computed<Project | null>(() => projects.value[currentIndex.value] || null);

// Projects data
const projects = ref<Project[]>([]);
const totalProjectsCount = ref(0);
const loadingProjects = ref(true);
const projectsError = ref<string | null>(null);

// Fetch projects from API
const fetchProjects = async () => {
  loadingProjects.value = true;
  projectsError.value = null;
  try {
    const response = await $fetch<{ status: number; data: Project[]; message?: string }>('/api/projects?featured=true');
    if (response.status === 200 && response.data) {
      projects.value = response.data;
      totalProjectsCount.value = response.data.length;
      if (response.data.length > 0) {
        projectsVisited.add(0); // Mark first project as visited if there are projects
      }
    } else {
      projectsError.value = response.message || 'Failed to fetch projects';
    }
  } catch (err: any) {
    projectsError.value = err.data?.statusMessage || err.message || 'Error fetching projects';
    console.error("Error fetching projects:", err);
  } finally {
    loadingProjects.value = false;
  }
};

// Get preview card style - simplified for clean layout
const getPreviewCardStyle = (index: number) => {
  return {
    // No complex transforms - using clean CSS classes instead
  };
};

// Select a specific project with simple mobile-friendly transition
const selectProject = (index: number) => {
  if (projects.value.length === 0 || index === currentIndex.value || isTransitioning) return;
  
  // Check if mobile device
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Simple direct update for mobile
    projectsVisited.add(index);
    currentIndex.value = index;
    return;
  }
  
  // Desktop animation (simplified)
  isTransitioning = true;
  
  // Kill any existing animation
  if (animationTimeline) {
    animationTimeline.kill();
  }
  
  // Simple fade transition for desktop
  animationTimeline = gsap.timeline({
    onComplete: () => {
      gsap.set('.main-project-display', { opacity: 1, scale: 1 });
      gsap.set('.side-project-card', { opacity: 1, scale: 1 });
      isTransitioning = false;
      animationTimeline = null;
    }
  });
  
  const mainCard = mainProjectDisplay.value?.querySelector('.bg-gray-800');
  
  if (mainCard) {
    animationTimeline.to(mainCard, {
      opacity: 0.5,
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.out'
    }, 0)
    .call(() => {
      projectsVisited.add(index);
      currentIndex.value = index;
    }, undefined, 0.1)
    .to(mainCard, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    }, 0.1);
  } else {
    projectsVisited.add(index);
    currentIndex.value = index;
    isTransitioning = false;
  }
};

// Update preview stack positions - simplified
const updatePreviewStack = () => {
  // No complex animations needed - using CSS classes for state
};

// Navigate projects with mobile-aware animation
const slideProjects = (direction: 'prev' | 'next') => {
  if (projects.value.length === 0 || isTransitioning) return;

  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Simple direct navigation for mobile
    const totalProjects = projects.value.length;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex.value + 1) % totalProjects;
    } else {
      newIndex = (currentIndex.value - 1 + totalProjects) % totalProjects;
    }
    
    projectsVisited.add(newIndex);
    currentIndex.value = newIndex;
    return;
  }
  
  // Desktop navigation
  const totalProjects = projects.value.length;
  let newIndex;
  
  if (direction === 'next') {
    newIndex = (currentIndex.value + 1) % totalProjects;
  } else {
    newIndex = (currentIndex.value - 1 + totalProjects) % totalProjects;
  }
  
  selectProject(newIndex);
};

// Get projects for left side (previous projects)
const getLeftProjects = (): Project[] => {
  if (projects.value.length === 0) return [];
  const total = projects.value.length;
  const leftProjects: Project[] = [];
  
  // Get 2 projects before current (or wrap around)
  for (let i = 1; i <= 2; i++) {
    const index = (currentIndex.value - i + total) % total;
    const project = projects.value[index];
    if (project) {
      leftProjects.unshift(project);
    }
  }
  
  return leftProjects;
};

// Get projects for right side (next projects)
const getRightProjects = (): Project[] => {
  if (projects.value.length === 0) return [];
  const total = projects.value.length;
  const rightProjects: Project[] = [];
  
  // Get 2 projects after current (or wrap around)
  for (let i = 1; i <= 2; i++) {
    const index = (currentIndex.value + i) % total;
    const project = projects.value[index];
    if (project) {
      rightProjects.push(project);
    }
  }
  
  return rightProjects;
};

// Get original index of project by ID
const getOriginalIndex = (projectId: string): number => {
  return projects.value.findIndex(p => p.id === projectId);
};

// No scroll blocking - user can navigate freely with clicks and buttons

onMounted(() => {
  fetchProjects(); // Fetch projects when the component is mounted
  // No need to mark first project as visited here; it's handled in fetchProjects
  
  // Removed GSAP entrance animations, as loading state handles initial visibility
});

onUnmounted(() => {
  // Kill any running animations
  if (animationTimeline) {
    animationTimeline.kill();
  }
  gsap.killTweensOf('.main-project-display');
  gsap.killTweensOf('.side-project-card');
});
</script>

<style scoped>
/* Font families */
.font-mono {
  font-family: 'Press Start 2P', 'Press Start 2P Fallback', monospace;
}

/* Projects Stack Container - Three Column Layout with overflow visible */
.projects-stack-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 2rem;
  align-items: start;
  max-width: 1400px;
  margin: 0 auto;
  overflow: visible; /* Allow dramatic animations to show outside */
  position: relative;
}

/* Side Projects */
.side-projects {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.left-projects {
  justify-self: end;
}

.right-projects {
  justify-self: start;
}

.side-project-card {
  width: 220px;
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  transform-origin: center;
  will-change: transform, opacity;
  position: relative;
  z-index: 1;
}

.side-project-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
  z-index: 2;
}

/* Main Project Display - Center Column */
.main-project-display {
  max-width: 650px;
  width: 100%;
  justify-self: center;
  transform-origin: center;
  will-change: transform, opacity;
  position: relative;
  z-index: 3;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .projects-stack-container {
    grid-template-columns: 200px 1fr 200px;
    gap: 1.5rem;
  }
  
  .side-project-card {
    width: 200px;
  }
}

@media (max-width: 1024px) {
  .projects-stack-container {
    grid-template-columns: 180px 1fr 180px;
    gap: 1rem;
  }
  
  .side-project-card {
    width: 180px;
  }
  
  .main-project-display {
    max-width: 500px;
  }
}

/* Mobile-first responsive layout */
@media (max-width: 768px) {
  .projects-stack-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 0 1rem;
  }
  
  .main-project-display {
    max-width: 100%;
    order: 1;
    width: 100%;
  }
  
  /* Hide side projects completely on mobile */
  .side-projects {
    display: none;
  }
  
  /* Simplify main project card */
  .main-project-display .bg-gray-800 {
    transform: none !important;
    transition: opacity 0.2s ease;
  }
  
  /* Make header text responsive */
  .text-5xl.md\:text-6xl {
    font-size: 2.5rem;
  }
  
  .text-xl {
    font-size: 1.1rem;
  }
  
  /* Larger navigation indicators for touch */
  .w-1.h-1 {
    width: 0.75rem;
    height: 0.75rem;
  }
  
  /* Larger navigation buttons for touch */
  .bg-blue-600.hover\:bg-blue-700 {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .text-5xl.md\:text-6xl {
    font-size: 2rem;
  }
  
  .text-xl {
    font-size: 1rem;
  }
  
  .main-project-display .p-6 {
    padding: 1rem;
  }
  
  .main-project-display .p-4 {
    padding: 0.75rem;
  }
}
</style>