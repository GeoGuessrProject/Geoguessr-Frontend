<script>
  import { onMount } from "svelte";
  import { AUTH_URL, GAME_URL, IMAGE_URL, SCORE_URL, NOTIFICATION_URL } from "../config";
  import { userStore } from "../stores/user";

  $: user = $userStore.user;

const services = [
  { name: "Auth Service", url: `http://${AUTH_URL}:8001/health` },
  { name: "Game Service", url: `http://${GAME_URL}:8002/health` },
  { name: "Map/Image Service", url: `http://${IMAGE_URL}:8003/health` },
  { name: "Score Service", url: `http://${SCORE_URL}:8004/health` },
  { name: "Email Notification Service", url: `http://${NOTIFICATION_URL}:8005/health` },
];

  let statuses = {};

  async function checkServices() {
    const results = {};
    for (const service of services) {
      try {
        const res = await fetch(service.url);
        const data = await res.json();
        results[service.name] = data.status === "ok" ? "Connected" : "Error";
      } catch (err) {
        results[service.name] = "Error connecting";
      }
    }
    statuses = results;
  }

  onMount(() => {
    checkServices();
  });
</script>

<main class="flex flex-col items-center space-y-6">
  <h1 class="text-2xl font-bold mt-2"> Hello {(user && user.name) ? user.name : "GeoGuessr Player"}!</h1>

  <a href="/game" class="w-50 text-center bg-blue-600 text-white px-4 py-2 rounded mb-4">
    Go to game
  </a>

  <h2 class="text-lg font-bold mt-5">Microservice Status:</h2>

  <div class="w-full max-w-sm bg-gray-100 rounded-lg p-4 shadow-md">
    {#each Object.entries(statuses) as [service, status]}
      <div class="flex justify-between items-center py-4 border-b last:border-b-0">
        <span class="font-medium">{service}</span>
        <span class="{status.includes('Connected') ? 'text-green-600' : 'text-red-600'} font-semibold">
          {status}
        </span>
      </div>
    {/each}
  </div>
</main>
