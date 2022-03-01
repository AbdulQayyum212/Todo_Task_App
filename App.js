import React, {useEffect, useState} from 'react';
import MainScreen from './src/mainScreen'; 
import {Provider} from 'react-redux';
// import Store from './src/Redux/Store/Store';
import {NavigationContainer} from '@react-navigation/native';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './src/Redux/Reducer';
import { View , Image} from 'react-native';
import OneSignal from 'react-native-onesignal';

//OneSignal Init Code
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId("84831d86-0a92-45ab-aae7-119e1e0a471c");
//END OneSignal Init Code

//Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log("Prompt response:", response);
});

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
});



// import Home from './src/Home';

const config = {
  key: 'root',
  storage: AsyncStorage,
};
const PersistReducer = persistReducer(config, rootReducer);
const store = createStore(PersistReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
const App = () => {
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
        <NavigationContainer>
          {/* <Text>hello</Text> */}
          <MainScreen />
          {/* <Home /> */}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
