import React from 'react';
import {View, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { supportDetails } from '../support/actions/support.action';
import WebView from 'react-native-webview';

function PrivacyPolicy({navigation}) {
  const dispatch = useDispatch();
  const support = useSelector((state) => state.support);
  const userInfo = useSelector(state => state.login.user);

  const handleSupportNavigation = (details) => {
    dispatch(supportDetails(details))
    navigation.navigate('SupportDetails')
  }

  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Privacy Policy', color: colors.text.white }}
      />
      <WebView
        style={{flex: 1}}
        source={{uri: 'https://flog.com.ng/privacy-policy'}}
        startInLoadingState={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
  },
})

export default PrivacyPolicy;
