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
        <div class="max-w-xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-extrabold text-blue-400 mb-6">Edit Social Media Link</h1>

          <div v-if="loading" class="text-center text-blue-300 text-lg py-12">Loading link data...</div>
          <div v-else-if="fetchError" class="text-center text-red-500 text-lg py-12">{{ fetchError }}</div>
          <div v-else-if="!link.id" class="text-center text-gray-400 text-lg py-12">Link not found.</div>
          <form v-else @submit.prevent="updateLink" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="link.name" 
                class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                required
              >
            </div>

            <div>
              <label for="url" class="block text-sm font-medium text-gray-300 mb-2">URL</label>
              <input 
                type="url" 
                id="url" 
                v-model="link.url" 
                class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                required
              >
            </div>

            <div>
              <label for="svgPath" class="block text-sm font-medium text-gray-300 mb-2">SVG Icon</label>
              <select 
                id="svgPath" 
                v-model="link.svgPath" 
                class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option :value="null">None</option>
                <option v-for="icon in socialMediaIcons" :key="icon.name" :value="icon.svgPath">
                  {{ icon.name }}
                </option>
              </select>
              <p class="text-xs text-gray-500 mt-1">Select an SVG icon for the social media link.</p>
            </div>

            <div v-if="updateError" class="text-red-500 text-sm">{{ updateError }}</div>
            <div v-if="successMessage" class="text-green-500 text-sm">{{ successMessage }}</div>

            <div class="flex justify-end space-x-4">
              <NuxtLink to="/admin/socialmedia" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200">
                Cancel
              </NuxtLink>
              <button 
                type="submit" 
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200"
                :disabled="updating"
              >
                {{ updating ? 'Updating...' : 'Update Link' }}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Sidebar from '~/components/Sidebar.vue';
import Header from '~/components/Header.vue';

interface SocialMediaLink {
  id: string;
  name: string;
  url: string;
  svgPath: string | null;
}

