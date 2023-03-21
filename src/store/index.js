import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
export default createStore({
  state: {
    fetchData: [],
    childrenData: [],
    infoData: { data: null, isShow: false },
    navActive: null,
    searchData: { data: null, isShow: false },
  },
  actions: {
    handInit({ commit }) {
      return fetch("./fileData.json")
        .then((response) => response.json())
        .then((res) => {
          commit("init", res.files);
          commit("children", res.files);
          return res.files;
        });
    },
    handChildren({ commit }, data) {
      commit("children", data);
    },
    handNavActive({ commit }, data) {
      commit("navActive", data);
    },
    handInfoData({ commit }, data) {
      // const id = uuidv4();
      commit("infoData", data);
    },
    handSearchData({ commit }, data) {
      commit("searchData", data);
    },
  },
  mutations: {
    init(state, payload) {
      state.fetchData = payload;
    },
    children(state, payload) {
      state.childrenData = payload;
    },
    navActive(state, payload) {
      state.navActive = payload;
    },
    infoData(state, payload) {
      state.infoData.data = payload.data;
      state.infoData.isShow = payload.isShow;

      // state.infoData.id = payload[1];
    },
    searchData(state, payload) {
      state.searchData.data = payload.data;
      state.searchData.isShow = payload.isShow;
    },
  },
  getters: {
    fetchData(state) {
      return state.fetchData;
    },
    childrenData(state) {
      return state.childrenData;
    },
    navActive(state) {
      return state.navActive;
    },
    infoData(state) {
      return state.infoData;
    },
    searchData(state) {
      return state.searchData;
    },
  },
});
