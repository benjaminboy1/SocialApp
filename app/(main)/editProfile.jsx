import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Backbutton from '../../components/Backbutton'
import { router, useRouter } from 'expo-router'
import { Route } from 'expo-router/build/Route'

const EditProfile = () => {
    const route = useRouter();

  return (
    <ScreenWrapper>


        <Backbutton onPress={()=>router.push('profile')}/>
      <Text>EditProfile</Text>
      </ScreenWrapper>
  )
}

export default EditProfile

const styles = StyleSheet.create({})