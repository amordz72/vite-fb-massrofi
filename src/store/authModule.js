export const authModule = {
   state: {
      user: null
   },
   mutations: {
      fill_user(state, acount) {
         state.user = acount.user;

      }
   },

   actions: {
      set_user(context, acount) {
         context.commit('fill_user', acount);
      }
   },
   getters: {}
};
