import React, { ReactElement } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

interface Props {
  navigation: {
    navigate: (destination: string) => void,
  },
}

export default (props: Props): ReactElement =>
  <View style={styles.view}>
    <Text style={styles.text}>Stock quotes from Poloniex</Text>
    <Button
      title="Go to Quotes"
      onPress={(): void => props.navigation.navigate('Quotes')}
    />
  </View>

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 5,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
