import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Platform,
} from 'react-native';
import InputText from './InputText';
import Btn from './Btn';
// import img from './Img/imagge.png';
import {connect, useDispatch} from 'react-redux';
import {addToken} from './Redux/Action/';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

const SignIn = ({...props}) => {
  // console.log("Token <==========================================" , props.token);
  const [show, setShow] = useState(true);
  // SignIn Input
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPass, setSignInPass] = useState('');
  //SignUp Input
  const [signUserName, setSignUserName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPass, setSignUpPass] = useState('');

  const [error, setError] = useState(false);
  const [errorNet, setErrorNet] = useState(false);
  const [errorNetUp, setErrorNetUp] = useState(false);
  const [errorFill, setErrorFill] = useState(false);

  //   function funcerror(e){
  // if (e == "Error: Request failed with status code 404") {
  //   alert("Please check your email or passowrd")

  // }
  //   }
  // const [Data , setData]  = useState('')
  const [loader, setLoader] = useState(false);
  const [loaderTwo, setLoaderTwo] = useState(false);
  // const dispatch = useDispatch();
  // console.log(Data);
  //const SignInSubmie = () => {
  // if (signInEmail === '' || signInPass === '') {
  //   alert('fill the Input');
  // } else if (signInEmail ===  || signInPass === data) {
  //   alert('Ok Hai  Sir');
  //   setSignInEmail('');
  //   setSignInPass('');
  // } else {
  //   alert('Sorry ! Check Email & Password');
  // }
  const [showI, setShowI] = useState(true);

  //}
  // useEffect(() => {
  //   console.log('ReduxData====>', props.user);
  // }, [props]);
  const SignInSubmit = async () => {
    // console.log("=======<>" , signInPass);
    if (signInEmail === '' || signInPass === '') {
      // alert('Sorry ! Fill The Input ');
      setErrorFill(true);
      // setInterval(() => {
      //   setErrorFill(false);
      // }, 3000);
    } else {
      setLoader(true);
      let formData = new FormData();
      // formData.append('email', signInEmail);
      // formData.append('password', signInPass);
      try {
        const {data, status} = await axios.post(
          'http://todotask.hnhcrm.xyz/api/login',
          {
            email: signInEmail,
            password: signInPass,
          },
        );
        console.log(data)
        console.log(status)
        setLoader(false);
        // console.log("Data , Status" , data.data.name, status);
        // console.log("Data , Status" , data.message, status );
        // alert(data.message)
        // console.log("Data , Status" , data.data.token, status);
        props.addToken(data.data.token);
        setSignInEmail('')
        setSignInPass('');
      } catch (e) {
        console.log(e);
        // setLoader(true);
        if (e == 'Error: Request failed with status code 404') {
          setLoader(false);
          // alert('Please check your email & passowrd');
          setError(true);
          // setInterval(() => {
          //   setError(false);
          // }, 3000);
        } else if (e == 'Error: Network Error') {
          setLoader(false);
          // alert('Sorry! Please Check Your Internet')
          setErrorNet(true);
          setTimeout(() => {
            setErrorNet(false);
          }, 2000);
          // setInterval(() => {
          //   setErrorNet(false);
          // }, 3000);
        }

        // funcerror(e);
      }
    }
  };

  //     axios.get('http://todotask.hnhcrm.xyz/api/login' , formData , {
  //         headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //           then((res) => {
  //               console.log(res);
  //             })
  // });

  const SignUpSubmit = async () => {
    let user = {
      signUserName,
      signUpEmail,
      signUpPass,
    };
    if (signUserName === '' || signUpEmail === '' || signUpPass === '') {
      // alert('Sorry ! Fill The Imput');
      setErrorFill(true);
      setTimeout(() => {
        setErrorFill(false);
      }, 3000);
    } else {
      setLoaderTwo(true);
      let formData = new FormData();
      formData.append('name', signUserName);
      formData.append('email', signUpEmail);
      formData.append('password', signUpPass);
      console.log(formData);
      try {
        // const {data, status} = await axios({
        //   url: 'http://todotask.hnhcrm.xyz/api/register',
        //   method: "POST",
        //   data: formData,
        // });
        const {data, status} = await axios.post(
          'http://todotask.hnhcrm.xyz/api/register',
          {
            name: signUserName,
            email: signUpEmail,
            password: signUpPass,
          },
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              // "Accept": "application/json"
            },
          },
        );
        setLoaderTwo(false);
        console.log('====>', data.data.token);
        props.addToken(data.data.token);
      } catch (e) {
        // console.log(error.response);
        setLoaderTwo(false);
        // alert(e)
        if (e == 'Error: Network Error') {
          setLoaderTwo(false);
          setErrorNet(true);
          setTimeout(() => {
            setErrorNetUp(false);
          }, 2000);
        }
      }
    }
    // setSignUserName('');
    // setSignUpEmail('');
    // setSignUpPass('');

    // console.log(user);
  };
  return (
    <View style={{flex: 1}}>
      {show ? (
        <ImageBackground
          source={require('./Img/imagge.png')}
          style={Style.mainView}>
            {/* <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:"center"}}> */}
          {loader ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color={'#04d07b'} />
            </View>
          ) : null}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Text style={{fontSize: 50, color: '#04d07b' , fontFamily:"serif"}}>Todo App</Text>
          </View>
          <InputText
            onPressIn={() => {
              setErrorFill(false);
              setError(false);
            }}
            placeholderTextColor={'grey'}
            value={signInEmail}
            placeholder="Email"
            style={Style.input}
            onChange={e => {
              setSignInEmail(e.nativeEvent.text);
            }}
          />
          <View style={{flexDirection:"row" , width: '100%', justifyContent:"space-between"  , alignItems:"center" , borderWidth:1 , borderRadius: 10, marginBottom:15 , height:50}}>
          <InputText
            onPressIn={() => {
              setErrorFill(false);
              setError(false);
            }}
            placeholderTextColor={'grey'}
            value={signInPass}
            secureTextEntry={showI?true:false}
            placeholder="Password"
            style={{paddingLeft:40 , width:Platform.OS == 'ios' ? 290 : 200 , height:50 , }}
            // style={Style.input}
            onChange={e => {
              setSignInPass(e.nativeEvent.text);
            }}
          />
          {showI? <Ionicons name='eye-off-outline' style={{marginRight:10}} size={25} onPress={()=>setShowI(false)} />: <Ionicons name='eye-outline' style={{marginRight:10}} size={25} onPress={()=>setShowI(true)}/>}
          </View>
          {error ? (
            <View
              style={{alignItems: 'center', marginTop: -10, marginBottom: 5}}>
              <Animatable.Text animation="wobble">
                <Text
                  style={{
                    color: 'red',
                    fontSize: 10,
                    textAlign: 'center',
                  }}>
                  Please check your email & passowrd
                </Text>
              </Animatable.Text>
            </View>
          ) : null}
          {errorNet ? (
            <View
              style={{alignItems: 'center', marginTop: -10, marginBottom: 5}}>
              <Animatable.Text animation="wobble">
                <Text
                  style={{
                    color: 'red',
                    fontSize: 10,
                    marginTop: -10,
                    textAlign: 'center',
                    marginBottom: 5,
                  }}>
                  Sorry! Please Check Your Internet
                </Text>
              </Animatable.Text>
            </View>
          ) : null}
          {errorFill ? (
            <View
              style={{alignItems: 'center', marginTop: -10, marginBottom: 5}}>
              <Animatable.Text animation="wobble">
                <Text
                  style={{
                    color: 'red',
                    fontSize: 10,
                    marginTop: -10,
                    textAlign: 'center',
                    marginBottom: 5,
                  }}>
                  Sorry ! Fill The Input
                </Text>
              </Animatable.Text>
            </View>
          ) : null}
          <TouchableOpacity style={{paddingLeft:10 , marginBottom:10 , width:170}}>
            <Text style={{color:"grey" , fontWeight:"bold" , fontFamily:"serif"}}>Forgot Password !</Text>
          </TouchableOpacity>
          <Btn
            btn={true}
            style={Style.btn}
            Name="Log In"
            onPress={SignInSubmit}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 25,
            }}
            onPress={() => {
              setShow(false);
            }}>
            <Text style={{fontSize: 20, color: '#ffff' , fontFamily:"serif"}}>Create Account</Text>
          </TouchableOpacity>
          {/* </ScrollView> */}
        </ImageBackground>
      ) : (
        <ImageBackground
          source={require('./Img/imagge.png')}
          style={Style.mainView}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Text style={{fontSize: 50, color: '#04d07b' , fontFamily:"serif"}}>Todo App</Text>
          </View>
          {loaderTwo ? (
            <ActivityIndicator size="large" color={'#04d07b'} />
          ) : null}
          <InputText
            placeholderTextColor={'grey'}
            placeholder="User Name"
            value={signUserName}
            style={Style.input}
            onChange={e => {
              setSignUserName(e.nativeEvent.text);
            }}
          />
          <InputText
            placeholderTextColor={'grey'}
            placeholder="Email"
            secureTextEntry={false}
            value={signUpEmail}
            style={Style.input}
            onChange={e => {
              setSignUpEmail(e.nativeEvent.text);
            }}
          />
           <View style={{flexDirection:"row" , width: '100%', justifyContent:"space-between"  , alignItems:"center" , borderWidth:1 , borderRadius: 10, marginBottom:15 , height:50}}>
          <InputText
            onPressIn={() => {
              setErrorFill(false);
              setError(false);
            }}
            placeholderTextColor={'grey'}
            value={signUpPass}
            secureTextEntry={showI?true:false}
            placeholder="Password"
            style={{paddingLeft:40 , width:Platform.OS == 'ios' ? 290 : 200, height:50 , }}
            // style={Style.input}
            onChange={e => {
              setSignUpPass(e.nativeEvent.text);
            }}
          />
          {showI? <Ionicons name='eye-off-outline' style={{marginRight:10}} size={25} onPress={()=>setShowI(false)} />: <Ionicons name='eye-outline' style={{marginRight:10}} size={25} onPress={()=>setShowI(true)}/>}
          </View>
          {/* <InputText
            placeholderTextColor={'grey'}
            secureTextEntry={true}
            value={signUpPass}
            placeholder="Passwor"
            style={Style.input}
            onChange={e => {
              setSignUpPass(e.nativeEvent.text);
            }}
          /> */}
          {errorFill ? (
            <View style={{alignItems: 'center', marginTop: -10, marginBottom: 5}}>
              <Animatable.Text animation="wobble">
              <Text
                style={{
                  color: 'red',
                  fontSize: 10,
                  marginTop: -10,
                  textAlign: 'center',
                  marginBottom: 5,
                }}>
                Sorry ! Fill The Input
              </Text>
              </Animatable.Text>
            </View>
          ) : null}
          {errorNetUp ? (
            <View style={{alignItems: 'center', marginTop: -10, marginBottom: 5}}>
              <Animatable.Text animation="wobble">
              <Text
                style={{
                  color: 'red',
                  fontSize: 10,
                  marginTop: -10,
                  textAlign: 'center',
                  marginBottom: 5,
                }}>
                Sorry! Please Check Your Internet
              </Text>
              </Animatable.Text>
            </View>
          ) : null}
          <Btn
            btn={true}
            style={Style.btn}
            Name="SignUp"
            onPress={SignUpSubmit}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 25,
            }}
            onPress={() => setShow(true)}>
            <Text style={{fontSize: 20, color: '#ffff' , fontFamily:"serif"}}>Log In</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </View>
  );
};
const Style = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 10,
    // height:"100%"
    justifyContent: 'center',

    // backgroundColor: '#00bcd4',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 10,
    marginBottom: 15,
    height: 50,
    paddingLeft: 40,
    // backgroundColor:"#fff",
    // backgroundColor:"#f0f0f0"
  },
  btn: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    width: '50%',
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
// export default SignIn

const mapostateToProps = state => {
  return {
    user: state.Reducers.Token,
  };
};
const mapDispatchToProps = {
  addToken,
};
export default connect(mapostateToProps, mapDispatchToProps)(SignIn);
