<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Admin Dashboard</h1>
    <p v-if="userMessage">{{ userMessage }}</p>
    <p v-else>Loading admin data...</p>
    <button @click="logout" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
  </div>
</template>

<script setup>
const userMessage = ref(null);
const router = useRouter();

const fetchAdminData = async () => {
  try {
    const token = localStorage.getItem('authToken');
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

const logout = () => {
  localStorage.removeItem('authToken');
  router.push('/login');
};

onMounted(fetchAdminData);
</script>
