import React from 'react'
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'

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

export default createAppContainer(TabNavigator)
