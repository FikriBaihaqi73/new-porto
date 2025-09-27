<template>
  <div class="flex min-h-screen bg-gradient-to-br from-[#0f0f1c] to-[#1a1a2e] text-white">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Header />

      <!-- Page content -->
      <main class="flex-1 p-6">
        <div class="container mx-auto bg-[#1f2937]/80 p-8 rounded-lg shadow-xl border border-blue-700/50 backdrop-filter backdrop-blur-sm">
          <h1 class="text-4xl font-bold mb-6 text-blue-400">Admin Dashboard</h1>
          <p v-if="userMessage" class="text-teal-300 text-lg">{{ userMessage }}</p>
          <p v-else class="text-gray-400 text-lg">Loading admin data...</p>
          <!-- The logout button here is redundant as it's in the Header now -->
          <!-- <button @click="logout" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button> -->
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';
import Sidebar from '~/components/Sidebar.vue';
import Header from '~/components/Header.vue';

const userMessage = ref(null);
const router = useRouter();
const auth = useAuth();

const fetchAdminData = async () => {
  try {
    const token = auth.getToken(); // Gunakan useAuth
    if (!token) {
      router.push('/login');
      return;
    }
    const response = await $fetch('/api/admin/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    userMessage.value = response.message;
  } catch (error) {
    alert(error.data.statusMessage || 'Failed to fetch admin data');
    router.push('/login');
  }
};

// Logout function is now handled by the Header component, but keeping it for consistency if needed elsewhere
const logout = () => {
  auth.removeToken(); // Gunakan useAuth
  router.push('/login');
};

onMounted(fetchAdminData);
</script>
