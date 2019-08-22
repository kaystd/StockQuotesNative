import React, {Fragment, ReactElement} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import commonStyles, { blue } from '../styles'
import { styles as bodyStyles } from './TableBody'

export default (): ReactElement => (
  <Fragment>
    <View style={commonStyles.row}>
      <View style={[bodyStyles.cell, bodyStyles.tickerCell]}>
        <Text key="ticker" style={[bodyStyles.text, styles.text]}>
          Ticker
        </Text>
      </View>
      <View style={[bodyStyles.cell, bodyStyles.priceCell]}>
        <Text key="last" style={[bodyStyles.text, styles.text]}>
          Last price
        </Text>
      </View>
      <View style={[bodyStyles.cell, bodyStyles.priceCell]}>
        <Text key="highestBid" style={[bodyStyles.text, styles.text]}>
          Highest bid
        </Text>
      </View>
      <View style={[bodyStyles.cell, bodyStyles.percentCell]}>
        <Text key="percentChange" style={[bodyStyles.text, styles.text]}>
          Change
        </Text>
      </View>
    </View>
  </Fragment>
)

const styles = StyleSheet.create({
  text: {
    color: blue,
    fontWeight: 'bold',
  },
})
