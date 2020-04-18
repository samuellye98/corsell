import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';

const MultiTab = ({ tabs, maxTab }) => {
  const [activeTab, setTab] = useState(0);
  return (
    <>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <View
            key={tab.index}
            style={styles.tabBorder}
            borderBottomWidth={activeTab == tab.index ? maxTab : 0}
          >
            <TouchableOpacity
              style={styles.tabBox}
              onPress={() => {
                this.tabRef.scrollBy(tab.index - activeTab);
                setTab(tab.index);
              }}
            >
              <Text style={styles.tabName}>{tab.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Swiper
        height={Dimensions.get('window').height}
        width={Dimensions.get('window').width}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        onIndexChanged={(index) => {
          setTab(index);
        }}
        ref={(ref) => (tabRef = ref)}
      >
        {tabs.map((tab) => tab.view)}
      </Swiper>
    </>
  );
};

export default MultiTab;

const styles = StyleSheet.create({
  tabContainer: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  tabBorder: {
    justifyContent: 'center',
    width: '25%',
    alignItems: 'center',
    height: 60,
    borderColor: 'white',
  },

  tabBox: { height: 20 },
  tabName: {
    color: '#fff',
  },
});
