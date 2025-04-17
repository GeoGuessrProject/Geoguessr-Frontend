<script>
  import { onMount } from "svelte";

  let leaderboard = [
    { name: "Player 1", score: 100 },
    { name: "Player 2", score: 200 },
    { name: "Player 3", score: 300 },
  ];
</script>

<main class="flex flex-col items-center space-y-6 p-4">
    <h1 class="text-2xl font-bold">Leaderboard</h1>
    <p class="text-gray-600">Here you can see the leaderboard of the game.</p>
    <ul class="w-full max-w-md bg-gray-100 shadow-md rounded-lg divide-y divide-gray-200">
        {#each leaderboard as player}
            <li class="p-4 flex justify-between">
                <span class="font-medium">{player.name}</span>
                <span class="text-gray-500">{player.score}</span>
            </li>
        {/each}
    </ul>
</main>
