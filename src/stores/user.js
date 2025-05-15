// stores/user.js
import { writable } from 'svelte/store';

function createUserStore() {
    const { subscribe, set } = writable({
        user: null,
        isAuthenticated: false
    });

    return {
        subscribe,
        load: () => {
            const raw = localStorage.getItem("user");
            const token = localStorage.getItem("token");

            set({
                user: raw ? JSON.parse(raw) : null,
                isAuthenticated: !!token
            });
        },
        logout: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            set({ user: null, isAuthenticated: false });
        }
    };
}

export const userStore = createUserStore();
