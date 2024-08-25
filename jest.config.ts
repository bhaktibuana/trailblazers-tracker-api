import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts"],
    coverageDirectory: "__tests__/coverage",
    coverageReporters: ["text", "lcov"],
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)",
    ],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    verbose: true,
  };
};
