<script>
    import { onMount } from "svelte";
    import { user } from "../stores/user";

    $: isAuthenticated = $user.isAuthenticated;
    $: name = $user.name;

    onMount(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if (token && username) {
            isAuthenticated = true;
            name = username;
        }
        user.set({ name, isAuthenticated });
    });

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        isAuthenticated = false;
        user.set({ name: '', isAuthenticated: false });
        window.location.href = "/";
    }
</script>

<nav class="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
        <div class="flex gap-4">
            <a href="/" class="text-white font-bold hover:text-cyan-400 transition-colors">Home</a>
            <a href="/leaderboard" class="text-white font-bold hover:text-cyan-400 transition-colors">Leaderboard</a>
            {#if isAuthenticated}
            <a href="/game" class="text-white font-bold hover:text-cyan-400 transition-colors">Game</a>
            <a href="/profile" class="text-white font-bold hover:text-cyan-400 transition-colors">Profile</a>
            {/if}
        </div>
    <div>
        {#if isAuthenticated}
            <span class="text-sm">Logged in as: 
                <a href="/profile" class="text-cyan-400 hover:text-cyan-300 transition-colors font-bold">
                    {name}
                </a>
            </span>

            <button on:click={handleLogout} class="ml-4 bg-white text-black px-2 py-1 rounded hover:bg-gray-200 cursor-pointer">
                Logout
            </button>
        {:else}
        <div class="flex items-center gap-2">
            <a href="/register" class="text-white font-bold hover:text-cyan-400 transition-colors">Register</a>
            <span class="text-sm">/</span>
            <a href="/login" class="text-white font-bold hover:text-cyan-400 transition-colors">Login</a>
        </div>
        {/if}
    </div>
</nav>
