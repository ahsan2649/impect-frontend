import ky from "ky";

export const api = ky.create({ prefixUrl: import.meta.env.VITE_BACKEND_V2_URL });
