import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn  from './screens/signIn';

export default function App() {
  return (
    <View style={styles.container}>
      <SignIn/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#443D3D',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
