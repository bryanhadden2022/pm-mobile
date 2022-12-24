import {
    View,
    Text,
    FlatList,
    ScrollView,
    Image,
    Pressable,
} from 'react-native';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { fallbackAvatar, removeCommentQuery, headers } from '../Generic/consts'

import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

import styles from './styles'

export default function Post(props) {
    const { item, isComment, handleCommentRemove } = props
    const { username: curreUserName } = useSelector(state => state.auth.user)
    const isReblogged = item.content.length === 0
    const itemtemp = isReblogged ? item.reblog : item
    const {
        content,
        created_at,
        replies_count,
        reblogs_count,
        favourites_count,
        account: { avatar_static, username, display_name },
    } = itemtemp;

    function handleTimelinePress(props, item, isComment) {
        // take the user to their own post
        // const itsOneOfMyPosts = item.account.username === username && !item?.reblog && !item?.reblog?.account
        const itsOneOfMyPosts = !Boolean(item?.reblog?.account)
        if (itsOneOfMyPosts) {
            props.navigation.navigate('Post', {
                profile: item.account,
                post: item,
                isComment,
                postId: item.id
            })
        }
        if (!itsOneOfMyPosts) {
            // take the user to someone else's post (the post they boosted in this case)
            props.navigation.navigate('Post', {
                profile: item.reblog.account,
                post: item.reblog,
                isComment,
                postId: item.reblog.id
            })
        }
    }

    const style1 = {
        border: 1,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        width: 350,
        borderRadius: 5,
    }

    const style2 = {
        width: 310,
        border: 1,
        borderColor: 'rgba(1,1,1,.17)',
        borderWidth: 1,
        padding: 10,
    }

    const isOneOfMyTweets = itemtemp.account.username === curreUserName

    return (
        <Pressable onPress={() => handleTimelinePress(props, item)} style={{ ...(isComment && { marginBottom: 25 }) }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <View
                    style={!isComment ? style1 : style2}>
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
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignContent: 'flex-end' }}>
                            <View style={{ flex: 1.5 }}>
                                <Text style={styles.name}>
                                    {display_name}
                                </Text>
                                <Text style={styles.username}>
                                    @{username}
                                </Text>
                            </View>
                            <Text style={{ fontSize: 9, flex: 1, color: 'gray' }}>{timeAgo.format(new Date(created_at))}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text>{content.replace(/<[^>]+>/g, '')}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {isOneOfMyTweets && <View style={styles.settingContainer}>
                            <Pressable
                                onPress={() => handleCommentRemove(itemtemp.id)}
                                style={{ ...styles.submit, marginRight: 15 }}>
                                <Text style={styles.submitText}>Delete</Text>
                            </Pressable>
                        </View>}
                        {!isComment && (
                            <View style={styles.settingContainer}>
                                <Pressable
                                    onPress={() => handleTimelinePress(props, item, true)}
                                    style={styles.submit}>
                                    <Text style={styles.submitText}>Reply</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                    {!isComment && (
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text>Replies: {replies_count}</Text>
                            <Text>Reblogs: {reblogs_count}</Text>
                            <Text>Favs: {favourites_count}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </Pressable >
    );
}