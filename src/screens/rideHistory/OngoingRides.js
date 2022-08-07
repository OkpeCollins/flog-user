import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { getOtherRideHistory, singleOthersHistory, startLoading, triggerHistoryGet } from './actions/rideHistory.action';
import HistoryCard from './components/HistoryCard';

function OnGoingRides({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(true);
  const user = useSelector(state => state.login.user);
  const historyState = useSelector(state => state.rideHistory);
  const historyData = useSelector(state => state.rideHistory.otherHistoryData);
  const loadingHistory = useSelector(state => state.rideHistory.loading);

  const dispatch = useDispatch();

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      userId: user.id,
    }
    dispatch(getOtherRideHistory(data))
  }, [historyState.triggerHistoryGet])

  const handleHistoryView = (data) => {
    dispatch(singleOthersHistory(data))
    navigation.navigate('OngoingRideDetails')
  }

  const handleRefresh = () => {
    // dispatch(startLoading())
    dispatch(triggerHistoryGet());
  }

  return (
    <View style={styles.main}>
      <ScrollView
      //   refreshControl={
      //   <RefreshControl
      //         refreshing={loadingHistory}
      //         onRefresh={() => handleRefresh()}
      //   />
      // }
      >
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Showing Ongoing Deliveries</Text>
        </View>
        <View style={styles.dataView}>
        
          {/* <FlatList
            data={historyData}
            style={styles.data}
            keyExtractor={(item) => item.id}
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true) ;dispatch(triggerHistoryGet())}}
            ItemSeparatorComponent={() => (
              <View style={{height: hp(16)}} />
            )}
            refreshControl={
              <RefreshControl
                refreshing={loadingHistory}
                onRefresh={() => handleRefresh()}
              />}
            renderItem={({item}) => (
              <HistoryCard
                key={item.id}
                // marginTop={index != 0 ? hp(16) : 0}
                location={item.origin.text}
                destination={item.destination.text}
                status={item.status}
                price={item.price}
                date={item.createdAt}
                onPress={() => handleHistoryView(item)}
              />
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
                      status={value.status}
                      price={value.price}
                      date={value.createdAt}
                      onPress={() => handleHistoryView(value)}
                    />
                  )
                })} 
              </>
            )}
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
    // flex: 1,
    // width: wp(360),
    paddingBottom: hp(40),
    // marginHorizontal: hp(16),
  }
})

export default OnGoingRides;
