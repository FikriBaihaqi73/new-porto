<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 p-4">
        <div class="container mx-auto">
          <h1 class="text-3xl font-bold mb-6">Manage About Me</h1>

          <!-- Loading / Error State -->
          <div v-if="loading" class="text-center py-4">Loading data...</div>
          <div v-if="error" class="text-red-500 text-center py-4">{{ error }}</div>

          <!-- Form for Creating/Updating AboutMe Data -->
          <div class="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-semibold mb-4">{{ aboutMeData?.id ? 'Edit' : 'Create' }} About Me Entry</h2>
            <form @submit.prevent="submitForm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name:</label>
                  <input v-model="form.name" type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="level">Level:</label>
                  <input v-model.number="form.level" type="number" id="level" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="profilePicture">Profile Picture:</label>
                  <input type="file" id="profilePicture" ref="profilePictureInput" @change="handleImageUpload" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <div v-if="uploadingImage" class="text-blue-500 text-sm mt-1">Uploading image...</div>
                  <div v-if="form.profilePictureUrl" class="mt-2">
                    <p class="text-sm text-gray-600 mb-1">Current Image:</p>
                    <img :src="form.profilePictureUrl" alt="Profile Picture Preview" class="w-24 h-24 object-cover rounded-md border border-gray-300">
                  </div>
                </div>
              </div>
              
              <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description:</label>
                <textarea v-model="form.description" id="description" rows="4" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>

              <!-- Dynamic Details Input -->
              <div class="mt-4 p-4 border rounded-md bg-gray-50">
                <h3 class="text-lg font-semibold mb-2">Details:</h3>
                <div v-for="(detail, index) in form.details" :key="index" class="flex space-x-2 mb-2">
                  <input v-model="detail.key" type="text" placeholder="Key" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3">
                  <input v-model="detail.value" type="text" placeholder="Value" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1">
                  <button @click="removeDetail(index)" type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Remove</button>
                </div>
                <div class="flex space-x-2 mt-3">
                  <input v-model="newDetailKey" type="text" placeholder="New Key" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3">
                  <input v-model="newDetailValue" type="text" placeholder="New Value" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1">
                  <button @click="addDetail" type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">Add Detail</button>
                </div>
              </div>

              <!-- Dynamic Stats Input -->
              <div class="mt-4 p-4 border rounded-md bg-gray-50">
                <h3 class="text-lg font-semibold mb-2">Stats:</h3>
                <div v-for="(stat, index) in form.stats" :key="index" class="flex space-x-2 mb-2 items-center">
                  <input v-model="stat.name" type="text" placeholder="Stat Name" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3">
                  <input v-model.number="stat.value" type="number" placeholder="Value" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/4">
                  <input v-model.number="stat.max" type="number" placeholder="Max" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/4">
                  <button @click="removeStat(index)" type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Remove</button>
                </div>
                <div class="flex space-x-2 mt-3 items-center">
                  <input v-model="newStatName" type="text" placeholder="New Stat Name" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3">
                  <input v-model.number="newStatValue" type="number" placeholder="New Value" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/4">
                  <input v-model.number="newStatMax" type="number" placeholder="New Max" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/4">
                  <button @click="addStat" type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">Add Stat</button>
                </div>
              </div>

              <!-- Dynamic Skills Input -->
              <div class="mt-4 p-4 border rounded-md bg-gray-50">
                <h3 class="text-lg font-semibold mb-2">Skills:</h3>
                <div v-for="(skill, index) in form.skills" :key="index" class="flex space-x-2 mb-2">
                  <input v-model="form.skills[index]" type="text" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1">
                  <button @click="removeSkill(index)" type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Remove</button>
                </div>
                <div class="flex space-x-2 mt-3">
                  <input v-model="newSkillInput" type="text" placeholder="New Skill" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1">
                  <button @click="addSkill" type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">Add Skill</button>
                </div>
              </div>

              <!-- Dynamic Tools Input -->
              <div class="mt-4 p-4 border rounded-md bg-gray-50">
                <h3 class="text-lg font-semibold mb-2">Tools:</h3>
                <div v-for="(tool, index) in form.tools" :key="index" class="flex space-x-2 mb-2">
                  <input v-model="form.tools[index]" type="text" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1">
                  <button @click="removeTool(index)" type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Remove</button>
                </div>
                <div class="flex space-x-2 mt-3">
                  <input v-model="newToolInput" type="text" placeholder="New Tool" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1">
                  <button @click="addTool" type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">Add Tool</button>
                </div>
              </div>

              <div class="flex items-center justify-between mt-6">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  {{ aboutMeData?.id ? 'Update' : 'Create' }} About Me
                </button>
                <button v-if="aboutMeData?.id" @click="deleteAboutMe" type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Delete
                </button>
              </div>
            </form>
          </div>

          <!-- Display current data (optional, for confirmation) -->
          <div v-if="aboutMeData" class="bg-white shadow-md rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-4">Current About Me Data</h2>
            <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">{{ JSON.stringify(aboutMeData, null, 2) }}</pre>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import Sidebar from '~/components/Sidebar.vue';
import Header from '~/components/Header.vue';

const router = useRouter(); // Get router instance

