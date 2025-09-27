<template>
    <section id="about-section" class="py-16 bg-gray-900 text-white flex items-center justify-center min-h-screen opacity-100 visible relative">
      <!-- Magical Circuit Background -->
      <MagicalCircuitBackground />
      <div class="container mx-auto px-4 max-w-6xl about-content opacity-100 visible relative z-10">
        <div class="bg-gray-800 border-2 border-blue-500 rounded-sm shadow-xl overflow-hidden p-8 relative">
          <!-- Header with Title -->
          <div class="text-center mb-8 border-b border-blue-600 pb-4">
            <h2 class="text-4xl md:text-5xl font-extrabold text-blue-400 font-outfit">[ STATUS WINDOW ]</h2>
          </div>
  
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Left Column: Photo, Name, Details -->
            <div v-if="aboutMeData" class="lg:w-1/3 flex flex-col items-center left-column-content">
              <div class="relative mb-6">
                <img 
                  :src="aboutMeData.profilePictureUrl || 'https://via.placeholder.com/250'" 
                  :alt="aboutMeData.name + ' Profile Picture'" 
                  class="w-64 h-64 rounded-sm object-cover border-2 border-blue-400 shadow-md"
                >
                <div class="level-badge absolute -bottom-3 -right-3 bg-blue-500 text-white px-4 py-2 rounded-sm text-xl font-bold border-2 border-blue-300 shadow-md font-outfit">
                  Lv {{ aboutMeData.level }}
                </div>
              </div>
              <h3 class="text-3xl font-bold mb-2 text-yellow-300 font-outfit">{{ aboutMeData.name }}</h3>
              <p v-if="aboutMeData.details.role" class="text-lg text-blue-300 font-inter">[ {{ aboutMeData.details.role }} ]</p>
              <p v-for="(value, key) in aboutMeData.details" :key="key" class="text-base text-gray-400 font-inter mb-1">
                <span v-if="key !== 'role'" class="capitalize">{{ key }}</span><span v-if="key !== 'role'">: {{ value }}</span>
              </p>
            </div>
            <div v-else class="lg:w-1/3 flex flex-col items-center left-column-content">
              <p>Loading profile data...</p>
            </div>
  
            <!-- Right Column: Stats, Description, Skills, Tools -->
            <div class="lg:w-2/3 flex flex-col gap-6">
              <!-- Stats Section -->
              <div class="bg-gray-700 p-6 rounded-sm border border-blue-600 shadow-sm stats-section">
                <h4 class="text-3xl font-bold mb-6 text-blue-300 font-outfit text-center">STATS</h4>
                <div class="flex justify-center overflow-hidden">
                  <div ref="radarChart" class="w-full h-[350px] md:h-[400px] min-w-0"></div>
                </div>
              </div>

              <!-- Description -->
              <div v-if="aboutMeData" class="bg-gray-700 p-6 rounded-sm border border-blue-600 shadow-sm description-section">
                <h4 class="text-3xl font-bold mb-4 text-blue-300 font-outfit">DESKRIPSI</h4>
                <p class="text-gray-200 leading-relaxed text-base font-inter">
                  {{ aboutMeData.description }}
                </p>
              </div>
  
              <!-- Skills -->
              <div v-if="aboutMeData && aboutMeData.skills && aboutMeData.skills.length" class="bg-gray-700 p-6 rounded-sm border border-blue-600 shadow-sm skills-section">
                <h4 class="text-3xl font-bold mb-4 text-blue-300 font-outfit">SKILLS</h4>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <span v-for="skill in aboutMeData.skills" :key="skill" class="skill-tag bg-blue-700 text-white px-3 py-2 rounded-sm text-sm font-semibold font-roboto-mono border border-blue-500 shadow-sm text-center">{{ skill }}</span>
                </div>
              </div>
  
              <!-- Tools -->
              <div v-if="aboutMeData && aboutMeData.tools && aboutMeData.tools.length" class="bg-gray-700 p-6 rounded-sm border border-blue-600 shadow-sm tools-section">
                <h4 class="text-3xl font-bold mb-4 text-blue-300 font-outfit">TOOLS</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <span v-for="tool in aboutMeData.tools" :key="tool" class="tool-tag bg-gray-600 text-white px-3 py-2 rounded-sm text-sm font-semibold font-roboto-mono border border-gray-400 shadow-sm text-center">{{ tool }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from "vue";
  import * as echarts from "echarts";
  import MagicalCircuitBackground from './MagicalCircuitBackground.vue';
  
  const radarChart = ref(null);
  let chartInstance = null;
  let animationFrameId;
  
  const aboutMeData = ref(null);
  
  // Fetch data from API
  const fetchAboutMeData = async () => {
    try {
      const response = await $fetch('/api/about');
      if (response.status === 200) {
        aboutMeData.value = response.data;
      } else {
        console.error('Failed to fetch AboutMe data:', response.message);
      }
    } catch (error) {
      console.error('Error fetching AboutMe data:', error);
    }
  };

  // Watch for changes in aboutMeData to update the chart
  watch(aboutMeData, (newData) => {
    if (newData && chartInstance) {
      updateChart(newData);
    }
  }, { deep: true });
  
  onMounted(async () => {
    await fetchAboutMeData(); // Fetch data on mount

    const isMobile = window.innerWidth <= 768;
    
    // Setup ECharts
    if (radarChart.value && aboutMeData.value) {
      chartInstance = echarts.init(radarChart.value);
      updateChart(aboutMeData.value);
      
      const handleResize = () => {
        chartInstance.resize();
      };
      
      window.addEventListener("resize", handleResize);
      
      onUnmounted(() => {
        window.removeEventListener("resize", handleResize);
        if (chartInstance) {
          chartInstance.dispose();
        }
      });
    }
  });
  
  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });

  const updateChart = (data) => {
    const indicator = Object.entries(data.stats).map(([key, stat]) => ({
      name: key.toUpperCase(),
      max: stat.max || 30, // Gunakan stat.max jika ada, default ke 30
    }));
    const values = Object.values(data.stats).map(stat => stat.value);
  
      const option = {
        backgroundColor: "transparent",
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#3b82f6',
          textStyle: {
            color: '#fff'
        },
        formatter: function (params) {
          let seriesName = params.name;
          let html = `<div style="text-align: left;">${seriesName}<br/>`;
          params.data.value.forEach((val, index) => {
            const indicatorName = indicator[index].name;
            const indicatorMax = indicator[index].max;
            html += `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${indicatorName}: ${val}/${indicatorMax}<br/>`;
          });
          html += '</div>';
          return html;
          }
        },
        radar: {
          nameGap: 35, // Increased gap to provide more space for labels
          indicator: indicator,
          center: ["50%", "50%"],
          radius: window.innerWidth <= 768 ? "45%" : "55%", // Slightly smaller radius to create more space for labels
          startAngle: 90,
          splitNumber: 5,
          shape: "circle",
          axisName: {
            color: "#93c5fd",
            fontSize: window.innerWidth <= 768 ? 10 : 13, // Increased font size for readability
            fontWeight: "bold",
            fontFamily: "Outfit, sans-serif",
            overflow: 'break',
            width: 'auto', // Allow ECharts to determine width automatically
            height: 'auto', // Allow ECharts to determine height automatically
            lineHeight: 14,
            formatter: function (value) {
              // Split long text into multiple lines for better readability
              if (value.length > 12) {
                const words = value.split(' ');
                if (words.length > 1) {
                  const mid = Math.ceil(words.length / 2);
                  return words.slice(0, mid).join(' ') + '\n' + words.slice(mid).join(' ');
                }
              }
              return value;
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(59, 130, 246, 0.3)",
              width: 1
            },
          },
          splitArea: {
            areaStyle: {
              color: [
                "rgba(59, 130, 246, 0.05)", 
                "rgba(59, 130, 246, 0.1)",
                "rgba(59, 130, 246, 0.05)", 
                "rgba(59, 130, 246, 0.1)",
                "rgba(59, 130, 246, 0.05)"
              ],
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(59, 130, 246, 0.5)",
            },
          },
        },
        series: [
          {
            type: "radar",
            data: [
              {
              value: values,
                name: "Character Stats",
                areaStyle: {
                  color: "rgba(59, 130, 246, 0.25)",
                },
                lineStyle: {
                  color: "#60a5fa",
                  width: 3
                },
                symbol: "circle",
              symbolSize: window.innerWidth <= 768 ? 4 : 6,
                itemStyle: {
                  color: "#60a5fa",
                  borderColor: "#1e40af",
                  borderWidth: 2,
                },
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.value;
                  },
                  color: "#fff",
                  fontWeight: "bold",
                fontSize: window.innerWidth <= 768 ? 8 : 10,
                  fontFamily: "Outfit, sans-serif"
                }
              },
            ],
          },
        ],
      };
    chartInstance.setOption(option);
  };
  
  // Dust particle system remains but without complex formation animations
  </script>
  
  <style scoped>
  .font-outfit {
    font-family: 'Press Start 2P', 'Press Start 2P Fallback', monospace;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
  .font-inter {
    font-family: 'Press Start 2P', 'Press Start 2P Fallback', monospace;
  }
  .font-roboto-mono {
    font-family: 'Press Start 2P', 'Press Start 2P Fallback', monospace;
  }

  /* Hover effects for interactive feel */
  .skill-tag:hover {
    background-color: #1d4ed8;
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }

  .tool-tag:hover {
    background-color: #4b5563;
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }
  
  .about-dust-canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 15;
    pointer-events: none;
  }
  
  /* Mobile optimizations */
  @media (max-width: 768px) {
    .about-dust-canvas {
      display: none; /* Hide dust canvas on mobile */
    }
    
    #about-section {
      padding: 2rem 0; /* Reduce padding */
      min-height: auto; /* Remove min-height constraint */
    }
    
    .container {
      padding: 0 1rem;
    }
    
    .bg-gray-800 {
      padding: 1.5rem; /* Reduce padding */
    }
    
    /* Stack layout on mobile */
    .flex.flex-col.lg\:flex-row {
      gap: 1.5rem;
    }
    
    /* Smaller profile image */
    .w-64.h-64 {
      width: 12rem;
      height: 12rem;
    }
    

    
    /* Adjust text sizes */
    .text-4xl.md\:text-5xl {
      font-size: 2rem;
    }
    
    .text-3xl {
      font-size: 1.5rem;
    }
    
    .text-lg {
      font-size: 1rem;
    }
    
    /* Simplify grid layouts */
    .grid.grid-cols-2.sm\:grid-cols-3 {
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
    
    .grid.grid-cols-2.sm\:grid-cols-4 {
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
    
    /* Smaller tags */
    .skill-tag,
    .tool-tag {
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
    }
    
    /* Stats section mobile optimization */
    .stats-section {
      padding: 1rem;
    }
    
    .stats-section h4 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .bg-gray-800 {
      padding: 1rem;
    }
    
    .stats-section {
      padding: 0.75rem;
    }
    
    .stats-section h4 {
      font-size: 1rem;
      margin-bottom: 0.75rem;
    }
    
    .skill-tag,
    .tool-tag {
      padding: 0.375rem 0.5rem;
      font-size: 0.7rem;
    }
  }
  </style>