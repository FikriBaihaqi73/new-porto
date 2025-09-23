<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-blue-300 font-mono">Loading project...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !project" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-6xl mb-4">❌</div>
        <h2 class="text-2xl font-bold text-red-400 mb-2">Project Not Found</h2>
        <p class="text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
        <NuxtLink 
          to="/projects" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200"
        >
          ← Back to Projects
        </NuxtLink>
      </div>
    </div>

    <!-- Project Detail Content -->
    <div v-else>
      <!-- Hero Section -->
      <div class="relative">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img 
            :src="project.image" 
            :alt="project.title"
            class="w-full h-96 object-cover opacity-20"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
        </div>

        <!-- Hero Content -->
        <div class="relative z-10 container mx-auto px-4 py-16 max-w-7xl">
          <div class="flex items-center justify-between mb-8">
            <NuxtLink 
              to="/projects" 
              class="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to Projects
            </NuxtLink>
            
            <div class="flex items-center gap-4">
              <span class="text-blue-300 font-mono text-sm">PROJECT_{{ String(project.id).padStart(3, '0') }}.exe</span>
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-sm font-bold',
                  project.status === 'COMPLETE' ? 'bg-green-600 text-white' :
                  project.status === 'DEV' ? 'bg-yellow-600 text-black' :
                  project.status === 'BETA' ? 'bg-purple-600 text-white' :
                  'bg-gray-600 text-white'
                ]"
              >
                {{ project.status }}
              </span>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-8 items-center">
            <!-- Project Info -->
            <div>
              <div v-if="project.featured" class="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-sm font-bold px-4 py-2 rounded-full mb-4">
                ⭐ FEATURED PROJECT
              </div>
              
              <h1 class="text-4xl md:text-6xl font-extrabold text-yellow-300 font-outfit mb-4">
                {{ project.title }}
              </h1>
              
              <p class="text-xl text-gray-300 mb-6 leading-relaxed">
                {{ project.description }}
              </p>

              <div class="flex items-center gap-6 text-sm">
                <div class="flex items-center gap-2">
                  <span class="text-blue-300 font-mono">TYPE:</span>
                  <span class="font-bold">{{ project.type }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-blue-300 font-mono">PROGRESS:</span>
                  <span class="font-bold text-green-400">{{ project.progress }}%</span>
                </div>
              </div>
            </div>

            <!-- Project Image -->
            <div class="relative">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-64 md:h-80 object-cover rounded-xl border-2 border-blue-500 shadow-2xl"
              >
              <div class="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <div class="text-2xl font-bold">{{ project.progress }}%</div>
                <div class="text-xs opacity-75">COMPLETE</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container mx-auto px-4 py-12 max-w-7xl">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Left Column - Details -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Project Overview -->
            <div class="bg-gray-800 border border-blue-500/50 rounded-xl p-6">
              <h2 class="text-2xl font-bold text-blue-400 mb-4 font-outfit">Project Overview</h2>
              <div class="prose prose-invert max-w-none">
                <p class="text-gray-300 leading-relaxed mb-4">
                  {{ project.description }}
                </p>
                <p class="text-gray-300 leading-relaxed">
                  This project represents a comprehensive solution built with modern technologies and best practices. 
                  The development process follows agile methodologies with continuous integration and deployment.
                </p>
              </div>
            </div>

            <!-- Features -->
            <div class="bg-gray-800 border border-blue-500/50 rounded-xl p-6">
              <h2 class="text-2xl font-bold text-blue-400 mb-4 font-outfit">Key Features</h2>
              <div class="grid md:grid-cols-2 gap-4">
                <div v-for="feature in projectFeatures" :key="feature" class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-gray-300">{{ feature }}</span>
                </div>
              </div>
            </div>

            <!-- Progress Timeline -->
            <div class="bg-gray-800 border border-blue-500/50 rounded-xl p-6">
              <h2 class="text-2xl font-bold text-blue-400 mb-4 font-outfit">Development Progress</h2>
              <div class="space-y-4">
                <div v-for="milestone in projectMilestones" :key="milestone.phase" class="flex items-center gap-4">
                  <div 
                    :class="[
                      'w-4 h-4 rounded-full border-2',
                      milestone.completed 
                        ? 'bg-green-400 border-green-400' 
                        : milestone.current 
                          ? 'bg-yellow-400 border-yellow-400' 
                          : 'bg-gray-600 border-gray-600'
                    ]"
                  ></div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <span 
                        :class="[
                          'font-semibold',
                          milestone.completed ? 'text-green-400' : 
                          milestone.current ? 'text-yellow-400' : 'text-gray-400'
                        ]"
                      >
                        {{ milestone.phase }}
                      </span>
                      <span class="text-xs text-gray-500">{{ milestone.date }}</span>
                    </div>
                    <p class="text-sm text-gray-400">{{ milestone.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Sidebar -->
          <div class="space-y-6">
            <!-- Tech Stack -->
            <div class="bg-gray-800 border border-blue-500/50 rounded-xl p-6">
              <h3 class="text-xl font-bold text-blue-400 mb-4 font-outfit">Technology Stack</h3>
              <div class="space-y-3">
                <div v-for="tech in project.techStack" :key="tech" class="flex items-center justify-between">
                  <span class="bg-blue-700 text-white px-3 py-1 rounded text-sm font-mono">{{ tech }}</span>
                  <div class="w-20 bg-gray-700 rounded-full h-2">
                    <div class="bg-blue-500 h-full rounded-full" :style="{ width: '85%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Actions -->
            <div class="bg-gray-800 border border-blue-500/50 rounded-xl p-6">
              <h3 class="text-xl font-bold text-blue-400 mb-4 font-outfit">Project Links</h3>
              <div class="space-y-3">
                <a 
                  :href="project.liveUrl" 
                  target="_blank"
                  class="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
                >
                  🚀 View Live Demo
                </a>
                <a 
                  :href="project.githubUrl" 
                  target="_blank"
                  class="block w-full border-2 border-blue-500 hover:bg-blue-500/10 text-blue-300 text-center py-3 px-4 rounded-lg font-bold transition-all duration-200"
                >
                  💻 Source Code
                </a>
                <button class="block w-full bg-gray-700 hover:bg-gray-600 text-gray-300 text-center py-3 px-4 rounded-lg font-bold transition-all duration-200">
                  📄 Download Case Study
                </button>
              </div>
            </div>

            <!-- Project Stats -->
            <div class="bg-gray-800 border border-blue-500/50 rounded-xl p-6">
              <h3 class="text-xl font-bold text-blue-400 mb-4 font-outfit">Project Statistics</h3>
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-gray-400">Development Time</span>
                  <span class="font-bold">{{ getProjectStats().developmentTime }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">Lines of Code</span>
                  <span class="font-bold">{{ getProjectStats().linesOfCode }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">Team Size</span>
                  <span class="font-bold">{{ getProjectStats().teamSize }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">Last Updated</span>
                  <span class="font-bold">{{ getProjectStats().lastUpdated }}</span>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="bg-gray-800 border border-blue-500/50 rounded-xl p-6">
              <h3 class="text-xl font-bold text-blue-400 mb-4 font-outfit">Navigate</h3>
              <div class="space-y-3">
                <NuxtLink 
                  v-if="previousProject"
                  :to="`/projects/${previousProject.id}`"
                  class="block w-full bg-gray-700 hover:bg-gray-600 text-blue-300 text-center py-2 px-4 rounded transition-all duration-200"
                >
                  ← {{ previousProject.title }}
                </NuxtLink>
                <NuxtLink 
                  v-if="nextProject"
                  :to="`/projects/${nextProject.id}`"
                  class="block w-full bg-gray-700 hover:bg-gray-600 text-blue-300 text-center py-2 px-4 rounded transition-all duration-200"
                >
                  {{ nextProject.title }} →
                </NuxtLink>
                <NuxtLink 
                  to="/projects"
                  class="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded font-bold transition-all duration-200"
                >
                  All Projects
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// All projects data (same as projects page for consistency)
const allProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with advanced features including real-time inventory, payment integration, and admin dashboard. Built with modern technologies and scalable architecture for high-performance online retail operations.",
    image: "https://via.placeholder.com/400x200/1e40af/ffffff?text=E-Commerce+Platform",
    type: "WEB APP",
    status: "COMPLETE",
    progress: 100,
    techStack: ["Vue.js", "Node.js", "MongoDB", "Stripe API", "Redis", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "AI Chat Bot",
    description: "Intelligent chatbot with natural language processing capabilities for customer support and automated responses. Integrates with multiple platforms and provides comprehensive analytics dashboard for business insights.",
    image: "https://via.placeholder.com/400x200/7c3aed/ffffff?text=AI+ChatBot",
    type: "AI/ML",
    status: "BETA",
    progress: 70,
    techStack: ["Python", "TensorFlow", "FastAPI", "OpenAI", "Redis", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description: "Cross-platform mobile application for fitness tracking, workout plans, and health monitoring with wearable integration. Features social sharing, AI-powered recommendations, and comprehensive health analytics.",
    image: "https://via.placeholder.com/400x200/dc2626/ffffff?text=Fitness+App",
    type: "MOBILE",
    status: "DEV",
    progress: 45,
    techStack: ["React Native", "Firebase", "Redux", "Health Kit", "GraphQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  // Add other projects...
  {
    id: 4,
    title: "Task Management System",
    description: "Collaborative task management platform with team features, time tracking, and project analytics. Designed for remote teams and agile workflows with real-time collaboration capabilities.",
    image: "https://via.placeholder.com/400x200/059669/ffffff?text=Task+Manager",
    type: "WEB APP",
    status: "COMPLETE",
    progress: 100,
    techStack: ["React", "Express.js", "PostgreSQL", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  }
]

// Get route params
const route = useRoute()
const projectId = parseInt(route.params.id)

// Set up reactive state
const pending = ref(false)
const error = ref(null)

// Find the project
const project = computed(() => {
  return allProjects.find(p => p.id === projectId)
})

// Navigation projects
const currentIndex = computed(() => {
  return allProjects.findIndex(p => p.id === projectId)
})

const previousProject = computed(() => {
  const prevIndex = currentIndex.value - 1
  return prevIndex >= 0 ? allProjects[prevIndex] : null
})

const nextProject = computed(() => {
  const nextIndex = currentIndex.value + 1
  return nextIndex < allProjects.length ? allProjects[nextIndex] : null
})

// Dynamic content based on project
const projectFeatures = computed(() => {
  const baseFeatures = {
    1: ["Real-time inventory management", "Secure payment processing", "Admin dashboard", "Order tracking", "Customer reviews", "Multi-currency support"],
    2: ["Natural language processing", "Multi-platform integration", "Analytics dashboard", "Automated responses", "Custom training", "API integrations"],
    3: ["Wearable device sync", "Workout planning", "Social features", "Health analytics", "AI recommendations", "Progress tracking"]
  }
  return baseFeatures[projectId] || ["Modern architecture", "Responsive design", "API integration", "User authentication", "Data visualization", "Performance optimization"]
})

const projectMilestones = computed(() => {
  const baseMilestones = {
    1: [
      { phase: "Planning & Design", description: "Initial requirements and UI/UX design", date: "Jan 2024", completed: true, current: false },
      { phase: "Backend Development", description: "API development and database setup", date: "Feb 2024", completed: true, current: false },
      { phase: "Frontend Implementation", description: "User interface and user experience", date: "Mar 2024", completed: true, current: false },
      { phase: "Testing & Deployment", description: "Quality assurance and production deployment", date: "Apr 2024", completed: true, current: false }
    ],
    2: [
      { phase: "Research & Planning", description: "AI model research and architecture design", date: "Feb 2024", completed: true, current: false },
      { phase: "Core Development", description: "NLP engine and chatbot logic", date: "Mar 2024", completed: true, current: false },
      { phase: "Integration & Testing", description: "Platform integrations and beta testing", date: "Apr 2024", completed: false, current: true },
      { phase: "Production Release", description: "Final optimization and public release", date: "May 2024", completed: false, current: false }
    ],
    3: [
      { phase: "Market Research", description: "User research and feature planning", date: "Jan 2024", completed: true, current: false },
      { phase: "MVP Development", description: "Core features and basic functionality", date: "Feb 2024", completed: true, current: false },
      { phase: "Feature Expansion", description: "Advanced features and integrations", date: "Mar 2024", completed: false, current: true },
      { phase: "Launch Preparation", description: "Testing, optimization, and store submission", date: "Apr 2024", completed: false, current: false }
    ]
  }
  return baseMilestones[projectId] || [
    { phase: "Planning", description: "Project planning and design", date: "Q1 2024", completed: true, current: false },
    { phase: "Development", description: "Core development phase", date: "Q2 2024", completed: false, current: true },
    { phase: "Testing", description: "Quality assurance and testing", date: "Q3 2024", completed: false, current: false },
    { phase: "Launch", description: "Production deployment", date: "Q4 2024", completed: false, current: false }
  ]
})

const getProjectStats = () => {
  const baseStats = {
    1: { developmentTime: "4 months", linesOfCode: "25,000+", teamSize: "3 developers", lastUpdated: "2 days ago" },
    2: { developmentTime: "3 months", linesOfCode: "18,000+", teamSize: "2 developers", lastUpdated: "1 week ago" },
    3: { developmentTime: "5 months", linesOfCode: "32,000+", teamSize: "4 developers", lastUpdated: "3 days ago" }
  }
  return baseStats[projectId] || { 
    developmentTime: "3 months", 
    linesOfCode: "15,000+", 
    teamSize: "2 developers", 
    lastUpdated: "1 week ago" 
  }
}

// Set page meta
useHead({
  title: computed(() => project.value ? `${project.value.title} - Portfolio` : 'Project Not Found'),
  meta: [
    { 
      name: 'description', 
      content: computed(() => project.value ? project.value.description : 'Project not found in portfolio') 
    }
  ]
})

// Handle 404 if project not found
if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project Not Found'
  })
}
</script>

<style scoped>
.font-outfit {
  font-family: 'Outfit', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

.font-mono {
  font-family: 'Roboto Mono', monospace;
}

.prose-invert {
  color: rgb(209, 213, 219);
}
</style>