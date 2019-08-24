import { inject, observer } from 'mobx-react'
import React, { ReactElement, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import { SubscriptionLike, timer } from 'rxjs'

import { Quote, QuotesStore } from '../../stores/QuotesStore'
import { colors } from '../styles'
import TableBody from './TableBody'
import TableHead from './TableHead'
import Tabs from './Tabs'

interface Props {
  isFocused: boolean,
  store: QuotesStore,
}

interface State {
  error: string | null,
  interval: number,
  loaded: boolean,
  loading: boolean,
  quotes: Quote[],
  tabValue: TabValue,
}

export enum TabValue {
  BTC = 'BTC',
  USDT = 'USDT',
  ETH = 'ETH',
  USDC = 'USDC',
}

export const Quotes = inject('store')(observer((props: Props): ReactElement => {

  const [state, setState] = useState<State>({
    error: null,
    interval: 0,
    loaded: false,
    loading: false,
    quotes: [] as Quote[],
    tabValue: TabValue.BTC,
  })

  const { quotes, loading, error, loadData } = props.store

  let subscription: SubscriptionLike

  useEffect(() => {
    if (props.isFocused) {
      subscription = timer(0, 5000).subscribe(() => loadData())
    } else {
      if (subscription) { subscription.unsubscribe() }
    }
  }, [props.isFocused])

  const handleTabChange = (value: TabValue): (() => void) => (): void => {
    setState(prevState => ({ ...prevState, tabValue: value }))
  }

  return(
    <View style={styles.root}>
      <Tabs active={state.tabValue} handleValueChange={handleTabChange}/>
      {quotes.length !== 0 && <View style={styles.tableHead}><TableHead /></View>}
      {error && <View style={styles.errorView}><Text style={styles.errorText}>Error</Text></View>}
      {loading
        ? <ActivityIndicator style={styles.spinner} size="large" color={colors.blue}/>
        : <ScrollView style={styles.scrollView}>
            <View style={styles.tableContainer}>
              <TableBody
                quotes={quotes.filter(quote => quote.ticker.split('_')[0] === state.tabValue)}
              />
            </View>
          </ScrollView>
      }
    </View>
  )
}))

export default withNavigationFocus(Quotes)

const styles = StyleSheet.create({
  errorText: {
    color: colors.red,
    fontSize: 20,
  },
  errorView: {
    alignItems: 'center',
  },
  root: {
    flex: 1,
  },
  scrollView: {
    padding: 5,
  },
  spinner: {
    margin: '50%',
    marginTop: '70%',
  },
  tableContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  tableHead: {
    margin: 5,
    minHeight: 40,
  },
})
