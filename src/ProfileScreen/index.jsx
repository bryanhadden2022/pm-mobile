import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import Followers from '../Followers'
import Timeline from '../TimelineScreen'

export default function ProfileScreen(props) {
    const { name, followers } = useSelector(state => state.auth.user)
    const { profile } = props.route.params

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            padding: 10
                        }}>
                        <Image
                            source={{
                                uri: profile.avatar_static?.includes('missing')
                                    ? fallbackAvatar
                                    : profile.avatar_static,
                            }}
                            style={{ width: 75, height: 75, marginRight: 10 }}
                        />
                        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>{profile.display_name}</Text>
                            <Text style={{ ...styles.title, fontSize: 16, fontWeight: '500' }}>
                                @{profile.username}
                            </Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ marginRight: 10 }}>Followers: {profile.followers_count}</Text>
                                <Text>Following: {profile.following_count}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            {/* <Followers {...props} /> */}
            <Timeline {...props} />
        </View>
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