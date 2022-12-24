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
import Post from '../Post'

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
            <Post {...props} item={post} handleCommentRemove={handleCommentRemove} />
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
                            return <Post {...props} item={item} isComment={true} handleCommentRemove={handleCommentRemove} />
                        }}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            </View></>
    );
}

