import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.*', 'src/**/__tests__/**'],
      thresholds: {
        lines: 62,
        functions: 58,
        branches: 58,
        statements: 62,
      },
      reporter: ['text', 'text-summary'],
    },
  },
});
