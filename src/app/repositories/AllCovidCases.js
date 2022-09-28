import Axios from 'axios';
import DataFactory from '../factories/DataFactory';

const TOTAL_STATES_CSV_URL = "https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-total.csv";
const TOTAL_CITIES_CSV_URL = "https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-cities.csv";
export default class AllCovidCases {
  constructor() {
    this.urlStates = TOTAL_STATES_CSV_URL;
    this.urlCities = TOTAL_CITIES_CSV_URL;
    this.dataFactory = new DataFactory();
  }

  getStateData() {
    return Axios.get(this.urlStates)
    .then((data) => {
      const covidData = this.dataFactory.createTotalByStateFromCSV(data.data)
      return covidData
    });
  }

  getCityData() {
    return Axios.get(this.urlCities)
    .then((data) => {
      const covidData = this.dataFactory.createTotalByCityFromCSV(data.data)
      return covidData
    });
  }

}