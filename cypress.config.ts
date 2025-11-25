import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    env: {
      API_BASE_URL: "http://localhost:3000", // <<<--- ESTA É A BASE URL DO SEU BACKEND
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
