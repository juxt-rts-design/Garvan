import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [tanstackStart(), react(), tailwind()],
  resolve: {
    tsconfigPaths: true,
  },
});
