import {
    View,
    Text,
    ScrollView,
    Image,
    Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import styles from './styles'

export default function CurrentUserCard(props) {
    const { name, followingCount, img, followersCount, username } = useSelector(state => state.auth.user)
    const { setCreatingPost, creatingPost } = props
    const navigation = useNavigation();

    const fallbackAvatar =
        'https://renderer-v2.vercel.app/_next/image?url=https%3A%2F%2Fapi.typedream.com%2Fv0%2Fdocument%2Fpublic%2Fffd19e6e-3cf5-49a2-985c-8086255e3a33%2F2H5X0HKQFSZYSTHAqGYlzKycibD_Project_Mush_Logo-01.png%3Fbucket%3Ddocument&w=256&q=100';

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 5
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ fontWeight: '500' }}>Notifs</Text>
                <Text style={{
                    marginLeft: 10,
                    fontWeight: '500',
                }}>Search</Text>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    source={{ uri: fallbackAvatar }}
                    style={{ width: 40, height: 30, marginRight: -3 }}
                />
                <View>
                    <Text style={{
                        fontWeight: '800',
                        letterSpacing: .08
                    }}>Project</Text>
                    <Text style={{
                        fontSize: 11,
                        fontWeight: '300',
                        marginTop: -3.5,
                        letterSpacing: -.90
                    }}>Mushroom</Text>
                </View>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Pressable onPress={() => navigation.navigate('Settings')}>
                    <Text style={{ fontWeight: '500', }}>Settings</Text>
                </Pressable>
                <Pressable onPress={() => setCreatingPost(true)}>
                    <Text style={{ marginLeft: 10, fontWeight: '500', }}>Post</Text>
                </Pressable>
            </View>
        </View>
    )
}