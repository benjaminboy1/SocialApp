import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Backbutton from './Backbutton';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';

const Header = ({title, showBackButton = true, mb=10}) => {
    const router = useRouter();
  return (
    <View style={[styles.container, {marginBottom: mb}]}>
      {
        showBackButton && (
            <View style={styles.backButton}>
                <Backbutton router={router} />
            </View>
        )
      }
      <Text style={styles.title}>{title || ""}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginItems: 'center',
        marginTop: 5,
        gap: 10,
    },
    title: {
        fontSize: hp(2.7),
        fontWeight: theme.fonts.semibold,
        collors: theme.colors.textDark
    },
    backButton: {
        position: 'absolute',
        left: 0
    }
})