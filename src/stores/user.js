import { writable } from 'svelte/store';

export const user = writable({
    name: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    age: localStorage.getItem('age') || '',
    country: localStorage.getItem('country') || '',
    isAuthenticated: !!localStorage.getItem('token')
});
