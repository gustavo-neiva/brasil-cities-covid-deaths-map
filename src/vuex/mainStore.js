import Vue from 'vue';
import Vuex from 'vuex';

import CovidCitiesDataStore from '../app/stores/CovidCitiesDataStore';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
      CovidCitiesDataStore
    },
  });

export default store;