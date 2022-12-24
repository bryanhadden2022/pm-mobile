import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    View,
} from 'react-native';
import Timeline from '../TimelineScreen'
import CurrentUserCard from '../CurrentUserCard'
import Loading from '../Generic/Loading'
import styles from './styles'

export default function ProfileScreen(props) {
    const [loading, setLoading] = useState(null)
    const [creatingPost, setCreatingPost] = useState(false)
    const stateuser = useSelector(state => state.auth.user)
    const profile = props?.route?.params?.profile
    const isOwnProfile = !!profile
    const shouldOverrideTimeline = isOwnProfile ? null : loading

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
        const homeTimelineRes = await fetch(query4, options)
        const homeTimelineResJson = await homeTimelineRes.json()
        setLoading(homeTimelineResJson)
    }

    useEffect(() => {
        if (!loading) {
            getHomeTimeline()
        }
    }, [loading])

    return (
        <View style={styles.container}>
            <CurrentUserCard setCreatingPost={setCreatingPost} creatingPost={creatingPost} />
            <Loading {...props} localLoading={!loading} />
            {loading && <Timeline {...props} shouldOverrideTimeline={shouldOverrideTimeline} />}
        </View>
    );
}