import { writable } from 'svelte/store';

export const user = writable({
    name: localStorage.getItem('username') || '',
    isAuthenticated: !!localStorage.getItem('token')
});
