import '@testing-library/jest-dom';

process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3001';

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;