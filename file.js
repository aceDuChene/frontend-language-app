import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function App () {

  return (
    <View style={styles.container}>
        <Text style={styles.textStyle}>Fun Stuff</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
    fontStyle: 'italic',
    backgroundColor: 'yellow'
  }
})
