import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/store';
import CounterScreen from './screens/CounterScreen';

export default function App() {
  const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
  });
  return (
    <Provider store={store}>
      <CounterScreen></CounterScreen>
    </Provider>
  )
}

const styles = StyleSheet.create({})