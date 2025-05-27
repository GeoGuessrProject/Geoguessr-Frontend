<script>
    import { onMount } from "svelte";
    import { GAME_URL } from "../config";
    import { userStore } from "../stores/user";

    $: user = $userStore.user;
    $: isAuthenticated = $userStore.isAuthenticated;

    let profile = null;
    let errorMessage = "";

    async function fetchProfileStats() {
        try {
            const response = await fetch(`${GAME_URL}/user/${user.name}/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            profile = await response.json();
        } catch (error) {
            errorMessage = "Failed to fetch profile information.";
            console.error(error);
        }
    }

    onMount(() => {
        if (isAuthenticated) {
            fetchProfileStats();
        } else {
            errorMessage = "You must be logged in to view your profile.";
        }
    });
</script>

<main class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">
        Profile -
        <span class="text-gray-500">{user.name}</span>
    </h1>

    {#if errorMessage}
        <p class="text-red-500 text-center">{errorMessage}</p>
    {:else if profile}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left: User Details -->
            <div class="bg-white rounded-lg shadow p-6 space-y-4">
                <h2 class="text-xl font-semibold border-b pb-2">User Details</h2>
                <p><strong>Username:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Country:</strong> {user.country}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p>
                    <strong>Last Login:</strong>
                    {new Date(profile.last_login).toLocaleString(undefined, {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </p>
                <p>
                    <strong>Account Created:</strong>
                    {new Date(profile.created_at).toLocaleString(undefined, {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </p>
            </div>

            <!-- Right: Game Stats -->
            <div class="bg-white rounded-lg shadow p-6 space-y-4">
                <h2 class="text-xl font-semibold border-b pb-2">Game Stats</h2>
                <p><strong>Games Played:</strong> {profile.games_played}</p>
                <p><strong>Total Score:</strong> {profile.total_score}</p>
                <p><strong>Average Score:</strong> {profile.average_score ? profile.average_score.toFixed(2) : "N/A"}</p>
                {#if profile.history?.length}
                    <p>
                        <strong>Last Game Score:</strong>
                        {profile.history[profile.history.length - 1].score}
                    </p>
                {/if}
            </div>
        </div>
    {:else}
        <p class="text-center">Loading profile...</p>
    {/if}
</main>
