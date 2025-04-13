<script>
  import { onMount } from "svelte";
  import { user } from "../stores/user";

  $: name = $user.name;

  const services = [
    { name: "Auth Service", url: "http://localhost:8001" },
    { name: "Game Service", url: "http://localhost:8002" },
    { name: "Map/Image Service", url: "http://localhost:8003" },
    { name: "Score Service", url: "http://localhost:8004" },
    { name: "Email Notification Service", url: "http://localhost:8005" },
  ];

  let statuses = {};

  async function checkServices() {
    const results = {};
    for (const service of services) {
      try {
        const res = await fetch(service.url);
        const data = await res.json();
        results[service.name] = data.message;
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
  <h1 class="text-2xl font-bold mt-2">Hello {name || "GeoGuessr Player"}!</h1>

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

  <button
    on:click={checkServices}
    class="mt-1 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  >
    Refresh Status
  </button>
</main>


<style>
  main {
    text-align: center;
    padding: 2rem;
  }
</style>