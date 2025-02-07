import './assets/main.css';
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import router from './router';

import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

app.use(router);
app.use(Toast);

// Fetch and store jobs data in localStorage
const fetchAndStoreJobs = async () => {
  try {
    const response = await axios.get('/jobs.json');
    localStorage.setItem('jobs', JSON.stringify(response.data.job));
  } catch (error) {
    console.error('Error fetching jobs', error);
  }
};

fetchAndStoreJobs();

app.mount('#app');