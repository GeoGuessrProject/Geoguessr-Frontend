<script>
  import { user } from "../stores/user";
  import { AUTH_URL, GAME_URL, IMAGE_URL, SCORE_URL, NOTIFICATION_URL } from "../config";
  import { userStore } from "../stores/user";

  let username = "";
  let password = "";

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await fetch(`http://${AUTH_URL}:8001/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      if (!data.access_token || !data.username) {
        throw new Error("Invalid login response");
      }

      // Store user data in localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("user", JSON.stringify({
          name: data.username,
          email: data.email,
          country: data.country,
          age: data.age
      }));
      userStore.load();

      window.location.href = "/";
    } catch (error) {
      alert(error.message || "An error occurred during login.");
    }
  }
</script>

<main class="flex flex-col items-center space-y-6 p-4">
  <h1 class="text-2xl font-bold">Login</h1>
  <p class="text-gray-600">Please enter your credentials to log in.</p>

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
    <button
      type="submit"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      on:click={handleLogin}
    >
      Login
    </button>
  </form>

  <p class="text-sm">
    Don't have an account? 
    <a href="/register" class="text-blue-500">
      Register
    </a>
  </p>
</main>
