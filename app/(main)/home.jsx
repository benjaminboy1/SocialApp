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
import Loading from '../../components/Loading';
import { getUserData } from '../../services/userService';

var limit = 0;

const Home = () => {

    const {user, setAuth} = useAuth();
    const router = useRouter();

    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);



    // for realtime posts
    const handlePostEvent = async (payload) => {
        //console.log('got post event: ', payload);
        if(payload.eventType == 'INSERT' && payload?.new?.id){
                    let newPost = {...payload.new}; 
                    let  res = await getUserData(newPost.userId);
                     newPost.user = res.success? res.data: {};
                     setPosts(prevPosts => [newPost, ...prevPosts]);
        }
    };

    useEffect(()=>{
        
        let postChannel = supabase
        .channel('posts')
        .on('postgres_changes', {event: '*', schema: 'public', table: 'posts'}, handlePostEvent)
        .subscribe();


        //getPosts();

        return ()=>{
            supabase.removeChannel(postChannel);
        }
    },[])

    const getPosts = async ()=>{
        // call the api here

        if(!hasMore) return null;
        limit = limit + 4;

        console.log('fetching post: ', limit);
        let res = await fetchPosts(limit);
        //console.log('got posts result: ', res);
        //console.log('user ', res.data[0].user);

        if(res.success){
            if(posts.length==res.data.length) setHasMore(false);
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
            onEndReached={()=>{
                getPosts();
                //console.log('got to the end');
            }}
            onzendReachedThreshold={0}
            ListFooterComponent={hasMore? (
                <View style={{marginVertical: posts.length==0? 200: 30}}>
                    <Loading/>
                </View>
            ):(
                <View style={{marginVertical: 30}}>
                    <Text style={styles.noPosts}>No more Posts</Text>
                </View>
            )}
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