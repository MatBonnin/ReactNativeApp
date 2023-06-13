import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import ButtonComponent from './components/bouton';
import KeypadComponent from './components/keypads';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import WireModuleComponent from './components/files';

export default function App() {
  
  return (
  <SafeAreaProvider>
    <AppContent/>
  </SafeAreaProvider>
  );
}

const AppContent = () => {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  const paddingHorizontal = screenWidth * 0.03;
  
  return (
    <ThemeProvider  >
       <ScrollView style={{ paddingTop: insets.top, paddingHorizontal: paddingHorizontal }} >
        <ButtonComponent />
        <View style={styles.separator} />
        <WireModuleComponent />
        <View style={styles.separator} />
        <KeypadComponent/>
      </ScrollView>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '80%',
    marginVertical: 20,
  },
});
