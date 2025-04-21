<script>
  import { Router } from "@mateothegreat/svelte5-router";
  import Home from "./pages/Home.svelte";
  import Leaderboard from "./pages/LeaderboardPage.svelte";
  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";
  import Profile from "./pages/Profile.svelte";
  import Game from "./pages/Game.svelte";

  import Navbar from "./components/Navbar.svelte";

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  const routes = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "leaderboard",
      component: Leaderboard,
    },
    {
      path: "login",
      component: Login,
    },
    {
      path: "register",
      component: Register,
    },
    {
      path: "profile",
      component: isAuthenticated ? Profile : Login,
    },
    {
      path: "game",
      component: isAuthenticated ? Game : Login,
    },
  ];
</script>

<Navbar />

<Router {routes} />