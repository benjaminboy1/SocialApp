import { Alert, Pressable, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper';
import { Button } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/superbase';
import { theme } from '../../constants/theme';
import { wp, hp } from '../../helpers/common';
import Icon from '../../assets/fonts/icons';
import { useRouter } from 'expo-router';
import  Avatar  from '../../components/Avatar';
import { StatusBar } from 'expo-status-bar';
import { fetchPosts } from '../../services/postService';
import PostCard from '../../components/PostCard';

var limit = 0;

const Home = () => {

    const {user, setAuth} = useAuth();
    const router = useRouter();

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        getPosts();
    },[])

    const getPosts = async ()=>{
        // call the api here
        limit = limit + 10;

        console.log('fetching post: ', limit);
        let res = await fetchPosts(limit);
        //console.log('got posts result: ', res);
        //console.log('user ', res.data[0].user);

        if(res.success){
            setPosts(res.data);
        }
    }

    //console.log('user: ', user);
 
    //const onLogout = async ()=>{
        //setAuth(null);
       // const {error} = await supabase.auth.signOut();
        //if(error) {
        //    Alert.alert('Sign out', "Error signing out")
        //}
    //}

  return (
    <ScreenWrapper  bg="white">
        <StatusBar style="dark" />
     <View style={styles.container}>
        {/** header */}
        <View style={styles.header}>
            <Text style={styles.title}>MetUs</Text>
            <View style={styles.icons}>
                <Pressable onPress={()=> router.push('notifications')}>
                        <Icon  name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
                </Pressable>
                <Pressable onPress={()=> router.push('newPost')}>
                        <Icon  name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
                </Pressable>
                <Pressable onPress={()=> router.push('profile')}>
                    
                       <Avatar 
                        uri={user?.image}
                        size={hp(4.3)}
                        rounded={theme.radius.sm}
                        style={{borderWidth: 2}}
                       />
                </Pressable>
            </View>

        </View>

        {/** post container */}
        <FlatList 
                data={posts}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listStyle}
                keyExtractor={item=> item.id.toString()}
                renderItem={({item})=>  <PostCard
                                            item={item}
                                            currentuser={user}
                                            router={router}
                                            />
            }
            />

    
    </View>
      {/**<Button title="logout" onPress={onLogout} /> */}
    </ScreenWrapper>
  )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: wp(4)
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4.2),
        fontWeight: theme.fonts.bold
    },
    avatarImage: {
        height: hp(4.3),
        width: hp(4.3),
        borderRadius: theme.radius.sm,
        borderColor: theme.colors.gray,
        borderCurve: 'continuous',
        borderWidth: 3
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18
    },
    listStyle: {
        paddingTop: hp(2),
        paddingHorizontal: wp(4)
    },
    noPosts: {
        textAlign: 'center',
        fontSize: hp(2),
        color: theme.colors.text
    },
    pill: {
        position: 'absolute',
        right: -10,
        top: -4,
        height: hp(2.2),
        width: hp(2.2),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: theme.colors.roseLight
    },
    pillText: {
        color: 'white',
        fontSize: hp(1.2),
        fontWeight: theme.fonts.bold
    }
})