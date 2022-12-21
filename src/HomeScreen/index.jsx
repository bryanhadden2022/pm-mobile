import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import Timeline from '../TimelineScreen'
import styles from './styles'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function HomeScreen(props) {
  const { name, followingCount, img, followersCount, username } = useSelector(state => state.auth.user)

  const fallbackAvatar =
    'https://renderer-v2.vercel.app/_next/image?url=https%3A%2F%2Fapi.typedream.com%2Fv0%2Fdocument%2Fpublic%2Fffd19e6e-3cf5-49a2-985c-8086255e3a33%2F2H5X0HKQFSZYSTHAqGYlzKycibD_Project_Mush_Logo-01.png%3Fbucket%3Ddocument&w=256&q=100';

  return (
    <View style={styles.container}>
      <View style={styles.profileHeaderContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <View style={styles.profileHeaderMeta}>
            <Image
              source={{
                uri: img?.includes('missing')
                  ? fallbackAvatar
                  : img,
              }}
              style={styles.profileHeaderImg}
            />
            <View style={styles.profileHeaderMetaContainer}>
              <Text style={styles.profileHeaderTitle}>{name}</Text>
              <Text style={styles.profileHeaderSubtitle}>
                @{username}
              </Text>
              <View style={styles.profileHeaderFollowerContainer}>
                <Text style={styles.profileHeaderFollowers}>Followers: {followersCount}</Text>
                <Text>Following: {followingCount}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Timeline {...props} />
    </View>
  );
}