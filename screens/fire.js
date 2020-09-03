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
  import firebase from'firebase'
   class Fire{
    constructor(){
        firebase.initializeApp(firebaseConfig)
    }

    addPost = async ({text, localUri})=>{
        const remoteUri = await this.uploadPhotoSync(localUri)
        return new Promise((res,rej)=>{
            this.firestore.collection("posts").add({
                text,
                uid:this.uid,
                timestamp:this.timestamp,
                image:remoteUri
            })
            .then(ref =>{
                res(ref)
            })
            .catch(error =>{
                rej(error)
            })
        })
    }

    uploadPhotoSync = async uri =>{
        const path = `photos/${this.uid}/${Date.now()}.jpg`
        return new Promise(async(res,rej)=>{
            const response = await fetch(uri)
            const file = await response.blob();

            let upload = firebase.storage().ref(path).put(file)

            upload.on("state_changed",snapshot =>{},err => {
                rej(err)
            },
            async()=>{
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
            )
        })
    }
    get firestore(){
        return firebase.firestore()
    }
    get uid(){
        return(firebase.auth().currentUser || {}).uid
    }

    get timestamp(){
        return Date.now()
    }
   }
   Fire.shared = new Fire()
   export default Fire;
