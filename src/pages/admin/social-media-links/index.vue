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
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-extrabold text-blue-400 mb-8">Social Media Links</h1>

          <div class="flex justify-end mb-6">
            <NuxtLink to="/admin/social-media-links/create" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200">
              + Add New Link
            </NuxtLink>
          </div>

          <div v-if="loading" class="text-center text-blue-300 text-lg py-12">Loading social media links...</div>
          <div v-else-if="error" class="text-center text-red-500 text-lg py-12">{{ error }}</div>
          <div v-else-if="socialMediaLinks.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">🔗</div>
            <h3 class="text-xl font-bold text-gray-400 mb-2">No social media links found.</h3>
            <p class="text-gray-500">Add some links to connect!</p>
          </div>
          <div v-else class="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-700">
              <thead class="bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">URL</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr v-for="link in socialMediaLinks" :key="link.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{{ link.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-400 hover:underline"><a :href="link.url" target="_blank">{{ link.url }}</a></td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <NuxtLink :to="`/admin/social-media-links/${link.id}`" class="text-blue-500 hover:text-blue-400 mr-4">Edit</NuxtLink>
                    <button @click="deleteLink(link.id)" class="text-red-500 hover:text-red-400">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Sidebar from '~/components/Sidebar.vue';
import Header from '~/components/Header.vue';

interface SocialMediaLink {
  id: string;
  name: string;
  url: string;
  svgPath: string | null;
}

const socialMediaLinks = ref<SocialMediaLink[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const fetchSocialMediaLinks = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await $fetch<{ status: number; data: SocialMediaLink[]; message?: string }>('/api/social-media-links');
    if (response.status === 200 && response.data) {
      socialMediaLinks.value = response.data;
    } else {
      error.value = response.message || 'Failed to fetch social media links';
    }
  } catch (err: any) {
    error.value = err.data?.statusMessage || err.message || 'Error fetching social media links';
    console.error("Error fetching social media links:", err);
  } finally {
    loading.value = false;
  }
};

const deleteLink = async (id: string) => {
  if (!confirm('Are you sure you want to delete this social media link?')) {
    return;
  }
  try {
    const response = await $fetch<{ status: number; message?: string }>(`/api/social-media-links/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      alert('Social media link deleted successfully!');
      fetchSocialMediaLinks(); // Refresh the list
    } else {
      alert(response.message || 'Failed to delete social media link');
    }
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Error deleting social media link');
    console.error(err);
  }
};

onMounted(fetchSocialMediaLinks);
</script>
