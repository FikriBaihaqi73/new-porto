<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
      <h3 class="text-2xl font-bold text-center">Login to your account</h3>
      <form @submit.prevent="login">
        <div class="mt-4">
          <div>
            <label class="block" for="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              v-model="email"
              required
            />
          </div>
          <div class="mt-4">
            <label class="block" for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              v-model="password"
              required
            />
          </div>
          <div class="flex items-baseline justify-between">
            <button
              type="submit"
              class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const email = ref('');
const password = ref('');
const router = useRouter();
const auth = useAuth();

const login = async () => {
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    });
    // Handle successful login, e.g., store token, redirect
    auth.setToken(response.token);
    router.push('/admin/dashboard'); // Redirect to a protected route
  } catch (error) {
    alert(error.data.statusMessage);
  }
};
</script>
