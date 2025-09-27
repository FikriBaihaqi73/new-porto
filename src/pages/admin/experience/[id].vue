<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0f0f1c] to-[#1a1a2e] text-white flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 p-6">
        <h1 class="text-4xl font-bold mb-8 text-blue-400">Edit Experience Entry</h1>

        <form @submit.prevent="submitForm" class="bg-[#1f2937]/80 p-8 rounded-lg shadow-xl border border-blue-700/50 backdrop-filter backdrop-blur-sm max-w-4xl mx-auto">
          <div v-if="loading" class="text-center text-teal-300">Loading experience data...</div>
          <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="md:col-span-2">
              <label for="companyName" class="block text-teal-300 text-sm font-bold mb-2">Company Name:</label>
              <input type="text" id="companyName" v-model="form.companyName" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required>
            </div>
            <div class="md:col-span-2">
              <label for="jobTitle" class="block text-teal-300 text-sm font-bold mb-2">Job Title:</label>
              <input type="text" id="jobTitle" v-model="form.jobTitle" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required>
            </div>
            <div class="md:col-span-2">
              <label for="location" class="block text-teal-300 text-sm font-bold mb-2">Location:</label>
              <input type="text" id="location" v-model="form.location" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required>
            </div>
            <div>
              <label for="startDate" class="block text-teal-300 text-sm font-bold mb-2">Start Date:</label>
              <input type="date" id="startDate" v-model="form.startDate" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required>
            </div>
            <div>
              <label for="endDate" class="block text-teal-300 text-sm font-bold mb-2">End Date (Optional):</label>
              <input type="date" id="endDate" v-model="form.endDate" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400">
              <p class="text-xs text-gray-400 mt-1">Leave blank if this is your current experience.</p>
            </div>
            <div class="md:col-span-2">
              <label for="status" class="block text-teal-300 text-sm font-bold mb-2">Status:</label>
              <select id="status" v-model="form.status" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required>
                <option value="ACTIVE">ACTIVE</option>
                <option value="COMPLETE">COMPLETE</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label for="duration" class="block text-teal-300 text-sm font-bold mb-2">Duration:</label>
              <input type="text" id="duration" v-model="form.duration" placeholder="e.g., 2 Years, 6 Months" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400">
            </div>
            <div class="md:col-span-2">
              <label for="mainAchievement" class="block text-teal-300 text-sm font-bold mb-2">Main Achievement:</label>
              <textarea id="mainAchievement" v-model="form.mainAchievement" rows="4" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" required></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="block text-teal-300 text-sm font-bold mb-2">Skills Acquired:</label>
              <div v-for="(skill, index) in form.skillsAcquired" :key="index" class="flex items-center mb-2">
                <input type="text" v-model="form.skillsAcquired[index]" placeholder="Skill" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400 mr-2">
                <button type="button" @click="removeSkill(index)" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">-</button>
              </div>
              <button type="button" @click="addSkill" class="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">+ Add Skill</button>
            </div>
            <div class="md:col-span-2">
              <label for="projectsCount" class="block text-teal-300 text-sm font-bold mb-2">Projects Count:</label>
              <input type="number" id="projectsCount" v-model.number="form.projectsCount" class="shadow-sm bg-gray-700 appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400" min="0" required>
            </div>
            <div class="md:col-span-2">
              <label for="logoUpload" class="block text-teal-300 text-sm font-bold mb-2">Company Logo (Optional):</label>
              <input 
                type="file" 
                id="logoUpload" 
                ref="logoInput" 
                @change="handleLogoUpload" 
                accept="image/*" 
                class="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
              >
              <p v-if="uploadingLogo" class="text-blue-300 text-sm mt-2">Uploading logo... (Please wait)</p>
              <p class="text-xs text-gray-400 mt-1">Upload a logo for the company. Max file size 5MB.</p>
              <div v-if="form.logoUrl" class="mt-4">
                <p class="text-teal-300 text-sm font-bold mb-2">Current Logo Preview:</p>
                <img :src="form.logoUrl" alt="Company Logo Preview" class="max-w-xs h-auto rounded-lg border border-blue-500 shadow-md">
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-4 mt-6">
            <NuxtLink to="/admin/experience" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-md hover:shadow-lg shadow-gray-500/30">
              Cancel
            </NuxtLink>
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-md hover:shadow-lg shadow-blue-500/30" :disabled="loadingSubmit || uploadingLogo">
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
const experienceId = route.params.id as string;

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

interface ExperienceForm {
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

const form = ref<ExperienceForm>({
  companyName: '',
  jobTitle: '',
  location: '',
  startDate: '',
  endDate: null,
  status: 'ACTIVE',
  duration: '',
  mainAchievement: '',
  skillsAcquired: [],
  projectsCount: 0,
  logoUrl: null,
});

const loading = ref<boolean>(true);
const loadingSubmit = ref<boolean>(false);
const error = ref<string | null>(null);
const uploadingLogo = ref<boolean>(false);
const logoInput = ref<HTMLInputElement | null>(null);

const fetchExperience = async () => {
  if (!experienceId) return;
  loading.value = true;
  error.value = null;
  try {
    const response = await $fetch<{ status: number; data: Experience; message?: string }>(`/api/experience/${experienceId}`);
    if (response.status === 200) {
      const data = response.data;
      const parsedStartDate = data.startDate ? String(data.startDate).split('T')[0] : '';
      const parsedEndDate = data.endDate ? String(data.endDate).split('T')[0] : null;

      form.value = {
        companyName: String(data.companyName ?? ''),
        jobTitle: String(data.jobTitle ?? ''),
        location: String(data.location ?? ''),
        startDate: parsedStartDate as string,
        endDate: parsedEndDate as string | null,
        status: String(data.status ?? ''),
        duration: String(data.duration ?? ''),
        mainAchievement: String(data.mainAchievement ?? ''),
        skillsAcquired: (data.skillsAcquired || []) as string[],
        projectsCount: data.projectsCount ?? 0,
        logoUrl: data.logoUrl ?? null,
      };
    } else {
      error.value = response.message || 'Failed to fetch experience';
    }
  } catch (err: any) {
    error.value = err.data?.statusMessage || err.message || 'Error fetching experience';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const addSkill = () => {
  form.value.skillsAcquired.push('');
};

const removeSkill = (index: number) => {
  form.value.skillsAcquired.splice(index, 1);
};

const handleLogoUpload = async () => {
  if (!logoInput.value || !logoInput.value.files || logoInput.value.files.length === 0) {
    return;
  }

  const file = logoInput.value.files[0];

  if (!file) {
    alert('No file found after selection.');
    return;
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB
    alert('File size exceeds 5MB limit.');
    return;
  }

  uploadingLogo.value = true;
  try {
    const formData = new FormData();
    formData.append('file', file as File);

    const response = await $fetch<{ status: number; url?: string; message?: string }>('/api/upload-cloudinary', {
      method: 'POST',
      body: formData,
    });

    if (response.status === 200 && response.url) {
      form.value.logoUrl = response.url;
      alert('Logo uploaded successfully!');
    } else {
      alert(response.message || 'Failed to upload logo');
    }
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Error uploading logo');
    console.error(err);
  } finally {
    uploadingLogo.value = false;
    if (logoInput.value) {
      logoInput.value.value = ''; // Reset file input
    }
  }
};

const submitForm = async () => {
  loadingSubmit.value = true;
  try {
    // Set duration to 'Current' if it's empty and endDate is also empty (meaning active experience)
    if (!form.value.duration && !form.value.endDate) {
      form.value.duration = 'Current';
    }

    const payload = {
      ...form.value,
    };

    const response = await $fetch<{ status: number; data: Experience; message?: string }>(`/api/experience/${experienceId}`, {
      method: 'PUT',
      body: payload,
    });
    if (response.status === 200) {
      alert('Experience entry updated successfully!');
      router.push('/admin/experience');
    } else {
      alert(response.message || 'Failed to update experience entry');
    }
  } catch (err: any) {
    alert(err.data?.statusMessage || err.message || 'Error updating experience entry');
    console.error(err);
  } finally {
    loadingSubmit.value = false;
  }
};

onMounted(() => {
  if (experienceId) {
    fetchExperience();
  }
});
</script>
