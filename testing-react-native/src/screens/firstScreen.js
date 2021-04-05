import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { View, Text, Image, Animated, StyleSheet } from 'react-native';
import logo from '../assets/logo.png'
import HeroImage from '../assets/heroImage.svg'
import SvgLogo from '../assets/OVOlogo.svg'
import styled from 'styled-components';

const styles = StyleSheet.create({
    animatedViewContainer: {
        // borderWidth:2,
        // borderColor:"white",
        position:'absolute',
        top:261
    }
})


const FadeView = styled.View`
  width: 200px;
  height: 200px;
`


export default FirstScreen = () => {

    // const [logoPosition, setLogoPosition] = useState(261)
    const [activated, setActivated] = useState(false)
    const [showRest, setShowRest] = useState(false)
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true // Add This line
        }
      ).start();
    }, [fadeAnim])
    
    const [logoAnimation, setLogoAnimation] = useState(new Animated.Value(0))

    const startAnimation = () => {
        setActivated(!activated)
    
        Animated.timing(logoAnimation, {
          toValue: activated ? 0 : -176,
          duration: 1200,
          useNativeDriver: true // Add This line
        }).start()

        setTimeout(()=>{
          setShowRest(true)
      },350)
      }

      const animatedStyles = {
        logoAnimator: {
          transform: [
            {
              translateY: logoAnimation
            }
          ]
        },
    }
    
    useEffect(()=>{
        setTimeout(()=>{
            startAnimation()
        },2000)
    },[])

    return (
        <View style={{
            position:'relative',
            width: "100%",
            height: "100%",
            backgroundColor:'#141414',
            display:'flex',
            alignItems:'center',
        }}>
            <Animated.View style={[ styles.animatedViewContainer , animatedStyles.logoAnimator]} >
                    <SvgLogo />
            </Animated.View>
            {
              showRest &&
              <FadeView style={{position:"absolute",top:280}} >
              <Animated.View                 // Special animatable View
                style={{
                  opacity: fadeAnim,         // Bind opacity to animated value
                }}
              >
              
                <HeroImage />
                <HeroImage />
            </Animated.View>
            </FadeView>
            }
            
            
        </View>
    )
}