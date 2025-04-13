<script>
  import { Router } from "@mateothegreat/svelte5-router";
  import Home from "./pages/Home.svelte";
  import Leaderboard from "./pages/LeaderboardPage.svelte";
  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";

  import Navbar from "./components/Navbar.svelte";

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
    }
  ];
</script>

<Navbar />

<Router {routes} />