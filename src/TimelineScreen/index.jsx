import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Post from '../Post'


export default function Timeline(props) {
    const { timelineList } = useSelector(state => state.auth.user)
    const { shouldOverrideTimeline } = props

    return (
        <FlatList
            data={shouldOverrideTimeline || timelineList}
            renderItem={({ item, index, separators }) => {
                return <Post {...props} item={item} />
            }}
            keyExtractor={item => item.id}
        />
    );
}