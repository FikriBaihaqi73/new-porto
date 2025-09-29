<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0f0f1c] to-[#1a1a2e] text-white flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 p-6">
        <h1 class="text-4xl font-bold mb-8 text-blue-400">Edit About Me Entry</h1>

        <form @submit.prevent="submitForm" class="bg-[#1f2937]/80 p-8 rounded-lg shadow-xl border border-blue-700/50 backdrop-filter backdrop-blur-sm max-w-4xl mx-auto">
          <div v-if="loading" class="text-center text-teal-300">Loading About Me data...</div>
          <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="md:col-span-2">
              <label for="name" class="block text-teal-300 text-sm font-bold mb-2">Name:</label>
              <input type="text" id="name" v-model="form.name" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required>
            </div>
            <div class="md:col-span-2">
              <label for="profilePictureUrl" class="block text-teal-300 text-sm font-bold mb-2">Profile Picture:</label>
              <input
                type="file"
                id="profilePictureUrl"
                ref="profilePictureInput"
                @change="handleImageUpload"
                accept="image/*"
                class="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
              >
              <p v-if="uploadingImage" class="text-blue-300 text-sm mt-2">Uploading image... (Please wait)</p>
              <div v-if="form.profilePictureUrl" class="mt-4">
                <p class="text-teal-300 text-sm font-bold mb-2">Current Profile Picture:</p>
                <img :src="form.profilePictureUrl" alt="Profile Picture" class="max-w-xs h-auto rounded-lg border border-blue-500 shadow-md">
              </div>
            </div>
            <div class="md:col-span-2">
              <label for="level" class="block text-teal-300 text-sm font-bold mb-2">Level:</label>
              <input type="number" id="level" v-model.number="form.level" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required>
            </div>
            <div class="md:col-span-2">
              <label for="description" class="block text-teal-300 text-sm font-bold mb-2">Description:</label>
              <textarea id="description" v-model="form.description" rows="4" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="block text-teal-300 text-sm font-bold mb-2">Details (Key-Value Pairs):</label>
              <div v-for="(detail, index) in form.details" :key="index" class="flex items-center mb-2">
                <input type="text" v-model="detail.key" placeholder="Key (e.g., role)" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-1/3 py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400 mr-2">
                <input type="text" v-model="detail.value" placeholder="Value" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-2/3 py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400 mr-2">
                <button type="button" @click="removeDetail(index)" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">-</button>
              </div>
              <button type="button" @click="addDetail" class="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">+ Add Detail</button>
            </div>
            <div class="md:col-span-2">
              <label class="block text-teal-300 text-sm font-bold mb-2">Stats:</label>
              <div v-for="(stat, index) in form.stats" :key="index" class="flex items-center mb-2">
                <input type="text" v-model="stat.name" placeholder="Stat Name" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-1/3 py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400 mr-2">
                <input type="number" v-model.number="stat.value" placeholder="Value" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-1/3 py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400 mr-2">
                <input type="number" v-model.number="stat.max" placeholder="Max" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-1/3 py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400 mr-2">
                <button type="button" @click="removeStat(index)" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">-</button>
              </div>
              <button type="button" @click="addStat" class="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">+ Add Stat</button>
            </div>
            <div class="md:col-span-2">
              <label class="block text-teal-300 text-sm font-bold mb-2">Skills:</label>
              <div v-for="(skill, index) in form.skills" :key="index" class="flex items-center mb-2">
                <input type="text" v-model="form.skills[index]" placeholder="Skill" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400 mr-2">
                <button type="button" @click="removeSkill(index)" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">-</button>
              </div>
              <button type="button" @click="addSkill" class="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">+ Add Skill</button>
            </div>
            <div class="md:col-span-2">
              <label class="block text-teal-300 text-sm font-bold mb-2">Tools:</label>
              <div v-for="(tool, index) in form.tools" :key="index" class="flex items-center mb-2">
                <input type="text" v-model="form.tools[index]" placeholder="Tool" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400 mr-2">
                <button type="button" @click="removeTool(index)" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">-</button>
              </div>
              <button type="button" @click="addTool" class="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">+ Add Tool</button>
            </div>
          </div>

          <div class="flex justify-end gap-4 mt-6">
            <NuxtLink to="/admin/about" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-md hover:shadow-lg shadow-gray-500/30">
              Cancel
            </NuxtLink>
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-md hover:shadow-lg shadow-blue-500/30" :disabled="loadingSubmit || uploadingImage">
              {{ loadingSubmit ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Sidebar from '~/components/Sidebar.vue';
import Header from '~/components/Header.vue';

const route = useRoute();
const router = useRouter();
const aboutMeId = route.params.id as string;

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

interface AboutMeForm {
  name: string;
  profilePictureUrl: string;
  level: number;
  details: { key: string; value: string }[];
  description: string;
  stats: { name: string; value: number; max: number }[];
  skills: string[];
  tools: string[];
}

const form = ref<AboutMeForm>({
  name: '',
  profilePictureUrl: '',
  level: 0,
  details: [],
  description: '',
  stats: [],
  skills: [],
  tools: [],
});

const loading = ref<boolean>(true);
const loadingSubmit = ref<boolean>(false);
const error = ref<string | null>(null);
const uploadingImage = ref<boolean>(false);
const profilePictureInput = ref<HTMLInputElement | null>(null);

const fetchAboutMeData = async () => {
  if (!aboutMeId) return;
  loading.value = true;
  error.value = null;
  try {
    const response = await $fetch<{ status: number; data: AboutMe; message?: string }>(`/api/about/${aboutMeId}`);
    if (response.status === 200) {
      const data = response.data;
      form.value = {
        name: data.name,
        profilePictureUrl: data.profilePictureUrl || '',
        level: data.level,
        details: Object.entries(data.details).map(([key, value]) => ({ key, value: String(value) })),
        description: data.description,
        stats: Object.entries(data.stats).map(([name, stat]) => ({
          name,
          value: stat.value,
          max: stat.max,
        })),
        skills: data.skills,
        tools: data.tools,
      };
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

const addDetail = () => {
  form.value.details.push({ key: '', value: '' });
};

const removeDetail = (index: number) => {
  form.value.details.splice(index, 1);
};

const addStat = () => {
  form.value.stats.push({ name: '', value: 0, max: 30 });
};

const removeStat = (index: number) => {
  form.value.stats.splice(index, 1);
};

const addSkill = () => {
  form.value.skills.push('');
};

const removeSkill = (index: number) => {
  form.value.skills.splice(index, 1);
};

const addTool = () => {
  form.value.tools.push('');
};

const removeTool = (index: number) => {
  form.value.tools.splice(index, 1);
};

const handleImageUpload = async () => {
  if (!profilePictureInput.value?.files?.length) {
    return;
  }

  const file = profilePictureInput.value.files![0];
  const formData = new FormData();
  formData.append('file', file as File);

  uploadingImage.value = true;
  try {
    const response = await $fetch<{ status: number; url?: string; message?: string }>('/api/upload-cloudinary', {
      method: 'POST',
      body: formData,
    });
    if (response.status === 200 && response.url) {
      form.value.profilePictureUrl = response.url;
      alert('Image uploaded successfully!');
    } else {
      alert(response.message || 'Failed to upload image');
    }
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Error uploading image');
    console.error(err);
  } finally {
    uploadingImage.value = false;
    if (profilePictureInput.value) {
      profilePictureInput.value.value = ''; // Reset file input
    }
  }
};

const submitForm = async () => {
  loadingSubmit.value = true;
  try {
    const payload: Partial<AboutMe> = {
      name: form.value.name,
      profilePictureUrl: form.value.profilePictureUrl,
      level: form.value.level,
      details: form.value.details.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string>),
      description: form.value.description,
      stats: form.value.stats.reduce((acc, item) => {
        acc[item.name] = { value: item.value, max: item.max };
        return acc;
      }, {} as Record<string, { value: number; max: number }>),
      skills: form.value.skills,
      tools: form.value.tools,
    };

    const response = await $fetch<{ status: number; data: AboutMe; message?: string }>(`/api/about/${aboutMeId}`, {
      method: 'PUT',
      body: payload,
    });
    if (response.status === 200) {
      alert('About Me data updated successfully!');
      router.push('/admin/about'); // Redirect to the overview page
    } else {
      alert(response.message || 'Failed to update About Me entry');
    }
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Error updating About Me entry');
    console.error(err);
  } finally {
    loadingSubmit.value = false;
  }
};

onMounted(() => {
  if (aboutMeId) {
    fetchAboutMeData();
  }
});
</script>

<style scoped>
/* Add any specific styles for the About Me CRUD page here */
</style>
