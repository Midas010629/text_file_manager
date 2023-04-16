import { createStore } from "vuex";

export default createStore({
  state: {
    fetchData: [],
    infoData: { data: null, isShow: false },
    navActive: null,
    searchData: { data: [], isShow: false },
  },
  actions: {
    handInit({ commit }) {
      return fetch(process.env.BASE_URL + "fileData.json")
        .then((response) => response.json())
        .then((res) => {
          commit("init", res.files);
        });
    },

    handNavActive({ commit }, data) {
      commit("navActive", data);
    },
    handInfoData({ commit }, data) {
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
