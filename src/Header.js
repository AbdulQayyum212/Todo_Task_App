import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({
  style,
  Name,
  onPress,
  Icon,
  TextRight,
  TextCenter,
  IconLift,
  Log,
  out,
  on
}) => {
  return (
    <View style={style}>
      {/* {IconLift ? (
        <TouchableOpacity
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            alignContent: 'center',
            marginLeft: 10,
          }}
          onPress={onPress}>
          <Ionicons name="chevron-back" style={{fontSize: 30}} />
        </TouchableOpacity>
        
      ) : null} */}

      {TextCenter ? (
        // <View style={{justifyContent:"center" , width:"100%"}}>
        <View style={{ alignItems:"center" , width:"83%" ,  marginLeft:25}}> 
        <Text
          style={{
            // width: 200,
            fontSize: 25,
            // marginLeft: 10,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
            // justifyContent:"flex-start",
            // alignItems:"flex-start",
            marginTop: 12,
            // marginRight:70
          }}>
          {Name}
        </Text>
        </View>
        // </View>
      ) : null}
      {/* {Log ? <View style={{ width:60, justifyContent:"center" , alignItems:"center" , marginRight:-30 , marginLeft:-5 }}>
        <TouchableOpacity onPress={on}>
        <Ionicons name="enter-outline" style={{fontSize: 30}} />
        </TouchableOpacity>
      </View>:null} */}
      {/* {TextRight ? (
        <View style={{ width:310 , justifyContent: 'center', alignContent: 'center' , backgroundColor:"red"}}>
          <Text
            style={{
              fontSize: 25,
              marginLeft: 20,
              fontWeight: 'bold',
              color: '#fff',
              textAlign:"center",
              justifyContent:"center",
              // alignItems:"center"
            }}>
            {Name}
          </Text>
        </View>
      ) : null} */}
      {Icon ? (
        // <TouchableOpacity
        //   style={{
        //     alignItems: 'flex-end',
        //     justifyContent: 'center',
        //     alignContent: 'center',
        //     marginRight: 10,
        //   }}
        //   onPress={onPress}>
        //   <Ionicons name="menu-outline" style={{fontSize: 30}} />
        // </TouchableOpacity>
        <View style={{  justifyContent:"center" , alignItems:"center" , marginLeft:-20  }}>
        <TouchableOpacity onPress={on} style={{flexDirection:"column" , alignContent:"center" , width:50}} >
        <Ionicons name="enter-outline" style={{fontSize: 30}} />
        <Text style={{fontSize:10 , color:"#fff" , fontWeight:"bold"}}>LogOut</Text>
        </TouchableOpacity>
      </View>
      ) : null}
    </View>
  );
};
export default Header;
