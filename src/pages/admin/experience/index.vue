<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0f0f1c] to-[#1a1a2e] text-white flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 p-6">
        <h1 class="text-4xl font-bold mb-8 text-blue-400">Manage Experience</h1>

        <div class="flex justify-end mb-6">
          <NuxtLink to="/admin/experience/create" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-md hover:shadow-lg shadow-green-500/30">
            + Add New Experience
          </NuxtLink>
        </div>

        <div v-if="loading" class="text-center text-teal-300">Loading experiences...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-else-if="experiences.length === 0" class="bg-[#1f2937]/80 p-8 rounded-lg shadow-xl border border-blue-700/50 backdrop-filter backdrop-blur-sm max-w-4xl mx-auto text-center">
          <p class="text-lg text-gray-300 mb-4">No experience entries found. Add one now!</p>
          <NuxtLink to="/admin/experience/create" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-md hover:shadow-lg shadow-blue-500/30">
            Create First Experience Entry
          </NuxtLink>
        </div>
        <div v-else class="bg-[#1f2937]/80 rounded-lg shadow-xl border border-blue-700/50 backdrop-filter backdrop-blur-sm overflow-hidden">
          <table class="min-w-full divide-y divide-blue-800">
            <thead class="bg-[#2e3a4e]">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">Company</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">Job Title</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">Duration</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">Status</th>
                <th scope="col" class="relative px-6 py-3"><span class="sr-only">Edit</span></th>
              </tr>
            </thead>
            <tbody class="bg-[#1f2937]/80 divide-y divide-blue-800">
              <tr v-for="experience in experiences" :key="experience.id" class="hover:bg-[#1f2937]">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{{ experience.companyName }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ experience.jobTitle }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ experience.duration }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    experience.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  ]">{{ experience.status }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <NuxtLink :to="`/admin/experience/${experience.id}`" class="text-blue-400 hover:text-blue-300 mr-4">Edit</NuxtLink>
                  <button @click="deleteExperience(experience.id)" class="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Sidebar from '~/components/Sidebar.vue';
import Header from '~/components/Header.vue';

interface Experience {
  id: string;
  companyName: string;
  jobTitle: string;
  location: string;
  startDate: string;
  endDate: string | null;
  status: string;
  duration: string;
  mainAchievement: string;
  skillsAcquired: string[];
  projectsCount: number;
  logoUrl: string | null;
}

const experiences = ref<Experience[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const fetchExperiences = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await $fetch<{ status: number; data: Experience[]; message?: string }>('/api/experience');
    if (response.status === 200 && response.data) {
      experiences.value = response.data;
    } else {
      error.value = response.message || 'Failed to fetch experiences';
    }
  } catch (err: any) {
    error.value = err.data?.statusMessage || err.message || 'Error fetching experiences';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const deleteExperience = async (id: string) => {
  if (!confirm('Are you sure you want to delete this experience entry?')) {
    return;
  }
  try {
    const response = await $fetch<{ status: number; message?: string }>(`/api/experience/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      alert('Experience entry deleted successfully!');
      fetchExperiences(); // Refresh the list
    } else {
      alert(response.message || 'Failed to delete experience entry');
    }
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Error deleting experience entry');
    console.error(err);
  }
};

onMounted(fetchExperiences);
</script>
