import React, { Fragment, ReactElement } from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native'

import { Quote } from '../../stores/QuotesStore'
import commonStyles from '../styles'

export default ({ quotes }: { quotes: Quote[] }): ReactElement => {

  const parsePercents = (value: string): string =>
    (Number(value.slice(0, value.length - 4)) * 100).toFixed(2)

  const parsePrice = (value: string): string => {
    if (value.length < 11) { return value }
    return parsePrice(value.slice(0, -1))
  }

  const percentStyle = (value: string): TextStyle =>
    value.charAt(0) === '-' ? styles.percentNegative : styles.percentPositive

  return(
    <Fragment>
      {quotes.map(quote =>
        <View key={quote.ticker} style={[commonStyles.row, styles.tableRow]}>
          <View style={[styles.cell, styles.tickerCell]}>
            <Text style={styles.text}>
              {quote.ticker.split('_')[1]}
            </Text>
          </View>
          <View style={[styles.cell, styles.priceCell]}>
            <Text style={styles.text}>
              {parsePrice(quote.last)}
            </Text>
          </View>
          <View style={[styles.cell, styles.priceCell]}>
            <Text style={styles.text}>
              {parsePrice(quote.highestBid)}
            </Text>
          </View>
          <View style={[styles.cell, styles.percentCell]}>
            <Text style={[styles.text, percentStyle(quote.percentChange)]}>
              {parsePercents(quote.percentChange)}
            </Text>
          </View>
        </View>
      )}
    </Fragment>
  )
}

export const styles = StyleSheet.create({
  cell: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  percentCell: {
    alignItems: 'flex-end',
    flex: 0.6,
  },
  percentNegative: {
    color: 'red',
  },
  percentPositive: {
    color: 'green',
  },
  priceCell: {
    alignItems: 'flex-end',
    flex: 1,
  },
  tableRow: {
    borderColor: '#DBDBDB',
    borderRadius: 2,
    borderWidth: 1,
    minHeight: 40,
  },
  text: {
    fontSize: 16,
  },
  tickerCell: {
    flex: 0.8,
  },
})
