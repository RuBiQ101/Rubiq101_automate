import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  // Keep layout simple; index.tsx will handle auth-based redirect.
  return <Stack screenOptions={{ headerShown: false }} />;
}
