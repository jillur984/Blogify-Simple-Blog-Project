import { actions } from "../actions";

const initialState={
    user:null,
    posts:[],
    error:false,
    loading:false,
}

const ProfileReducer=(state,action)=>{
  switch(action.type){
     case actions.profile.DATA_FETCHING:{
        return{
            ...state,
            loading:true
        }
     }
     case actions.profile.DATA_FETCHED:{
        return{
            ...state,
            loading:false,
            user:action.data.user,
            posts:action.data.posts
        }
     }
     case actions.profile.DATA_FETCH_ERROR:{
        return{
            ...state,
            loading:false,
            error:action.error
        }
     }
     case actions.profile.USER_IMAGE_UPDATED: {
        return {
            ...state,
            loading: false,
            user: {
                ...state.user,
                avatar: action.data?.avatar || state.user?.avatar, // Fallback to the previous avatar if action.data.avatar is undefined
            },
        };
    }
     default:{
        return state
     }
  }
}
export{initialState,ProfileReducer}