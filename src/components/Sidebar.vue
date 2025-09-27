<template>
  <aside class="w-64 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1c] text-white p-4 min-h-screen shadow-2xl shadow-blue-900/40">
    <div class="text-2xl font-bold mb-6 text-blue-400">Admin Core</div>
    <nav>
      <ul>
        <li class="mb-2">
          <NuxtLink to="/admin/dashboard" class="flex items-center text-teal-300 hover:text-teal-100 py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-[#1f2937] shadow-blue-900/40 hover:shadow-teal-500/20">
            <i class="icon-[lucide--layout-dashboard] w-5 h-5 mr-3"></i>
            Dashboard
          </NuxtLink>
        </li>
        <li class="mb-2">
          <NuxtLink to="/admin/about" class="flex items-center text-teal-300 hover:text-teal-100 py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-[#1f2937] shadow-blue-900/40 hover:shadow-teal-500/20">
            <i class="icon-[lucide--user] w-5 h-5 mr-3"></i>
            About Me
          </NuxtLink>
        </li>
        <li class="mb-2">
          <NuxtLink to="/admin/projects" class="flex items-center text-teal-300 hover:text-teal-100 py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-[#1f2937] shadow-blue-900/40 hover:shadow-teal-500/20">
            <i class="icon-[lucide--folder-git-2] w-5 h-5 mr-3"></i>
            Projects
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
// You can add logic here if needed
</script>

<style scoped>
/* Add your sidebar specific styles here */
</style>
