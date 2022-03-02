import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert
} from 'react-native';
import Header from './Header';
import Card from './Card';
import {connect} from 'react-redux';
import {RemoveToken} from './Redux/Action/';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import InputText from './InputText';
import Btn from './Btn';
import moment from 'moment';
// import AddTask from './Addtask';

const Home = ({navigation, ...props}) => {
  const [loader, setLoader] = useState(true);
  const [modal, setModal] = useState(false);
  const [workText, setWorkText] = useState('');
  const [category, setCategory] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [selectedValue, setSelectedValue] = useState('Pending');
  const [fModal, setFModal] = useState('Pending');
  // console.log('Home', selectedValue);
  const [date] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [button, setButton] = useState(false);
  const [title, setTittle] = useState('Hello');
  const [modalDelet, setModalDelet] = useState(false);
  const [id, setId] = useState('');
  const [editId, setEditId] = useState('');
  const [filferModal, setFilferModal] = useState(false);
  const [err, setErr] = useState(false);
  const [getdata, setGetdata] = useState('');
  const [filterData , setFilterData] = useState("");
  const [flat , setFlat] = useState(false);
  const [cencal , setCencal] = useState(false);
  const [empty , setEmpty] = useState(true);
  const [add , setAdd] = useState(false)
  const axios = require('axios');
  const [today] = useState(new Date());

  // getdata.sort(function(b){
  //   return new Date(b.reminderTime)
  //   console.log("New");
  // })

 useState(()=>{
  if(getdata.reminderTime == today) {
    console.log("Completed Your Task");
  }
 })
//  useEffect(()=>{
//   if (flat == true){
//     return setEmpty(false)
//   }
//  },)

const log = () =>{
  setEmpty(true);
  setAdd(true)
  
}


  const hide = () =>{
    if(getdata.length  > 1){
      return setEmpty(false)
    }else if(getdata.length === 1){
      return setEmpty(true)
   }
  }
  useEffect(()=>{
    hide()
  },[])
  
  
   
// console.log(getdata.length);
  // if(getdata.length === 0){
    // console.log(getdata.length);
    // return 
  // }
  // const [modal, setModal] = useState(false);
  // useEffect(() => {
  //   try {
  //     const {data, status} =  axios.get(
  //       'http://todotask.hnhcrm.xyz/api/task',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${props.token}`,
  //         },
  //       },
  //     );
  //     console.log('Data , Status ==== >', data, status);
  //   } catch (e) {
  //     console.log('list', e);
  //   }
  // }, [])
  // const [loader, setLoader] = useState(false);

  // const token = useSelector(state => state.Reducers.Token);

  // try {
  //     const {data, status } = await axios.get(
  //       'http://todotask.hnhcrm.xyz/api/category',
  // {
  //     headers: {
  //       'Authorization': `Basic ${token}`
  //     }
  //   }
  //     );
  //     console.log("Data , Status" , data, status);

  //   } catch (e) {
  //     console.log('LogIn', e);
  //   }
  useEffect(() => {
    setLoader(true);
    // setAdd(true);
    // setEmpty(true);
    getAllNotes();
    // setLoader(false);
  }, []);
  // useEffect(() => {
  //   const unsubscribe = addListener('focus', () => {
  //     // Screen was focused
  //     getAllNotes();
  //     setLoader(true);
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  const Addlist = async () => {
    // setLoader(true);
    // console.log('Tokrn ===>', ...props.token);
    if (
      workText === '' ||
      category === '' ||
      dateTime === '' ||
      setSelectedValue === ''
    ) {
      // alert('Sorry! Fill The Form');
      setAlert(true);
      setInterval(() => {
        setAlert(false);
      }, 3000);
    } else {
      // let formData = new FormData();
      // formData.append('title', title);
      // formData.append('workText', workText);
      // formData.append('selectedValue', selectedValue);
      // formData.append('dateTime', dateTime);
      try {
        // console.log(title, workText, category, selectedValue, dateTime);
        setModal(false);
        setLoader(true);
        const {data, status} = await axios.post(
          'http://todotask.hnhcrm.xyz/api/task',
          {
            // name: [title, workText, category, selectedValue, dateTime],
            Category: category,
            work: workText,
            currentDate: date,
            status: selectedValue,
            reminderTime: dateTime,
          },
          {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          },
        );
        console.log('Data , Status Task ==== >', data, status);
        getAllNotes();
        // setLoader(false)
        setSelectedValue('Pending');
        setWorkText('');
        setCategory('');
        setCategory('');
        setDateTime('');
      } catch (e) {
        // console.log("catch");
        console.log('list', e);
      }
      // setLoader(false);
    }
  };
  useEffect(()=>{
    hide()
  },[Addlist])
  // console.log("getAllNotes");
  // const url = 'http://todotask.hnhcrm.xyz/api/task'
  const getAllNotes = async () => {
    try {
      const {data, status} = await axios.get(
        'http://todotask.hnhcrm.xyz/api/task',
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      );
      // console.log('Data ,  status ======> get', data, status);
      if (data.length) {
      }
      setGetdata(data);
    } catch (e) {
      console.log('LogIn', e);
    }
    setLoader(false);
    setAdd(false)
    setEmpty(false)
    // axios.get(`${url} past`)

    // .then((response) => {
    //   // const allNotes = response.data.getdata
    //   console.log("fetch",response);
    // })
    // .catch((e)=>{
    //   console.log("Error" , e);
    // })
    // console.log(getdata);
  };
  const EditList = e => {
    console.log('Edit', e.id);
    setButton(true);
    setCategory(e.Category);
    setWorkText(e.work);
    setDateTime(e.reminderTime);
    setSelectedValue(e.status);
    setEditId(e.id);
    setModal(true);
    // navigation.navigate('EditTask', {paramKey: e});
    // console.log("Token <==========================================" , props.token);
  };
  const DeleteList = e => {
    setId(e);
    setModalDelet(true);
    // setLoader(true);
    // setLoader(true);
    // let value = e;
    // console.log("delet ======>" , value);
    // axios
    //   .delete('http://todotask.hnhcrm.xyz/api/task/' + value, {
    //     headers: {
    //       Authorization: `Bearer ${props.token}`,
    //     },
    //   })
    //   .then(res => {
    //     // console.log('res', res);
    //     getAllNotes();
    //   });
    // setLoader(false);
  };
  const logOutbtn = async () => {
    // log()
    setLoader(true);
    setTimeout(()=>{
      props.RemoveToken(null);
      setLoader(false);
    },2000)
  };
  const deleteBtn = e => {
    // console.log("id" ,e);
    //  let value = e;
    setLoader(true);
    axios
      .delete('http://todotask.hnhcrm.xyz/api/task/' + id, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then(res => {
        console.log('res', res);
        getAllNotes();
        // setLoader(false);
        // setLoader(false);
        // getAllNotes();
      });
    setModalDelet(false);
  };
  useEffect(()=>{
    hide()
  },[deleteBtn])
  const editTask = () => {
    // const value = {
    //   workText,category, dateTime ,selectedValue
    // }
    axios
      .put(
        'http://todotask.hnhcrm.xyz/api/task/' + editId,
        {
          Category: category,
          work: workText,
          currentDate: date,
          status: selectedValue,
          reminderTime: dateTime,
        },

        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      )
      .then(res => {
        console.log('res Edit ===>', res);
        getAllNotes();
        setModal(false);
        // setSelectedValue('');
        // setTittle('');
        // setWorkText('');
        // setCategory('');
        // setCategory('');
        // setLoader(false);
        // navigation.goBack();
      });
  };
  const CheckFilter = async e => {
    console.log("filter Data " , fModal);
    setFilferModal(false)
    setLoader(true);
    setFlat(true);
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
          `http://todotask.hnhcrm.xyz/api/taskFilter?status=${fModal}`,

          {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          },
        );
         if(data == ''){
              console.log(`Not Fount ${fModal}`)
              Alert.alert(
                `Not Fount ${fModal} Task`
              )
              setFlat(false)
              getAllNotes();
              // setLoader(false)
        }else{
          setFilterData(data);
          console.log("api" , data);
          setCencal(true)
          setLoader(false)
          // console.log('Data ,  status ======> Filter', selectedValue);
          console.log('Data ,  status ======> Filter', data);
          // navigation.navigate('FilterScreen', data);
          // setSelectedValue("");
          // console.log("====> Status" , selectedValue);
          // setModal(false);
          // return data
          // setSelectedValue('');
        }
      } catch (e) {
        console.log('Modal ====>', e);
      }
    }
    // setFilterData("")
  };
  return (
    <SafeAreaView>
      <View>
        <View style={{height: '100%'}}>
          <Header
            TextCenter={true}
            Icon={true}
            TextRight={true}
            Log={true}
            style={styles.header}
            out="LogOut"
            Name="Task Reminder"
            on={logOutbtn}
            onPress={() => navigation.openDrawer()}
          />
          {loader ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                // backgroundColor:"red",
                position:"relative"
              }}>
              <ActivityIndicator
                size="large"
                color={'#04d07b'}
                style={{flex: 1}}
              />
            </View>
          ) : null}
          {/* <View style={styles.boder}>
            <Text style={{color: '#01ac8f', marginRight: 12, marginLeft: 10}}>
              No
            </Text>
            <Text style={{color: '#01ac8f', marginRight: 15}}>Work</Text>
            <Text style={{color: '#01ac8f', marginRight: 15}}>Reminder</Text>
            <Text style={{color: '#01ac8f', marginRight: 15}}>Category</Text>
            <Text style={{color: '#01ac8f', marginRight: 15}}>Status</Text>
            <Text style={{color: '#01ac8f', marginRight: 15}}>Edit</Text>
            <Text style={{color: '#01ac8f', marginRight: 5}}>Delete</Text>
          </View> */}
          {flat?<FlatList
            // style={{padding:Platform.OS == "ios" ? 10 : 5}} d
            showsVerticalScrollIndicator={false}
            data={filterData}
            renderItem={({item, index}) => (
              <Card
                dele={true}
                category="Category :"
                Time="Date :"
                Title="Work:"
                style={styles.card}
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
          /> :
          <FlatList
            // style={{padding:Platform.OS == "ios" ? 10 : 5}} d
            showsVerticalScrollIndicator={false}
            data={getdata}
            renderItem={({item, index}) => (
              <Card
                category="Category :"
                Time="Date :"
                Title="Work:"
                style={styles.card}
                Number={index}
                work={item.work}
                time={item.reminderTime}
                Category={item.Category}
                Status={item.status}
                onPress={() => {
                  EditList(item);
                }}
                onpress={() => {
                  DeleteList(item.id);
                }}
              />
            )}
            ListEmptyComponent={
              <View
              style={{
                alignItems: 'center',
                height: 600,
                justifyContent: 'center',
              }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#01ac8f',
                  }}>
                  No Results found
                </Text>
              </View>
            }
          />}
        </View>
        {add?null :
        <View style={{marginRight: 15}}>
          <TouchableOpacity
            onPress={() => {
              setButton(false);
              setModal(true);
              setCategory('');
              setWorkText('');
              setDateTime('');
              setSelectedValue('Pending');
            }}
            style={{
              backgroundColor: '#01ac8f',
              width: 60,
              height: 60,
              position: 'absolute',
              bottom: 30,
              borderRadius: 60,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              paddingLeft: 3,
            }}>
            <Animatable.Text animation="swing">
              <Ionicons
                name="add"
                style={{
                  fontSize: 50,
                  color: '#ffff',
                  // marginRight: Platform.OS == 'android' ? 25 : 10,
                }}
              />
            </Animatable.Text>
          </TouchableOpacity>
        </View>}

        {empty?  null : cencal?  
        <View style={{marginLeft: 15}}>
        <TouchableOpacity
          onPress={() => {
            setLoader(true)
            setFModal('Pending')
            setFlat(false);
            setCencal(false);
            getAllNotes();
            setFilterData("")
          }}
          style={{
            backgroundColor: 'red',
            width: 60,
            height: 60,
            position: 'absolute',
            bottom: 30,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start',
            paddingLeft: 3,
          }}>
          <Animatable.Text animation="swing">
            <Ionicons
              name="close-sharp"
              style={{
                fontSize: 50,
                color: '#ffff',
                // marginRight: Platform.OS == 'android' ? 25 : 10,
              }}
            />
          </Animatable.Text>
        </TouchableOpacity>
      </View>  :<View style={{marginLeft: 15}}>
          <TouchableOpacity
            onPress={() => {
              setFilferModal(true);
            }}
            style={{
              backgroundColor: '#01ac8f',
              width: 60,
              height: 60,
              position: 'absolute',
              bottom: 30,
              borderRadius: 60,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-start',
              paddingLeft: 3,
            }}>
            <Animatable.Text animation="swing">
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Filter</Text>
            </Animatable.Text>
          </TouchableOpacity>
        </View>}
        <Modal
          // onRequestClose={()=>{}}
          hardwareAccelerated={true}
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}>
            {/* <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:"center" }}> */}
          <View
            //  onTouchStart={()=>setModal(false)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // height:"100%"
              // backgroundColor: 'rgba(0,0,0,0.7)',
            }}>
            <View
              style={{
                backgroundColor: '#ffff',
                // opacity: 0.10,
                borderRadius: 15,
                width: '80%',
                height:Platform.OS == 'ios' ? 485 : 400,
                padding: 15,
                // alignItems: 'center',
                // justifyContent: 'center',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  marginTop: -20,
                  marginRight: -12,
                  marginTop: -15,
                }}>
                <TouchableOpacity
                  style={{width: 20, alignSelf: 'flex-end'}}
                  onPress={() => {
                    setModal(false);
                  }}>
                  <Ionicons name="close-circle-outline" size={23} />
                </TouchableOpacity>
              </View>
              <InputText
                value={workText}
                placeholder="Work"
                style={styles.input}
                maxLength={17}
                onChange={e => {
                  setWorkText(e.nativeEvent.text);
                }}
              />
              <InputText
                value={category}
                placeholder="Create new Category"
                maxLength={10}
                style={styles.input}
                onChange={e => {
                  setCategory(e.nativeEvent.text);
                }}
              />
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  setOpen(true);
                }}>
                <View
                  style={{
                    // paddingLeft:10,
                    // marginTop:10,
                    justifyContent: 'center',
                    alignContent: 'center',
                    // height: 50,
                  }}>
                  {dateTime == '' ? (
                    <Text style={{color: 'silver'}}> Date</Text>
                  ) : (
                    <Text style={{color: 'black'}}>
                      {moment(dateTime).format('MMMM Do YYYY, h:mm:ss a')}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              {alert ? (
                <View
                  style={{
                    marginTop: -10,
                    width: '100%',
                    // marginTop:-20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginBottom:30,
                    // marginLeft: -25,
                  }}>
                  <Animatable.Text animation="wobble">
                    <Text style={{color: 'red', fontSize: 10}}>
                      Sorry! Fill The Form
                    </Text>
                  </Animatable.Text>
                </View>
              ) : null}
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={event => {
                  setOpen(false);
                  setDateTime(event);
                  console.log(dateTime);
                }}
                onDateChange={t => {
                  console.log(t);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <Picker
                value={selectedValue}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  // console.log("picker item===>",itemValue)
                  setSelectedValue(itemValue)
                }
                style={{
                  borderRadius: 80,
                  // marginTop: Platform.OS == 'android' ? 20 : null,
                  // marginBottom: Platform.OS == 'android' ? 30 : null,
                }}
                // style={Styles.input}
                style={{marginTop:Platform.OS == 'ios' ? -10 : 10}}>
                <Picker.Item label="Pending" value="Pending" />
                <Picker.Item label="Complete" value="completed" />
              </Picker>
              {/* <Picker
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
              </Picker> */}
              {/* {err ? (
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
              ) : null} */}
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
              {button ? (
                <Btn
                  btn={true}
                  Name="Update"
                  style={styles.btn}
                  onPress={editTask}
                />
              ) : (
                <Btn
                  btn={true}
                  Name="Add List"
                  style={styles.btn}
                  onPress={Addlist}
                />
              )}
            </View>
          </View>
          {/* </ScrollView> */}
        </Modal>
        <Modal
          // onRequestClose={()=>{}}
          hardwareAccelerated={true}
          animationType="slide"
          transparent={true}
          visible={modalDelet}
          onRequestClose={() => {
            setModalDelet(false);
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
                width:Platform.OS == "ios" ? '70%' : "80%",
                height: 100,
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 10,
              }}>
              <View style={{height: 50, justifyContent: 'center'}}>
                <Text style={{color: '#01ac8f', fontWeight: 'bold'}}>
                  Are Your Sure Delete This One Task !
                </Text>
              </View>
              <View style={{justifyContent: 'flex-end', height: 30}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity
                    onPress={deleteBtn}
                    style={{
                      backgroundColor: '#01ac8f',
                      width: 80,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text style={{color: '#fff'}}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalDelet(false);
                    }}
                    style={{
                      backgroundColor: '#01ac8f',
                      width: 80,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text style={{color: '#fff'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          // onRequestClose={()=>{}}
          hardwareAccelerated={true}
          animationType="slide"
          transparent={true}
          visible={filferModal}
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
                value={fModal}
                selectedValue={fModal}
                onValueChange={(itemValue, itemIndex) =>
                  // console.log("picker item===>",itemValue)
                  setFModal(itemValue)
                }
                style={{
                  width: Platform.OS == 'ios' ? 200 : 230,
                  marginBottom: Platform.OS == 'ios' ? null : 20,
                  marginTop: -20,
                  // backgroundColor:"red"
                  // borderRadius: 80,
                  // width: 70,
                  // marginTop: Platform.OS == 'android' ? 20 : null,
                  // marginBottom: Platform.OS == 'android' ? 30 : null,
                }}
                // style={Styles.input}
              >
                <Picker.Item label="Pending" value="Pending" />
                {/* <Picker.Item label="Select Any Option" value="" /> */}
                <Picker.Item label="Complete" value="Completed" />
              </Picker>
              {err ? (
                <View style={{marginTop: -30, marginBottom: 10}}>
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
const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    // borderWidth:1,
    // borderColor:"silver",
    // justifyContent:"center",
    backgroundColor: '#01ac8f',
  },
  btn: {
    width: '60%',
    height: 40,
    backgroundColor: '#01d07a',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop:Platform.OS == 'ios' ? -30: 15,
    // marginTop:Platform.OS == "android" ? 60 : null,
    // marginBottom: Platform.OS == 'android' ? 65 : 70,
    // marginTop:30,
  },
  boder: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderColor: 'silver',
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
  input: {
    marginTop: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 15,
    height: 40,
    paddingLeft: 10,
    // alignItems:"center",
    justifyContent: 'center',
    // backgroundColor:"red"
    // paddingLeft: 50,
    // marginBottom:20,
  },
});
const mapStateToProps = state => {
  return {
    token: state.Reducers.Token,
  };
};
const mapDispatchToProps = {
  RemoveToken,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
