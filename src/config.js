/// <reference types="vite/client" />
const isDev = window.location.hostname === "localhostt";

export const AUTH_URL = isDev
    ? "localhost"
    : import.meta.env.VITE_AUTH_PROD;

export const GAME_URL = isDev
    ? "localhost"
    : import.meta.env.VITE_GAME_PROD;

export const IMAGE_URL = isDev
  ? "localhost"
  : "localhost";

export const SCORE_URL = isDev
  ? "localhost"
  : "localhost";

export const NOTIFICATION_URL = isDev
  ? "localhost"
  : "localhost";