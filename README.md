# QuranLLM

LLM-powered Q&A service for Al-Quran

## Prerequisites

Install dependencies:

```bash
npm install
```

## Environment Setup

Install and configure environment variables:

```bash
npm i dotenv
```

Create a `.env` file with your API keys.

## Build Commands

Build the project:

```bash
npm run build
```

Clean build artifacts:

```bash
npm run clean
```

Watch mode for development:

```bash
npm run watch
```

## Run Commands

Run the example agent:

```bash
npm run dev:example
# or
npx tsx example.ts
```

Run the main server in development:

```bash
npm run dev
```

Run the built server:

```bash
npm run start:server
```

Run in production:

```bash
npm run start:prod
```

## Code Quality

Lint the code:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint:fix
```

Format the code:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## Test Commands

```bash
npm test
```

Note: Tests are not yet implemented.