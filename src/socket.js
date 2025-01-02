import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://air-von-golo.local:8080";

export const socket = io(URL);
