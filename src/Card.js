import React from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Card = ({
  style,
  onPress,
  Number,
  work,
  time,
  Category,
  Status,
  onpress,
  Title,
  Time,
  category,
  dele,
}) => {
  return (
    // <TouchableOpacity style={style}>
    //  <View>
    //    <View style={{ marginLeft:10 ,flexDirection:"row" , justifyContent:"space-between"}}>
    //    <View style={{flexDirection:"column" , backgroundColor:"red" , width:"60%"}}>
    //      <Text>{Title}</Text>
    //      <Text>{work}</Text>
    //    </View >
    //    <View style={{backgroundColor:"blue" , width:120, alignItems:"flex-end"}}>
    //    <View>
    //      <Text>{Status}</Text>
    //    </View>
    //    </View>
    //    </View>
    //    <View style={{flexDirection:"row"}}>
    //      <View style={{flexDirection:"column"}}>
    //        <Text>{category}</Text>
    //        <Text>{Category}</Text>
    //      </View>
    //      <View style={{flexDirection:"column"}}>
    //        <Text>{Time}</Text>
    //        <Text>{time}</Text>
    //      </View>
    //    </View>
    //  </View>

    // </TouchableOpacity>
    <TouchableOpacity style={style}>
      {/* <View
        style={{
          borderColor: 'silver',
          borderRadius: 20,
          borderWidth: 1,
          height: 70,
          width: 15,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 5,
          backgroundColor: '#01ac8f',
        }}>
        <Text style={{color: '#ffff'}}>{Number}</Text>
      </View> */}
      <View style={{flexDirection: 'column', marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginTop: -10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              width: '50%',
              marginTop: -20,
              marginBottom: 10,
            }}>
            <Text style={{color: 'silver', marginLeft: 5, marginRight: 5}}>
              {Title}
            </Text>
            <Text
              style={{
                color: '#01ac8f',
                marginRight: 15,
                width: 170,
                // backgroundColor:"red",
                // textAlign: 'center',
                // height:60,
                // backgroundColor:"red",
                // marginLeft: 2,
                marginLeft: -4,
              }}>
              {work}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginLeft: 16, marginTop: -12}}>
          <View style={{flexDirection: 'row', marginTop: 22, marginRight: 30}}>
            <Text style={{color: 'silver'}}>{category}</Text>
            <Text
              style={{
                color: '#01ac8f',
                // marginRight: 15,
                width: 90,
                // backgroundColor:"red",
                // textAlign: 'center',
                // backgroundColor:"red",
                // height:60,
                // alignItems: 'center',
                // marginLeft:
              }}>
              {Category}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: Platform.OS == 'ios' ? 150 : null,
              height: 30,
              marginTop: Platform.OS == 'ios' ? 10 : null,
              marginBottom: -10,
            }}>
            <Text style={{color: 'silver'}}>{Time}</Text>
            <Text
              style={{
                color: '#01ac8f',
                // marginRight: 15,
                // width: Platform.OS == 'android' ? 53 : 50,
                // marginLeft: 20,
                // height: Platform.OS == 'android' ? 60 : null,
              }}>
              {time}
            </Text>
          </View>
        </View>
      </View>

      {/* <Text
        style={{
          color: '#01ac8f',
          marginRight: 15,
          width: 48,
          textAlign: 'center',
          // height:60,
          // backgroundColor:"red",
          marginRight: -3,
        }}>
        {work}
      </Text>
      <Text
        style={{
          color: '#01ac8f',
          marginRight: 15,
          width: Platform.OS == 'android' ? 53 : 50,
          marginLeft: 20,
          height: Platform.OS == 'android' ? 60 : null,
        }}>
        {time}
      </Text>
      <Text
        style={{
          color: '#01ac8f',
          marginRight: 15,
          width: 48,
          textAlign: 'center',
          // backgroundColor:"red",
          // height:60,
          alignItems: 'center',
        }}>
        {Category}
      </Text> */}
      <View style={{height: 80, justifyContent: 'flex-end', marginTop: -25}}>
        <View style={{height: 80, justifyContent: 'flex-start'}}>
          <View
            style={{
              backgroundColor: '#01ac8f',
              // marginLeft:10,
              width: 90,
              borderRadius: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              // paddingLeft: 10,
              // marginLeft:-30,
              // marginRight:20,
              // marginBottom:-10
              // justifyContent:"flex-start"
            }}>
            <Text style={{color: '#ffff', width: 80, textAlign: 'center'}}>
              {Status}
            </Text>
          </View>
        </View>
      </View>
      {dele ? (
        <View style={{width:-5 , marginLeft:-40}}></View>
      ) : (
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: 40,
            height: 113,
            alignItems: 'center',
            marginRight: Platform.OS == 'ios' ? -6 : -12,
            // marginRight:60
          }}>
          <TouchableOpacity onPress={onPress}>
            <Ionicons
              name="create-outline"
              style={{fontSize: 20, marginRight: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onpress}>
            <Ionicons
              name="trash-outline"
              style={{
                fontSize: 20,
                marginRight: Platform.OS == 'android' ? 25 : 10,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default Card;
