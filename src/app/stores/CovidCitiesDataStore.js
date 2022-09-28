import AllCovidCases from '../repositories/AllCovidCases';

const allCovidCases = new AllCovidCases();

const CovidCitiesDataStore = {
  namespaced: true,
  state: {
    covidCasesData: []
  },
  getters: {
  },
  mutations: {
    setCovidCasesData(state, covidCityCasesData) {
      state.covidCasesData = covidCityCasesData;
    },
  },
  actions: {
    getCityData({commit}) {
      return allCovidCases.getCityData()
      .then(covidCityCasesData => {
        commit('setCovidCasesData', covidCityCasesData)
        return gifs
      })
      .catch(error => {
        throw error
      })
    }
  },
}
export default CovidCitiesDataStore