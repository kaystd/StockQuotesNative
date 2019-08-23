import { Provider } from 'mobx-react'
import React, { ReactElement } from 'react'
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'

import store from '../stores/QuotesStore'
import AboutScreen from './About'
import QuotesScreen from './Quotes'
import styles from './styles'

const TabNavigator = createMaterialTopTabNavigator(
  {
    About: { screen: AboutScreen },
    Quotes: { screen: QuotesScreen },
  },
  {
    tabBarOptions: {
      labelStyle : styles.text,
    },
  }
)

const App = createAppContainer(TabNavigator)

export default (): ReactElement => (
  <Provider store={store}>
    <App />
  </Provider>
)
