<script>
    let isAuthenticated = false;
    let name = "";
</script>

<nav class="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
    <div class="flex gap-4">
        <a href="/" class="text-white font-bold hover:text-cyan-400 transition-colors">Home</a>
        <a href="/leaderboard" class="text-white font-bold hover:text-cyan-400 transition-colors">Leaderboard</a>
    </div>
    <div>
        {#if isAuthenticated}
            <span class="text-sm">Welcome, {name}</span>
        {:else}
        <div class="flex items-center gap-2">
            <span class="text-sm">Not logged in</span> - 
            <a href="/register" class="text-white font-bold hover:text-cyan-400 transition-colors">Register</a>
            <span class="text-sm">/</span>
            <a href="/login" class="text-white font-bold hover:text-cyan-400 transition-colors">Login</a>
        </div>
        {/if}
    </div>
</nav>
