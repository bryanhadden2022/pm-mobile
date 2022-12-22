import { useState } from 'react'
import {
    View,
    Text,
    Image,
    Pressable,
    TextInput,
    ScrollView,
    FlatList
} from 'react-native';
import styles from './styles'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')


import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fallbackAvatar, token, addCommentQuery, removeCommentQuery, headers } from '../Generic/consts'

export default function PostScreen(props) {
    const { username: curreUserName } = useSelector(state => state.auth.user)
    const { post, isComment, postId } = props.route.params
    const [creatingComment, setCreatingComment] = useState(isComment)
    const [commentText, setCommentText] = useState('')
    const [mentions, setMentions] = useState(mentions)

    async function handleCommentAdd() {
        try {
            let res = await fetch(addCommentQuery, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    status: commentText,
                    in_reply_to_id: `${postId}`
                }),
            })
            if (res.status === 200) {
                setCommentText('')
                setCreatingComment(false)
                setMentions(creatMentions())
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function handleCommentRemove(id) {
        try {
            let res = await fetch(`${removeCommentQuery}${id}`, {
                method: "DELETE",
                headers,
            })
            if (res.status === 200) {
                setMentions(creatMentions())
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function handleCommentCancel() {
        setCommentText('')
        setCreatingComment(false)
    }

    async function creatMentions() {
        const token = 'VN3LDjAnOoZr9LuL7UEk4H3ATgYgpC_dD7DieSZdb3U';
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const base = 'https://projectmushroom.social';
        // const query4 = `${base}/api/v1/accounts/${profile?.id || stateuser.id}/statuses`;
        const query = 'https://projectmushroom.social/api/v1/statuses/109549780438552076/context';
        const res = await fetch(query, options)

        const json = await res.json()
        setMentions(json.descendants)
    }

    useEffect(() => {
        if (!mentions) {
            setMentions(creatMentions())
        }
    }, [])

    const created = timeAgo.format(new Date(post.created_at))

    return (
        <>
            <Pressable onPress={() => props.navigation.navigate('Profile', { profile: post.account })} >
                <View style={styles.postContainer}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Image
                            source={{
                                uri: post.account.avatar_static?.includes('missing')
                                    ? fallbackAvatar
                                    : post.account.avatar_static,
                            }}
                            style={{
                                width: 45,
                                height: 45,
                                marginRight: 10,
                                marginBottom: 5,
                                borderRadius: 5
                            }}
                        />
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <View>
                                <Text style={styles.name}>{post.account.display_name}</Text>
                                <Text style={styles.username}>@{post.account.username}</Text>
                            </View>
                            <Text style={{ marginLeft: 65, color: 'gray' }}>{created}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>{post.content.replace(/<[^>]+>/g, '')}</Text>
                    </View>
                    {/* <View style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10
                    }}>
                        <Text>Reblogs</Text>
                        <Text>Reblogs</Text>
                        <Text>Reblogs</Text>
                    </View> */}
                    {!creatingComment && (<View style={styles.settingContainer}>
                        <Pressable
                            onPress={() => setCreatingComment(true)}
                            style={{ ...styles.submit, backgroundColor: '#f4c430' }}>
                            <Text style={{ ...styles.submitText, color: 'white' }}>Reply</Text>
                        </Pressable>
                    </View>)}
                </View>
            </Pressable>
            <View style={styles.commentsContainer}>
                {/* <Text style={styles.commentsText}>No Replies Yet</Text> */}
                {creatingComment && (
                    <>
                        < TextInput
                            onChangeText={setCommentText}
                            style={styles.commentsInput}
                            multiline={true}
                            numberOfLines={10}
                        />
                        <View style={{ ...styles.settingContainer, marginBottom: 15, flexDirection: 'row' }}>
                            <Pressable
                                onPress={handleCommentCancel}
                                style={styles.submit}>
                                <Text style={styles.submitText}>Cancel</Text>
                            </Pressable>
                            <View style={{ width: 15 }}></View>
                            <Pressable
                                onPress={() => handleCommentAdd()}
                                style={{ ...styles.submit, backgroundColor: '#f4c430' }}>
                                <Text style={{ ...styles.submitText, color: 'white' }}>Add</Text>
                            </Pressable>
                        </View>
                    </>
                )}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.container}>
                    <FlatList
                        data={mentions}
                        renderItem={({ item, index, separators }) => {
                            const isReblogged = item.content.length === 0
                            const itemtemp = isReblogged ? item.reblog : item
                            const {
                                content,
                                created_at,
                                account: { avatar_static, username, display_name },
                            } = itemtemp;

                            return (
                                <View style={{
                                    border: 1,
                                    borderColor: 'lightgray',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    padding: 15,
                                    width: 310,
                                    marginBottom: 15
                                }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <View>
                                                <Text style={styles.name}>
                                                    {display_name}
                                                </Text>
                                                <Text style={styles.username}>
                                                    @{username}
                                                </Text>
                                            </View>
                                            <Text style={{ fontSize: 9, marginLeft: 55 }}>{timeAgo.format(new Date(created_at))}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex' }}>
                                        <Text style={{ color: 'gray', marginTop: 4 }}>{content.replace(/<[^>]+>/g, '')}</Text>
                                    </View>
                                    {username === curreUserName &&
                                        (<View style={styles.settingContainer}>
                                            <Pressable
                                                onPress={() => handleCommentRemove(itemtemp.id)}
                                                style={styles.submit}>
                                                <Text style={styles.submitText}>Delete</Text>
                                            </Pressable>
                                        </View>)}
                                </View>

                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            </View></>
    );
}

