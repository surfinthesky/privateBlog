//import { getToken, setToken, removeToken } from '@/utils/auth'

const notes = {
  state: {
    theme: "default-theme",
  },

  mutations: {
    SET_THEME: (state, payload) => {
      state.theme = payload;
    },
  },
};

export default notes;
