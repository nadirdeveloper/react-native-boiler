import React from "react";
import {View, Text,TextInput, StyleSheet , Alert} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from 'firebase';
export default class LoginScreen extends React.Component{
static navigationOptions = {
    headerShown:false
}
    state={
        name:"",
        email:"",
        password:"",
        errorMessage:null
    }
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
                <TouchableOpacity style={style.back} onPress={()=>Alert.alert("back")}>
                <FontAwesome5 name={"arrow-left"} size={30} color={"#fff"} /> 
                </TouchableOpacity>
                <Text style={style.greeting}>
                    {'Hellow! \nPlease Login to get started.'}
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
                <Text style={{color:"#414959",fontSize:13}}>Already Have an account? <Text style={{fontWeight:"500",color:"#E9446A"}}>Sign In</Text></Text>
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
        marginTop:32,
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