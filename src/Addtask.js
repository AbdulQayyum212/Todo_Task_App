import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import img from './Img/gren.jpeg';
import {Picker} from '@react-native-picker/picker';
import InputText from './InputText';
import DatePicker from 'react-native-date-picker';
import Btn from './Btn';
import Header from './Header';
import {connect} from 'react-redux';
import moment  from 'moment';


const AddTask = ({navigation, ...props}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [open, setOpen] = useState(false);
  const [date] = useState(new Date());
  const [dateTime, setDateTime] = useState("");
  const [title, setTittle] = useState('');
  const [workText, setWorkText] = useState('');
  const [category, setCategory] = useState('');
  const [alert, setAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const axios = require('axios');
  // const token = useSelector(state => state.Reducers.Token);
 console.log( "Date" , dateTime);
  const Addlist = async () => {
    // console.log('Tokrn ===>', ...props.token);
    if (title === '' || workText === '' || category === '' || dateTime === "" || setSelectedValue === "") {
      // alert('Sorry! Fill The Form');
      setAlert(true);
      setInterval(() => {
        setAlert(false);
      }, 3000);
    } else {
      setLoader(true);
      // let formData = new FormData();
      // formData.append('title', title);
      // formData.append('workText', workText);
      // formData.append('selectedValue', selectedValue);
      // formData.append('dateTime', dateTime);
      try {
        // console.log(title, workText, category, selectedValue, dateTime);
        const {data, status} = await axios.post(
          'http://todotask.hnhcrm.xyz/api/task',
          {
            // name: [title, workText, category, selectedValue, dateTime],
            Category: title,
            work: workText,
            currentDate: category,
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
      } catch (e) {
        // console.log("catch");
        console.log('list', e);
      }
      setSelectedValue('');
      setTittle('');
      setWorkText('');
      setCategory('');
      setCategory('');
      setDateTime("")
      setLoader(false);
      navigation.goBack();
    }
  };

  return (
    // <SafeAreaView>
      // <View> 
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ImageBackground
                resizeMode="cover"
                // height={"200%"}
                source={require('./Img/green.jpeg')}
                style={{ flex:1 }}
                >
                <Header
                  IconLift={true}
                  TextCenter={true}
                  style={Styles.header}
                  Name="Add Task"
                  returnKeyType="next"
                  onPress={() => navigation.goBack()}
                  />
                  <ScrollView showsVerticalScrollIndicator={false}>
                {loader ? (
                  <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}>
                    <ActivityIndicator
                      size="large"
                      color={'#04d07b'}
                      style={{flex: 1}}
                      />
                  </View>
                ) : null}
                <View style={{marginTop: 60, padding: 30}}>
                  <InputText
                    value={title}
                    placeholder="Title"
                    style={Styles.input}
                    onChange={e => {
                      setTittle(e.nativeEvent.text);
                    }}
                  />
                  <InputText
                    value={workText}
                    placeholder="Work"
                    style={Styles.input}
                    maxLength={17}
                    onChange={e => {
                      setWorkText(e.nativeEvent.text);
                    }}
                  />
                  <InputText
                    value={category}
                    placeholder="Create new Category"
                    maxLength={8}
                    style={Styles.input}
                    onChange={e => {
                      setCategory(e.nativeEvent.text);
                    }}
                  />
                  <TouchableOpacity
                    style={Styles.input}
                    onPress={() => setOpen(true)}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        height: 50,
                      }}>
                      { dateTime == "" ? <Text style={{color: 'silver'}}> Date</Text> :  <Text style={{color: 'black'}}>{moment(dateTime).format('MMMM Do YYYY, h:mm:ss a')}</Text> }
                    </View>
                    {alert ? (
                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          marginLeft: -25,
                        }}>
                        <Animatable.Text animation="wobble">
                          <Text style={{color: 'red', fontSize: 10}}>
                            Sorry! Fill The Form
                          </Text>
                        </Animatable.Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                  <Picker
                    value={selectedValue}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) =>
                      // console.log("picker item===>",itemValue)
                      setSelectedValue(itemValue)
                    }
                    style={{
                      borderRadius: 80,
                      marginTop: Platform.OS == 'android' ? 20 : null,
                      marginBottom: Platform.OS == 'android' ? 30 : null,
                    }}
                    // style={Styles.input}
                  >
                    <Picker.Item label="Status" value="js" />
                    <Picker.Item label="Complete" value="completed" />
                    <Picker.Item label="Pending" value="Pending" />
                  </Picker>
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
                  <Btn
                    btn={true}
                    Name="Add List"
                    style={Styles.btn}
                    onPress={Addlist}
                  />
                </View>
          </ScrollView>
              </ImageBackground>
            </TouchableWithoutFeedback>
      // </View> 
    // </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  input: {
    marginTop: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    marginBottom: 15,
    height: 50,
    paddingLeft: 50,
    // marginBottom:20,
  },
  btn: {
    width: '60%',
    height: 40,
    backgroundColor: '#01d07a',
    justifyContent: 'center',
    borderRadius: 30,
    // marginTop:Platform.OS == "android" ? 60 : null,
    // marginBottom: Platform.OS == 'android' ? 65 : 70,
    // marginTop:30,
  },
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
});
const mapStateToProps = state => {
  return {
    token: state.Reducers.Token,
  };
};
export default connect(mapStateToProps)(AddTask);
// export default AddTask;
