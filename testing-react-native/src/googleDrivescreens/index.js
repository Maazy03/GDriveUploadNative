import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GoogleSignin } from "@react-native-community/google-signin";
import { REACT_APP_GDRIVE_CLIENT_ID } from "react-native-dotenv";
import GDrive from "react-native-google-drive-api-wrapper";
import SecureStorage from "react-native-secure-storage";
import Modal from "react-native-modal";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";

// import numioHome from '../../../assets/numioHome.png';
import Button from '../../../components/Buttons/Button';

const GdriveBackupScreen = (props) => {
  const [fetching, setFetching] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    firstName,
    lastName,
    email,
    phoneNational,
    phoneInternational,
    picture,
    numioId,
    secretKey,
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: REACT_APP_GDRIVE_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
      scopes: ["https://www.googleapis.com/auth/drive.file"],
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    return () => {
      setShowSuccessModal(false);
      setFetching(false);
    };
  }, []);

  const onPressBackup = async () => {
    try {
      const user = await GoogleSignin.signIn();

      if (email !== user.user.email) {
        showMessage({
          message:
            "Your Google Drive backup email does not match your registration email.",
          duration: 5000,
          type: "danger",
        });
        await GoogleSignin.signOut();
        return;
      }

      const token = (await GoogleSignin.getTokens()).accessToken;
      GDrive.setAccessToken(token);
      GDrive.init();
      const initialized = GDrive.isInitialized();
      let fileResponse;
      if (initialized) {
        setFetching(true);

        const folderResponse = await GDrive.files.safeCreateFolder({
          name: "Numio",
          parents: ["root"],
        });

        console.log({ secretKey }, props);

        if (folderResponse) {
          fileResponse = await GDrive.files.createFileMultipart(
            secretKey,
            "text/plain",
            {
              parents: [folderResponse],
              name: "secretKey.txt",
            },
            false
          );
        }
        const data = await fileResponse.json();

        dispatch({
          type: "SET_RECOVERY_KEY",
          payload: secretKey,
        });

        await Promise.all([
          SecureStorage.setItem("gdriveId", data.id),
          SecureStorage.setItem("secretKeyStored", secretKey),
        ]);
        if (data) {
          setShowSuccessModal(true);
          setFetching(false);
        } else if (!response) {
          await GDrive.files.delete(data.id);
          setShowSuccessModal(false);
          setFetching(false);
        }
      }
    } catch (err) {
      console.log("error from gdrive", err);
      setFetching(false);
    }
  };

  const onBackupSuccess = async () => {
    setShowSuccessModal(false);
    props.navigation.navigate("IdGenerationScreen", {
      firstName,
      lastName,
      email: email.toLowerCase(),
      phoneNational,
      phoneInternational,
      picture,
      numioId,
      enrollmentIdentifier: numioId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainWrap}>
        <View style={styles.modalItemWrap}>
          <Image
            // source={numioHome}
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/numiopay-aefaf.appspot.com/o/numioHome.png?alt=media&token=25f9d255-bf1c-4961-be17-6013b95f17d6',
            }}
            style={styles.modalIconWrap}
            resizeMode='contain'
          />
          <View style={styles.modalTextWrap}>
            <Text style={styles.ItemTitle}>Backup Wallet</Text>
            <Text style={{ textAlign: "justify", fontSize: 16 }}>
              {
                "\n\nA recovery key will be backed up to your registered Google Drive email account in case you need to recover your wallet on a new device.\n\nThe recovery key is not a private key. A successful 3D face scan is also required to recover your account.\n\nAllow Numio to upload your recovery key to your Google Drive account on the next screen. \n\n"
              }
            </Text>
          </View>
          <Button
            onPress={onPressBackup}
            fetching={fetching}
            btnStyle={{
              marginTop: 100,
              width: Dimensions.get("window").width - 70,
            }}
            style={{
              width: "100%",
              textAlign: "center",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            text='Backup Now'
            type='green'
          />
        </View>
      </View>
      <Modal
        isVisible={showSuccessModal}
        animationIn='zoomIn'
        animationOut='zoomOut'
        animationInTiming={150}
        animationOutTiming={150}
        backdropOpacity={0.25}
        backdropTransitionOutTiming={0}
        useNativeDriver
      >
        <View style={styles.modalContent}>
          <View style={styles.modalItem}>
            <View style={styles.modalItemWrap}>
              <Image
                // source={numioHome}
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/numiopay-aefaf.appspot.com/o/numioHome.png?alt=media&token=25f9d255-bf1c-4961-be17-6013b95f17d6',
                }}
                style={styles.modalIconWrap}
                resizeMode='contain'
              />
              <View style={styles.modalTextWrap}>
                <Text style={styles.modalItemTitle}>Backup Success!</Text>
                <Text style={styles.modalItemDescription}>
                  {
                    "\nYou can also find your private key in your settings if you wish to write it down."
                  }
                </Text>
              </View>
              <Button
                onPress={onBackupSuccess}
                style={{ paddingHorizontal: 80, marginTop: 30 }}
                text='Ok'
                type='green'
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GdriveBackupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "stretch",
    flex: 1,
    ...Platform.select({ android: { paddingTop: StatusBar.currentHeight } }),
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  mainWrap: {
    marginTop: 60,
    flex: 1,
    alignItems: "center",
  },
  modalItemIcon: {
    fontFamily: "Ionicons",
    color: "#fff",
    fontSize: 20,
  },
  modalIconWrap: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#3AD15D',
    // marginRight: 10,
    width: 60,
    height: 60,
    // borderRadius: 100
  },
  modalItemWrap: {
    alignItems: "center",
  },
  modalItemTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 20,
    textAlign: "center",
    color: "#1797E3",
    marginBottom: 5,
  },
  ItemTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 24,
    textAlign: "center",
    color: "#1797E3",
    marginBottom: 5,
  },
  modalItemDescription: {
    color: "#838383",
    fontSize: 12,
    textAlign: "justifyp",
    fontFamily: "Nunito-Regular",
    textAlign: "center",
  },
  modalTextWrap: {
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignContent: "stretch",
  },
  addressWrap: {
    marginTop: 30,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    borderColor: "#f6f6f6",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  addressText: {
    color: "#a3a3a3",
    fontFamily: "Nunito-Semibold",
    paddingHorizontal: 10,
    flex: 1,
  },
  icon: {
    fontFamily: "Ionicons",
    fontSize: 22,
  },
  copyButton: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 15,
    borderColor: "#f6f6f6",
  },
});
