import React from "react";
import {View, Text,TextInput, StyleSheet , Alert, Image, StatusBar,LayoutAnimation} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PERMISSIONS,request} from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker'
import Fire from './fire'
import * as firebase from 'firebase';
export default class LoginScreen extends React.Component{
    state={
        user:{
        name:"",
        email:"",
        password:"",
        avater:null
    },
        errorMessage:null
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
        pickaImage = async() =>{
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

                  // You can also display the image using data:
                  // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              
                }
              });
            };

    handleSignUp = () =>{
        const {email,password} = this.state
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(userCredentials =>{
            return userCredentials.user.updateProfile({
                displayName:this.state.name
            })
        })
        .catch(error => this.setState({errorMessage: error.message}))
    }
    render(){
        return(
            <View style={style.container}>
            <StatusBar barStyle="light-content"></StatusBar>
                <Image source={require("../assets/images/authHeader.jpg")} style={{marginTop:-270,marginLeft:-50}} ></Image>
                <TouchableOpacity style={style.back} onPress={()=>this.props.navigation.goBack()}>
                <FontAwesome5 name={"arrow-left"} size={30} color={"#fff"} /> 
                </TouchableOpacity>
                <TouchableOpacity style={style.plus} onPress={()=>this.pickaImage}>
                    <Image source={{uri:this.state.user.avater}}></Image>
                <FontAwesome5 name={"plus-circle"} size={80} color={"#000"} /> 
                </TouchableOpacity>
                
                <Text style={style.greeting}>
                    {'Hellow! \nPlease SignUp To Get Started.'}
                </Text>
                <View style={style.errorMessage}>
        {this.state.errorMessage && <Text style={style.errorMessage}>{this.state.errorMessage}</Text>}
                 </View>
            <View style={style.form}>
            <View>
               <Text style={style.inputTitle}>Name</Text>
                <TextInput style={style.input} onChangeText={name => this.setState({name})} autoCapitalize="none"  value={this.state.name}></TextInput>
               </View>
               <View>
               <Text style={style.inputTitle}>Email Address</Text>
                <TextInput style={style.input} onChangeText={email => this.setState({email})} autoCapitalize="none"  value={this.state.email}></TextInput>

               </View>

               <View style={{ marginTop:32}}>

               <Text style={style.inputTitle}>Password</Text>
                <TextInput style={style.input} secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({password})} value={this.state.password}></TextInput>
               </View>

            </View>
            <TouchableOpacity style={style.button} onPress={this.handleSignUp} >
                <Text style={{fontWeight:"500",color:"#FFF"}} >Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:"center",marginTop:32}} onPress={()=> this.props.navigation.navigate("Login")}>
                <Text style={{color:"#414959",fontSize:13}}>Already Have an account?<Text style={{fontWeight:"500",color:"#E9446A"}}>Sign In</Text></Text>
            </TouchableOpacity>
            </View>

                    );
    }
}
const style = StyleSheet.create({
    container:{
        flex:1,
    },
    greeting:{
        marginTop:15,
        fontSize:18,
        fontWeight:"400",
        textAlign:"center"
    },
    errorMessage:{
        height:72,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal: 30
    },
    error:{
        color:"#E9446A",
        fontSize:13,
        fontWeight:"600",
        textAlign:"center"
    },
    inputTitle:{
        color:"#8A8F9E",
        fontSize:10,
        textTransform:"uppercase"
    },
    form:{
        marginBottom:48,
        marginHorizontal:30
    },
    input:{
        borderBottomColor:"#8A8F9E",
        borderBottomWidth:StyleSheet.hairlineWidth,
        height:40,
        fontSize:15,
        color:"#161F3D"
    },
    button:{
        marginHorizontal:30,
        backgroundColor:"#E9446A",
        borderRadius:4,
        height:52,
        alignItems:"center",
        justifyContent:"center"
    },
    back:{
        height:50,width:50,backgroundColor:"#E9446A",borderRadius:50,padding:10,
    },
    plus:{
        marginLeft:160,
        marginTop:-50,
        height:399,
        width:199
    }


})