<template>
  <section id="experience-section" class="py-16 bg-gray-900 text-white flex items-center justify-center min-h-screen opacity-100 visible relative">
    <!-- Magical Circuit Background -->
    <MagicalCircuitBackground />
    <div class="container mx-auto px-4 max-w-4xl experience-content opacity-100 visible relative z-10">
      <!-- Header with Title -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-extrabold text-blue-400 press-start-font mb-4">[ GUILD CODEX ]</h2>
        <div class="w-32 h-1 bg-blue-500 mx-auto rounded-sm"></div>
      </div>

      <!-- Guild Cards - Vertical Layout -->
      <div class="space-y-8">
        <!-- Guild Card 1 -->
        <div class="guild-card bg-gray-800 border-2 border-blue-500 rounded-sm shadow-xl overflow-hidden relative">
          <!-- Guild Header -->
          <div class="bg-blue-600 p-4 border-b-2 border-blue-500">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-800 border-2 border-blue-400 rounded-sm flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2M12 4.3L20 8.2V10C20 15.5 16.2 19.1 12 20C7.8 19.1 4 15.5 4 10V8.2L12 4.3Z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg text-white press-start-font">Rumah IT</h3>
                  <p class="text-xs text-blue-200 press-start-font mt-1">Frontend Specialist</p>
                </div>
              </div>
              <div class="bg-green-500 text-white px-3 py-1 rounded-sm text-xs press-start-font">
                COMPLETE
              </div>
            </div>
          </div>

          <!-- Guild Content -->
          <div class="p-6">
            <!-- Guild Info Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2M12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z"/>
                  </svg>
                  <span class="text-gray-300 press-start-font text-xs">Location:</span>
                  <span class="text-blue-300 press-start-font text-xs">Jakarta, Indonesia</span>
                </div>
                
                <div class="flex items-center gap-3">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7V9H9V11M13 11H11V9H13V11M17 11H15V9H17V11M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V8H19V19Z"/>
                  </svg>
                  <span class="text-gray-300 press-start-font text-xs">Duration:</span>
                  <span class="text-blue-300 press-start-font text-xs">Jan 2023 – Sep 2024</span>
                </div>
              </div>
              
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C9.94 10.26 9.13 10 8.25 10C5.35 10 3 12.35 3 15.25S5.35 20.5 8.25 20.5 13.5 18.15 13.5 15.25C13.5 14.37 13.24 13.56 12.75 12.91L14.5 11.16L16.17 12.83L17.67 11.33L13.67 7.33L16 5H18L21 8V9M10.76 15.36L11.76 14.36L15.64 18.24L14.64 19.24L10.76 15.36Z"/>
                  </svg>
                  <span class="text-gray-300 press-start-font text-xs">Experience:</span>
                  <span class="text-green-400 press-start-font text-xs">2 Years</span>
                </div>
                
                <div class="flex items-center gap-3">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5V9H21V5M9 19H21V15H9M9 14H21V10H9M4 9H8L6 11.5L8 14H4C2.89 14 2 13.11 2 12S2.89 10 4 10V9M4 15C5.11 15 6 15.89 6 17S5.11 19 4 19 2 18.11 2 17 2.89 15 4 15Z"/>
                  </svg>
                  <span class="text-gray-300 press-start-font text-xs">Projects:</span>
                  <span class="text-green-400 press-start-font text-xs">5 Complete</span>
                </div>
              </div>
            </div>

            <!-- Achievement -->
            <div class="bg-gray-700 border border-blue-500 rounded-sm p-4 mb-4">
              <div class="flex items-start gap-3 mb-2">
                <svg class="w-4 h-4 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16L3 5H1V3H4L6 14H18L20 7H8V5H21C21.6 5 22 5.4 22 6S21.6 7 21 7L19 15H6L5 16M6 18C4.9 18 4 18.9 4 20S4.9 22 6 22 8 21.1 8 20 7.1 18 6 18M18 18C16.9 18 16 18.9 16 20S16.9 22 18 22 20 21.1 20 20 19.1 18 18 18Z"/>
                </svg>
                <div>
                  <h4 class="text-blue-300 press-start-font text-xs mb-2">Main Achievement:</h4>
                  <p class="text-gray-200 press-start-font text-xs leading-relaxed">
                    Developed internal dashboard with dynamic data visualization, improving team productivity by 40% and reducing manual reporting time.
                  </p>
                </div>
              </div>
            </div>

            <!-- Skills  -->
            <div>
              <div class="flex items-center gap-3 mb-3">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 7.26L17 4L14.74 8.91L20 9L14.74 9.09L17 14L13.09 10.74L12 16L10.91 10.74L7 14L9.26 9.09L4 9L9.26 8.91L7 4L10.91 7.26L12 2Z"/>
                </svg>
                <span class="text-blue-300 press-start-font text-xs">Skills Acquired:</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="skill-tag bg-blue-700 text-white px-3 py-1 rounded-sm text-xs press-start-font border border-blue-500">React</span>
                <span class="skill-tag bg-blue-700 text-white px-3 py-1 rounded-sm text-xs press-start-font border border-blue-500">Tailwind</span>
                <span class="skill-tag bg-blue-700 text-white px-3 py-1 rounded-sm text-xs press-start-font border border-blue-500">Chart.js</span>
                <span class="skill-tag bg-blue-700 text-white px-3 py-1 rounded-sm text-xs press-start-font border border-blue-500">Git</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Guild Card 2 -->
        <div class="guild-card bg-gray-800 border-2 border-green-500 rounded-sm shadow-xl overflow-hidden relative">
          <!-- Guild Header -->
          <div class="bg-green-600 p-4 border-b-2 border-green-500">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-green-800 border-2 border-green-400 rounded-sm flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2M12 4.3L20 8.2V10C20 15.5 16.2 19.1 12 20C7.8 19.1 4 15.5 4 10V8.2L12 4.3Z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg text-white press-start-font">Tech Startup Inc</h3>
                  <p class="text-xs text-green-200 press-start-font mt-1">Fullstack Developer</p>
                </div>
              </div>
              <div class="bg-yellow-500 text-black px-3 py-1 rounded-sm text-xs press-start-font">
                ACTIVE
              </div>
            </div>
          </div>

          <!-- Guild Content -->
          <div class="p-6">
            <!-- Guild Info Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2M12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z"/>
                  </svg>
                  <span class="text-gray-300 press-start-font text-xs">Location:</span>
                  <span class="text-green-300 press-start-font text-xs">Remote</span>
                </div>
                
                <div class="flex items-center gap-3">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7V9H9V11M13 11H11V9H13V11M17 11H15V9H17V11M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V8H19V19Z"/>
                  </svg>
                  <span class="text-gray-300 press-start-font text-xs">Duration:</span>
                  <span class="text-green-300 press-start-font text-xs">Oct 2024 – Present</span>
                </div>
              </div>
              
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C9.94 10.26 9.13 10 8.25 10C5.35 10 3 12.35 3 15.25S5.35 20.5 8.25 20.5 13.5 18.15 13.5 15.25C13.5 14.37 13.24 13.56 12.75 12.91L14.5 11.16L16.17 12.83L17.67 11.33L13.67 7.33L16 5H18L21 8V9M10.76 15.36L11.76 14.36L15.64 18.24L14.64 19.24L10.76 15.36Z"/>
                  </svg>
                  <span class="text-gray-300 press-start-font text-xs">Experience:</span>
                  <span class="text-green-400 press-start-font text-xs">6 Months</span>
                </div>
                
                <div class="flex items-center gap-3">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5V9H21V5M9 19H21V15H9M9 14H21V10H9M4 9H8L6 11.5L8 14H4C2.89 14 2 13.11 2 12S2.89 10 4 10V9M4 15C5.11 15 6 15.89 6 17S5.11 19 4 19 2 18.11 2 17 2.89 15 4 15Z"/>
                  </svg>
                  <span class="text-gray-300 press-start-font text-xs">Projects:</span>
                  <span class="text-green-400 press-start-font text-xs">3 Active</span>
                </div>
              </div>
            </div>

            <!-- Achievement -->
            <div class="bg-gray-700 border border-green-500 rounded-sm p-4 mb-4">
              <div class="flex items-start gap-3 mb-2">
                <svg class="w-4 h-4 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16L3 5H1V3H4L6 14H18L20 7H8V5H21C21.6 5 22 5.4 22 6S21.6 7 21 7L19 15H6L5 16M6 18C4.9 18 4 18.9 4 20S4.9 22 6 22 8 21.1 8 20 7.1 18 6 18M18 18C16.9 18 16 18.9 16 20S16.9 22 18 22 20 21.1 20 20 19.1 18 18 18Z"/>
                </svg>
                <div>
                  <h4 class="text-green-300 press-start-font text-xs mb-2">Current Mission:</h4>
                  <p class="text-gray-200 press-start-font text-xs leading-relaxed">
                    Building scalable microservices architecture and implementing real-time features for a growing user base of 10K+ active users.
                  </p>
                </div>
              </div>
            </div>

            <!-- Skills Arsenal -->
            <div>
              <div class="flex items-center gap-3 mb-3">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 7.26L17 4L14.74 8.91L20 9L14.74 9.09L17 14L13.09 10.74L12 16L10.91 10.74L7 14L9.26 9.09L4 9L9.26 8.91L7 4L10.91 7.26L12 2Z"/>
                </svg>
                <span class="text-green-300 press-start-font text-xs">Skills Acquired:</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="skill-tag bg-green-700 text-white px-3 py-1 rounded-sm text-xs press-start-font border border-green-500">Vue.js</span>
                <span class="skill-tag bg-green-700 text-white px-3 py-1 rounded-sm text-xs press-start-font border border-green-500">Node.js</span>
                <span class="skill-tag bg-green-700 text-white px-3 py-1 rounded-sm text-xs press-start-font border border-green-500">MongoDB</span>
                <span class="skill-tag bg-green-700 text-white px-3 py-1 rounded-sm text-xs press-start-font border border-green-500">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>