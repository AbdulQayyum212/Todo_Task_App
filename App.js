import React, {useEffect, useState} from 'react';
import MainScreen from './src/mainScreen'; 
import {Provider} from 'react-redux';
// import Store from './src/Redux/Store/Store';
// import {NavigationContainer} from '@react-navigation/native';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './src/Redux/Reducer';
import { View , Image} from 'react-native';
import PushNotification from "react-native-push-notification";
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
// import notificToken from './src/Redux/Action/';

// import Home from './src/Home';

const config = {
  key: 'root',
  storage: AsyncStorage,
};
const PersistReducer = persistReducer(config, rootReducer);
const store = createStore(PersistReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
const App = ({...props}) => {
  const [notiToken , setNotiToken] = useState("")
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useEffect(()=>{
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log("TOKEN Firebase:", token);
        setNotiToken(token.token);
        // props.notificationToken(token)
      },
    
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
    
        // process the notification here
    
        // required on iOS only 
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: "226701611659",
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
    // props.notificToken(notiToken);
    // console.log("State =======>" , notiToken);
    //  return null
  },[])
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, []);
  const [splash, setSplash] = useState(true);
  // {splash ?  return <View></View> :null}
  if (splash) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#130A38',
          }}>
            <Image source={require("./src/Img/todo-icon.png")} style={{width:100 ,  marginTop:-100 , height:100 , marginBottom:30}}  />
          {/* <Text style={{fontSize:60 , color:"#01ac8f",  fontFamily:'Baskerville-SemiBoldItalic'}}>Todo App</Text> */}
        </View>
      </>
    );
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <NavigationContainer> */}
          {/* <Text>hello</Text> */}
          <MainScreen />
          {/* <Home /> */}
        {/* </NavigationContainer> */}
      </PersistGate>
    </Provider>
  );
};
export default App;
