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
