// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Post from '../../Post'

// import all the components we are going to use
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    FlatList,
    TextInput,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Search = (props) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [isFilteredByUsr, setIsFilteredByUsr] = useState(false);
    const { timelineList } = useSelector(state => state.auth.user)

    useEffect(() => {
        setFilteredDataSource(timelineList);
        setMasterDataSource(timelineList);
    }, [isFilteredByUsr]);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                // Applying filter for the inserted text in search bar

                let query = item.content

                if (isFilteredByUsr) {
                    query = item.account.username
                }

                const itemData = query ? query.toUpperCase() : ''.toUpperCase();
                const queryData = text.toUpperCase();
                return itemData.indexOf(queryData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            <Post {...props} item={item} isFilteredByUsr={isFilteredByUsr} />
        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    // backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    style={{
                        height: 40,
                        borderWidth: .5,
                        paddingLeft: 15,
                        // margin: 5,
                        // borderColor: '#009688',
                        borderColor: 'lightgray',
                        backgroundColor: '#FFFFFF',
                        borderRadius: 25,
                        marginLeft: 5,
                        marginRight: 5,
                    }}
                    onChangeText={(text) => searchFilterFunction(text, props)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search for posts and profiles"
                />
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <Pressable onPress={() => setIsFilteredByUsr(!isFilteredByUsr)}>
                        <Text
                            style={{
                                fontSize: 10,
                                color: isFilteredByUsr ? 'black' : 'gray',
                                borderColor: isFilteredByUsr ? 'black' : 'rgba(1,1,1,.1)',
                                fontWeight: '600',
                                paddingTop: 7,
                                paddingBottom: 7,
                                paddingLeft: 12,
                                paddingRight: 10,
                                borderRadius: 5,
                                border: 1,
                                borderWidth: 1,
                                borderRadius: 14,
                                marginTop: 10,
                                marginBottom: 10
                            }}
                        >
                            Search By Username
                            <Text>{'  '}&#9660;</Text>
                        </Text>
                    </Pressable>
                    {/* <Pressable onPress={() => setIsFilteredByUsr(!isFilteredByUsr)}>
                        <Text
                            style={{ color: true ? 'gray' : 'green' }}
                        >Display Name</Text>
                    </Pressable>
                    <Pressable onPress={() => setIsFilteredByUsr(!isFilteredByUsr)}>
                        <Text
                            style={{ color: true ? 'gray' : 'green' }}
                        >Fields</Text>
                    </Pressable> */}
                </View>
                <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
    textInputStyle: {
    },
});

export default Search;