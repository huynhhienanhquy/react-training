import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",

    include: ["src/**/*.{test,spec}.{ts,tsx}"],

    coverage: {
      provider: "v8",
      enabled: true,
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      reportOnFailure: true,
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
      exclude: [
        "**/*.stories.*",
        "**/*.d.ts",
        "src/main.tsx",
        "src/vite-env.d.ts"
      ]
    }
  }
});
