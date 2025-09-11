<template>
    <section class="py-16 bg-gray-900 text-white flex items-center justify-center min-h-screen">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="bg-gray-800 border-2 border-blue-500 rounded-lg shadow-xl overflow-hidden p-8 relative">
          <!-- Header with Title -->
          <div class="text-center mb-8 border-b border-blue-600 pb-4">
            <h2 class="text-4xl md:text-5xl font-extrabold text-blue-400 font-outfit">[ STATUS WINDOW ]</h2>
          </div>
  
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Left Column: Photo, Name, Role, Race -->
            <div class="lg:w-1/3 flex flex-col items-center about-me-animate left-column-content">
              <div class="relative mb-6">
                <img 
                  src="https://via.placeholder.com/250" 
                  alt="Profile Picture" 
                  class="w-64 h-64 rounded-xl object-cover border-2 border-blue-400 shadow-md"
                >
                <div class="level-badge absolute -bottom-3 -right-3 bg-blue-500 text-white px-4 py-2 rounded-full text-xl font-bold border-2 border-blue-300 shadow-md font-outfit">
                  LVL 10
                </div>
              </div>
              <h3 class="text-3xl font-bold mb-2 text-yellow-300 font-outfit">M Fikri Baihaqi</h3>
              <p class="text-lg text-blue-300 font-inter">[ Fullstack Developer ]</p>
              <p class="text-base text-gray-400 font-inter mb-1">Race: Human</p>
              <p class="text-base text-gray-400 font-inter mb-1">Class: Backend Architect</p>
              <p class="text-base text-gray-400 font-inter mb-1">Guild: PondokIT</p>
              <p class="text-base text-gray-400 font-inter mb-1">Origin: Indonesia</p>
              <p class="text-base text-gray-400 font-inter mb-1">Alignment: Chaotic Neutral</p>
            </div>
  
            <!-- Right Column: Stats, Description, Skills, Tools -->
            <div class="lg:w-2/3 flex flex-col gap-6">
              <!-- Stats Section -->
              <div class="bg-gray-700 p-6 rounded-lg border border-blue-600 shadow-sm about-me-animate stats-section">
                <h4 class="text-3xl font-bold mb-6 text-blue-300 font-outfit text-center">STATS</h4>
                <div class="flex justify-center">
                  <div ref="radarChart" class="w-[400px] h-[350px]"></div>
                </div>
              </div>

              <!-- Description -->
              <div class="bg-gray-700 p-6 rounded-lg border border-blue-600 shadow-sm about-me-animate description-section">
                <h4 class="text-3xl font-bold mb-4 text-blue-300 font-outfit">DESKRIPSI</h4>
                <p class="text-gray-200 leading-relaxed text-base font-inter">
                  Seorang petualang digital yang bersemangat, mengarungi lautan kode dengan pedang keyboard di tangan. Dengan pengalaman lebih dari 3 tahun, saya telah menaklukkan berbagai bug dan membangun sistem yang kokoh. Misi saya adalah mengubah ide menjadi realitas digital, satu baris kode pada satu waktu.
                </p>
              </div>
  
              <!-- Skills -->
              <div class="bg-gray-700 p-6 rounded-lg border border-blue-600 shadow-sm about-me-animate skills-section">
                <h4 class="text-3xl font-bold mb-4 text-blue-300 font-outfit">SKILLS</h4>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <span class="skill-tag bg-blue-700 text-white px-3 py-2 rounded-full text-sm font-semibold font-roboto-mono border border-blue-500 shadow-sm text-center">JavaScript</span>
                  <span class="skill-tag bg-blue-700 text-white px-3 py-2 rounded-full text-sm font-semibold font-roboto-mono border border-blue-500 shadow-sm text-center">Vue.js</span>
                  <span class="skill-tag bg-blue-700 text-white px-3 py-2 rounded-full text-sm font-semibold font-roboto-mono border border-blue-500 shadow-sm text-center">Node.js</span>
                  <span class="skill-tag bg-blue-700 text-white px-3 py-2 rounded-full text-sm font-semibold font-roboto-mono border border-blue-500 shadow-sm text-center">Tailwind CSS</span>
                  <span class="skill-tag bg-blue-700 text-white px-3 py-2 rounded-full text-sm font-semibold font-roboto-mono border border-blue-500 shadow-sm text-center">Database (SQL/NoSQL)</span>
                  <span class="skill-tag bg-blue-700 text-white px-3 py-2 rounded-full text-sm font-semibold font-roboto-mono border border-blue-500 shadow-sm text-center">RESTful API</span>
                </div>
              </div>
  
              <!-- Tools -->
              <div class="bg-gray-700 p-6 rounded-lg border border-blue-600 shadow-sm about-me-animate tools-section">
                <h4 class="text-3xl font-bold mb-4 text-blue-300 font-outfit">TOOLS</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <span class="tool-tag bg-gray-600 text-white px-3 py-2 rounded-full text-sm font-semibold font-roboto-mono border border-gray-400 shadow-sm text-center">VS Code</span>
                  <span class="tool-tag bg-gray-600 text-white px-3 py-2 rounded-full text-sm font-semibold font-roboto-mono border border-gray-400 shadow-sm text-center">Git</span>
                  <span class="tool-tag bg-gray-600 text-white px-3 py-2 rounded-full text-sm font-semibold font-roboto-mono border border-gray-400 shadow-sm text-center">NPM/Yarn</span>
                  <span class="tool-tag bg-gray-600 text-white px-3 py-2 rounded-full text-sm font-semibold font-roboto-mono border border-gray-400 shadow-sm text-center">Docker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import * as echarts from "echarts";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  
  const radarChart = ref(null);
  
  onMounted(() => {
    // Initial setup for ECharts (already present)
    if (radarChart.value) {
      const chart = echarts.init(radarChart.value);
  
      const option = {
        backgroundColor: "transparent",
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#3b82f6',
          textStyle: {
            color: '#fff'
          }
        },
        radar: {
          indicator: [
            { name: "STRENGTH", max: 30 },
            { name: "STAMINA", max: 30 },
            { name: "MANA\nDETECTION", max: 30 },
            { name: "REFLEX", max: 30 },
            { name: "Intelegent", max: 30 },
          ],
          center: ["50%", "50%"],
          radius: "65%",
          startAngle: 90,
          splitNumber: 5,
          shape: "circle",
          axisName: {
            color: "#93c5fd",
            fontSize: 13,
            fontWeight: "bold",
            fontFamily: "Outfit, sans-serif"
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
                value: [15, 17, 17, 27,30],
                name: "Character Stats",
                areaStyle: {
                  color: "rgba(59, 130, 246, 0.25)",
                },
                lineStyle: {
                  color: "#60a5fa",
                  width: 3
                },
                symbol: "circle",
                symbolSize: 6,
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
                  fontSize: 10,
                  fontFamily: "Outfit, sans-serif"
                }
              },
            ],
          },
        ],
      };
  
      chart.setOption(option);
      
      // Handle window resize
      const handleResize = () => {
        chart.resize();
      };
      
      window.addEventListener("resize", handleResize);
      
      onUnmounted(() => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      });
    }
  
    // Set initial states for elements to animate in
    gsap.set(".about-me-animate", { opacity: 0, y: 50 });
  
    // Animation for Left Column (Photo, Name, Role, Race)
    gsap.to(".left-column-content", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".left-column-content",
        start: "top 85%", // Adjust as needed
        end: "bottom 15%", // End animation when element is 15% from bottom of viewport
        toggleActions: "play reverse play reverse", // Play on enter, reverse on leave back, play on enter back, reverse on leave
        // markers: true,
        // once: true,
      },
    });
  
    // Animation for Stats Section
    gsap.to(".stats-section", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 85%", // Adjust as needed
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
        // markers: true,
        // once: true,
      },
    });
  
    // Animation for Description
    gsap.to(".description-section", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".description-section",
        start: "top 85%", // Adjust as needed
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
        // markers: true,
        // once: true,
      },
    });
  
    // Animation for Skills Section
    gsap.to(".skills-section", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 85%", // Adjust as needed
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
        // markers: true,
        // once: true,
      },
    });
  
    // Animation for Tools Section
    gsap.to(".tools-section", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".tools-section",
        start: "top 85%", // Adjust as needed
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
        // markers: true,
        // once: true,
      },
    });
  
    // Cleanup ScrollTrigger instances on unmount
    onUnmounted(() => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });
  });
  </script>
  
  <style scoped>
  .font-outfit {
    font-family: 'Outfit', sans-serif;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
  .font-roboto-mono {
    font-family: 'Roboto Mono', monospace;
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
  </style>