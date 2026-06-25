const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'app/lib/permissions.ts',
    'lib/**/*.ts',
    'components/auth/RegisterForm.tsx',
    'components/recruiter/FeedbackForm.tsx',
    'components/recruiter/StageSelector.tsx',
    'components/recruiter/CreateJobModal.tsx',
    'components/SidebarLink.tsx',
    'app/ui/home-content.tsx',
    'app/ui/JobCard.tsx',
    'app/ui/Navlink.tsx',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    },
  },
};

module.exports = createJestConfig(config);