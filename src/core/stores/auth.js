import Vue from "vue";
export const SET_TOKEN = "SET_TOKEN";
export const CLEAR_TOKEN = "CLEAR_TOKEN";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER";

const state = {
  token: localStorage.getItem('token'),
  currentUser: null
};

const mutations = {
  [SET_TOKEN](state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  [CLEAR_TOKEN](state) {
    state.token = null;
    localStorage.setItem("token", "");
  },
  [SET_CURRENT_USER](state, user) {
    state.currentUser = user;
  },
  [CLEAR_CURRENT_USER](state, _user) {
    state.currentUser = null;
  }

};

const getters = {
  userLoggedIn(state) {
    return !!state.token;
  },
  currentUser(state) {
    return state.currentUser;
  },
  currentWorkspaceId(state) {
    return state.currentUser && state.currentUser.workspaces[0].id
  }
};

const actions = {
  login({commit, _state}, token) {
    commit(SET_TOKEN, token);
  },
  logout({commit, _state}, _token) {
    commit(CLEAR_TOKEN);
    commit(CLEAR_CURRENT_USER);
  },
  async fetchCurrentUser({commit, _state}) {
    const userResp = await Vue.axios.get("/users/me")
    const user = userResp.data;
    commit(SET_CURRENT_USER, user);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

