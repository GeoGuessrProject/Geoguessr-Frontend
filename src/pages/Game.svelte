<script context="module" lang="ts">
  declare const google: any;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { GAME_URL } from "../config";


  let username = localStorage.getItem("username") || "Guest";
  let isAuthenticated = !!localStorage.getItem("token");

  let gameStarted = false;
  let guess = "";
  let resultMessage = "";
  let gameEnded = false;
  let currentCountry: string = "";

  let streetViewPanorama: any;

  function getRandomLatLng() {
    const minLat = 36.0;
    const maxLat = 71.0;
    const minLng = -10.0;
    const maxLng = 40.0;

    const lat = Math.random() * (maxLat - minLat) + minLat;
    const lng = Math.random() * (maxLng - minLng) + minLng;

    return { lat, lng };
  }

  function getCountryFromLatLng(latLng: any) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: latLng }, (results: any, status: string) => {
      if (status === "OK" && results.length > 0) {
        const countryComp = results[0].address_components.find((comp: any) =>
          comp.types.includes("country"),
        );
        if (countryComp) {
          currentCountry = countryComp.long_name;
          console.log("Detected country:", currentCountry);
        }
      } else {
        currentCountry = "Unknown";
      }
    });
  }

  function initStreetView() {
    const sv = new google.maps.StreetViewService();
    const location = getRandomLatLng();

    sv.getPanorama({ location, radius: 100 }, (data: any, status: string) => {
      if (status === "OK") {
        const panoLoc = data.location.latLng;
        streetViewPanorama = new google.maps.StreetViewPanorama(
          document.getElementById("streetview"),
          {
            position: panoLoc,
            pov: { heading: 0, pitch: 0 },
            disableDefaultUI: false,
            addressControl: false,
          },
        );

        getCountryFromLatLng(panoLoc);
      } else {
        initStreetView(); // retry
      }
    });
  }

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
      currentCountry = "";
      setTimeout(() => initStreetView(), 0);
    } else {
      resultMessage = data.error || "Failed to start game.";
    }
  }

  async function submitGuess() {
    const res = await fetch(`http://${GAME_URL}:8002/user/${username}/guess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guess,
        correctAnswer: currentCountry,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      const wasCorrect = data.correct;

      resultMessage = wasCorrect
        ? "🎉 Correct!"
        : `❌ Wrong! It was ${currentCountry}`;

      if (wasCorrect) {
        setTimeout(() => {
          nextRound();
        }, 2000); // 2 sekunders pause
      }
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

  function nextRound() {
    guess = "";
    resultMessage = "";
    currentCountry = "";
    initStreetView(); // vis nyt sted
  }
</script>

<svelte:head>
  <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initStreetView&v=weekly&loading=async"
    async
  ></script>
</svelte:head>

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
        class="w-full bg-blue-600 text-white px-4 py-2 rounded mb-2 hover:bg-blue-700 transition"
        on:click={startGame}
      >
        Start Game
      </button>
    {/if}

    {#if gameStarted}
      <div class="space-y-4">
        <div
          class="w-full h-64 rounded overflow-hidden border"
          id="streetview"
        ></div>

        {#if currentCountry}
          <p class="text-sm text-gray-500 italic mt-1">
            [Dev only] Correct country: {currentCountry}
          </p>
        {/if}

        <input
          type="text"
          class="w-full border px-3 py-2 rounded"
          placeholder="Enter your guess (e.g., France)"
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
