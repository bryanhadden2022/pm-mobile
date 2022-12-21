import {
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';
import Timeline from '../TimelineScreen'
import styles from './styles'

export default function ProfileScreen(props) {
    const { profile } = props.route.params

    return (
        <View style={styles.container}>
            <View style={styles.profileHeaderContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}>
                    <View
                        style={styles.profileHeaderMeta}>
                        <Image
                            source={{
                                uri: profile.avatar_static?.includes('missing')
                                    ? fallbackAvatar
                                    : profile.avatar_static,
                            }}
                            style={styles.profileHeaderImg}
                        />
                        <View style={styles.profileHeaderMetaContainer}>
                            <Text style={styles.profileHeaderTitle}>{profile.display_name}</Text>
                            <Text style={styles.profileHeaderSubtitle}>
                                @{profile.username}
                            </Text>
                            <View style={styles.profileHeaderFollowerContainer}>
                                <Text style={styles.profileHeaderFollowers}>Followers: {profile.followers_count}</Text>
                                <Text>Following: {profile.following_count}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Timeline {...props} />
        </View>
    );
}