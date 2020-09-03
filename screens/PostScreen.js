import React from "react"
import{View, Text, StyleSheet,SafeAreaView,TouchableOpacity,Image,TextInput,PermissionsAndroid,Permissions} from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {PERMISSIONS,request} from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker'
import Fire from './fire'

const firebase = require('firebase')
require("firebase/firestore")

export default class PostScreen extends React.Component{
    state={
        text:"",
        image:null,

    }
componentDidMount(){
    this.getPhotoPermission();
}
    getPhotoPermission = async() => {
        const status = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        // const{status1} = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        if(status != "granted"){
            alert("We need Permission to access to your photos")
        }

    }

    pickImage = async() =>{
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          
          /**
           * The first arg is the options object for customization (it can also be null or omitted for default options),
           * The second arg is the callback which sends object: response (more info in the API Reference)
           */
          ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
             alert('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
                this.setState({image:response.uri})
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
            }
          });
    };
    handlePost = () =>{
        Fire.shared.addPost({text:this.state.text.trim(), localUri:this.state.image})
        .then(ref =>{
            this.setState({text:"",image:null})
            this.props.navigation.goBack()
        })
        .catch(error =>{
            console.log(error.message)
        });
    }

    render(){
        return(
            <SafeAreaView style={style.container}>
<View style={style.header}>
     <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
         <FontAwesome5 name="arrow-left" size={20} color="#D8D9DB"></FontAwesome5>
     </TouchableOpacity>
     <TouchableOpacity onPress={this.handlePost}>
         <Text style={{fontWeight:"500",}}>Post</Text>
     </TouchableOpacity>
</View>
  <View style={style.inputContainer}>
<Image source={require("../assets/images/tabs/tempavt1.jpg")} style={style.avatar}></Image>
<TextInput
autoFocus={true}
multiline={true}
numberOfLines={4}
style={{flex:1}}
placeholder="Want to share something"
onChangeText={text => this.setState({text})}
value={this.state.text}
>
</TextInput>
  </View>
  <TouchableOpacity style={style.photo} onPress={this.pickImage}>
            <FontAwesome5 name={"camera"} size={32} color="#D8D9DB"></FontAwesome5>
  </TouchableOpacity>
  <TouchableOpacity style={{marginHorizontal:32,marginTop:32,height:150}}>
      <Image source={{uri:this.state.image}} style={{width:"100%",height:"100%"}}></Image>

  </TouchableOpacity>
  
            </SafeAreaView>



        )
    }
}
const style = StyleSheet.create({
    container:{
        flex:1,
            },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:32,
        borderBottomWidth:1,
        paddingVertical:12,
        borderBottomColor:"#D8D9DB"
    },
    inputContainer:{
        margin:32,
        flexDirection:"row"
    },
    avatar:{
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16
    },
    photo:{
        alignItems:"flex-end",
        marginHorizontal:32
    },
    headerTitle:{
        fontSize:20,
        fontWeight:"500"
    },
    feed:{
        marginHorizontal:15
    }
})