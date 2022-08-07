import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { completedRides, onGoingRides } from '../../constants/staticData';
import { getCompletedRideHistory, singleCompletedHistory } from './actions/rideHistory.action';
import HistoryCard from './components/HistoryCard';

function CompletedRides({navigation}) {
  const user = useSelector(state => state.login.user);
  const historyData = useSelector(state => state.rideHistory.completedHistoryData);
  const loadingHistory = useSelector(state => state.rideHistory.loading);

  const dispatch = useDispatch();

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      userId: user.id,
    }
    dispatch(getCompletedRideHistory(data))
  }, [])

  const handleHistoryView = (data) => {
    dispatch(singleCompletedHistory(data))
    navigation.navigate('CompletedRideDetails')
  }

  return (
    <View style={styles.main}>
      <ScrollView>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Showing Completed Deliveries</Text>
        </View>
        <View style={styles.dataView}>
          {/* <FlatList
            data={onGoingRides}
            style={styles.data}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={{height: hp(16)}} />
            )}
            renderItem={({item}) => (
              <HistoryCard key={item.id} />
            )}
            /> */}
          {loadingHistory ? (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={colors.white} />
              </View>
            ) : (
              <>
                {historyData.map((value, index) => {
                  return (
                    <HistoryCard
                      key={value.id}
                      marginTop={index != 0 ? hp(16) : 0}
                      location={value.origin.text}
                      destination={value.destination.text}
                      paymentStatus={value.paymentStatus}
                      status={value.status}
                      stars={value.rate.value}
                      price={value.price}
                      date={value.createdAt}
                      onPress={() => handleHistoryView(value)}
                    />
                  )
                })} 
              </>
            )}
          {/* {completedRides.map((value, index) => {
            return (
              <HistoryCard
                key={value.id}
                marginTop={index != 0 ? hp(16) : 0}
                location={value.location}
                destination={value.destination}
                status={value.status}
                price={value.price}
                date={value.date}
                onPress={() => navigation.navigate('CompletedRideDetails')}
              />
            )
          })} */}
          </View>
        </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
  },
  titleContainer: {
    width: wp(360),
    marginLeft: wp(16),
  },
  title: {
    fontSize: hp(14),
    fontWeight: '700',
    color: colors.text.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    paddingTop: hp(58),
    paddingBottom: hp(20)
  },
  dataView: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(16),
  },
  data: {
    flex: 1,
    width: wp(360),
    paddingBottom: hp(40),
    // marginHorizontal: hp(16),
  }
})

export default CompletedRides;