const socialMediaIcons = ref([
  { name: '500px', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Amazon', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Apple', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Behance', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zm-8.8 1.6c0 1.2-.8 2-2 2H8V9.6h1.2c1.2 0 2 .8 2 2zM19.6 12c0 2.2-1.8 4-4 4h-4c-.4 0-.8-.4-.8-.8V8.4c0-.4.4-.8.8-.8h4c2.2 0 4 1.8 4 4z"/></svg>' },
  { name: 'Bitbucket', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.2 17.2c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L12.4 12l-1.6 1.6-1.6-1.6zm8.8-6c0-2.8-2.4-5.2-5.2-5.2-2.8 0-5.2 2.4-5.2 5.2 0 2.8 2.4 5.2 5.2 5.2 2.8 0 5.2-2.4 5.2-5.2zm-5.2 3.6c-1.2 0-2.4-.4-3.6-1.2l-1.2 1.2c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.2c-.8-1.2-1.2-2.4-1.2-3.6 0-.8.2-1.6.6-2.4l-1.4-1.4c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l1.4 1.4c.8-.6 1.6-.8 2.4-.8 1.2 0 2.4.4 3.6 1.2l1.2-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-1.2 1.2c.8 1.2 1.2 2.4 1.2 3.6 0 .8-.2 1.6-.6 2.4l1.4 1.4c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0L14.8 14.8c-.8.6-1.6.8-2.4.8z"/></svg>' },
  { name: 'Dribbble', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Dropbox', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Email', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>' },
  { name: 'Facebook', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.803 4.232 10.61 9.75 11.75V14.12h-3.46V10.02h3.46V7.07c0-3.418 2.083-5.286 5.142-5.286 1.464 0 2.72.109 3.09.158v3.315l-1.954.001c-1.53 0-1.828.726-1.828 1.79v2.332h3.693l-.48 4.1h-3.213V23.75C19.768 22.61 24 17.803 24 12c0-6.627-5.373-12-12-12z"/></svg>' },
  { name: 'Flickr', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Foursquare', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'GitHub', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' },
  { name: 'GitLab', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.094 13.922l-1.334-4.086c-.203-.625-.797-1.078-1.485-1.078H4.725c-.688 0-1.282.453-1.485 1.078L1.906 13.922c-.234.718.062 1.5.765 1.734l1.375.453c.703.234 1.484-.062 1.718-.765L6.094 14l1.453 4.484c.203.625.797 1.078 1.485 1.078h8.844c.688 0 1.282-.453 1.485-1.078l1.453-4.484 1.015.336c.703.234 1.484-.062 1.718-.765.234-.718-.062-1.5-.765-1.734zM12 0l-5.656 17.516c-.234.718.062 1.5.765 1.734l1.375.453c.703.234 1.484-.062 1.718-.765L12 14l1.453 4.484c.203.625.797 1.078 1.485 1.078h8.844c.688 0 1.282-.453 1.485-1.078l1.453-4.484L12 0z"/></svg>' },
  { name: 'Google', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Instagram', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2A4.6 4.6 0 0 0 4 7.6v8.8c0 2.5 2.1 4.6 4.6 4.6h8.8c2.5 0 4.6-2.1 4.6-4.6V7.6c0-2.5-2.1-4.6-4.6-4.6H7.6zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm6.5-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>' },
  { name: 'LinkedIn', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
  { name: 'Medium', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Pinterest', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Reddit', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'RSS', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Skype', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Slack', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Snapchat', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Spotify', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Stack Overflow', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Telegram', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'TikTok', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Twitch', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'Vimeo', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'VK', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'WeChat', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'WhatsApp', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
  { name: 'X', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.684l-8.026 9.479L24 22.846h-7.408l-5.656-7.382-6.524 7.382H0l8.601-9.71L0 1.154h7.521l4.908 6.77L18.901 1.153zm-1.161 19.923h2.134l-7.798-8.868-5.375 8.868H1.674l7.632-13.435L1.87 1.921h2.133l4.639 7.643 6.136-7.643h7.534l-8.497 10.957L17.74 21.076z"/></svg>' },
  { name: 'YouTube', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.56 7.03C21.39 6.39 20.9 5.86 20.27 5.67 18.66 5.25 12 5.25 12 5.25S5.34 5.25 3.73 5.67c-.63.19-1.12.72-1.29 1.36-.42 1.62-.42 5-.42 5s0 3.38.42 5c.17.64.66 1.17 1.29 1.36C5.34 18.75 12 18.75 12 18.75s6.66 0 8.27-.42c.63-.19 1.12-.72 1.29-1.36.42-1.62.42-5 .42-5s0-3.38-.42-5zM9.52 14.94V8.42l5.47 3.26-5.47 3.26z"/></svg>' },
  { name: 'Xing', svgPath: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.4 17.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4zm0-6.8c-1.32 0-2.4 1.08-2.4 2.4s1.08 2.4 2.4 2.4 2.4-1.08 2.4-2.4-1.08-2.4-2.4-2.4zM16.8 6.4h-2.4c-.44 0-.8.36-.8.8v2.4c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V7.2c0-.44-.36-.8-.8-.8z"/></svg>' },
]);

const router = useRouter();
const route = useRoute();
const linkId = route.params.id as string;

const link = ref<SocialMediaLink>({
  id: '',
  name: '',
  url: '',
  svgPath: null,
});

const loading = ref<boolean>(true);
const updating = ref<boolean>(false);
const fetchError = ref<string | null>(null);
const updateError = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const fetchLink = async () => {
  loading.value = true;
  fetchError.value = null;
  try {
    const response = await $fetch<{ status: number; data: SocialMediaLink; message?: string }>(`/api/social-media-links/${linkId}`);
    if (response.status === 200 && response.data) {
      link.value = response.data;
    } else {
      fetchError.value = response.message || 'Failed to fetch social media link';
    }
  } catch (err: any) {
    fetchError.value = err.data?.statusMessage || err.message || 'Error fetching social media link';
    console.error("Error fetching social media link:", err);
  } finally {
    loading.value = false;
  }
};

const updateLink = async () => {
  updating.value = true;
  updateError.value = null;
  successMessage.value = null;
  try {
    const response = await $fetch<{ status: number; message?: string }>(`/api/social-media-links/${linkId}`, {
      method: 'PUT',
      body: link.value,
    });
    if (response.status === 200) {
      successMessage.value = 'Social media link updated successfully!';
      // Optionally, redirect after a short delay or allow more edits
      setTimeout(() => {
        router.push('/admin/social-media-links');
      }, 1500);
    } else {
      updateError.value = response.message || 'Failed to update social media link';
    }
  } catch (err: any) {
    updateError.value = err.data?.statusMessage || err.message || 'Error updating social media link';
    console.error("Error updating social media link:", err);
  } finally {
    updating.value = false;
  }
};

onMounted(fetchLink);
</script>
