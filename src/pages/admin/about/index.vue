<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0f0f1c] to-[#1a1a2e] text-white flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 p-6">
        <h1 class="text-4xl font-bold mb-8 text-blue-400">About Me Overview</h1>

        <div v-if="loading" class="text-center text-teal-300">Loading About Me data...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-else-if="!aboutMeEntry" class="bg-[#1f2937]/80 p-8 rounded-lg shadow-xl border border-blue-700/50 backdrop-filter backdrop-blur-sm max-w-4xl mx-auto text-center">
          <p class="text-lg text-gray-300 mb-4">No About Me entry found. Create one now!</p>
          <NuxtLink to="/admin/about/create" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-md hover:shadow-lg shadow-blue-500/30">
            Create About Me Entry
          </NuxtLink>
        </div>
        <div v-else class="bg-[#1f2937]/80 p-8 rounded-lg shadow-xl border border-blue-700/50 backdrop-filter backdrop-blur-sm max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-4 text-blue-400">{{ aboutMeEntry.name }}</h2>
          <p class="text-teal-300 mb-2">Level: {{ aboutMeEntry.level }}</p>
          <img v-if="aboutMeEntry.profilePictureUrl" :src="aboutMeEntry.profilePictureUrl" alt="Profile Picture" class="max-w-xs h-auto rounded-lg border border-blue-500 shadow-md mb-4">
          <p class="text-gray-300 mb-4">{{ aboutMeEntry.description }}</p>

          <div class="mb-4">
            <h3 class="text-xl font-semibold text-teal-300 mb-2">Details:</h3>
            <ul class="list-disc list-inside text-gray-300">
              <li v-for="(value, key) in aboutMeEntry.details" :key="key"><strong>{{ key }}:</strong> {{ value }}</li>
            </ul>
          </div>

          <div class="mb-4">
            <h3 class="text-xl font-semibold text-teal-300 mb-2">Stats:</h3>
            <ul class="list-disc list-inside text-gray-300">
              <li v-for="(stat, name) in aboutMeEntry.stats" :key="name"><strong>{{ name }}:</strong> {{ stat.value }} / {{ stat.max }}</li>
            </ul>
          </div>

          <div class="mb-4">
            <h3 class="text-xl font-semibold text-teal-300 mb-2">Skills:</h3>
            <ul class="list-disc list-inside text-gray-300">
              <li v-for="(skill, index) in aboutMeEntry.skills" :key="index">{{ skill }}</li>
            </ul>
          </div>

          <div class="mb-4">
            <h3 class="text-xl font-semibold text-teal-300 mb-2">Tools:</h3>
            <ul class="list-disc list-inside text-gray-300">
              <li v-for="(tool, index) in aboutMeEntry.tools" :key="index">{{ tool }}</li>
            </ul>
          </div>

          <div class="flex justify-end mt-6">
            <NuxtLink :to="`/admin/about/${aboutMeEntry.id}`" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-md hover:shadow-lg shadow-blue-500/30">
              Edit About Me
            </NuxtLink>
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

interface AboutMe {
  id: string;
  name: string;
  profilePictureUrl: string | null;
  level: number;
  details: Record<string, string>;
  description: string;
  stats: Record<string, { value: number; max: number }>;
  skills: string[];
  tools: string[];
}

const aboutMeEntry = ref<AboutMe | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const fetchAboutMe = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await $fetch<{ status: number; data?: AboutMe; message?: string }>('/api/about');
    if (response.status === 200 && response.data) {
      aboutMeEntry.value = response.data;
    } else if (response.status === 404) {
      aboutMeEntry.value = null; // No entry found
    } else {
      error.value = response.message || 'Failed to fetch About Me data';
    }
  } catch (err: any) {
    error.value = err.data?.statusMessage || err.message || 'Error fetching About Me data';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchAboutMe);
</script>
