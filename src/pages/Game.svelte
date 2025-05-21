<script>
  import { GAME_URL } from "../config";

  let username = localStorage.getItem("username") || "Guest";
  let isAuthenticated = !!localStorage.getItem("token");

  let gameStarted = false;
  let guess = "";
  let resultMessage = "";
  let gameEnded = false;

  async function startGame() {
    const res = await fetch(
      `http://${GAME_URL}:8002/user/${username}/start-game`,
      {
        method: "POST",
      }
    );

    const data = await res.json();
    if (res.ok) {
      gameStarted = true;
      gameEnded = false;
      resultMessage = "";
    } else {
      resultMessage = data.error || "Failed to start game.";
    }
  }

  async function submitGuess() {
    const res = await fetch(`http://${GAME_URL}:8002/user/${username}/guess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess }),
    });

    const data = await res.json();
    if (res.ok) {
      resultMessage = data.correct
        ? "🎉 Correct! It's Paris!"
        : "❌ Wrong guess!";
    } else {
      resultMessage = data.error || "Failed to submit guess.";
    }

    guess = "";
  }

  async function endGame() {
    const res = await fetch(`http://${GAME_URL}:8002/user/${username}/end-game`, {
      method: "POST",
    });

    const data = await res.json();
    if (res.ok) {
      resultMessage = "✅ Game ended and saved!";
      gameStarted = false;
      gameEnded = true;
    } else {
      resultMessage = data.error || "Failed to end game.";
    }
  }
</script>

<main class="p-6 max-w-lg mx-auto">
    <div class="flex justify-between items-center mb-5">
        <h1 class="text-4xl font-bold">GeoGuessr Game</h1>
        {#if gameStarted}
            <button
                class="bg-red-600 text-white px-4 py-2 rounded"
                on:click={endGame}
            >
                End Game
            </button>
        {/if}
    </div>

    {#if !isAuthenticated}
        <p class="text-red-500">You must be logged in to play.</p>
    {:else}
        {#if !gameStarted}
            <button
                class="w-full bg-blue-600 text-white px-4 py-2 rounded mb-2 cursor-pointer hover:bg-blue-700 transition"
                on:click={startGame}
            >
                Start Game
            </button>
        {/if}

        {#if gameStarted}
            <div class="space-y-2">
                <div class="flex justify-center w-full max-h-96">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1717346482132-838fef0ebbd1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Map"
                        class="object-cover rounded"
                    />
                </div>

                <input
                    type="text"
                    class="w-full border px-3 py-2 rounded"
                    placeholder="Enter your guess (e.g., Paris)"
                    bind:value={guess}
                />
                <button
                    class="bg-green-600 text-white px-4 py-2 rounded w-full"
                    on:click={submitGuess}
                >
                    Submit Guess
                </button>
            </div>

            {#if resultMessage}
                <p class="mt-2 text-lg font-semibold">{resultMessage}</p>
            {/if}
        {/if}
    {/if}
</main>
