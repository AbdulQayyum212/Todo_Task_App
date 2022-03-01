import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView, Modal, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import AddTask from './Addtask';
import Btn from './Btn';
import {Picker} from '@react-native-picker/picker';
import FilterScreen from './FilterScreen';
import * as Animatable from 'react-native-animatable';

const LogOut = ({navigation, ...props}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [err, setErr] = useState(false);
  console.log('Modal Screen', selectedValue);
  // console.log("====>" , selectedValue);
  const [getdata, setGetdata] = useState('');
  // console.log(selectedValue);
  const [modal, setModal] = useState(false);
  // const [empt, setEmpty] = useState(false);
  const axios = require('axios');
  useEffect(() => {
    setSelectedValue('');
    setErr(false);
  }, []);
  const CheckFilter = async e => {
    setGetdata('');
    // setSelectedValue("");
    if (selectedValue == '') {
      // alert('Sorry! Please Select Any Option');
      setErr(true);
      setInterval(() => {
        setErr(false);
      }, 3000);
      //
    } else {
      try {
        // setErr(false)
        // console.log( "State ====>" , selectedValue);
        const {data, status} = await axios.get(
          `http://todotask.hnhcrm.xyz/api/taskFilter?status=${selectedValue}`,

          {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          },
        );
        if (data == '') {
          alert("Sorry! No Results Your Task");
          // setEmpty(true);
          // setInterval(()=>{setModal(false)} , 2000);
          setModal(false)
        } else {
          setGetdata(data);
          // console.log('Data ,  status ======> Filter', selectedValue);
          console.log('Data ,  status ======> api', data);
          navigation.navigate('FilterScreen', data);
          // setSelectedValue("");
          // console.log("====> Status" , selectedValue);
          setModal(false);
          // return data
          setSelectedValue('');
        }
      } catch (e) {
        console.log('Modal ====>', e);
      }
    }
  };
  // const downloadFile = async () => {
  //   try {
  //     const {data, status} = await axios.get(
  //       'http://todotask.hnhcrm.xyz/api/export',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${props.token}`,
  //         },
  //       },
  //     );
  //     console.log('Data ,  status ======> Download', data, status);
  //     setGetdata(data);
  //   } catch (e) {
  //     // console.log('LogIn', e);
  //   }
  // };
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'flex-start',
          alignContent: 'flex-start',
          marginTop: 20,
        }}>
        <Btn
          btnColor={true}
          NameT="Add Task"
          style={style.btn}
          onPress={() => navigation.navigate('AddTask')}
        />
        <Btn
          btnColor={true}
          style={style.btn}
          NameT="Filter"
          onPress={() => {
            navigation.closeDrawer();
            setModal(true);
          }}
        />
        {/* <Btn
          btnColor={true}
          style={style.btn}
          NameT="Download File"
          onPress={() => {
            navigation.closeDrawer();
            setModal(true);
          }}
        /> */}
      </View>
      <View
      // style={{backgroundColor:"rgba(0,0,0,0.7)"}}
      // onTouchStart={()=>setModal(false)}
      >
        <Modal
          // onRequestClose={()=>{}}
          hardwareAccelerated={true}
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}>
          <View
            //  onTouchStart={()=>setModal(false)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}>
            <View
              style={{
                backgroundColor: '#ffff',
                // opacity: 0.10,
                borderRadius: 15,
                width: '70%',
                height: 250,
                alignItems: 'center',
                justifyContent: 'center',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <Picker
                value={selectedValue}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  // console.log("picker item===>",itemValue)
                  setSelectedValue(itemValue)
                }
                style={{
                  width: 230,
                  marginBottom: 20,
                  // borderRadius: 80,
                  // width: 70,
                  // marginTop: Platform.OS == 'android' ? 20 : null,
                  // marginBottom: Platform.OS == 'android' ? 30 : null,
                }}
                // style={Styles.input}
              >
                <Picker.Item label="Select Any Option" value="" />
                <Picker.Item label="Complete" value="Completed" />
                <Picker.Item label="Pending" value="Pending" />
              </Picker>
              {err ? (
                <View style={{marginTop:-30,marginBottom:10}}>
                  <Animatable.Text animation="wobble">
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 10,
                      // marginBottom: 10,
                      // marginTop: -30,
                    }}>
                    Sorry! Please Select Any Option
                  </Text>
                  </Animatable.Text>
                </View>
              ) : null}
              {/* {empt ? (
                <View style={{marginTop:-30,marginBottom:10}}>
                  <Animatable.Text animation="wobble">
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 10,
                      // marginBottom: 10,
                      // marginTop: -30,
                    }}>
                    Sorry! Please Add Task
                  </Text>
                  </Animatable.Text>
                </View>
              ) : null} */}
              <Btn
                style={{
                  width: 120,
                  backgroundColor: '#01ac8f',
                  alignItems: 'center',
                  borderRadius: 15,
                  height: 30,
                  justifyContent: 'center',
                }}
                NameT="Apply"
                onPress={CheckFilter}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  btn: {
    // fontSize: '20',
    alignItems: 'flex-start',
    width: 300,
    paddingVertical: 10,
    borderColor: 'silver',
    // borderWidth: 1,
    paddingLeft: 20,
    marginBottom: 20,
  },
});
const mapStateToProps = state => {
  return {
    token: state.Reducers.Token,
  };
};
// const mapDispatchToProps = {
//   RemoveToken,
// };
export default connect(mapStateToProps)(LogOut);
// export default LogOut;
