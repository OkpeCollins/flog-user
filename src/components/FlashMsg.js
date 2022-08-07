import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';
import { hideFlashMsg } from '../redux/rootAction';

function FlashMsg() {
  const state = useSelector(state => state.root);

  const dispatch = useDispatch();

  React.useEffect(() => {
    function hideFlashMessage() {
      dispatch(hideFlashMsg());
    };
    
    const hideFlashMsgTimeout = setTimeout(() => dispatch(hideFlashMsg()), 3000);
    if (!state.showFlashMsg) {
      clearTimeout(hideFlashMsgTimeout)
    }
  }, [state])
  
  return (
    <>
      {state.showFlashMsg && (
        <View style={styles.main}>
          <View style={styles.inner}>
            <Text style={styles.text}>{state.flashMsg}</Text>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    position: 'absolute',
    width: wp(360),
    top: hp(60),
  },
  inner: {
    backgroundColor: colors.contentHeader,
    width: wp(335),
    padding: wp(10),
    paddingTop: wp(15),
    paddingBottom: wp(15),
    borderRadius: wp(5),
    borderWidth: wp(1),
    borderColor: colors.mainColor,
    zIndex: 1000,
  },
  text: {
    fontSize: hp(14),
    color: colors.text.white,
    textTransform: 'capitalize',
  }
})

export default FlashMsg;
