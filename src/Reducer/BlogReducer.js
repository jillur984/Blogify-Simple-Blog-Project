
import { actions } from "../actions"

const initialState={
    blogs:[],
    loading:false,
    error:null

}

const BlogReducer=(state,action)=>{
       switch(action.type){
        case actions.blogs.DATA_FETCHING:{
            return{
              ...state,
              loading:true,
              error:null
            }
        }
        case actions.blogs.DATA_FETCHED:{
            return{
              ...state,
              loading:false,
              // blogs:action.data,
              blogs: [...state.blogs, ...action.data],
              error:null
            }
        }
        case actions.blogs.POST_DATA_EDITED:{
          return{
            ...state,
            loading:false,
            // blogs:action.data,
            blogs: [...state.blogs, ...action.data],
            error:null
          }
      }
      case actions.blogs.POST_DATA_DELETED:{
        return{
          ...state,
          loading:false,
          blogs:state.blogs.filter((item)=>item.id!==action.data)
        }
    }

        
        case actions.blogs.DATA_FETCH_ERROR:{
            return{
              ...state,
              loading:false,
              error:action.error
            }
        }
        default: {
            return state;  
          }
    }


}
export{initialState,BlogReducer}