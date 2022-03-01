import React , {useEffect, useState} from "react";
import { Text , View, SafeAreaView , StyleSheet , FlatList , TouchableOpacity} from "react-native"
import Header from "./Header";
import Card from "./Card";
import { connect } from "react-redux"
import Home from "./Home";


const FilterScreen = ({navigation , ...props}) => {
    const axios = require('axios');
    const [data] = useState(props.route.params);
    // console.log("FilterScreen =====>" , props.route.params);
    // console.log("STATUS =====>" , props.route.params.getdata.status);
    const EditList = e => {
        //  console.log("Edit" , e);
        navigation.navigate('EditTask', {paramKey: e});
      };
      const DeleteList = e => {
        // setLoader(true);
        let value = e;
        console.log(value);
        axios
          .delete('http://todotask.hnhcrm.xyz/api/task/' + value, {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          })
          .then(res => {
            console.log('res', res);
            getAllNotes();
          });
      };
      
    // console.log("data <========" , data);
    return(
        <SafeAreaView>
        <View style={{height:"100%"}}>
             <Header
              IconLift={true}
              TextCenter={true}
              style={Styles.header}
              Name="Filter "
              onPress={() => {
                // data = null
                // console.log("back <=====" , data);
                navigation.goBack()}
              }
            />
            <FlatList
            // style={{padding:Platform.OS == "ios" ? 10 : 5}} d
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item, index}) => (
              <Card
                dele={true}
                category="Category :"
                Time="Date :"
                Title="Work:"
                style={Styles.card}
                // Number={index + 1}
                work={item.work}
                time={item.reminderTime}
                Category={item.Category}
                Status={item.status}
                // onPress={() => {
                //   EditList(item);
                // }}
                onpress={() => {
                  DeleteList(item.id);
                }}
              />
            )}
            // keyExtractor={item => item.id}
            ListEmptyComponent={
              <View
                style={{
                  alignItems: 'center',
                  height: 600,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Home')}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: '#01ac8f',
                    }}>
                    Home
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
        </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
    header: {
        // justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        // borderWidth:1,
        // borderColor:"silver",
        // justifyContent:"center",
        backgroundColor: '#01ac8f',
      },
      card: {
        // borderWidth:1,
        borderRadius: 20,
        marginBottom: 10,
        borderColor: 'silver',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 130,
        marginTop: Platform.OS == 'android' ? 10 : 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
    
        elevation: 14,
        backgroundColor: '#fff',
        // backgroundColor:"blue"
      },
})
const mapStateToProps = state => {
    return {
      token: state.Reducers.Token,
    };
  };
  export default connect(mapStateToProps)(FilterScreen);
// export default FilterScreen;