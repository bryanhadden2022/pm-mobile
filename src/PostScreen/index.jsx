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

export default function ProfileScreen(props) {
    const { name, followers } = useSelector(state => state.auth.user)
    const { profile, post } = props.route.params

    return (
        <Pressable onPress={() => props.navigation.navigate('Profile', { profile: post.account })} >
            <View
                style={{
                    border: 1,
                    borderColor: 'black',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    padding: 20,
                    marginVertical: 8,
                    marginHorizontal: 16,
                    width: 350,
                    borderRadius: 5,
                }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Image
                        source={{
                            uri: post.account.avatar_static?.includes('missing')
                                ? fallbackAvatar
                                : post.account.avatar_static,
                        }}
                        style={{
                            width: 45,
                            height: 45,
                            marginRight: 10,
                            marginBottom: 5,
                            borderRadius: 5
                        }}
                    />
                    <View>
                        <Text style={styles.name}>{post.account.display_name}</Text>
                        <Text style={styles.username}>@{post.account.username}</Text>
                    </View>
                </View>
                <View>
                    <Text>{post.content.replace(/<[^>]+>/g, '')}</Text>
                </View>
            </View>
            <View style={{
                backgroundColor: 'white',
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
                width: 350,
                borderRadius: 5,
            }}>
                <Text style={{
                    color: 'gray'
                }}>No Replies Yet</Text>
            </View>
        </Pressable>

    );
}

const styles = StyleSheet.create({});