/*login register file*/
import { IonButton, IonButtons, IonCard, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { Component, useState } from 'react';
import './StyleSheet.css';
import tools from './Tools';



class LoginRegister extends Component{
    constructor(){
        super();

        this.errMsg = "";

        this.login_id_obj = {
            email:"LOGIN-EMAIL",
            password:"LOGIN-PASSWORD",
        }
        this.register_id_obj = {
            user:{
                firstname:"REGISTER-FIRST-NAME",
                lastName:"REGISTER-LAST-NAME",
                contact:"REGISTER-CONTACT",
            },
            area:{
                city:"REGISTER-CITY",
                state:"REGISTER-STATE",
                address:"REGISTER-ADDRESS",
            },
            creds:{
                email:"REGISTER-EMAIL",
                password:"REGISTER-PASSWORD",
                confirmPassord:"REGISTER-CONFIRM-PASSWORD",
            }
        }
        this.LOGIN_INPUTS = {
            email:tools.login.get().email,
            password:tools.login.get().password,
            rembr:tools.login.rembr(),
        }
        this.REGISTER_INPUTS = {
            user:{
                firstName:"",
                lastName:"",
                contact:"",
            },
            area:{
                city:"",
                state:"",
                address:"",
            },
            creds:{
                email:"",
                password:"",
                confirmPassord:"",
            }
        }
        this.LOGIN_GUI_STATE = {
            login:true,
            register:false,
        }
        this.IN_REGISTER_GUI_STATE = {
            name:true,
            address:false,
            creds:false,
        }
    }
    componentDidMount(){
        
    }
    onLoginSubmit(event){
        if (event.state){
            if (this.LOGIN_INPUTS.rembr) tools.login.save(this.LOGIN_INPUTS);
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

                                    {/*login gui*/}
                                    <IonList class="SUB-CONTAINER">
                                        <IonList hidden={!this.LOGIN_GUI_STATE.login}>
                                            <IonItem id={this.login_id_obj.email} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">Email</IonLabel>
                                                <IonInput type="email" onIonChange={(e)=>{
                                                    this.LOGIN_INPUTS.email = e.detail.value;
                                                    tools.errReset(this.login_id_obj.email);
                                                }} value={this.LOGIN_INPUTS.email}/>
                                            </IonItem>
                                            <IonItem id={this.login_id_obj.password} class="INPUT-IONITEM" lines="none">
                                                <IonLabel position="floating">Password</IonLabel>
                                                <IonInput type="password" onIonChange={(e)=>{
                                                    this.LOGIN_INPUTS.password = e.detail.value;
                                                    tools.errReset(this.login_id_obj.password);
                                                }} value={this.LOGIN_INPUTS.password}/>
                                            </IonItem>

                                            <IonItem class="CHECK-BUTTON-CONTAINER" lines="none">
                                                <IonCheckbox checked={this.LOGIN_INPUTS.rembr} onIonChange={e =>{
                                                    this.LOGIN_INPUTS.rembr = e.detail.checked;
                                                }}></IonCheckbox>
                                                <IonLabel class="CHECK-BUTTON-LABEL">Remember me</IonLabel>
                                            </IonItem>

                                            <IonItem className="FORGET-CREDS-BUTTON" lines="none">
                                                <IonLabel class="HOVER" onClick={()=>{

                                                }}>Forgot credentials?</IonLabel>
                                            </IonItem>

                                            <IonItem className="ACCOUNT-ACTION-BUTTON" lines="none">
                                                <IonLabel class="HOVER" slot="start" onClick={()=>{
                                                    this.LOGIN_GUI_STATE.login = false; this.LOGIN_GUI_STATE.register = true;
                                                    this.setState({GUI:this.LOGIN_GUI_STATE})
                                                }}>Create account</IonLabel>
                                                <IonButton slot="end" onClick={async()=>{
                                                    this.onLoginSubmit(await tools.login.check(this.LOGIN_INPUTS,this.login_id_obj));
                                                }}>Login</IonButton>
                                            </IonItem>
                                        </IonList>



                                        {/*register gui*/}
                                        <IonList hidden={!this.LOGIN_GUI_STATE.register}>
                                            {/*register name gui*/}
                                            <IonList hidden={!this.IN_REGISTER_GUI_STATE.name}>
                                                <IonItem id={this.register_id_obj.user.firstname} class="INPUT-IONITEM" lines="none">
                                                    <IonLabel position="floating">First Name</IonLabel>
                                                    <IonInput type="text" onIonChange={(e)=>{
                                                        this.REGISTER_INPUTS.user.firstName = e.detail.value;
                                                        tools.errReset(this.register_id_obj.user.firstname);
                                                    }} value={this.REGISTER_INPUTS.user.firstName}/>
                                                </IonItem>
                                                <IonItem id={this.register_id_obj.lastName} class="INPUT-IONITEM" lines="none">
                                                    <IonLabel position="floating">Last Name</IonLabel>
                                                    <IonInput type="text" onIonChange={(e)=>{
                                                        this.REGISTER_INPUTS.user.lastName = e.detail.value;
                                                        tools.errReset(this.register_id_obj.user.lastName);
                                                    }} value={this.REGISTER_INPUTS.user.lastName}/>
                                                </IonItem>
                                                <IonItem id={this.register_id_obj.contact} class="INPUT-IONITEM" lines="none">
                                                    <IonLabel position="floating">Phone number</IonLabel>
                                                    <IonInput type="number" onIonChange={(e)=>{
                                                        this.REGISTER_INPUTS.user.contact = e.detail.value;
                                                        tools.errReset(this.register_id_obj.user.contact);
                                                    }} value={this.REGISTER_INPUTS.user.contact}/>
                                                </IonItem>
                                                <IonItem className="ACCOUNT-ACTION-BUTTON" lines="none">
                                                    <IonLabel class="HOVER" slot="start" onClick={()=>{
                                                        this.LOGIN_GUI_STATE.login = true; this.LOGIN_GUI_STATE.register = false;
                                                        this.setState({GUI:this.LOGIN_GUI_STATE});
                                                    }}>Go back</IonLabel>
                                                    <IonButton slot="end" onClick={async()=>{
                                                        if (tools.errCheck(this.register_id_obj.area,this.REGISTER_INPUTS.user)){
                                                            this.IN_REGISTER_GUI_STATE.name = false; 
                                                            this.IN_REGISTER_GUI_STATE.address = true;
                                                            this.IN_REGISTER_GUI_STATE.creds = false;
                                                            this.setState({IN_REGISTER_GUI:this.IN_REGISTER_GUI_STATE});
                                                        }
                                                    }}>Next</IonButton>
                                                </IonItem>
                                            </IonList>

                                            {/*register address `gui*/}
                                            <IonList hidden={!this.IN_REGISTER_GUI_STATE.address}>
                                                <IonItem id={this.register_id_obj.area.city} class="INPUT-IONITEM" lines="none">
                                                    <IonLabel position="floating">City</IonLabel>
                                                    <IonInput type="text" onIonChange={(e)=>{
                                                        this.REGISTER_INPUTS.area.city = e.detail.value;
                                                        tools.errReset(this.register_id_obj.area.city);
                                                    }} value={this.REGISTER_INPUTS.area.city}/>
                                                </IonItem>
                                                <IonItem id={this.register_id_obj.area.state} class="INPUT-IONITEM" lines="none">
                                                    <IonLabel position="floating">State</IonLabel>
                                                    <IonInput type="text" onIonChange={(e)=>{
                                                        this.REGISTER_INPUTS.area.state = e.detail.value;
                                                        tools.errReset(this.register_id_obj.area.state);
                                                    }} value={this.REGISTER_INPUTS.area.state}/>
                                                </IonItem>
                                                <IonItem id={this.register_id_obj.area.address} class="INPUT-IONITEM" lines="none">
                                                    <IonLabel position="floating">Address</IonLabel>
                                                    <IonInput type="number" onIonChange={(e)=>{
                                                        this.REGISTER_INPUTS.area.address = e.detail.value;
                                                        tools.errReset(this.register_id_obj.area.address);
                                                    }} value={this.REGISTER_INPUTS.area.address}/>
                                                </IonItem>
                                                <IonItem className="ACCOUNT-ACTION-BUTTON" lines="none">
                                                    <IonLabel class="HOVER" slot="start" onClick={()=>{
                                                        this.IN_REGISTER_GUI_STATE.name = true; 
                                                        this.IN_REGISTER_GUI_STATE.address = false;
                                                        this.IN_REGISTER_GUI_STATE.creds = false;
                                                        this.setState({IN_REGISTER_GUI:this.IN_REGISTER_GUI_STATE});
                                                    }}>Go back</IonLabel>
                                                    <IonButton slot="end" onClick={async()=>{
                                                        if (tools.errCheck(this.register_id_obj.area,this.REGISTER_INPUTS.area)){
                                                            this.IN_REGISTER_GUI_STATE.name = false; 
                                                            this.IN_REGISTER_GUI_STATE.address = false;
                                                            this.IN_REGISTER_GUI_STATE.creds = true;
                                                            this.setState({IN_REGISTER_GUI:this.IN_REGISTER_GUI_STATE});
                                                        }
                                                    }}>Next</IonButton>
                                                </IonItem>
                                            </IonList>

                                            {/*register address `gui*/}
                                            <IonList hidden={!this.IN_REGISTER_GUI_STATE.creds}>
                                                <IonItem id={this.register_id_obj.creds.email} class="INPUT-IONITEM" lines="none">
                                                    <IonLabel position="floating">Email</IonLabel>
                                                    <IonInput type="text" onIonChange={(e)=>{
                                                        this.REGISTER_INPUTS.creds.email = e.detail.value;
                                                        tools.errReset(this.register_id_obj.creds.email);
                                                    }} value={this.REGISTER_INPUTS.creds.email}/>
                                                </IonItem>
                                                <IonItem id={this.register_id_obj.creds.password} class="INPUT-IONITEM" lines="none">
                                                    <IonLabel position="floating">Password</IonLabel>
                                                    <IonInput type="text" onIonChange={(e)=>{
                                                        this.REGISTER_INPUTS.creds.password = e.detail.value;
                                                        tools.errReset(this.register_id_obj.creds.password);
                                                    }} value={this.REGISTER_INPUTS.creds.password}/>
                                                </IonItem>
                                                <IonItem id={this.register_id_obj.creds.confirmPassord} class="INPUT-IONITEM" lines="none">
                                                    <IonLabel position="floating">Confirm Password</IonLabel>
                                                    <IonInput type="number" onIonChange={(e)=>{
                                                        this.REGISTER_INPUTS.creds.confirmPassord = e.detail.value;
                                                        tools.errReset(this.register_id_obj.creds.confirmPassord);
                                                    }} value={this.REGISTER_INPUTS.creds.confirmPassord}/>
                                                </IonItem>
                                                <IonItem className="ACCOUNT-ACTION-BUTTON" lines="none">
                                                    <IonLabel class="HOVER" slot="start" onClick={()=>{
                                                        if (tools.errCheck(this.register_id_obj.area,this.REGISTER_INPUTS.creds)){
                                                            this.IN_REGISTER_GUI_STATE.name = false; 
                                                            this.IN_REGISTER_GUI_STATE.address = true;
                                                            this.IN_REGISTER_GUI_STATE.creds = false;
                                                            this.setState({IN_REGISTER_GUI:this.IN_REGISTER_GUI_STATE});
                                                        }
                                                    }}>Go back</IonLabel>
                                                    <IonButton slot="end" onClick={async()=>{
                                                    
                                                    }}>Send</IonButton>
                                                </IonItem>
                                            </IonList>

                                            




                                        </IonList>    
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
