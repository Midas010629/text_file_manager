import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default createStore({
  state: {
    data: [],
    flatData: [],
    childrenData: [],
    childActive: { data: null, id: null },

    navActive: null,
  },
  actions: {
    handInit({ commit }) {
      return fetch("./fileData.json")
        .then((response) => response.json())
        .then((res) => {
          commit("init", res.files);
          return res.files;
        });
    },
    handChildren({ commit }, data) {
      commit("addChildren", data);
    },
    handNavActive({ commit }, data) {
      commit("navActive", data);
    },
    handChildActive({ commit }, data) {
      commit("childActive", data);
    },
  },
  mutations: {
    init(state, payload) {
      state.data = payload;
    },
    addChildren(state, payload) {
      state.childrenData = payload;
    },
    navActive(state, payload) {
      state.navActive = payload;
    },
    childActive(state, payload) {
      const id = uuidv4();
      state.childActive.id = id;
      state.childActive.data = payload;
    },
  },
  getters: {
    data(state) {
      return state.data;
    },
    childrenData(state) {
      return state.childrenData;
    },
    navActive(state) {
      return state.navActive;
    },
    childActive(state) {
      return state.childActive;
    },
  },
});
