import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { theme } from '../../constants/theme'
import { wp, hp } from '../../helpers/common';
import Avatar from '../../components/Avatar'
import { useAuth } from '../../contexts/AuthContext'
import RichTextEditor from '../../components/RichTextEditor'



const NewPost = () => {

  const {user} = useAuth();

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title="Create Post" />
        <ScrollView contentContainerStyle={{gap: 20}}>
          {/** avatar */}
          <View style={styles.header}>
            <Avatar
              uri={user?.image}
              size={hp(6.5)}
              rounded={theme.radius.xl}
              />
              <View style={{gap: 10}}>
              <Text style={styles.username}>
                  {
                    user && user?.name
                  }
                </Text>
                <Text style={styles.publicText}>
                  Public
                </Text>

              </View>

          </View>
          <View style={styles.textEditor}>
                <RichTextEditor />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default NewPost;

const styles = StyleSheet.create({
  
  container: {
    // backgroundColor: 10,
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },

  title: {
    // marginBottom: 10,
    fontSize: hp(2.5),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    textAlign: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  avatar: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  publicText: {
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,

  },
    media: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1.5,
      padding: 12,
      paddingHorizontal: 18,
      borderRadius: theme.radius.xl,
      borderColor: theme.colors.gray,
      borderCurve: 'continuous',
  },
  mediaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  addImageText:{
    fontSize: hp(1.9),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  imageIcon:{
    //backgroundColor: theme.colors.gray,
    borderRadius: theme.radius.md,
    //padding: 6,

  },
  file: {
    height: hp(30),
    width: '100%',
    borderRadius: theme.radius.xl,
    overflow: 'hidden',
    borderCurve: 'continous'
  },
  video :{

  },
  closeIcon: {
    position:'absolute',
    top: 10,
    right: 10,
   // shadowColor: theme.colors.textLight,
   // shadowOffset: {width: 0, height: 3},
   // shadowOpacity: 0.6,
   // shadowRadius: 8,
  }
})