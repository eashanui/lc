import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const repoName = env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

  return {
    base: mode === "production" ? (repoName ? `/${repoName}/` : "./") : "/",
    plugins: [tanstackStart(), react(), tailwindcss(), tsconfigPaths()],
    server: {
      port: 3000,
    },
  };
});
