<script>
  import { AUTH_URL } from "../config";

  let username = "";
  let password = "";
  let email = "";
  let country = "Denmark";
  let age = "";

  let errorMessage = "";

  async function registerUser() {
    try {
      const response = await fetch(`http://${AUTH_URL}:8001/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          country,
          age,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      window.location.href = "/login";
      alert(`Registration successful! Welcome, ${data.username}`);
    } catch (error) {
      errorMessage = error.message;
    }
  }
</script>

<main class="flex flex-col items-center space-y-6 p-4">
  <h1 class="text-2xl font-bold">Register on GeoGussr</h1>
  <p class="text-gray-600">Please fill out the form to create an account.</p>

  <form class="flex flex-col space-y-4">
    <input
      type="text"
      placeholder="Username"
      bind:value={username}
      class="border border-gray-300 rounded px-4 py-2"
    />

    <input
      type="password"
      placeholder="Password"
      bind:value={password}
      class="border border-gray-300 rounded px-4 py-2"
    />

    <input
      type="email"
      placeholder="Email"
      bind:value={email}
      class="border border-gray-300 rounded px-4 py-2"
    />

    <input
      type="text"
      placeholder="Country"
      bind:value={country}
      class="border border-gray-300 rounded px-4 py-2"
    />

    <input
      type="number"
      placeholder="Age"
      bind:value={age}
      class="border border-gray-300 rounded px-4 py-2"
    />

    <button
      type="submit"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      on:click|preventDefault={registerUser}
    >
      Register
    </button>

    {#if errorMessage}
      <p class="text-red-500">{errorMessage}</p>
    {/if}
  </form>

  <p class="text-sm">
    Already have an account? <a href="/login" class="text-blue-500">Login</a>
  </p>
</main>
