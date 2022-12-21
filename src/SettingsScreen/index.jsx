import {
    View,
    Text,
    ScrollView,
    Image,
    Pressable
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authorize'
import styles from './styles'

export default function HomeScreen(props) {
    const dispatch = useDispatch();
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
            <View style={styles.settingContainer}>
                <Pressable
                    onPress={() => {
                        dispatch(logout())
                        props.navigation.navigate('Login')
                    }}
                    style={styles.submit}>
                    <Text style={styles.submitText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
}