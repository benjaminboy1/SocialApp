import { View, Text } from 'react-native'
import React from 'react'
import { theme } from '../../../constants/theme';
import Home from './Home';
import Comment from './Comment';
import Delete from './Delete';
import Camera from './Camera';
import Mail from './Mail';
import Heart from './Heart';
import Image from './Image';
import Edit from './Edit';
import Location from './Location';
import Lock from'./Lock';
import Plus from './Plus';
import Search from './Search';
import Share  from './Share';
import ThreeDotsCircle from './ThreeDotsCircle';
import ThreeDotsHorizontal from './ThreeDotsHorizontal';
import Send from './Send';
import Video from './Video';
import User from './User';
import ArrowLeft from './ArrowLeft';
import Logout from './Logout';






const icons = {
    home: Home,
    mail: Mail,
    camera: Camera,
    heart: Heart,
    comment: Comment,
    delete: Delete,
    image: Image,
    edit: Edit,
    location: Location,
    lock: Lock,
    plus: Plus,
    search: Search,
    share: Share,
    threeDotsCircle: ThreeDotsCircle,
    threeDotsHorizontal: ThreeDotsHorizontal,
    send: Send,
    logout: Logout,
    user: User,
    video: Video,
    arrowLeft: ArrowLeft,


}

const Icon = ({name, ...props}) => {
    const IconComponent = icons[name];
  return (
    <IconComponent
        height={props.size || 24}
        width={props.size || 24}
        strokeWidth={props.strokeWidth || 1.9}   
        color={theme.colors.textLight}
        {...props}
    />
  )
}

export default Icon;