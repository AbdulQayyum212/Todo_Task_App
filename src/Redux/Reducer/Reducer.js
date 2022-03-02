const initial = {
  Token: null,
  loading:false,
  NotificationToken:null
};
// console.log("initial ====>" , initial);
export const Reducers = (state = initial, action) => {
  //   const data = action;
  // console.log('action token======>>>',action)
  // console.log("Init" , initial);
  switch(action.type){
    case "Remove_Token" :
      return{
        ...state,
        Token:action.payload,
      }
  };
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        Token:action.payload,
      };
      default:
        return state;
      };
      // switch(action.payload){
      //  case 'Notification_Token':
      //    return{
      //      ...state,
      //      NotificationToken:action.payload
      //    };
      //    default:
      //      return state;
      // };
    };
