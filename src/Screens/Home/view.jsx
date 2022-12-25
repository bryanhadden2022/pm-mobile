import { useState, useEffect } from 'react'
import { View, Text, Pressable, TextInput } from 'react-native';
import styles from './styles'
import Timeline from '../../TimelineScreen'
import CurrentUserCard from '../../CurrentUserCard'
import { addCommentQuery, headers } from '../../Generic/consts'
import Search from '../Search'

export default function HomeScreen(props) {
  const { name } = props.route
  const [creatingPost, setCreatingPost] = useState(false)
  const [commentText, setCommentText] = useState('')
  const isSearching = name === 'Explore'

  async function handlePostAdd() {
    try {
      let res = await fetch(addCommentQuery, {
        method: "POST",
        headers,
        body: JSON.stringify({
          status: commentText,
        }),
      })
      if (res.status === 200) {
        setCommentText('')
        setCreatingPost(false)
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const dontShowTimeline = isSearching

  return (
    <View style={styles.container}>
      <CurrentUserCard setCreatingPost={setCreatingPost} creatingPost={creatingPost} {...props} />
      {creatingPost && (<>
        < TextInput
          onChangeText={setCommentText}
          style={{ ...styles.commentsInput, backgroundColor: 'white' }}
          multiline={true}
          numberOfLines={10}
        />
        <View style={{
          ...styles.settingContainer, flexDirection: 'row', backgroundColor: 'white', padding: 10
        }}>
          <Pressable
            onPress={() => setCreatingPost(false)}
            style={{
              ...styles.submit,
              borderColor: 'red',
              // borderColor: 'lightgray',
            }}>
            <Text style={{ ...styles.submitText, color: 'red' }}>Cancel</Text>
          </Pressable>
          <View style={{ width: 15 }}></View>
          <Pressable
            disabled={commentText.length === 0}
            onPress={() => handlePostAdd()}
            style={{
              ...styles.submit,
              backgroundColor: commentText.length === 0 ? 'lightgray' : '#f4c430',
              borderColor: 'lightgray',
            }}>
            <Text style={{ ...styles.submitText, color: 'white' }}>Post</Text>
          </Pressable>
        </View>
      </>)}
      <Timeline {...props} dontShow={dontShowTimeline} />
      <Search {...props} />
    </View>
  );
}