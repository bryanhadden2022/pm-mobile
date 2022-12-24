import {
    View,
    Text,
    Pressable,
    ScrollView,
    Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authorize'
import styles from './styles'
import CurrentUserCard from '../CurrentUserCard'

export default function HomeScreen(props) {
    const dispatch = useDispatch();
    const { name, followingCount, img, followersCount, username } = useSelector(state => state.auth.user)

    const fallbackAvatar =
        'https://renderer-v2.vercel.app/_next/image?url=https%3A%2F%2Fapi.typedream.com%2Fv0%2Fdocument%2Fpublic%2Fffd19e6e-3cf5-49a2-985c-8086255e3a33%2F2H5X0HKQFSZYSTHAqGYlzKycibD_Project_Mush_Logo-01.png%3Fbucket%3Ddocument&w=256&q=100';


    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                border: 0,
                paddingTop: 15,
                paddingBottom: 15
            }}>
                <Image
                    source={{ uri: img?.includes('missing') ? fallbackAvatar : img }}
                    style={{ width: 75, height: 75 }}
                />
                <View style={{ display: 'flex', flexDirection: 'row', width: 200 }}>
                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <Text style={styles.profileHeaderTitle}>{name}</Text>
                        <Text style={{ marginTop: 1, marginBottom: 2, color: 'gray' }}>@{username}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text>Followers: {followersCount}</Text>
                            <Text style={{ marginLeft: 5 }}>Following: {followingCount}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Pressable
                    onPress={() => {
                        dispatch(logout())
                        props.navigation.navigate('Login')
                    }}
                    style={{ ...styles.submit, width: 100 }}>
                    <Text style={styles.submitText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
}