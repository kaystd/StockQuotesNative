import React, { ReactElement } from 'react'
import { Button, Text, View } from 'react-native'

import styles from './styles'

interface Props {
  navigation: {
    navigate: (destination: string) => void,
  },
}

export default (props: Props): ReactElement =>
  <View style={styles.view}>
    <Text style={styles.text}>About</Text>
    <Button
      title="Go to Quotes"
      onPress={(): void => props.navigation.navigate('Quotes')}
    />
  </View>
