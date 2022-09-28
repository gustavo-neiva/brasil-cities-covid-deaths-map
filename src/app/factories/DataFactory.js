import TotalCovidCasesByState from '../domain/TotalCovidCasesByState';
import CovidCasesByCity from '../domain/CovidCasesByCity';
import CovidCasesData from '../domain/CovidCasesData';
import * as d3 from 'd3';

export default class DataFactory {

  createTotalByStateFromCSV(csv) {
    const dataObjects = d3.csvParse(csv);
    const covidData = dataObjects.map((params) => {
      let covidDatum = new TotalCovidCasesByState(params);
      return covidDatum
    });
    const covidCases = new CovidCasesData(covidData);
    return covidCases
  }

  createTotalByCityFromCSV(csv) {
    const dataObjects = d3.csvParse(csv);
    const covidData = dataObjects.map((params) => {
      let covidDatum = new CovidCasesByCity(params);
      return covidDatum
    });
    const covidCases = new CovidCasesData(covidData);
    return covidCases
  }

}