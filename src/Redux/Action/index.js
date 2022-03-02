export const addToken = data => {
  return async dispatch => {
    dispatch({type: 'ADD_TOKEN', payload: data});
  };
};
export const RemoveToken = data =>{
  return async dispatch =>{
    dispatch({type : "Remove_Token" , payload:data})
  }
};
// export const notificToken = data =>{
//   return async dispatch =>{
//     dispatch({type : "Notification_Token" , payload:data})
//   }
// };
