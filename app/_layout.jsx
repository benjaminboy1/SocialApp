import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import {AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/superbase'
import Welcome from './welcome'
import Home from './(main)/home'


const _layout = () => {
    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    )
}


const MainLayout = () => {
    const {setAuth} = useAuth();
    const router = useRouter();

    useEffect(()=>{
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log('session user: ', session?.user?.id);

            if(session){
                // set auth
                // move to home screen

                setAuth(session?.user);
                router.replace('/home');
            }else{
                // set auth null 
                // move to welcome screen
                setAuth(null);
                router.replace('/welcome');
            }
        })
    }, []);

  return (
    <Stack
            screenOptions={{
                headerShown: false,
            }}
    />
  )
}

export default _layout;