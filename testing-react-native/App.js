// Store/Retrieve Files on Google Drive using React Native App
// https://aboutreact.com/react-native-google-drive/
import 'react-native-gesture-handler';

// Import React
import React, { useEffect } from 'react';

import SplashScreen from  "react-native-splash-screen";

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import all the screens needed
import GoogleLoginScreen from './src/auth/GoogleLoginScreen';
import HomeScreen from './src/HomeScreen';
import GDUploadFileScreen from './src/googleDrivescreens/GDUploadFileScreen';
import googleKey from './src/googleDrivescreens/googleKey';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/button'
import FirstScreen from './src/screens/firstScreen';
import AnimatedHamburger from './src/screens/animatedHamburger';
// import LinearGradientView from './src/linearGradient'
// import LinearGradient from 'react-native-linear-gradient';
// import GDFilesListingScreen from './src/googleDrivescreens/GDFilesListingScreen';
// import GDSingleFileScreen from './src/googleDrivescreens/GDSingleFileScreen';
// import GDDeleteFileScreen from './src/googleDrivescreens/GDDeleteFileScreen';
// import GDDownloadFileScreen from './src/googleDrivescreens/GDDownloadFileScreen';

const Stack = createStackNavigator();

const App = () => {

  //Hide Splash screen on app load.
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GoogleLoginScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}>
        <Stack.Screen
          name="GoogleLoginScreen"
          component={GoogleLoginScreen}
          // Hiding header
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Google Drive Example'}}
        />
        <Stack.Screen
          name="GDUploadFileScreen"
          component={GDUploadFileScreen}
          options={{title: 'Upload File'}}
        />
        <Stack.Screen
          name="googleKey"
          component={googleKey}
          options={{title: 'Upload File'}}
        />
        {/* <Stack.Screen
          name="GDFilesListingScreen"
          component={GDFilesListingScreen}
          options={{title: 'Files'}}
        />
        <Stack.Screen
          name="GDSingleFileScreen"
          component={GDSingleFileScreen}
          options={{title: 'File Content'}}
        />
        <Stack.Screen
          name="GDDeleteFileScreen"
          component={GDDeleteFileScreen}
          options={{title: 'Delete File'}}
        />
        <Stack.Screen
          name="GDDownloadFileScreen"
          component={GDDownloadFileScreen}
          options={{title: 'Download File'}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={{width: "100%", height: "100%"}} >
    //   {/* <Text>Hello worlds!</Text>

    //   <Button />

    //   <Text>Hello worlds!</Text> */}
    //   <FirstScreen />
    //   {/* <AnimatedHamburger /> */}
    // </View>
  );
};

let styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    height:300
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default App;