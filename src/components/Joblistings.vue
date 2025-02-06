<script setup>
import { RouterLink } from 'vue-router';
import JobListing from './Joblisting.vue';
import { reactive, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  jobs: [],
  isLoading: true,
});

onMounted(() => {
  try {
    const jobs = JSON.parse(localStorage.getItem('jobs'));
    if (jobs) {
      state.jobs = jobs;
    }
  } catch (error) {
    console.error('Error retrieving jobs from localStorage', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">
        Find Jobs
      </h2>
      <!-- Show loading spinner while loading is true -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Show job listing when done loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>