interface AboutMe {
  id?: string;
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

const aboutMeData = ref<AboutMe | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const uploadingImage = ref<boolean>(false); // New ref for upload status

const profilePictureInput = ref<HTMLInputElement | null>(null); // Ref for the file input

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

const newDetailKey = ref<string>('');
const newDetailValue = ref<string>('');
const newStatName = ref<string>('');
const newStatValue = ref<number>(0);
const newStatMax = ref<number>(30);
const newSkillInput = ref<string>('');
const newToolInput = ref<string>('');

const addDetail = () => {
  if (newDetailKey.value && newDetailValue.value) {
    form.value.details.push({ key: newDetailKey.value, value: newDetailValue.value });
    newDetailKey.value = '';
    newDetailValue.value = '';
  }
};

const removeDetail = (index: number) => {
  form.value.details.splice(index, 1);
};

const addStat = () => {
  if (newStatName.value && newStatValue.value >= 0 && newStatMax.value > 0) {
    form.value.stats.push({ name: newStatName.value, value: newStatValue.value, max: newStatMax.value });
    newStatName.value = '';
    newStatValue.value = 0;
    newStatMax.value = 30;
  }
};

const removeStat = (index: number) => {
  form.value.stats.splice(index, 1);
};

const addSkill = () => {
  if (newSkillInput.value) {
    form.value.skills.push(newSkillInput.value);
    newSkillInput.value = '';
  }
};

const removeSkill = (index: number) => {
  form.value.skills.splice(index, 1);
};

const addTool = () => {
  if (newToolInput.value) {
    form.value.tools.push(newToolInput.value);
    newToolInput.value = '';
  }
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

const fetchAboutMeData = async () => {
  loading.value = true;
  error.value = null;
  console.log('Fetching AboutMe data from /api/about'); // Added log
  try {
    const response = await $fetch<{ status: number; data?: AboutMe; message?: string }>('/api/about');
    console.log('Response from /api/about (GET):', response); // Added log
    if (response.status === 200 && response.data) {
      aboutMeData.value = response.data;
      // Populate form for editing
      form.value = {
        name: response.data.name,
        profilePictureUrl: response.data.profilePictureUrl || '',
        level: response.data.level,
        details: Object.entries(response.data.details).map(([key, value]) => ({
          key,
          value: String(value),
        })),
        description: response.data.description,
        stats: Object.entries(response.data.stats).map(([name, stat]) => ({
          name,
          value: stat.value,
          max: stat.max,
        })),
        skills: response.data.skills,
        tools: response.data.tools,
      };
    } else if (response.status === 404) {
      aboutMeData.value = null; // No data exists, prepare for creation
      // Form remains default for creation, but add a default 'role' detail
      form.value.details = [{ key: 'role', value: '' }];
    } else {
      error.value = response.message || 'Failed to fetch data';
    }
  } catch (err: any) {
    error.value = err.data?.statusMessage || err.message || 'Error fetching data';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const submitForm = async () => {
  console.log('Submitting form with data:', form.value); // Log before API call
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

    let response;
    if (aboutMeData.value?.id) {
      // Update existing entry
      console.log(`Updating AboutMe data to /api/about/${aboutMeData.value.id}`); // Added log
      response = await $fetch<{ status: number; data: AboutMe; message?: string }>(`/api/about/${aboutMeData.value.id}`, {
        method: 'PUT',
        body: payload,
      });
      console.log('Response from /api/about (PUT):', response); // Added log
      alert('About Me data updated successfully!');
      aboutMeData.value = response.data; // Update data directly
      form.value = {
        name: response.data.name,
        profilePictureUrl: response.data.profilePictureUrl || '',
        level: response.data.level,
        details: Object.entries(response.data.details).map(([key, value]) => ({
          key,
          value: String(value),
        })),
        description: response.data.description,
        stats: Object.entries(response.data.stats).map(([name, stat]) => ({
          name,
          value: stat.value,
          max: stat.max,
        })),
        skills: response.data.skills,
        tools: response.data.tools,
      };
    } else {
      // Create new entry
      console.log('Creating AboutMe data to /api/about'); // Added log
      response = await $fetch<{ status: number; data: AboutMe; message?: string }>('/api/about', {
        method: 'POST',
        body: payload,
      });
      console.log('Response from /api/about (POST):', response); // Added log
      alert('About Me data created successfully!');
      aboutMeData.value = response.data; // Update data directly
      form.value = {
        name: response.data.name,
        profilePictureUrl: response.data.profilePictureUrl || '',
        level: response.data.level,
        details: Object.entries(response.data.details).map(([key, value]) => ({
          key,
          value: String(value),
        })),
        description: response.data.description,
        stats: Object.entries(response.data.stats).map(([name, stat]) => ({
          name,
          value: stat.value,
          max: stat.max,
        })),
        skills: response.data.skills,
        tools: response.data.tools,
      };
    }
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Failed to save data');
    console.error(err);
  }
};

const deleteAboutMe = async () => {
  if (!aboutMeData.value?.id || !confirm('Are you sure you want to delete this About Me entry?')) {
    return;
  }
  try {
    await $fetch<{ status: number; message?: string }>(`/api/about/${aboutMeData.value.id}`, {
      method: 'DELETE',
    });
    alert('About Me data deleted successfully!');
    aboutMeData.value = null; // Clear data and prepare for creation
    // Reset form
    form.value = {
      name: '',
      profilePictureUrl: '',
      level: 0,
      details: [],
      description: '',
      stats: [],
      skills: [],
      tools: [],
    };
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Failed to delete data');
    console.error(err);
  }
};

onMounted(fetchAboutMeData);
</script>

<style scoped>
/* Add any specific styles for the About Me CRUD page here */
</style>
