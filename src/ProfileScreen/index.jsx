import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function ProfileScreen(props) {
    const { name, followers } = useSelector(state => state.auth.user)
    const { profile } = props.route.params

    return (
        <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 100 }}>
            <Text>
                Name: {profile.display_name}
            </Text>
            <Text>
                Account Created: {profile.created_at}
            </Text>
            <Text>
                username: @{profile.username}
            </Text>
            <Text>
                Followers: {profile.followers_count}
            </Text>
            <Text>
                Following: {profile.following_count}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({});