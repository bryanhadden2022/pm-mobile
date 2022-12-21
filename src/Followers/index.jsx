// ericholthaus
// 109343485026098492

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';

const fallbackAvatar =
    'https://renderer-v2.vercel.app/_next/image?url=https%3A%2F%2Fapi.typedream.com%2Fv0%2Fdocument%2Fpublic%2Fffd19e6e-3cf5-49a2-985c-8086255e3a33%2F2H5X0HKQFSZYSTHAqGYlzKycibD_Project_Mush_Logo-01.png%3Fbucket%3Ddocument&w=256&q=100';

function Item(props) {
    const {
        username,
        display_name,
        avatar_static,
        followers_count,
        following_count,
    } = props.item;

    return (
        <Pressable onPress={() => props.navigation.navigate('Profile', { profile: props.item })} >
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
                            uri: avatar_static?.includes('missing')
                                ? fallbackAvatar
                                : avatar_static,
                        }}
                        style={{ width: 75, height: 75, marginRight: 10 }}
                    />
                    <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>{display_name}</Text>
                        <Text style={{ ...styles.title, fontSize: 16, fontWeight: '500' }}>
                            @{username}
                        </Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ marginRight: 10 }}>Followers: {followers_count}</Text>
                            <Text>Following: {following_count}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Pressable>
    );
}

export default function Followers(props) {
    const { name, followers } = useSelector(state => state.auth.user)

    return (
        <FlatList
            data={followers[0]}
            renderItem={({ item, index, separators }) => (
                <Item
                    item={item}
                    navigation={props.navigation}>
                </Item>
            )}
            keyExtractor={item => item.id}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    header: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        borderBottom: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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