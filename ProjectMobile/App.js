import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn  from './screens/signIn';
import SignUp from './screens/signUp';

export default function App() {
  return (
    <View style={styles.container}>
      <SignUp/>
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
