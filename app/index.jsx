import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/ScreenWrapper'

const index = () => {
    const router = useRouter();
  return (
    <ScreenWrapper>
      <Text>index</Text>
      <Button title="welcome" onPress={()=> router.push('welcome')}/>
    </ScreenWrapper>
  )
}

export default index

const styles = StyleSheet.create({})