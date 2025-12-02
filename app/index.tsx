import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.greeting}>Hello!</Text>
      <Text style={styles.title}>NatureUP Health</Text>
      <Text style={styles.subtitle}>Your personalized nature therapy companion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 48,
    fontWeight: '700',
    color: '#4A7C2E',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2D3E1F',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#5A6C4A',
    textAlign: 'center',
    lineHeight: 24,
  },
});
