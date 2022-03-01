import React from "react";
import { View , TouchableOpacity, Text } from "react-native"

const Btn = ({Name , onPress  , style , NameT , btn ,btnColor}) => {
    return(
        
        // <View style={[{justifyContent:"center" , alignItems:"center"},style]}>
        <View style={{justifyContent:"center" , alignItems:"center"}}>
            <TouchableOpacity onPress={onPress} style={style}>
                {btn ? <Text style={{ textAlign:"center" , color:"black" , fontSize:22  , fontWeight:"bold" , fontFamily:"serif"}}>{Name}</Text> : <Text style={{color:btnColor ? '#01ac8f' : "#fff" , fontFamily:"serif"}}>{NameT}</Text> }
                
                
            </TouchableOpacity>
        </View>
        
    )
}
export default Btn ; 