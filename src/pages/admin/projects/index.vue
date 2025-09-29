<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0f0f1c] to-[#1a1a2e] text-white flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 p-6">
        <h1 class="text-4xl font-bold mb-8 text-blue-400">Project Management</h1>

        <div class="mb-6 flex justify-end">
          <NuxtLink to="/admin/projects/create" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-md hover:shadow-lg shadow-blue-500/30">
            Add New Project
          </NuxtLink>
        </div>

        <div v-if="loading" class="text-center text-teal-300">Loading projects...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-else-if="!projects.length" class="text-center text-gray-400">No projects found.</div>
        <div v-else class="overflow-x-auto bg-[#1f2937]/80 rounded-lg shadow-xl border border-blue-700/50 backdrop-filter backdrop-blur-sm">
          <table class="min-w-full divide-y divide-blue-700">
            <thead class="bg-[#2e3a4e]">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">Progress</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">Featured</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-blue-800">
              <tr v-for="project in projects" :key="project.id" class="hover:bg-[#1f2937] transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-300">{{ project.title }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ project.type }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ project.status }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ project.progress }}%</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ project.featured ? 'Yes' : 'No' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <NuxtLink :to="`/admin/projects/${project.id}`" class="text-indigo-400 hover:text-indigo-600 mr-4">Edit</NuxtLink>
                  <button @click="deleteProject(project.id)" class="text-red-400 hover:text-red-600">Delete</button>
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

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  status: string;
  progress: number;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
}

const projects = ref<Project[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const fetchProjects = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await $fetch<{ status: number; data: Project[]; message?: string }>('/api/projects');
    if (response.status === 200) {
      projects.value = response.data;
    } else {
      error.value = response.message || 'Failed to fetch projects';
    }
  } catch (err: any) {
    error.value = err.data?.statusMessage || err.message || 'Error fetching projects';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const deleteProject = async (id: string) => {
  if (!confirm('Are you sure you want to delete this project?')) {
    return;
  }
  try {
    await $fetch<{ status: number; message?: string }>(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    alert('Project deleted successfully!');
    fetchProjects(); // Refresh the list after deletion
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Failed to delete project');
    console.error(err);
  }
};

onMounted(fetchProjects);
</script>
