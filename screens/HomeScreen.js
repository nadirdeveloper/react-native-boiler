import React from "react";
import {View, Text, StyleSheet,TouchableOpacity,LayoutAnimation,FlatList,Image} from "react-native"
import * as firebase from'firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment';
posts = [
    {
        id:"1",
        name:"Joe Mckay",
        text:"Lorem asklndaksndkanskdnaksnkankanskank  m am nmasnmnasdm",
        timestamp:1569109273724,
        avatar: require("../assets/images/tabs/tempavt1.jpg"),
        Image: require("../assets/images/tabs/tempavt1.jpg")
    },{
        id:"2",
        name:"Joe Mckay",
        text:"Lorem asklndaksndkanskdnaksnkankanskank  m am nmasnmnasdm",
        timestamp:1569109273724,
        avatar: require("../assets/images/tabs/tempavt1.jpg"),
        Image: require("../assets/images/tabs/tempavt1.jpg")
    },{
        id:"3",
        name:"Joe Mckay",
        text:"Lorem asklndaksndkanskdnaksnkankanskank  m am nmasnmnasdm",
        timestamp:1569109273724,
        avatar: require("../assets/images/tabs/tempavt1.jpg"),
        Image: require("../assets/images/tabs/tempavt1.jpg")
    },{
        id:"4",
        name:"Joe Mckay",
        text:"Lorem asklndaksndkanskdnaksnkankanskank  m am nmasnmnasdm",
        timestamp:1569109273724,
        avatar: require("../assets/images/tabs/tempavt1.jpg"),
        Image: require("../assets/images/tabs/tempavt1.jpg")
    }
] 


export default class HomeScreen extends React.Component{
renderPost = post =>{
    return(
       <View style={style.feedItem}>
           <Image source={post.avatar} style={style.avatar} />
           <View style={{flex:1}}>
               <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <View>
                <Text style={style.name}>{post.name}</Text>
    <Text style={style.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                </View>
                <FontAwesome5 name={"ellipsis-h"} size={24} color="#737888"></FontAwesome5>
               </View>
    <Text style={style.post}>{post.text}</Text>
    <Image source={post.Image} style={style.posImage} resizeMode="cover" />
    <View style={{flexDirection:"row"}}>
    <FontAwesome5 name={"heart"} size={25} color="#737888" style={{marginRight:16}}></FontAwesome5>
    <FontAwesome5 name={"comment"} size={25} color="#737888" style={{marginRight:16}}></FontAwesome5>
    </View>
                  </View>
       </View>
    )
}
    render(){
        LayoutAnimation.easeInEaseOut();
        return(
            <View style={style.container}>
            <View style={style.header}>
                <Text style={style.headerTitle}>Feed</Text>
                </View>
                <FlatList style={style.feed} data={posts} renderItem={({item}) =>this.renderPost(item)} keyExtractor={item => item.id} showsVerticalScrollIndicator={false}
                />
                </View>
            
        );            
    }
}
const style = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        paddingTop:44,
        paddingBottom:16,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
        borderBottomWidth:1,
        borderBottomColor:"#EBECF4",
        shadowColor: "#454D65",
        shadowOffset:{height: 5},
        shadowOpacity:0.2,
        shadowRadius:15,
        zIndex:10

    },
    headerTitle:{
        fontSize:20,
        fontWeight:"500"
    },
    feed:{
        marginHorizontal:16
    },
    feedItem:{
        backgroundColor: "#FFF",
        borderRadius:5,
        padding:6,
        flexDirection:"row",
        marginVertical:8
    },
    avatar:{
        width: 36,
        height:36,
        borderRadius:18,
        marginRight:16
    },
    name:{
        fontSize:15,
        fontWeight:"500",
        color:"#454D65"
    },
    timestamp:{
        fontSize:11,
        color:"#C4C6CE",
        marginTop:4
    },
    post:{
        marginTop:16,
        fontSize:14,
        color:"#838899"
    },
    postImage:{
        width: undefined,
        height:150,
        borderRadius:5,
        marginVertical:16
    }
})