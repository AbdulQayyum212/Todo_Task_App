import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFcmToken();
  }
}

const GetFcmToken = async () =>{
    // console.log(Hello);
    let get = await AsyncStorage.getItem("LoginToken");
     console.log(get , "<====");
    if(get){
      try{
        const NewToken = await messaging().getToken();
        console.log("nEW Token ====>" , NewToken);
        if(NewToken){
            console.log("New Token ====>" , NewToken);
            await AsyncStorage.setItem("LoginToken" , NewToken )
        }
      }catch(e){
          console.log("Error ===============>" , e);
      }
    }
}

// export const notificationIn = async () =>{
//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//           'Notification caused app to open from background state:',  remoteMessage.notification,);
//       });

//       messaging().onMessage(async  remoteMessage =>{
//           console.log("Recived In Foreground" , remoteMessage);
//       })

//       messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           console.log(
//             'Notification caused app to open from quit state:',
//             remoteMessage.notification,
//           );
//         }
//       });
// } 