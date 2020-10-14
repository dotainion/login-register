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
    constructor(creds){
        this.creds = creds;
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
    
    async check(credsObject,IdObject,color="red"){
        let isValid = true;
        let errMsg = "";
        let emailError = false;
        let passwordError = false;
        if (this.isEmailValid(credsObject.email) == false){
            isValid = false;
            document.getElementById(IdObject.email).style.border = "1px solid "+color;
            emailError = true;
        }
        if (!credsObject.password){
            isValid = false;
            document.getElementById(IdObject.password).style.border = "1px solid "+color;
            passwordError = true;
        }
        if (isValid) return await this.toServer.login(credsObject.email,credsObject.password);
        if (emailError && passwordError) errMsg = "Invalid email and password format";
        else if (emailError) errMsg = "Invalid email format";
        else errMsg = "A password was not provided";
        return {state:false,message:errMsg,data:null}
    }
}

class RegisterHandler{
    constructor(creds){
        this.creds = creds;
        this.toServer = new Security();
    }
}

class Tools{
    constructor(){
        this.login = new LoginHandlerClass(this);
        this.register = new RegisterHandler(this);
    }
    errCheck(objId,inputsObj,color="red"){
        const keys = Object.keys(objId);
        let index = 0;
        for (var inputs of Object.keys(inputsObj)){
            index ++;
            if (inputsObj[inputs] === ""){
                document.getElementById(objId[index]).style.border = "1px solid "+color;
            }
        }
    }
    errReset(id,color="lightgray"){
        document.getElementById(id).style.border = "1px solid "+color;
    }
    errSet(id,color="lightgray"){
        document.getElementById(id).style.border = "1px solid "+color;
    }
}

const tools = new Tools();
export default tools;