import React, { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'

import { colors } from '../styles'
import { styles } from './TableBody'

interface State {
  animatedValue: Animated.Value,
  moveTo: MoveTo,
}

enum MoveTo {
  None = 'NONE',
  Up = 'UP',
  Down = 'DOWN',
}

interface Props {
  children: string,
}

const usePrevious = <T extends {}>(value: T): (T | undefined) => {
  const ref: MutableRefObject<T | undefined> = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default (props: Props): ReactElement => {

  const [ state, setState ] = useState<State>({
    animatedValue: new Animated.Value(100),
    moveTo: MoveTo.None,
  })

  const prevProps = usePrevious(props)

  useEffect(() => {
    if(prevProps && (prevProps.children !== props.children)) {
      Animated.sequence([
        Animated.timing(state.animatedValue, {
          duration: 0,
          toValue: 0,
        }),
        Animated.timing(state.animatedValue, {
          duration: 3000,
          toValue: 100,
        }),
      ]).start()
      Number(prevProps.children) > Number(props.children)
        ? setState(prev => ({ ...prev, moveTo: MoveTo.Down }))

        : setState(prev => ({ ...prev, moveTo: MoveTo.Up }))
    } else {
      setState(prev => ({ ...prev, moveTo: MoveTo.None }))
    }
  }, [props.children])

  const interpolateDown = state.animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [colors.red, colors.black],
  })

  const interpolateUp = state.animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [colors.green, colors.black],
  })


  const downStyle = {
    color: interpolateDown,
  }

  const upStyle = {
    color: interpolateUp,
  }

  return (
    <Animated.Text
      style={[styles.text, state.moveTo === MoveTo.Down && downStyle, state.moveTo === MoveTo.Up && upStyle]}
    >
      {props.children}
    </Animated.Text>
  )
}
