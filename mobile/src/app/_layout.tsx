import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { getToken } from '@/lib/auth';

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setAuthed(!!token);
      setReady(true);
    })();
  }, []);

  if (!ready) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {authed ? (
        <Stack.Screen name="home" />
      ) : (
        <Stack.Screen name="login" />
      )}
    </Stack>
  );
}
