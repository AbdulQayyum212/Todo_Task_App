import React from "react";
import {View , Text , SafeAreaView , StyleSheet , TouchableOpacity, TextInput} from "react-native"
import InputText from './InputText'
import Btn from "./Btn";


const SignUp = () => {
    return(
        <View style={Style.mainView}>
          <InputText placeholder="Email" style={Style.input} />
          <InputText placeholder="Passwor" style={Style.input} />
          <Btn style={Style.btn} Name="SignIn" />
        </View>
    )
}
const Style = StyleSheet.create({
    mainView: {
        flex: 1,
        padding:30,
        justifyContent: 'center',
      },
      input:{
        width:"100%",
        borderWidth:1,
        borderColor:"black",
        borderRadius:7,
        marginBottom:15,
        height:50,
        paddingLeft:30
      },
      btn:{
          justifyContent:"center",
          borderWidth:1,
          borderColor:"silver",
          width:"50%",
          height:30,
          borderRadius:7

      }
})
export default SignUp ;