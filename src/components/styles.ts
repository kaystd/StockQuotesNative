import { StyleSheet } from 'react-native'

export const colors = {
  black: '#000000',
  blue: '#1C97F3',
  green: '#00FF00',
  red: '#FF0000',
}

export default StyleSheet.create({
  row: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  text: {
    fontSize: 20,
    margin: 5,
  },
})
