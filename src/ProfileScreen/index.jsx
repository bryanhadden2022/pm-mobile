import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';
import Timeline from '../TimelineScreen'
import Loading from '../Generic/Loading'
import styles from './styles'

export default function ProfileScreen(props) {
    const profile = props?.route?.params?.profile
    const [loading, setLoading] = useState(null)
    const { name, username, followers, id, followingCount, followersCount, img } = useSelector(state => state.auth.user)
    const stateuser = useSelector(state => state.auth.user)

    async function getHomeTimeline() {
        const token = 'VN3LDjAnOoZr9LuL7UEk4H3ATgYgpC_dD7DieSZdb3U';
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const base = 'https://projectmushroom.social';
        const query4 = `${base}/api/v1/accounts/${profile?.id || stateuser.id}/statuses`;
        // const query4 = `https://projectmushroom.social/api/v1/accounts/109349413996053784/statuses`;
        const homeTimelineRes = await fetch(query4, options)
        const homeTimelineResJson = await homeTimelineRes.json()
        setLoading(homeTimelineResJson)
    }

    useEffect(() => {
        if (!loading) {
            getHomeTimeline()
        }
    }, [loading])

    const isOwnProfile = !!profile
    const shouldOverrideTimeline = isOwnProfile ? null : loading
    const fallback_avatar = 'https://renderer-v2.vercel.app/_next/image?url=https%3A%2F%2Fapi.typedream.com%2Fv0%2Fdocument%2Fpublic%2Fffd19e6e-3cf5-49a2-985c-8086255e3a33%2F2H5X0HKQFSZYSTHAqGYlzKycibD_Project_Mush_Logo-01.png%3Fbucket%3Ddocument&w=256&q=100'
    const dynamicUri = !profile || profile?.avatar_static?.includes('missing')
        ? img || fallback_avatar
        : profile.avatar_static

        
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
                            source={{ uri: dynamicUri }}
                            style={styles.profileHeaderImg}
                        />
                        <View style={styles.profileHeaderMetaContainer}>
                            <Text style={styles.profileHeaderTitle}>{profile?.display_name || name}</Text>
                            <Text style={styles.profileHeaderSubtitle}>
                                @{profile?.username || username}
                            </Text>
                            <View style={styles.profileHeaderFollowerContainer}>
                                <Text style={styles.profileHeaderFollowers}>
                                    Followers:
                                    {profile?.followers_count || followersCount}
                                </Text>
                                <Text>Following: {profile?.following_count || followingCount}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Loading {...props} localLoading={!loading} />
            {loading && <Timeline {...props} shouldOverrideTimeline={shouldOverrideTimeline} />}
        </View>
    );
}