<template>
  <div class="min-h-screen bg-gray-900 text-white relative z-0">
    <MagicalCircuitBackground />
    <div class="relative z-10">
      <DynamicNavbar />
      <!-- Header -->
      <div class="bg-gray-800 border-b border-blue-600">
        <div class="container mx-auto px-4 py-6 max-w-7xl">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-4xl md:text-5xl font-extrabold text-blue-400 font-outfit mb-2">[ ALL PROJECTS ]</h1>
              <p class="text-blue-300 font-inter">Koleksi lengkap semua proyek - Total: {{ allProjects.length }} proyek</p>
            </div>
            <NuxtLink 
              to="/" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 back-button"
            >
              ← Kembali
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="container mx-auto px-4 py-6 max-w-7xl">
        <div class="flex flex-wrap gap-3 mb-8">
          <button 
            @click="filterByStatus('all')"
            :class="[
              'px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200',
              selectedFilter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            ]"
          >
            ALL ({{ allProjects.length }})
          </button>
          <button 
            @click="filterByStatus('COMPLETE')"
            :class="[
              'px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200',
              selectedFilter === 'COMPLETE' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            ]"
          >
            COMPLETE ({{ getProjectsByStatus('COMPLETE').length }})
          </button>
          <button 
            @click="filterByStatus('DEV')"
            :class="[
              'px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200',
              selectedFilter === 'DEV' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            ]"
          >
            IN DEV ({{ getProjectsByStatus('DEV').length }})
          </button>
          <button 
            @click="filterByStatus('BETA')"
            :class="[
              'px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200',
              selectedFilter === 'BETA' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            ]"
          >
            BETA ({{ getProjectsByStatus('BETA').length }})
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="bg-gray-800 border-2 border-blue-400/50 rounded-xl overflow-hidden hover:border-blue-400 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20"
          >
            <!-- Featured Badge -->
            <div v-if="project.featured" class="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-3 py-1 text-center">
              ⭐ FEATURED PROJECT
            </div>

            <!-- Project Image -->
            <div class="relative">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-48 object-cover"
              >
              <div class="absolute top-3 right-3 bg-black/80 text-blue-300 px-2 py-1 rounded text-xs font-mono">
                {{ project.type }}
              </div>
              <div class="absolute top-3 left-3">
                <span 
                  :class="[
                    'px-2 py-1 rounded text-xs font-bold',
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

            <!-- Project Content -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-blue-300 font-mono text-xs">{{ String(project.id).padStart(2, '0') }}</span>
                <span class="text-green-400 font-mono text-xs font-bold">{{ project.progress }}%</span>
              </div>

              <h3 class="text-xl font-bold text-yellow-300 mb-3">{{ project.title }}</h3>
              <p class="text-gray-300 text-sm mb-4 line-clamp-3">{{ project.description }}</p>
              
              <!-- Tech Stack -->
              <div class="mb-4">
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="tech in project.techStack.slice(0, 3)" 
                    :key="tech"
                    class="bg-blue-700 text-white px-2 py-1 rounded text-xs font-mono"
                  >
                    {{ tech }}
                  </span>
                  <span 
                    v-if="project.techStack.length > 3"
                    class="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs font-mono"
                  >
                    +{{ project.techStack.length - 3 }}
                  </span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="mb-4">
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full transition-all duration-500"
                    :style="{ width: project.progress + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-2">
                <div class="flex gap-2">
                  <a 
                    :href="project.liveUrl" 
                    target="_blank"
                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded font-bold text-sm transition-all duration-200"
                  >
                    LIVE
                  </a>
                  <a 
                    :href="project.githubUrl" 
                    target="_blank"
                    class="flex-1 border border-blue-500 hover:bg-blue-500/10 text-blue-300 text-center py-2 px-4 rounded font-bold text-sm transition-all duration-200"
                  >
                    CODE
                  </a>
                </div>
                <NuxtLink 
                  :to="`/projects/${project.id}`"
                  class="block w-full bg-gray-700 hover:bg-gray-600 text-blue-300 text-center py-2 px-4 rounded font-bold text-sm transition-all duration-200"
                >
                  VIEW DETAILS
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-bold text-gray-400 mb-2">Tidak ada proyek ditemukan</h3>
          <p class="text-gray-500">Coba ubah filter untuk melihat proyek lainnya</p>
        </div>
        
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex flex-col items-center mt-12 space-y-4">
          <!-- Pagination Info -->
          <div class="text-center">
            <p class="text-gray-400 text-sm font-mono">
              Halaman {{ currentPage }} dari {{ totalPages }} • 
              Menampilkan {{ filteredProjects.length }} dari {{ totalFilteredProjects.length }} proyek
            </p>
          </div>
          
          <!-- Pagination Controls -->
          <div class="flex items-center gap-2">
            <!-- Previous Button -->
            <button 
              @click="goToPrevPage"
              :disabled="!canGoPrev"
              :class="[
                'px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200',
                canGoPrev 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105' 
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              ]"
            >
              ← PREV
            </button>
            
            <!-- Page Numbers -->
            <div class="flex gap-1">
              <button 
                v-for="page in Math.min(totalPages, 5)" 
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'w-10 h-10 rounded-lg font-mono text-sm transition-all duration-200 pagination-btn',
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                ]"
              >
                {{ page }}
              </button>
              
              <!-- Show ellipsis if more than 5 pages -->
              <span v-if="totalPages > 5" class="flex items-center px-2 text-gray-500">...</span>
              
              <!-- Show last page if more than 5 pages -->
              <button 
                v-if="totalPages > 5"
                @click="goToPage(totalPages)"
                :class="[
                  'w-10 h-10 rounded-lg font-mono text-sm transition-all duration-200 pagination-btn',
                  currentPage === totalPages 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                ]"
              >
                {{ totalPages }}
              </button>
            </div>
            
            <!-- Next Button -->
            <button 
              @click="goToNextPage"
              :disabled="!canGoNext"
              :class="[
                'px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200',
                canGoNext 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105' 
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              ]"
            >
              NEXT →
            </button>
          </div>
          
          <!-- Quick Jump -->
          <div class="flex items-center gap-3 text-sm">
            <span class="text-gray-400 font-mono">Jump to page:</span>
            <select 
              v-model="currentPage"
              @change="goToPage(currentPage)"
              class="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 font-mono text-sm focus:border-blue-500 focus:outline-none"
            >
              <option v-for="page in totalPages" :key="page" :value="page">
                {{ page }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DynamicNavbar from '../components/DynamicNavbar.vue'
import MagicalCircuitBackground from '../components/MagicalCircuitBackground.vue'

// Set page meta
useHead({
  title: 'All Projects - Portfolio',
  meta: [
    { name: 'description', content: 'Complete collection of all projects in the portfolio' }
  ]
})

const selectedFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 6

// All projects data (expanded from featured projects)
const allProjects = ref([
  // Featured projects (from home page)
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with advanced features including real-time inventory, payment integration, and admin dashboard. Built with modern technologies and scalable architecture.",
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
    description: "Intelligent chatbot with natural language processing capabilities for customer support and automated responses. Integrates with multiple platforms and provides analytics.",
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
    description: "Cross-platform mobile application for fitness tracking, workout plans, and health monitoring with wearable integration. Features social sharing and AI-powered recommendations.",
    image: "https://via.placeholder.com/400x200/dc2626/ffffff?text=Fitness+App",
    type: "MOBILE",
    status: "DEV",
    progress: 45,
    techStack: ["React Native", "Firebase", "Redux", "Health Kit", "GraphQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  
  // Additional non-featured projects
  {
    id: 4,
    title: "Task Management System",
    description: "Collaborative task management platform with team features, time tracking, and project analytics. Designed for remote teams and agile workflows.",
    image: "https://via.placeholder.com/400x200/059669/ffffff?text=Task+Manager",
    type: "WEB APP",
    status: "COMPLETE",
    progress: 100,
    techStack: ["React", "Express.js", "PostgreSQL", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "Real-time weather monitoring dashboard with data visualization, forecasting, and alert systems. Integrates multiple weather APIs for accuracy.",
    image: "https://via.placeholder.com/400x200/0891b2/ffffff?text=Weather+Dashboard",
    type: "WEB APP",
    status: "COMPLETE",
    progress: 100,
    techStack: ["Vue.js", "Chart.js", "Node.js", "Weather API"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 6,
    title: "Inventory Management",
    description: "Comprehensive inventory tracking system for small to medium businesses. Features barcode scanning, automated reordering, and reporting.",
    image: "https://via.placeholder.com/400x200/7c2d12/ffffff?text=Inventory+System",
    type: "WEB APP",
    status: "DEV",
    progress: 60,
    techStack: ["Laravel", "MySQL", "Bootstrap", "jQuery"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 7,
    title: "Social Media Analytics",
    description: "Analytics platform for social media performance tracking across multiple platforms. Provides insights, scheduling, and engagement metrics.",
    image: "https://via.placeholder.com/400x200/be185d/ffffff?text=Social+Analytics",
    type: "WEB APP",
    status: "BETA",
    progress: 80,
    techStack: ["Python", "Django", "Celery", "Redis", "D3.js"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 8,
    title: "Learning Management System",
    description: "Educational platform for online courses, student progress tracking, and interactive learning modules. Supports multimedia content and assessments.",
    image: "https://via.placeholder.com/400x200/4338ca/ffffff?text=LMS+Platform",
    type: "WEB APP",
    status: "DEV",
    progress: 35,
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 9,
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing projects, skills, and experience. Features responsive design, animations, and contact integration.",
    image: "https://via.placeholder.com/400x200/166534/ffffff?text=Portfolio+Site",
    type: "WEB APP",
    status: "COMPLETE",
    progress: 100,
    techStack: ["Nuxt.js", "GSAP", "Tailwind CSS", "Netlify"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 10,
    title: "Restaurant POS System",
    description: "Point of sale system for restaurants with order management, inventory tracking, and payment processing. Includes kitchen display and reporting.",
    image: "https://via.placeholder.com/400x200/dc2626/ffffff?text=POS+System",
    type: "WEB APP",
    status: "DEV",
    progress: 25,
    techStack: ["Vue.js", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 11,
    title: "Data Visualization Tool",
    description: "Interactive data visualization platform for business intelligence. Supports multiple data sources and customizable dashboards.",
    image: "https://via.placeholder.com/400x200/7c3aed/ffffff?text=Data+Viz+Tool",
    type: "WEB APP",
    status: "BETA",
    progress: 75,
    techStack: ["React", "D3.js", "Python", "Flask", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 12,
    title: "IoT Device Monitor",
    description: "Real-time monitoring system for IoT devices with alerting, data logging, and remote control capabilities. Supports various sensor types.",
    image: "https://via.placeholder.com/400x200/059669/ffffff?text=IoT+Monitor",
    type: "IOT",
    status: "DEV",
    progress: 40,
    techStack: ["Python", "MQTT", "InfluxDB", "Grafana", "Raspberry Pi"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  }
])

// Filter methods
const filterByStatus = (status) => {
  selectedFilter.value = status
  currentPage.value = 1 // Reset to first page when filtering
}

const getProjectsByStatus = (status) => {
  return allProjects.value.filter(project => project.status === status)
}

const filteredProjects = computed(() => {
  let projects = []
  if (selectedFilter.value === 'all') {
    projects = allProjects.value
  } else {
    projects = getProjectsByStatus(selectedFilter.value)
  }
  
  // Apply pagination
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return projects.slice(startIndex, endIndex)
})

const totalFilteredProjects = computed(() => {
  if (selectedFilter.value === 'all') {
    return allProjects.value
  }
  return getProjectsByStatus(selectedFilter.value)
})

const totalPages = computed(() => {
  return Math.ceil(totalFilteredProjects.value.length / itemsPerPage)
})

const canGoPrev = computed(() => currentPage.value > 1)
const canGoNext = computed(() => currentPage.value < totalPages.value)

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll to top of projects grid
    document.querySelector('.grid')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const goToPrevPage = () => {
  if (canGoPrev.value) {
    goToPage(currentPage.value - 1)
  }
}

const goToNextPage = () => {
  if (canGoNext.value) {
    goToPage(currentPage.value + 1)
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  overflow: hidden;
}

.font-outfit {
  font-family: 'Outfit', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

.font-mono {
  font-family: 'Roboto Mono', monospace;
}
</style>