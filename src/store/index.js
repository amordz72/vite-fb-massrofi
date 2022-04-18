import { createStore } from "vuex"
 


const store = createStore(
   {

      state: {
         name: "Vue",
         user: null
      },
      mutations: {
         fill_user(state, acount) {
            state.user = acount.user;
   
         } ,
         remove_user(state) {
            state.user = null;
   
         } ,
      }
      ,actions:{
         set_user(context, acount) {
            context.commit('fill_user', acount);
         },
         destroy_user(context) {
            context.commit('remove_user');
         }
      }
      
      , modules: {
  
      }
   })


export default store