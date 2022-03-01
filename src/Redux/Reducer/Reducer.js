const initial = {
  Token: null,
  loading:false
};
// console.log("initial ====>" , initial);
export const Reducers = (state = initial, action) => {
//   const data = action;
  // console.log('action token======>>>',action)
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
      }
};
