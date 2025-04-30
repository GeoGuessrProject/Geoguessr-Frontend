<script>
  import { onMount } from "svelte";

  let leaderboard = [];
  let search = "";

  // Fetch top scores on component mount
  onMount(async () => {
    try {
      const res = await fetch('http://localhost:8004/user/leaderboard');
      if (!res.ok) throw new Error('Failed to fetch leaderboard');
      const data = await res.json();
      leaderboard = data.top_scores.map(item => ({
        name: item.username,
        score: item.score,
        time: new Date(item.end_time).toLocaleString('en-GB', {dateStyle: 'medium',timeStyle: 'short'})
      }));
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    }
  });
</script>

<main class="flex flex-col items-center space-y-6 p-4">
  <h1 class="text-2xl font-bold">Leaderboard</h1>
  <p class="text-gray-600">Here you can see and search the leaderboard of the game.</p>
  <input
    type="text"
    placeholder="Search by name"
    bind:value={search}
    class="w-full max-w-md p-2 border border-gray-300 rounded"
  />

  <ul class="w-full max-w-md bg-gray-100 shadow-md rounded-lg divide-y divide-gray-200">
    {#each leaderboard.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) as player}
      <li class="p-4 flex justify-between">
        <span class="font-medium">{player.name}</span>
        <span class="text-gray-500">{player.score}</span>
        <span class="text-gray-500">{player.time}</span>
      </li>
    {/each}
    {#if leaderboard.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).length === 0}
      <li class="p-4 text-center text-gray-500">No players found.</li>
    {/if}
  </ul>
</main>
