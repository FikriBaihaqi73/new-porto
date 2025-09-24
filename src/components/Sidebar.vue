<template>
  <aside class="w-64 bg-gray-800 text-white p-4 min-h-screen">
    <div class="text-2xl font-bold mb-6">Admin Dashboard</div>
    <nav>
      <ul>
        <li class="mb-2">
          <NuxtLink to="/admin/dashboard" class="block hover:bg-gray-700 p-2 rounded">Dashboard</NuxtLink>
        </li>
        <li class="mb-2">
          <NuxtLink to="/admin/projects" class="block hover:bg-gray-700 p-2 rounded">Projects</NuxtLink>
        </li>
        <li class="mb-2">
          <NuxtLink to="/admin/users" class="block hover:bg-gray-700 p-2 rounded">Users</NuxtLink>
        </li>
        <!-- Add more navigation links here -->
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
