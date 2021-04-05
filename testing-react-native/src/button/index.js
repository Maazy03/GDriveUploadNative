import React from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import btnFilled from '../assets/ButtonFilled2.png'
import btnOutlined from '../assets/ButtonOutlined.png'
 

const Button = () => {
    const [btnPress, setBtnPress] = useState(false)
    return (
        <TouchableHighlight 
        onPressIn={()=>setBtnPress(true)}
        onPressOut={()=>setBtnPress(false)}
        underlayColor="#FFF"
        style={{width: 310,
             height: 103,
             borderWidth:1,
             borderColor:"red",
             padding:0,
            }}
    >
        <ImageBackground
            source={btnPress ? btnOutlined : btnFilled}
            style={{width: "100%", height: "100%", position:"relative",padding:0,margin:0}}
        >
            <Text style={{color:"red", position:"absolute",left:140,top:38}}>{btnPress ? "true" : "false"}</Text>
            
        </ImageBackground>
        </TouchableHighlight>
    )
}

 
// // Later on in your styles..
var styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        resizeMode: 'cover'
      },
//     btnNormal: {
//         backgroundImage: btnFilled,

//     },
//     btnClicked: {
//         backgroundImage: btnOutlined,
//     }

});

export default Button