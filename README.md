# login-register


/*css file*/
.PAGE{
    --ion-background-color: #F0F5F6;
}
.HEADER{
    --ion-background-color: dodgerblue;
}
.HEADER-TITLE{
    color: white;
}
.MAIN-CONTAINER{
    user-select: none;
    --ion-background-color: white;
}
.SUB-CONTAINER{
    padding: 15px;
}
.TITLE-CONTAINER{
    width: 100%;
    padding-top: 40px;
    padding-bottom: 20px;
    text-align: center;
}
.MAIN-TITLE{
    font-size: 30px;
    font-weight: bold;
    color: dodgerblue;
}
.SUB-TITLE{
    color: dodgerblue;
}
.ERROR-CONTAINER{
    color: red;
    text-align: center;
}
.INPUT-IONITEM{
    margin-top: 10px;
    border: 1px solid lightgray;
}
.CHECK-BUTTON-CONTAINER{
    margin-top: 20px;
}
.CHECK-BUTTON-LABEL{
    padding-left: 5px;
}
.FORGET-CREDS-BUTTON{
    color: crimson;
    text-decoration: underline;
}
.CREATE-ACCOUNT-BUTTON{
    color: dodgerblue;
    text-decoration: underline;
}
.HOVER:hover{
    --color: gray;
    text-decoration: underline gray;
}


/*tools file*/
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDQdSVTeVQEk4i3VPfyc8jckSgPzK8Qf5A",
    authDomain: "billpay-4204e.firebaseapp.com",
    databaseURL: "https://billpay-4204e.firebaseio.com",
    projectId: "billpay-4204e",
    storageBucket: "billpay-4204e.appspot.com",
    messagingSenderId: "556255543987",
    appId: "1:556255543987:web:7c9cb57eab3828a7e866c6",
}

firebase.initializeApp(config);


export class Security{
    async login(email,password){
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            window.localStorage.setItem("login",JSON.stringify(true));
            return {state:true,message:"",data:response};
        }catch(error){
            window.localStorage.setItem("login",JSON.stringify(false));
            if (error.code === "auth/user-not-found"){
                return {state:null,message:"User dose not exist or may have been deactivated",data:null};
            }else if (error.code === "auth/network-request-failed"){
                return {state:"no-connection",message:"Unable to connect to server, try again later",data:null};
            }else{
                return {state:false,message:"Email or password is incorrect",data:null};
            }
        }
    }
    async register(email,password){
        try{
            console.log("firebase starting");
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            return {state:true,message:"",data:response};
        }catch(error){
            return {state:false,message:error.message,data:null};
        }
    }
    logOut(){
        window.localStorage.setItem("login",JSON.stringify(true));
    }
    isLogin(){
        const is_login = JSON.parse(window.localStorage.getItem("login"));
        if (is_login) return true;
        return false;
    }
}


class LoginHandlerClass{
    constructor(){
        this.ERR_ID = {
            email:"",
            password:"",
        }
        this.toServer = new Security();
    }
    isEmailValid(email){
        const regix = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (regix.test(email)) return true;
        return false;
    }
    save(credentials){
        const creds = JSON.stringify({email:credentials.email,password:credentials.password});
        window.localStorage.setItem("creds",creds);
    }
    get(){
        const creds = window.localStorage.getItem("creds");
        if (creds) return JSON.parse(creds);
        else return {email:"",password:""};
    }
    rembr(){
        const creds = window.localStorage.getItem("creds");
        if (creds){
            if (JSON.parse(creds).email && JSON.parse(creds).password) return true;
            return false;
        }
    }
    errReset(id,color="lightgray"){
        document.getElementById(id).style.border = "1px solid "+color;
    }
    async check(credsObject,color="red"){
        let isValid = true;
        let errMsg = "";
        let emailError = false;
        let passwordError = false;
        if (this.isEmailValid(credsObject.email) == false){
            isValid = false;
            document.getElementById(this.ERR_ID.email).style.border = "1px solid "+color;
            emailError = true;
        }
        if (!credsObject.password){
            isValid = false;
            document.getElementById(this.ERR_ID.password).style.border = "1px solid "+color;
            passwordError = true;
        }
        if (isValid) return await this.toServer.login(credsObject.email,credsObject.password);
        if (emailError && passwordError) errMsg = "Invalid email and password format";
        else if (emailError) errMsg = "Invalid email format";
        else errMsg = "A password was not provided";
        return {state:false,message:errMsg,data:null}
    }
}

