import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
    />
  );
};

const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

const App = () => {
  const [screen, setScreen] = useState(1);
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Welcome'}}
          />
          {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      {/* <View style={{flex: 0.2}} />
      <View style={{flex: 1, width: '100%'}}>
        <FullWidthImage
          accessibilityLabel="React logo"
          source={{
            uri: 'https://cdn.dribbble.com/users/229313/screenshots/6083565/comp_3.gif',
          }}
          resizeMode="contain"
        />
      </View>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'column',
            },
          ]}>
          {screen === 1 ? (
            <View style={styles.content}>
              <Text style={styles.title}>
                What's your vision of a better world?
              </Text>
              <View style={{marginBottom: 50}}>
                <Pressable
                  style={{...styles.button, backgroundColor: '#f4c430'}}
                  onPress={() => setScreen(2)}>
                  <Text style={{...styles.text, color: 'white'}}>Sign Up</Text>
                </Pressable>
                <Pressable
                  style={{...styles.button, marginTop: 20}}
                  onPress={() => Alert.alert('Please register here')}>
                  <Text style={{...styles.text, color: 'black'}}>Register</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.content}>
              <Text style={styles.title}>
                What's your vision of a better world?
              </Text>
              <View style={{marginBottom: 50}}>
                <TextInput
                  style={{}}
                  placeholder="username"
                  keyboardType="numeric"
                />
                <TextInput
                  style={{}}
                  placeholder="password"
                  keyboardType="numeric"
                />
                <Pressable
                  style={{...styles.button, marginTop: 20}}
                  onPress={() => this.props.navigation.navigate('Home')}>
                  <Text style={{...styles.text, color: 'black'}}>Login</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '500',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    width: 325,
    border: 1,
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});

export default App;

const options2 = {
  method: 'POST',
  client_id: '_53dlIiFMCvqI9tNuM7_wBo_-MsdTCWC5k1lmiyaIkM',
  redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
  response_type: 'code',
  scope: 'read+write+push',
  force_login: true,
};

const options3 = {
  method: 'POST',
  grant_type:
    'Awb1DXLRPmfhK9sVZw1oFayTuB6j4K9xeQ8mLGC9lqSfwcxVfgV8NHcbMnD1oZeqFm02M3N6JXfcSbFs6FpTbg',
  code: 'Awb1DXLRPmfhK9sVZw1oFayTuB6j4K9xeQ8mLGC9lqSfwcxVfgV8NHcbMnD1oZeqFm02M3N6JXfcSbFs6FpTbg',
  client_id: '_53dlIiFMCvqI9tNuM7_wBo_-MsdTCWC5k1lmiyaIkM',
  client_secret: 'yWbpItOeKPHivaq1yTt2mpFIoXNv3xS7-RsnMY8kl4w',
  redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
};

const authEndpoint = `${MASTODON_INSTANCE_URI}/api/v1/accounts/verify_credentials`;
const authOptions = {
  client_id: MASTODON_CLIENT_ID,
  redirect_uri: MASTODON_REDIRECT_URI,
  response_type: 'code',
  scope: MASTODON_SCOPES,
  client_secret: MASTODON_CLIENT_SECRET,
  headers: {
    Authorization: `Bearer ${token}`, // notice the Bearer before your token
  },
};

const queryString = Object.keys(authOptions)
  .map(key => `${key}=${encodeURIComponent(authOptions[key])}`)
  .join('&');
const loginURI = `${authEndpoint}?${queryString}`;

const query1 =
  'https://projectmushroom.social/api/v1/accounts/109451466125736759';

const followingdata = await fetch(query3, options);
const followingjsondata = await followingdata.json();

// const {display_name} = accountjsondata;
// const followingdata2 = await fetch(query4, options2);

// fetch(query4, options2);
