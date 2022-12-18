import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

function Item(props) {
  const {
    username,
    display_name,
    avatar_static,
    followers_count,
    following_count,
  } = props.item;

  const fallbackAvatar =
    'https://renderer-v2.vercel.app/_next/image?url=https%3A%2F%2Fapi.typedream.com%2Fv0%2Fdocument%2Fpublic%2Fffd19e6e-3cf5-49a2-985c-8086255e3a33%2F2H5X0HKQFSZYSTHAqGYlzKycibD_Project_Mush_Logo-01.png%3Fbucket%3Ddocument&w=256&q=100';

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        width: '100%',
      }}>
      <View
        style={{
          ...styles.item,
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Image
          source={{
            uri: avatar_static.includes('missing')
              ? fallbackAvatar
              : avatar_static,
          }}
          style={{width: 75, height: 75, marginRight: 10}}
        />
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{display_name}</Text>
          <Text style={{...styles.title, fontSize: 16, fontWeight: '500'}}>
            @{username}
          </Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{marginRight: 10}}>Followers: {followers_count}</Text>
            <Text>Following: {following_count}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function renderItem(props) {
  return <Item {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    border: 1,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 250,
    color: 'black',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '400',
  },
});

export default function HomeScreen(props) {
  const {user} = useSelector(state => state.auth);

  // if (!user) {
  //   return (
  //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          borderBottom: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text style={styles.title}>You are now logged in!</Text>
        <Text style={styles.subtitle}>
          Welcome,
          <Text style={{color: 'green', fontWeight: '600'}}>
            {user.display_name}
          </Text>
        </Text>
      </View>
      <FlatList
        data={user.followers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
