import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
import Header from '../../components/Header';
import SupportOpt from '../../components/SupportOpt';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';

function SupportDetails({ navigation }) {
  const supportDetails = useSelector(state => state.support.supportDetails)
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Support', color: colors.text.white }}
      />
      <View style={styles.content}>
        <ContentHeader title={supportDetails.title} height={hp(80)} fontSize={hp(18)} />
        <View style={styles.descContainer}>
          <Text style={styles.desc}>{supportDetails.desc}</Text>
        </View>
        <View style={styles.getHelpContainer}>
          <ContentHeader title={'Still need help'} height={hp(45)} />
          <View style={styles.getHelp}>
            <SupportOpt title={'Get help'} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.blackBg,
  },
  content: {
    marginTop: hp(30)
  },
  descContainer: {
    marginTop: hp(24),
  },
  desc: {
    fontSize: hp(12),
    color: colors.text.white,
    textAlign: 'left',
    marginHorizontal: wp(20),
    lineHeight: hp(14.06),
  },
  getHelpContainer: {
    marginTop: hp(24),
    alignItems: 'center',
  },
  getHelp: {
    marginTop: hp(15),
  },
})

export default SupportDetails;
