<template>
  <section class="py-20 bg-gray-50 text-center md:text-left">
    <div class="container mx-auto px-4 max-w-5xl">
      <div class="flex flex-col md:flex-row items-center justify-center gap-10">
        <div class="flex-shrink-0">
          <!-- Placeholder for your photo -->
          <img src="#" alt="Profile Photo" class="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg">
        </div>
        <div class="max-w-xl">
          <p class="text-lg leading-relaxed mb-5">Hello, saya adalah [Nama Anda]. Saya seorang [Profesi Anda] dengan passion dalam [Minat Anda].</p>
          
          <h3 class="text-2xl font-semibold mb-3 text-gray-800">Keahlian Saya:</h3>
          <ul class="flex flex-wrap justify-center md:justify-start gap-3 mb-8 list-none p-0">
            <li class="bg-blue-600 text-white py-2 px-4 rounded-full text-sm">JavaScript</li>
            <li class="bg-blue-600 text-white py-2 px-4 rounded-full text-sm">Vue.js / Nuxt.js</li>
            <li class="bg-blue-600 text-white py-2 px-4 rounded-full text-sm">Node.js / Express.js</li>
            <li class="bg-blue-600 text-white py-2 px-4 rounded-full text-sm">Prisma ORM</li>
            <li class="bg-blue-600 text-white py-2 px-4 rounded-full text-sm">PostgreSQL</li>
            <li class="bg-blue-600 text-white py-2 px-4 rounded-full text-sm">HTML & CSS</li>
          </ul>

          <a href="/resume.pdf" download class="inline-block bg-green-600 text-white py-3 px-6 rounded-md text-lg hover:bg-green-700 transition duration-300">Unduh Resume</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Anda bisa menambahkan logika script di sini jika diperlukan
</script>
