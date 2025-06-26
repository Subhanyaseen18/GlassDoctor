import { StyleSheet, View } from 'react-native';
import MainStack from './Src/Navigation'
import {PersistGate} from 'redux-persist/integration/react';

import {Provider} from 'react-redux';
import { persistor, store } from './Src/Redux/store';
function App() {

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainStack />
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
