import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Details() {
  const { name } = useLocalSearchParams();
  const router = useRouter();

  const BackButton = () => (
    <TouchableOpacity onPress={router.back}>
      <View className={styles.backButton}>
        <Feather name="chevron-left" size={16} color="#007AFF" />
        <Text className={styles.backButtonText}>Back</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className={styles.container}>
      <Stack.Screen options={{ title: 'Details', headerLeft: () => <BackButton /> }} />
      <View className={styles.main}>
        <Text className={styles.title}>Details</Text>
        <Text className={styles.subtitle}>Showing details for user {name}.</Text>
      </View>
    </View>
  );
}

const styles = {
  backButton: 'flex-row',
  backButtonText: 'text-blue-500 ml-1',
  container: 'flex-1 p-6',
  main: 'flex-1 max-w-[960]',
  title: 'text-[64px] font-bold',
  subtitle: 'text-4xl text-gray-700',
};