class Tools{
    constructor(){
        this.creds = new LoginHandlerClass();
    }
}

const tools = new Tools();
export default tools;


/*login register file*/
import { IonButton, IonButtons, IonCard, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { Component, useState } from 'react';
import './LoginRegister.css';
import tools from './Tools';



class LoginRegister extends Component{
    constructor(){
        super();

        this.errMsg = "";

        this.email_id = "LOGIN-EMAIL"
        this.password_id = "LOGIN-PASSWORD"

        this.INPUTS = {
            email:tools.creds.get().email,
            password:tools.creds.get().password,
            rembr:tools.creds.rembr(),
        }
    }
    componentDidMount(){
        tools.creds.ERR_ID.email = this.email_id;
        tools.creds.ERR_ID.password = this.password_id;
    }
    onCredsSubmit(event){
        if (event.state){
            if (this.INPUTS.rembr) tools.creds.save(this.INPUTS);
            //IF CREDS PASS
            //LINK TO ROUTES HERE
        }
        this.errMsg = event.message;
        this.setState({errMsg:this.errMsg});
    }
    render(){
        return(
            <IonPage className="PAGE">
                <IonHeader className="HEADER">
                    <IonToolbar class="HEADER-TITLE">
                        <IonTitle>NAWASA</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size-md="4" offset-md="7">
                                <IonCard class="MAIN-CONTAINER">
                                    <IonItem lines="none">
                                        <IonList className="TITLE-CONTAINER">
                                            <IonTitle class="MAIN-TITLE">NAWASA</IonTitle>
                                            <IonTitle class="SUB-TITLE">Login</IonTitle>
                                        </IonList>
                                    </IonItem>

                                    <IonList class="ERROR-CONTAINER">
                                        <IonLabel>{this.errMsg}</IonLabel>
                                    </IonList>

                                    <IonList class="SUB-CONTAINER">
                                        <IonItem id={this.email_id} class="INPUT-IONITEM" lines="none">
                                            <IonLabel position="floating">Email</IonLabel>
                                            <IonInput type="email" onIonChange={(e)=>{
                                                this.INPUTS.email = e.detail.value;
                                                tools.creds.errReset(this.email_id);
                                            }} value={this.INPUTS.email}/>
                                        </IonItem>
                                        <IonItem id={this.password_id} class="INPUT-IONITEM" lines="none">
                                            <IonLabel position="floating">Password</IonLabel>
                                            <IonInput type="password" onIonChange={(e)=>{
                                                this.INPUTS.password = e.detail.value;
                                                tools.creds.errReset(this.password_id);
                                            }} value={this.INPUTS.password}/>
                                        </IonItem>

                                        <IonItem class="CHECK-BUTTON-CONTAINER" lines="none">
                                            <IonCheckbox checked={this.INPUTS.rembr} onIonChange={e =>{
                                                this.INPUTS.rembr = e.detail.checked;
                                            }}></IonCheckbox>
                                            <IonLabel class="CHECK-BUTTON-LABEL">Remember me</IonLabel>
                                        </IonItem>

                                        <IonItem className="FORGET-CREDS-BUTTON" lines="none">
                                            <IonLabel class="HOVER" onClick={()=>{

                                            }}>Forgot credentials?</IonLabel>
                                        </IonItem>

                                        <IonItem className="CREATE-ACCOUNT-BUTTON" lines="none">
                                            <IonLabel class="HOVER" slot="start">Create account</IonLabel>
                                            <IonButton slot="end" onClick={async()=>{
                                                this.onCredsSubmit(await tools.creds.check(this.INPUTS))
                                            }}>Login</IonButton>
                                        </IonItem>
                                    </IonList>

                                    <IonList>




                                    </IonList>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        )
    }
}
export default LoginRegister;
