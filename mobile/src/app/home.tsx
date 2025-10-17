import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '@/lib/api';
import { logout } from '@/lib/auth';

interface Workflow { id: string; name: string; }

export default function HomeScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Workflow[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/workflows');
        setItems(res.data || []);
      } catch {
        setItems([]);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workflows</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name}</Text>
            <Button title="Run" onPress={() => {/* TODO: call /workflows/:id/execute */}} />
          </View>
        )}
        ListEmptyComponent={<Text>No workflows found.</Text>}
      />
      <Button title="Logout" onPress={async () => { await logout(); router.replace('/login'); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }
});
