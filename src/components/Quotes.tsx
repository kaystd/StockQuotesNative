import React, { ReactElement } from 'react'
import { Text, View } from 'react-native'
import { withNavigationFocus } from 'react-navigation';

import styles from './styles'

interface Props {
  isFocused: boolean,
}

export const Quotes = (props: Props): ReactElement => {
  console.log(props.isFocused)
  return <View style={styles.view}>
    <Text style={styles.text}>Quotes</Text>
  </View>
}

export default withNavigationFocus(Quotes)
