import React, { ReactElement } from 'react'
import {Button, StyleSheet, View} from 'react-native'

import { TabValue } from './index'

interface Props {
  active: TabValue,
  handleValueChange: (value: TabValue) => () => void,
}

export default (props: Props): ReactElement => {

  const { active, handleValueChange } = props

  return (
    <View style={styles.tabs}>
      {Object.values(TabValue).map(value => (
        <View key={value} style={styles.tab}>
          <Button disabled={active === value} title={value} onPress={handleValueChange(value)} />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    margin: 5,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
})
