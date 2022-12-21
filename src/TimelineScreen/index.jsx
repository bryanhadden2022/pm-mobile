import {
    View,
    Text,
    FlatList,
    ScrollView,
    Image,
    Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles'

const fallbackAvatar =
    'https://renderer-v2.vercel.app/_next/image?url=https%3A%2F%2Fapi.typedream.com%2Fv0%2Fdocument%2Fpublic%2Fffd19e6e-3cf5-49a2-985c-8086255e3a33%2F2H5X0HKQFSZYSTHAqGYlzKycibD_Project_Mush_Logo-01.png%3Fbucket%3Ddocument&w=256&q=100';

export default function Timeline(props) {
    const { name, followers, timelineList, username } = useSelector(state => state.auth.user)
    const { shouldOverrideTimeline } = props

    function handleTimelinePress(props, item) {
        // take the user to their own post
        const itsOneOfMyPosts = item.account.username === username && !item.reblog
        if (itsOneOfMyPosts) {
            props.navigation.navigate('Post', { profile: item.account, post: item })
        }

        // take the user to someone else's post (the post they boosted in this case)
        props.navigation.navigate('Post', {
            profile: item.reblog.account, post: item.reblog
        })
    }

    return (
        <FlatList
            data={shouldOverrideTimeline || timelineList}
            renderItem={({ item, index, separators }) => {
                const isReblogged = item.content.length === 0
                const itemtemp = isReblogged ? item.reblog : item
                const {
                    content,
                    created_at,
                    account: { avatar_static, username, display_name },
                } = itemtemp;

                return (
                    <>
                        <Pressable onPress={() => handleTimelinePress(props, item)} >
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.container}>
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
                                    {isReblogged && (<Text style={{ ...styles.username, paddingBottom: 10 }}>
                                        <Text style={styles.username}>{item.account.display_name}</Text>
                                        {' '}boosted
                                    </Text>)}
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Image
                                            source={{
                                                uri: avatar_static?.includes('missing')
                                                    ? fallbackAvatar
                                                    : avatar_static,
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
                                            {/* <Text style={{ fontSize: 7 }}>{created_at.replace('', '')}</Text> */}
                                            <Text style={styles.name}>
                                                {display_name}
                                            </Text>
                                            <Text style={styles.username}>
                                                @{username}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View>
                                            <Text>{content.replace(/<[^>]+>/g, '')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </Pressable></>
                )
            }}
            keyExtractor={item => item.id}
        />
    );
}