<script>
  import { onMount } from "svelte";

  let message = "Loading...";
  let name = "";

  async function fetchMessage(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      message = data.message; // Response from FastAPI
    } catch (error) {
      message = "Error connecting to backend.";
    }
  }

  onMount(() => {
    fetchMessage("http://localhost:8001/");
  });
</script>

<main class="flex flex-col items-center space-y-4">
  <h1 class="text-2xl font-bold">Hello {name || "GeoGuessr Player"}!</h1>
  <input
    class="border border-gray-300 rounded px-4 py-2"
    placeholder="Enter name"
    bind:value={name}
  />

  <h1 class="text-xl">{message}</h1>

  <div class="grid grid-cols-2 gap-4">
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      on:click={() => fetchMessage("http://localhost:8001/")}
    >
      Fetch from :8001
    </button>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      on:click={() => fetchMessage("http://localhost:8002/")}
    >
      Fetch from :8002
    </button>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      on:click={() => fetchMessage("http://localhost:8003/")}
    >
      Fetch from :8003
    </button>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      on:click={() => fetchMessage("http://localhost:8004/")}
    >
      Fetch from :8004
    </button>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      on:click={() => fetchMessage("http://localhost:8005/")}
    >
      Fetch from :8005
    </button>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 2rem;
  }
</style>
