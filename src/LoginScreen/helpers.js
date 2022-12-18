const token = 'VN3LDjAnOoZr9LuL7UEk4H3ATgYgpC_dD7DieSZdb3U';
const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`, // notice the Bearer before your token
  },
};

export async function fetchData(text, setUserObj, setLoading) {
  const base = 'https://projectmushroom.social';
  const query1 = `${base}/api/v1/accounts/${text}`;
  const query2 = `${base}/api/v1/accounts/${text}/followers`;

  try {
    const accountdata = await fetch(query1, options);
    const accountjsondata = await accountdata.json();
    const followersdata = await fetch(query2, options);
    const followersjsondata = await followersdata.json();

    if (!followersjsondata['error']) {
      setUserObj({
        display_name: accountjsondata.display_name,
        accountname: accountjsondata.username,
        followers: followersjsondata,
      });
    }
  } catch (error) {
    throw error;
  }

  setLoading(false);
}
