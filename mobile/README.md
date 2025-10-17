# AI Workflow Mobile (Expo)

Simple Expo app to authenticate and view workflows from your existing API.

## Prerequisites
- Node 20+
- Expo CLI (`npm i -g expo` optional; or use `npx expo`)
- API available (configure in `app.json` extra.apiUrl)

## Setup
```bash
cd mobile
npm install
```

## Run
```bash
npm start
# then press i for iOS simulator, a for Android, or open Expo Go on device
```

## Config
- API URL: `app.json` → `expo.extra.apiUrl` (default https://api.orkx.in)
- Secure auth token storage via `expo-secure-store`

## Screens
- Login: email/password → `POST /auth/login`
- Home: list of workflows from `GET /workflows`

Adjust endpoints to match your backend.
