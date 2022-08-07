import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';
import { menuData } from '../constants/staticData';
import { useSelector } from 'react-redux';

function CustomDrawer(props) {
  const state = useSelector(state => state)
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.main}>
      <View style={styles.drawerTop}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBase}>
            {state.login.user.profilePicture &&
              <Image
                source={{ uri: `data:${state.login.user.profilePicture.mimeType};base64,${state.login.user.profilePicture.value}` }}
                style={styles.userImage}
              />
            }
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1}>{state.login.user.name}</Text>
        </View>
      </View>
      <View style={styles.drawerContent}>
        {menuData.map((item, index) => {
          return (
            <DrawerItem
              key={item.id}
              icon={({ color, size }) => (
                <>
                  {item.id === 2 || item.id === 7 ? (
                    <Ionicons
                      name={item.iconName}
                      color={color}
                      size={size}/>
                  ) : (
                    <Feather
                      name={item.iconName}
                      color={color}
                      size={size}/>
                  )}
                </>
              )}
              label={item.label}
              activeTintColor={colors.white}
              inactiveTintColor={colors.white}
              onPress={() => props.navigation.navigate(item.sceenName)}
              style={styles.menu}
              labelStyle={styles.menuLabel}
            />
          )
        })}
        {/* <View style={styles.drawerBottom}>
          <Text style={styles.drawerBottomTitle}>Do more with your account</Text>
          <Text style={styles.drawerBottomDesc}>Convert account to rider’s account</Text>
        </View> */}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: wp(274),
    height: hp(720),
    paddingTop: 0,
    marginTop: 0,
    // backgroundColor: colors.blackBg,
  },
  drawerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(274),
    height: hp(160),
    paddingHorizontal: wp(21),
    backgroundColor: colors.white,
  },
  imageContainer: {},
  imageBase: {
    width: wp(94),
    height: wp(94),
    borderRadius: wp(94) / 2,
    overflow: 'hidden',
    backgroundColor: colors.grey,
  },
  userImage: {
    width: wp(94),
    height: wp(94),
  },
  nameContainer: {
    width: wp(114),
    marginLeft: wp(24),
  },
  name: {
    fontSize: hp(18),
    fontWeight: '400',
  },
  drawerContent: {
    flex: 1,
    width: wp(274),
    marginTop: hp(56),
    // backgroundColor: '#ffffff50',
  },
  menu: {
    marginTop: hp(0),
    // height: 40,
    // backgroundColor: '#ffffff50',
  },
  menuLabel: {
    fontSize: hp(18),
    fontWeight: '400',
  },
  drawerBottom: {
    marginTop: hp(136),
    paddingHorizontal: wp(21),
  },
  drawerBottomTitle: {
    fontSize: hp(14),
    fontWeight: '300',
    color: colors.mainColor,
  },
  drawerBottomDesc: {
    fontSize: hp(14),
    fontWeight: '300',
    color: colors.white,
    marginTop: hp(5),
  },
})

export default CustomDrawer;
