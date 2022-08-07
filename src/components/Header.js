import React from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

function Header({ backgroundColor, lightMode = false, leftComponent = { iconName: 'arrow-back', color: '#000000', onpress: () => { } }, middleComponent = { title: '', color: '#000000' }, rightComponent = { iconName: '', color: '#000000' } }) {
  return (
    <View style={[styles.main, { backgroundColor }]}>
      <FocusAwareStatusBar translucent backgroundColor={'#ffffff00'} barStyle={lightMode ? 'dark-content' : 'light-content'} />
      {lightMode ? (
        <LinearGradient style={styles.linearGradient} colors={['rgb(255,255,255)', 'rgba(255,255,255, 0.9)', 'rgba(255,255,255, 0.7)', 'rgba(255,255,255, 0.4)', 'transparent']} />
      ) : null}
      <View style={styles.leftComponent}>
        <TouchableOpacity onPress={leftComponent.onpress}>
          <Ionicons name={leftComponent.iconName} size={hp(24)} color={leftComponent.color} />
        </TouchableOpacity>
      </View>
      <View style={styles.middleComponent}>
        <Text style={[styles.middleComponentText, { color: middleComponent.color }]}>{middleComponent.title}</Text>
      </View>
      <View style={styles.rightComponent}>
        <Ionicons name={rightComponent.iconName} size={hp(24)} color={rightComponent.color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.select({ios: hp(15), android: StatusBar.currentHeight}),
    paddingLeft: wp(20),
    paddingRight: wp(20),
    height: hp(90),
    width: wp(360),
  },
  linearGradient: {
    position: 'absolute',
    height: hp(90),
    width: wp(360),
  },
  leftComponent: {
    flex: 0.5,
    alignItems: 'flex-start',
  },
  middleComponent: {
    flex: 1,
    alignItems: 'center',
  },
  middleComponentText: {
    fontSize: hp(20),
    fontWeight: '700',
  },
  rightComponent: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
})

export default React.memo(Header);
