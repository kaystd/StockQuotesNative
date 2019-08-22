import React, { ReactElement, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { withNavigationFocus } from 'react-navigation'

import { blue } from '../styles'
import TableBody from './TableBody'
import TableHead from './TableHead'
import Tabs from './Tabs'

interface Props {
  isFocused: boolean,
}

interface State {
  error: string | null,
  interval: number,
  loaded: boolean,
  loading: boolean,
  quotes: Quote[],
  tabValue: tabValue,
}

export interface Quote {
  highestBid: string,
  last: string,
  percentChange: string,
  ticker: string,
}

interface Json {
  [key: string]: Quote,
}

export enum tabValue {
  BTC = 'BTC',
  USDT = 'USDT',
  ETH = 'ETH',
  USDC = 'USDC',
}

export const Quotes = (props: Props): ReactElement => {

  const [state, setState] = useState<State>({
    error: null,
    interval: 0,
    loaded: false,
    loading: false,
    quotes: [] as Quote[],
    tabValue: tabValue.BTC,
  })

  const getQuotes = (quotes: Json): Quote[] => Object.entries(quotes).map(([key, obj]) => ({ ...obj, ticker: key }))

  const loadData = (withSpinner: boolean = false): void => {
    if (withSpinner) { setState(prevState => ({ ...prevState, loading: true })) }
    fetch('https://poloniex.com/public?command=returnTicker')
      .then(response => response.status === 200
        ? response.json()
        : Promise.reject(new Error(`${response.status.toString()} Server error`))
      )
      .then(json => json.error ? Promise.reject(new Error(json.error)) : json)
      .then(getQuotes)
      .then(
        quotes => setState(prevState =>
          ({
            ...prevState,
            error: null,
            loaded: true,
            loading: false,
            quotes,
          })
        ),
        error => {
          setState(prevState => ({
            ...prevState,
            error: error.toString(),
            loading: false,
          }))
          // tslint:disable-next-line:no-console
          console.log(error)
        }
      )
  }

  useEffect(() => {
    if (props.isFocused) {
      state.loaded ? loadData() : loadData(true)
      setState(prevState => ({ ...prevState, interval: setInterval(loadData, 5000) }))
    } else {
      clearInterval(state.interval)
    }
  }, [props.isFocused])

  const handleTabChange = (value: tabValue): (() => void) => (): void => {
    setState(prevState => ({ ...prevState, tabValue: value }))
  }

  return(
    <View style={styles.root}>
      <Tabs active={state.tabValue} handleValueChange={handleTabChange}/>
      {state.quotes.length !== 0 && <View style={styles.tableHead}><TableHead /></View>}
      {state.error && <View style={styles.errorView}><Text style={styles.errorText}>Error</Text></View>}
      {state.loading
        ? <ActivityIndicator style={styles.spinner} size="large" color={blue}/>
        : <ScrollView style={styles.scrollView}>
            <View style={styles.tableContainer}>
              <TableBody quotes={state.quotes.filter(quote => quote.ticker.split('_')[0] === state.tabValue)} />
            </View>
          </ScrollView>
      }
    </View>
  )
}

export default withNavigationFocus(Quotes)

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
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
  },
  tableContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  tableHead: {
    margin: 5,
    marginBottom: 20,
  },
})
