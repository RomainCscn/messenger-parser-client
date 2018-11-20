import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    allLinks: [],
    searchedLinks: [],
    searched: false,
  },
  mutations: {
    setAllLinks(state, links) {
      state.allLinks = links;
    },
    setSearchedLinks(state, links) {
      state.searchedLinks = links;
    },
    setSearched(state, searched) {
      state.searched = searched;
    },
  },
});

export default store;
