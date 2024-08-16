import * as FileSystem from 'expo-file-system';
import { supabase } from '../lib/superbase';
import { decode } from 'base64-arraybuffer';
import { supabaseUrl } from '../constants';




export const getUserImageSrc = imagePath => {
    if(imagePath){
        return getSupabaseFileUrl(imagePath);
    }else{
        return require('../assets/images/defautUser.png');
    }
}

export const getSupabaseFileUrl = filePath =>{
    if(filePath){
        // path to supabase
        return {uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`}
    }
    return null;
}

export const uploadFile = async (folderName, fileUri, isImage=true)=>{
    try{
        let fileName = getFilePath(folderName, isImage);
        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64
        });
        let imageData = decode(fileBase64); // array buffer
        let {data, error} = await supabase
        .storage
        .from('uploads')
        .upload(fileName, imageData, {
            cacheControl: '3600',
            upsert: false,
            contentType: isImage? 'image/*': 'video/*'
        });
        if(error){
            console.log('file upload error: ', error);
            return {success: false, msg: 'Could not upload media'};
        }

        //console.log('data: ', data);

        return {success: true, data: data.path}

    }catch(error){
        console.log('file upload error: ', error);
        return {success: false, msg: 'Could not upload media'};
    }
}

export const getFilePath = (folderName, isImage)=>{
    return `/${folderName}/${(new Date()).getTime()}${isImage? '.png': 'mp4'}`;
    // profiles/8943284234.png
    // images/234242342.png
}