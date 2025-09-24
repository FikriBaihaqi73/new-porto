<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <div class="text-xl font-semibold">Dashboard Header</div>
    <nav>
      <ul class="flex space-x-4">
        <li>
          <NuxtLink to="#" class="text-gray-600 hover:text-gray-900">Settings</NuxtLink>
        </li>
        <li>
          <button @click="logout" class="text-gray-600 hover:text-gray-900">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();

const logout = () => {
  auth.removeToken();
  router.push('/login'); // Redirect to login page after logout
};
</script>

<style scoped>
/* Add your header specific styles here */
</style>
