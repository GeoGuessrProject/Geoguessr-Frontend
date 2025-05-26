/// <reference types="vite/client" />
const isDev = window.location.hostname === "localhost";

export const AUTH_URL = isDev
  ? "http://localhost:8001"
  : `http://${import.meta.env.VITE_AUTH_PROD}:8001`;

export const GAME_URL = isDev
    ? "http://localhost:8002"
    : `http://${import.meta.env.VITE_GAME_PROD}:8002`;

export const SCORE_URL = isDev
  ? "http://localhost:8004"
  : "http://localhost:8004";

export const NOTIFICATION_URL = isDev
  ? "http://localhost:8005"
  : "http://localhost:8005";
