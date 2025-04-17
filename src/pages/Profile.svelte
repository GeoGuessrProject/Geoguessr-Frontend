<script>
    import { onMount } from "svelte";

    let user = {
        name: localStorage.getItem("username") || "Guest",
        isAuthenticated: !!localStorage.getItem("token"),
    };

    let profile = null;
    let errorMessage = "";

    async function fetchProfile() {
        try {
            const response = await fetch(`http://localhost:8002/user/${user.name}/profile`, {
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
        if (user.isAuthenticated) {
            fetchProfile();
        } else {
            errorMessage = "You must be logged in to view your profile.";
        }
    });
</script>

<main class="flex flex-col items-center space-y-6 p-4">
    <h1 class="text-2xl font-bold">Profile</h1>
    <p class="text-gray-600">Here you can see your profile information.</p>

    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {:else if profile}
        <ul class="w-full max-w-md bg-gray-100 shadow-md rounded-lg divide-y divide-gray-200">
            <li class="p-4">
                <strong>Username:</strong> {profile.username}
            </li>
            <li class="p-4">
                <strong>Games Played:</strong> {profile.games_played}
            </li>
            <li class="p-4">
                <strong>Last Login:</strong> {new Date(profile.last_login).toLocaleString()}
            </li>
            <li class="p-4">
                <strong>Account Created:</strong> {new Date(profile.created_at).toLocaleString()}
            </li>
        </ul>
    {:else}
        <p>Loading profile...</p>
    {/if}
</main>

<style>
    main {
        text-align: center;
    }
</style>