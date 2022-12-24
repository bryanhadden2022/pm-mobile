import {
    View,
    Text,
    ScrollView,
    Image,
    Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles'

export default function CurrentUserCard(props) {
    const { name, followingCount, img, followersCount, username } = useSelector(state => state.auth.user)
    const { setCreatingPost, creatingPost } = props

    const fallbackAvatar =
        'https://renderer-v2.vercel.app/_next/image?url=https%3A%2F%2Fapi.typedream.com%2Fv0%2Fdocument%2Fpublic%2Fffd19e6e-3cf5-49a2-985c-8086255e3a33%2F2H5X0HKQFSZYSTHAqGYlzKycibD_Project_Mush_Logo-01.png%3Fbucket%3Ddocument&w=256&q=100';


    return (
        <View style={styles.profileHeaderContainer}>
            <ScrollView
                showsHorizontalScrollIndicator={false}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}>
                    <Image
                        source={{ uri: img?.includes('missing') ? fallbackAvatar : img }}
                        style={{ width: 75, height: 75 }}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            <Text style={styles.profileHeaderTitle}>{name}</Text>
                            <Text style={{ marginTop: 1, marginBottom: 2, color: 'gray' }}>@{username}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text>Followers: {followersCount}</Text>
                                <Text style={{ marginLeft: 5 }}>Following: {followingCount}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, display: 'flex', alignItems: 'center', marginRight: 15 }}>
                            {!creatingPost && (
                                <Pressable
                                    onPress={() => setCreatingPost(true)}
                                >
                                    <Text>Post</Text>
                                </Pressable>)}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}