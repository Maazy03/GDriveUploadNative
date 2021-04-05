import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import GDrive from 'react-native-google-drive-api-wrapper';

const GdriveBackupScreen = props => {
  //   const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1090034849971-qnd3e76bmib0ldl22d57351eu6mfe960.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
  }, []);

  const onDriveSave = async () => {
    console.log('BACKUP CALLED');
    try {
      const user = await GoogleSignin.signIn();
      console.log('user----:', user);
    //**********************Google user Token***************************//

      const token = (await GoogleSignin.getTokens()).accessToken;
      console.log('token----:', token);
    //**********************Google User Drive Token***************************//


      GDrive.setAccessToken(token);
      GDrive.init();
      const initialized = GDrive.isInitialized();
      console.log('intialized----:', initialized);
    //**********************checking is drive eintilaized?***************************//

      let fileResponse;

      if (initialized) {
        const folderResponse = await GDrive.files.safeCreateFolder({
          name: 'Ovo1',
          parents: ['root'],
        });

     //********************* Creating folder***************************//
   
        
        const contents = 'Secret Key';
        if (folderResponse) {
         fileResponse =  await GDrive.files.createFileMultipart(
            contents,
            'text/plain',
            {
              parents: [folderResponse],
              name: 'secretKey.txt',
            },
            false,
          );
        }
      //**********************Creating file in the folder***************************//

        const data = await fileResponse.json();
        console.log('FILE RESPONSE', data);
      }
    } catch (err) {
      console.log('error from gdrive', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainWrap}>
        <Button
          onPress={onDriveSave}
          style={{
            width: '100%',
            textAlign: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Save Secret Key"
        />
      </View>
    </View>
  );
};

export default GdriveBackupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
    ...Platform.select({android: {paddingTop: StatusBar.currentHeight}}),
  },
  mainWrap: {
    marginTop: 60,
    flex: 1,
    alignItems: 'center',
  },
});
