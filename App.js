/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Image} from 'react-native'
import {createAppContainer, createSwitchNavigator } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'  
import {createBottomTabNavigator} from 'react-navigation-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons'
import LoadingScreen from './screens/LoadingScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginSystem'
import HomeScreen from './screens/HomeScreen'
import MessageScreen from './screens/MessageScreen'
import ProfileScreen from './screens/ProfileScreen'
import PostScreen from './screens/PostScreen'
import NotificationScreen from './screens/NotificationScreen'
import * as firebase from 'firebase';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

var firebaseConfig = {
    apiKey: "AIzaSyCXuHk2AtsNVL_WsVNwMCJBviZiH1B0MoM",
    authDomain: "social-app-41006.firebaseapp.com",
    databaseURL: "https://social-app-41006.firebaseio.com",
    projectId: "social-app-41006",
    storageBucket: "social-app-41006.appspot.com",
    messagingSenderId: "375730468993",
    appId: "1:375730468993:web:d8e83f61310b7150b2b580",
    measurementId: "G-F9BGYSNMHH"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

const AppContainer = createStackNavigator(
    {
        
        default:createBottomTabNavigator(
            {
                Home:{
                    screen: HomeScreen,
                    navigationOptions:{
                        tabBarIcon:({tintColor})=><FontAwesome5 name={'home'} size={25} color={tintColor}></FontAwesome5>
                    }
                },Message:{
                    screen: MessageScreen,
                    navigationOptions:{
                        tabBarIcon:({tintColor})=><FontAwesome5 name={'comment-dots'} size={25} color={tintColor}></FontAwesome5>
                    }
                }
                ,Post:{
                    screen: PostScreen,
                    navigationOptions:{
                        tabBarIcon:({tintColor})=><FontAwesome5 
                        name={'plus-circle'} 
                        size={45}
                        style={{
                            shadowColor:"#E9446A",
                            shadowOffset:{width:0,height:0},
                            shadowRadius:10,
                            shadowOpacity:0.3
                        }} 
                        color={"#E9446A"}></FontAwesome5>
                    }
                },
                Notification:{
                    screen: NotificationScreen,
                    navigationOptions:{
                        tabBarIcon:({tintColor})=><FontAwesome5 name={'bell'} size={25} color={tintColor}></FontAwesome5>
                    }
                },
                Profile:{
                    screen: ProfileScreen,
                    navigationOptions:{
                        tabBarIcon:({tintColor})=><FontAwesome5 name={'user'} size={25} color={tintColor}></FontAwesome5>
                    }
                }
            },
         
            {
                defaultNavigationOptions:{
                    tabBarOnPress:({navigation, defaultHandler})=>{
                        if(navigation.state.key==="Post"){
                            navigation.navigate("postModal")
                        }else{
                            defaultHandler()
                        }
                    }
                },
                tabBarOptions:{
                    activeTintColor:"#161F3D",
                    inactiveTintColor:"#B8BBC4",
                    showLabel:false
                }
            }

        ),
        postModal:{
            screen:PostScreen
        }
        },
        {
            mode:"modal",
            headerMode:"none"
        }
        )


const AuthStack = createStackNavigator({
    
    Login:LoginScreen,
    Register:RegisterScreen
},
{
    defaultNavigationOptions:{
        headerShown:false
    }
})
export default createAppContainer(
    createSwitchNavigator(
        {
            Loading:LoadingScreen,
            App:AppContainer,
            Auth:AuthStack
        },
        {
            initalRouteName:"Loading"
        }
    )
)