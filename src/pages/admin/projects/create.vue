<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0f0f1c] to-[#1a1a2e] text-white flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 p-6">
        <h1 class="text-4xl font-bold mb-8 text-blue-400">Create New Project</h1>

        <form @submit.prevent="submitForm" class="bg-[#1f2937]/80 p-8 rounded-lg shadow-xl border border-blue-700/50 backdrop-filter backdrop-blur-sm max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="title" class="block text-teal-300 text-sm font-bold mb-2">Title:</label>
              <input type="text" id="title" v-model="form.title" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required>
            </div>
            <div>
              <label for="type" class="block text-teal-300 text-sm font-bold mb-2">Type:</label>
              <input type="text" id="type" v-model="form.type" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required>
            </div>
            <div>
              <label for="status" class="block text-teal-300 text-sm font-bold mb-2">Status:</label>
              <select id="status" v-model="form.status" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required>
                <option value="COMPLETE">COMPLETE</option>
                <option value="DEV">DEV</option>
                <option value="BETA">BETA</option>
              </select>
            </div>
            <div>
              <label for="progress" class="block text-teal-300 text-sm font-bold mb-2">Progress (%):</label>
              <input type="number" id="progress" v-model.number="form.progress" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" min="0" max="100" required>
            </div>
            <div class="md:col-span-2">
              <label for="description" class="block text-teal-300 text-sm font-bold mb-2">Description:</label>
              <textarea id="description" v-model="form.description" rows="4" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required></textarea>
            </div>
            <div class="md:col-span-2">
              <label for="imageUpload" class="block text-teal-300 text-sm font-bold mb-2">Project Image:</label>
              <input 
                type="file" 
                id="imageUpload" 
                ref="imageInput" 
                @change="handleImageUpload" 
                accept="image/*" 
                class="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
              >
              <p v-if="uploadingImage" class="text-blue-300 text-sm mt-2">Uploading image... (Please wait)</p>
              <p class="text-xs text-gray-400 mt-1">Upload an image for the project. Max file size 5MB.</p>
              <div v-if="form.image" class="mt-4">
                <p class="text-teal-300 text-sm font-bold mb-2">Current Image Preview:</p>
                <img :src="form.image" alt="Project Image Preview" class="max-w-xs h-auto rounded-lg border border-blue-500 shadow-md">
              </div>
            </div>
            <div class="md:col-span-2">
              <label for="liveUrl" class="block text-teal-300 text-sm font-bold mb-2">Live URL (Optional):</label>
              <input type="url" id="liveUrl" v-model="form.liveUrl" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400">
            </div>
            <div class="md:col-span-2">
              <label for="githubUrl" class="block text-teal-300 text-sm font-bold mb-2">GitHub URL (Optional):</label>
              <input type="url" id="githubUrl" v-model="form.githubUrl" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400">
            </div>
            <div class="md:col-span-2">
              <label class="block text-teal-300 text-sm font-bold mb-2">Tech Stack:</label>
              <div v-for="(tech, index) in form.techStack" :key="index" class="flex items-center mb-2">
                <input type="text" v-model="form.techStack[index]" placeholder="e.g., Vue.js" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400 mr-2">
                <button type="button" @click="removeTech(index)" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">-</button>
              </div>
              <button type="button" @click="addTech" class="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">+ Add Tech</button>
            </div>
            <div class="md:col-span-2 flex items-center">
              <input type="checkbox" id="featured" v-model="form.featured" class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
              <label for="featured" class="text-teal-300 text-sm font-bold">Featured Project</label>
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <NuxtLink to="/admin/projects" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-md hover:shadow-lg shadow-gray-500/30">
              Cancel
            </NuxtLink>
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-md hover:shadow-lg shadow-blue-500/30" :disabled="loadingSubmit || uploadingImage">
              {{ loadingSubmit ? 'Saving...' : 'Create Project' }}
            </button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '~/components/Sidebar.vue';
import Header from '~/components/Header.vue';

const router = useRouter();

interface ProjectForm {
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

const form = ref<ProjectForm>({
  title: '',
  description: '',
  image: '',
  type: '',
  status: '',
  progress: 0,
  techStack: [],
  liveUrl: null,
  githubUrl: null,
  featured: false,
});

const loadingSubmit = ref<boolean>(false);
const uploadingImage = ref<boolean>(false);
const imageInput = ref<HTMLInputElement | null>(null);

const addTech = () => {
  form.value.techStack.push('');
};

const removeTech = (index: number) => {
  form.value.techStack.splice(index, 1);
};

const handleImageUpload = async () => {
  if (!imageInput.value || !imageInput.value.files || imageInput.value.files.length === 0) {
    return;
  }

  const file = imageInput.value.files[0];
  
  if (!file) {
    alert('No file found after selection.');
    return;
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB
    alert('File size exceeds 5MB limit.');
    return;
  }

  uploadingImage.value = true;
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await $fetch<{ status: number; url?: string; message?: string }>('/api/upload-cloudinary', {
      method: 'POST',
      body: formData,
    });

    if (response.status === 200 && response.url) {
      form.value.image = response.url;
      alert('Image uploaded successfully!');
    } else {
      alert(response.message || 'Failed to upload image');
    }
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Error uploading image');
    console.error(err);
  } finally {
    uploadingImage.value = false;
  }
};

const submitForm = async () => {
  loadingSubmit.value = true;
  try {
    const response = await $fetch<{ status: number; data: Project; message?: string }>('/api/projects', {
      method: 'POST',
      body: form.value,
    });
    if (response.status === 201) {
      alert('Project created successfully!');
      router.push('/admin/projects');
    } else {
      alert(response.message || 'Failed to create project');
    }
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Error creating project');
    console.error(err);
  } finally {
    loadingSubmit.value = false;
  }
};
</script>
