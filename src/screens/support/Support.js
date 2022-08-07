import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
import Header from '../../components/Header';
import SupportOpt from '../../components/SupportOpt';
import SupportOptSeperator from '../../components/SupportOptSeperator';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { supportDetails } from '../support/actions/support.action';
import { conversationSection, supportData } from '../../constants/staticData';
import WebView from 'react-native-webview';

function Support({navigation}) {
  const dispatch = useDispatch();
  const support = useSelector((state) => state.support);
  const userInfo = useSelector(state => state.login.user);

  const handleSupportNavigation = (details) => {
    dispatch(supportDetails(details))
    navigation.navigate('SupportDetails')
  }

  const supportConfig = `
    $crisp.push(["set", "user:email", [${userInfo.email}]]);
    $crisp.push(["set", "user:nickname", [${userInfo.name}]]);
    $crisp.push(["set", "user:phone", ["${userInfo.mobile.value}]]);
    $crisp.push(["do", "chat:open"])
  `
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Support', color: colors.text.white }}
      />
      <WebView
        style={{flex: 1, marginBottom: hp(30)}}
        source={{uri: 'https://flog.com.ng/faq/'}}
        injectedJavaScript={supportConfig}
        javaScriptEnabled
        // injectedJavaScriptForMainFrameOnly={false}
        startInLoadingState
      />
      {/* <View style={styles.content}>
        <View>
          <ContentHeader title={'FAQ'} height={hp(60)} />
          <View style={styles.helpData}>
            <FlatList
              data={supportData}
              style={styles.data}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={SupportOptSeperator}
              renderItem={({ item }) => (
                <SupportOpt key={item.id} title={item.title} onPress={() => handleSupportNavigation(item)} />
              )}
              />
          </View>
        </View>
        <View style={styles.supportChat}>
        <ContentHeader title={'Conversation'} height={hp(60)} />
        <View style={styles.helpData}>
            <FlatList
              data={conversationSection}
              style={styles.data}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={SupportOptSeperator}
              renderItem={({ item }) => (
                <SupportOpt key={item.id} title={item.title} onPress={() => handleSupportNavigation(item)} />
              )}
              />
          </View>
          </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
  },
  content: {
    marginTop: hp(30),
  },
  helpData: {
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(8),
  },
  data: {
  },
  supportChat: {
    marginTop: hp(68.75),
  }
})

export default Support;
