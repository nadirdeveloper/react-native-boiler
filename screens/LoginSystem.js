import React from "react";
import {View, Text,TextInput, StyleSheet , Alert, Image, StatusBar,LayoutAnimation} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from 'firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class LoginScreen extends React.Component{

static NavigationOptions = {
    headerMode:"none"
}
    state={
        email:"",
        password:"",
        errorMessage:null

    }
    
    handleLogin = () =>{
        const {email,password} = this.state
        firebase.auth().signInWithEmailAndPassword(email,password).catch(error => this.setState({errorMessage: error.message}))
    }
    
    render(){
        LayoutAnimation.easeInEaseOut();
        return(
            <View style={style.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Image source={require("../assets/images/authHeader.jpg")} style={{marginTop:-270,marginLeft:-50}} ></Image>
                <Image source={require("../assets/images/loginlogo.png")} style={{marginTop:-40,alignSelf:"center",height:100,width:100}} ></Image>
                <Text style={style.greeting}>
                    {'Hellow again. \nWelcome back.'}   
                    </Text>
                <View style={style.errorMessage}>
        {this.state.errorMessage && <Text style={style.errorMessage}>{this.state.errorMessage}</Text>}
                 </View>
            <View style={style.form}>
  
<View>
               <Text style={style.inputTitle}>Email Address</Text>
                <TextInput style={style.input} onChangeText={email => this.setState({email})} autoCapitalize="none"  value={this.state.email}></TextInput>

               </View>

               <View style={{ marginTop:32}}>

               <Text style={style.inputTitle}>Password</Text>
                <TextInput style={style.input} secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({password})} value={this.state.password}></TextInput>
               </View>
              
            </View>
            <TouchableOpacity style={style.button} onPress={this.handleLogin} >
                <Text style={{fontWeight:"500",color:"#FFF"}} >Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:"center",marginTop:32}} onPress={()=> this.props.navigation.navigate("Register")}>
                <Text style={{color:"#414959",fontSize:13}}>New To Social App?<Text style={{fontWeight:"500",color:"#E9446A"}}>Sign Up</Text></Text>
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
        marginTop:16,
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
    }
})
