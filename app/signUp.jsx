import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Icon from '../assets/fonts/icons'
import { theme } from '../constants/theme'
import { StatusBar } from 'expo-status-bar'
import Backbutton from '../components/Backbutton'
import { useRouter } from 'expo-router'
import {hp, wp} from '../helpers/common';
import { useRef } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Loading from '../components/Loading'
import { supabase } from '../lib/superbase'





const SignUp = () => {
    const router = useRouter();
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async ()=>{
        if(!emailRef.current || !passwordRef.current || !nameRef.current){
            Alert.alert('SignUp', "Please fill all the fields");
        }

        //good to go...

        let name = nameRef.current.trim();
        let email = emailRef.current.trim();
        let password = passwordRef.current.trim();

        setLoading(true);

        const {data: {session}, error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                   name
                 }
            }
        });

        setLoading(false);

        //console.log('session: ', session);
        //console.log('error: ', error);
        if(error){
            Alert.alert('Sign up', error.message);
        }
    }




  return (
    <ScreenWrapper  bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Backbutton router={router}/>
        {/** welcom */}
    <View>
        <Text style={styles.welcomText}>Let's</Text>
        <Text style={styles.welcomText}>Get Started</Text>
    </View>
    {/** form */}
    <View style={styles.form}>
        <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
            Please fill the details to create an account
        </Text>

        <Input 
            
            icon={<Icon name="user" size={26} strokeWidth={1.6} />}
            placeholder='Enter your name'
            onChangeText={value=> nameRef.current = value}
        />
        
        <Input 
            
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder='Enter your email'
            onChangeText={value=> emailRef.current = value}
        />
         <Input 
            
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder='Enter your password'
            secureTextEntry
            onChangeText={value=> passwordRef.current = value}
        />
       
        {/** Button */}

        <Button title={'Login'} loading={loading} onPress={onSubmit} />
    </View>
        {/** footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <Pressable onPress={()=> router.back()}>
                    <Text style={[styles.footerText, {color:theme.colors.primary, fontWeight:theme.fonts.semibold}]}>Log In</Text>
                </Pressable>
            </View>
      </View>
    </ScreenWrapper>
  )
}

export default SignUp;

const styles = StyleSheet.create({
    container:{
        flex:1,
        gap: 45,
        paddingHorizontal: wp(5),
    },
    welcomText: {
        alignSelf: 'center',
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text,
    },
    form: {
        gap: 25, 
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }
})