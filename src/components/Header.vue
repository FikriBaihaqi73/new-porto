<template>
  <header class="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1c] shadow-lg p-4 flex justify-between items-center border-b border-blue-700 shadow-blue-900/40 relative z-10">
    <div class="text-xl font-semibold text-blue-400">Admin Panel</div>
    <nav>
      <ul class="flex space-x-4">
        <li>
          <button @click="logout" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg shadow-red-500/30">
            Logout
          </button>
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
