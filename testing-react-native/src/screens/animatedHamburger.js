import React, {useEffect, useState} from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Animated, TouchableOpacity } from "react-native"
// import Animated from "react-native-reanimated"

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    burgerButton: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 100,
      height: 100,
      paddingVertical: 20,
      borderRadius: 50,
      backgroundColor: 'green'
    },
    inner: {
      width: '60%',
      height: 10,
      borderRadius: 10,
      backgroundColor: 'black'
    }
  })

export default Hamburger = () => {
    const [activated, setActivated] = useState(false)
    const [upperAnimation, setUpperAnimation] = useState(new Animated.Value(0))
    const [lowerAnimation, setLowerAnimation] = useState(new Animated.Value(0))
  
    const startAnimation = () => {
      setActivated(!activated)
  
      Animated.timing(upperAnimation, {
        toValue: activated ? 0 : 25,
        duration: 300,
        useNativeDriver: true // Add This line
      }).start()
      Animated.timing(lowerAnimation, {
        toValue: activated ? 0 : -25,
        duration: 300,
        useNativeDriver: true // Add This line
      }).start()
    }

    useEffect(()=>{
        setTimeout(()=>{
            startAnimation()
        },2000)
    },[])
  
    const animatedStyles = {
      lower: {
        transform: [
          {
            translateY: lowerAnimation
          }
        ]
      },
      upper: {
        transform: [
          {
            translateY: upperAnimation
          }
        ]
      }
    }
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>startAnimation()}>
          <View style={styles.burgerButton}>
            <Animated.View style={[styles.inner, animatedStyles.upper]} />
            <Animated.View style={styles.inner} />
            <Animated.View style={[styles.inner, animatedStyles.lower]} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  