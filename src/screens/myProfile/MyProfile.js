import React from 'react';
import {View, Text, StyleSheet, Image, TouchableNativeFeedback, StatusBar, TouchableHighlight, TouchableOpacity} from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// import Accordion from 'react-native-collapsible/Accordion';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import LogoutIcon from './components/LogoutIcon';
import { useDispatch, useSelector } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
import BottomSheet from 'reanimated-bottom-sheet';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { validateEmail, validateMobile, validateName, validatePassword } from '../../services/validation.service';
import { changePassword, loadUser, logOut, updateProfile } from '../login/actions/login.actions';
import { deleteFromStorage } from '../../services/localStorage.service';
import { resetHomeState } from '../home/actions/home.action';
import { resetState } from '../signUp/actions/signUp.actions';

function MyProfile({ navigation }) {
  const [prevPassword, setPrevPassword] = React.useState(null);
  const [newPassword, setNewPassword] = React.useState(null);
  const [newPasswordComfirm, setNewPasswordConfirm] = React.useState(null);
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const [updateBtnDisabled, setUpdateBtnDisabled] = React.useState(true);
  
  const [name, setName] = React.useState();
  const [mobile, setMobile] = React.useState();
  const [email, setEmail] = React.useState();
  const [profilePics, setProfilePics] = React.useState();
  const [mimeType, setMimeType] = React.useState();

  const [errorName, setErrorName] = React.useState(null);
  const [errorMobile, setErrorMobile] = React.useState(null);
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [errorPrevPassword, setErrorPrevPassword] = React.useState(null);
  const [errorNewPassword, setErrorNewPassword] = React.useState(null);
  const [errorNewPasswordConfirm, setErrorNewPasswordConfirm] = React.useState(null);

  const changePassRef = React.useRef();
  const updateProfileRef = React.useRef();

  const state = useSelector(state => state.login);
  const user = useSelector(state => state.login.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setName(user.name);
    let mobile = user.mobile.value;
    setMobile(`0${mobile.substring(4)}`);
    setEmail(user.email.value);
    setProfilePics(user.profilePics);
  }, [])

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          dispatch(showFlashMsg('You need to grant to read external storage'))
        }
      }
    })();
  }, []);

  React.useEffect(() => {
    if (prevPassword === null || newPassword == null || newPasswordComfirm === null) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [prevPassword, newPassword, newPasswordComfirm])

  const bottomSheetHeader = () => {
    return (
      <View style={ bottomSheetStyles.draggerHeader}>
        <View style={bottomSheetStyles.dragger} />
      </View>
    );
  }

  const changePassBottomSheet = () => {
    return (
      <View style={bottomSheetStyles.main}>
        {/* <Text style={bottomSheetStyles.contentHeader}>Change Your Password</Text> */}
        <ContentHeader title={'Change Your Password'} height={hp(48)} />
        <View style={bottomSheetStyles.formContainer}>
          <Input
            placeholder={'Previous Password'}
            width={wp(335)}
            onChangeText={(text) => handleChangeText(text, 'prevPassword')}
            secureTextEntry
            value={prevPassword}
          />
          {errorPrevPassword && <Text style={bottomSheetStyles.errorHint}>{errorPrevPassword}</Text>}
          <Input
            placeholder={'New Password'}
            width={wp(335)}
            marginTop={16}
            onChangeText={(text) => handleChangeText(text, 'newPassword')}
            secureTextEntry
            value={newPassword}
          />
          {errorNewPassword && <Text style={bottomSheetStyles.errorHint}>{errorNewPassword}</Text>}
          <Input
            placeholder={'Confirm New Password'}
            width={wp(335)}
            marginTop={16}
            onChangeText={(text) => handleChangeText(text, 'newPasswordConfirm')}
            secureTextEntry
            value={newPasswordComfirm}
          />
          {errorNewPasswordConfirm && <Text style={bottomSheetStyles.errorHint}>{errorNewPasswordConfirm}</Text>}
          <View style={bottomSheetStyles.btnContainer}>
            <Button
              title={'Change Password'}
              width={wp(335)}
              onPress={() => handleChangePassword()}
              disabled={btnDisabled}
              loading={state.loading}
            />
          </View>
        </View>
      </View>
    );
  }

  const updateProfileSheet = () => {
    return (
      <View style={bottomSheetStyles.main}>
        {/* <Text style={bottomSheetStyles.contentHeader}>Change Your Password</Text> */}
        <ContentHeader title={'Update profile'} height={hp(48)} />
        <View style={bottomSheetStyles.imageContainer}>
          <View style={bottomSheetStyles.imageBase}>
            <Image source={{uri:`data:${mimeType};base64,${profilePics}`}} style={bottomSheetStyles.image} />
            <TouchableOpacity onPress={() => handleImageSelection()}>
              <View style={bottomSheetStyles.addOverlay}>
                <Ionicons name={'ios-add-sharp'} size={hp(50)} color={colors.text.white} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={bottomSheetStyles.formContainer}>
          <Input
            placeholder={'Name'}
            width={wp(335)}
            onChangeText={(text) => handleChangeText(text, 'name')}
            value={name}
          />
            {errorName && <Text style={bottomSheetStyles.errorHint}>{errorName}</Text>}
          <Input
            placeholder={'Mobile'}
            width={wp(335)}
            marginTop={16}
            keyboardType={'numeric'}
            onChangeText={(text) => handleChangeText(text, 'mobile')}
            value={mobile}
          />
            {errorMobile && <Text style={bottomSheetStyles.errorHint}>{errorMobile}</Text>}
          <Input
            placeholder={'Email'}
            width={wp(335)}
            marginTop={16}
            onChangeText={(text) => handleChangeText(text, 'email')}
            value={email}
          />
            {errorEmail && <Text style={bottomSheetStyles.errorHint}>{errorEmail}</Text>}
          <View style={bottomSheetStyles.btnContainer}>
            <Button
              title={'Update Profile'}
              width={wp(335)}
              onPress={() => handleProfileUpdate()}
              // disabled={updateBtnDisabled}
              loading={state.loading}
            />
          </View>
        </View>
      </View>
    );
  }

  //handle form field tex change
  const handleChangeText = (value, type) => {
    switch (type) {
      case 'name':
        setName(value);
        break;
      case 'mobile':
        setMobile(value);
      break;
      case 'email':
        setEmail(value);
      break;
      case 'prevPassword':
        setPrevPassword(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'newPasswordConfirm':
        setNewPasswordConfirm(value);
        break;
      default:
        break;
    }
  }

  const handleBottomSheet = (type) => {
    switch (type) {
      case 'changePassword':
        changePassRef.current.snapTo(1)
        break;
      case 'updateProfile':
        updateProfileRef.current.snapTo(1)
        break;
      default:
        break;
    }
  }

  const handleChangePassword = () => {
    if (validatePassword(newPassword) === false) {
      setErrorNewPassword('Password must be atleast 6 letters containing uppercase, lower case')
      return;
    } else {
      setErrorNewPassword(null)
    }

    if (newPassword !== newPasswordComfirm) {
      setErrorNewPasswordConfirm('Confirm password must be the same as new password')
      return;
    } else {
      setErrorNewPasswordConfirm(null)
    }

    let data = {
      authorization: `bearer ${state.user.tokens.accessToken}`,
      details: {
        id: state.user.id,
        currentPassword: prevPassword,
        newPassword: newPassword,
        confirmPassword: newPasswordComfirm,
      },
    }
    dispatch(changePassword(data))
  }

  const handleImageSelection = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true,
    })
      .then((response) => {
        setProfilePics(response.base64);
        if (response.base64[0] === '/') {
          setMimeType('image/jpg');
        } else {
          setMimeType('image/png');
        }
      })
    .catch(error => console.log(error))
  }
  
  const handleProfileUpdate = () => {
    if (validateName(name) === false) {
      setErrorName('Name must be more than three character');
      return;
    } else {
      setErrorName(null)
    }
    
    if (validateMobile(mobile) === false) {
      setErrorMobile('Please enter a valid mobile number')
      return;
    } else {
      setErrorMobile(null)
    }
    
    if (validateEmail(email) === false) {
      setErrorEmail('Please enter a valid email')
      return;
    } else {
      setErrorEmail(null)
    }

    let formattedMobile = parseInt(mobile);
    formattedMobile = `+234${formattedMobile}`
    
    let userData = {
      details: {
        userId: user.id,
        name,
        mobile: formattedMobile,
        email,
        profilePictureMimeType: mimeType,
        profilePictureValue: profilePics,
      }
    };

    // dispatch(signUp(userData))
    dispatch(updateProfile(userData))
  }

  const handleLogOut = () => {
    deleteFromStorage('user')
      .then((response) => {
      dispatch(logOut())
      // dispatch(resetHomeState())
      dispatch(resetState())
    })
  }
  
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'My Profile', color: colors.text.white }}
      />
      <View style={styles.userInfo}>
        <View style={styles.userImageBase}>
          {user.profilePicture &&
            <Image
              source={{ uri: `data:${user.profilePicture.mimeType};base64,${user.profilePicture.value}` }}
              style={styles.userImage}
            />
          }
        </View>
        <View style={styles.userData}>
          <Text style={styles.userName}>{state.user.name}</Text>
          <Text style={styles.userEmail}>{state.user.email.value}</Text>
          <Text style={styles.userNum}>{state.user.mobile.value}</Text>
        </View>
        <TouchableOpacity onPress={() => handleLogOut()}>
          <View style={styles.logOutBtn}>
            <LogoutIcon />
            {/* <MaterialIcons name={'logout'} color={colors.mainColor} size={hp(18)} /> */}
          </View>
        </TouchableOpacity>
      </View>
      <ContentHeader height={hp(45)} title={'Settings'} fontSize={hp(16)} />
      <TouchableNativeFeedback onPress={() => handleBottomSheet('changePassword')}>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Change Password</Text>
          <Ionicons name={'chevron-forward'} color={colors.text.white} size={hp(18)} />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => handleBottomSheet('updateProfile')}>
        <View style={styles.option}>
          <Text style={styles.optionTitle}>Update Profile</Text>
          <Ionicons name={'chevron-forward'} color={colors.text.white} size={hp(18)} />
        </View>
      </TouchableNativeFeedback>
      <BottomSheet
        ref={changePassRef}
        snapPoints={[hp(0), hp(720)]}
        overdragResistanceFactor={10}
        renderHeader={bottomSheetHeader}
        renderContent={changePassBottomSheet}
        enabledContentTapInteraction={false}
      />
      <BottomSheet
        ref={updateProfileRef}
        snapPoints={[hp(0), hp(720)]}
        overdragResistanceFactor={10}
        renderHeader={bottomSheetHeader}
        renderContent={updateProfileSheet}
        enabledContentTapInteraction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: hp(720) + StatusBar.currentHeight,
    backgroundColor: colors.blackBg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.offlineScreenGrey,
    width: wp(360),
    height: hp(96),
    paddingLeft: wp(16),
    paddingRight: wp(13),
  },
  userImageBase: {
    width: wp(52),
    height: wp(52),
    borderRadius: wp(52) / 2,
    overflow: 'hidden',
    backgroundColor: colors.grey,
  },
  userImage: {
    width: wp(52),
    height: wp(52),
  },
  userData: {
    flex: 1,
    paddingHorizontal: wp(10),
  },
  userName: {
    fontSize: hp(14),
    color: colors.text.white,
  },
  userEmail: {
    fontSize: hp(9),
    color: colors.mainColor,
  },
  userNum: {
    fontSize: hp(9),
    color: colors.mainColor,
  },
  logOutBtn: {},
  bikeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    marginTop: hp(8),
  },
  bikeName: {
    fontSize: hp(14),
    fontWeight: '700',
    color: colors.text.white,
  },
  bikeNum: {
    fontSize: hp(10),
    color: colors.text.white,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    marginTop: hp(8),
    backgroundColor: colors.offlineScreenGrey,
    height: hp(45),
  },
  optionTitle: {
    fontSize: hp(14),
    fontWeight: '700',
    color: colors.text.white
  }
})

