import {
    View,
    Text,
    Image,
    Pressable,
} from 'react-native';
import styles from './styles'

import { useSelector } from 'react-redux';

export default function ProfileScreen(props) {
    const { name, followers } = useSelector(state => state.auth.user)
    const { profile, post } = props.route.params

  const fallbackAvatar =
  'https://renderer-v2.vercel.app/_next/image?url=https%3A%2F%2Fapi.typedream.com%2Fv0%2Fdocument%2Fpublic%2Fffd19e6e-3cf5-49a2-985c-8086255e3a33%2F2H5X0HKQFSZYSTHAqGYlzKycibD_Project_Mush_Logo-01.png%3Fbucket%3Ddocument&w=256&q=100';

    return (
        <Pressable onPress={() => props.navigation.navigate('Profile', { profile: post.account })} >
            <View style={styles.postContainer}>
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
            <View style={styles.commentsContainer}>
                <Text style={styles.commentsText}>No Replies Yet</Text>
            </View>
        </Pressable>

    );
}

