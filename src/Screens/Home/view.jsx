import { useState } from 'react'
import { View, Text, Pressable, TextInput } from 'react-native';
import Timeline from '../../TimelineScreen'
import CurrentUserCard from '../../CurrentUserCard'
import styles from './styles'
import { addCommentQuery, headers } from '../../Generic/consts'

export default function HomeScreen(props) {
  const [creatingPost, setCreatingPost] = useState(false)
  const [commentText, setCommentText] = useState('')

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

  return (
    <View style={styles.container}>
      <CurrentUserCard setCreatingPost={setCreatingPost} creatingPost={creatingPost} />
      {creatingPost && (<>
        < TextInput
          onChangeText={setCommentText}
          style={{ ...styles.commentsInput, backgroundColor: 'white' }}
          multiline={true}
          numberOfLines={10}
        />
        <View style={{ ...styles.settingContainer, marginBottom: 15, flexDirection: 'row' }}>
          <Pressable
            onPress={() => setCreatingPost(false)}
            style={styles.submit}>
            <Text style={styles.submitText}>Cancel</Text>
          </Pressable>
          <View style={{ width: 15 }}></View>
          <Pressable
            onPress={() => handlePostAdd()}
            style={{ ...styles.submit, backgroundColor: '#f4c430' }}>
            <Text style={{ ...styles.submitText, color: 'white' }}>Post</Text>
          </Pressable>
        </View>
      </>)}
      <Timeline {...props} />
    </View>
  );
}