const bottomSheetStyles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    height: hp(675),
    width: wp(360),
    paddingHorizontal: wp(20),
    backgroundColor: colors.blackBg,
  },
  draggerHeader: {
    width: wp(360),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(30),
    borderTopLeftRadius: wp(15),
    borderTopRightRadius: wp(15),
    backgroundColor: colors.blackBg
  },
  dragger: {
    marginTop: hp(9),
    width: wp(50),
    height: hp(6),
    borderRadius: hp(8) / 2,
    backgroundColor: colors.grey,
  },
  contentHeader: {
    fontSize: hp(16),
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text.white,
    marginTop: hp(30),
  },
  errorHint: {
    alignSelf: 'flex-start',
    marginLeft: wp(5),
    marginRight: wp(5),
    marginTop: wp(5),
    fontSize: wp(14),
    color: colors.text.lightGrey,
  },
  formContainer: {
    alignItems: 'center',
    // flex: 1,
    // width: wp(335),
    marginTop: hp(16),
  },
  btnContainer: {
    marginTop: hp(45),
  },
  imageContainer: {
    marginTop: hp(10),
  },
  imageBase: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: hp(144),
    width: hp(144),
    borderRadius: hp(144) / 2,
    backgroundColor: colors.contentHeader,
  },
  image: {
    position: 'absolute',
    height: hp(144),
    width: hp(144),
  },
  addOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: hp(144),
    width: hp(144),
    backgroundColor: colors.blackBg + 50,
  },
})

export default MyProfile;