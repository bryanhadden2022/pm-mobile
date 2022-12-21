// !followersjsondata['error'] 
const token = 'VN3LDjAnOoZr9LuL7UEk4H3ATgYgpC_dD7DieSZdb3U';

const options = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

export default async function fetchUserData(username, password) {
    const base = 'https://projectmushroom.social';
    const query1 = `${base}/api/v1/accounts/${password}`;
    const query2 = `${base}/api/v1/accounts/${password}/followers`;
    const query3 = `${base}/api/v1/timelines/public`;

    const accountRes = await fetch(query1, options)
    const accountResJson = await accountRes.json()
    const followersRes = await fetch(query2, options)
    const followersResJson = await followersRes.json()
    const timelineRes = await fetch(query3, options)
    const timelineResJson = await timelineRes.json()

    return {
        name: accountResJson.display_name,
        id: accountResJson.id,
        username: accountResJson.username,
        note: accountResJson.note,
        followersCount: accountResJson.followers_count,
        followingCount: accountResJson.following_count,
        img: accountResJson.avatar_static,
        joined: accountResJson.created_at,
        followers: [followersResJson],
        timelineList: timelineResJson,
    }
};

