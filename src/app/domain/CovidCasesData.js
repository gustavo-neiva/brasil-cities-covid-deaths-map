export default class CovidCasesData {
  constructor(covidData = []) {
      this._covidData = covidData
  }

  buildChoroplethDataObject() {
      const choroplethData = this._covidData.map((covidDatum) => {
        return covidDatum.deathsPerCapita();
      });
      return choroplethData;
  }

  buildTableDataHeaders() {
    return this._covidData[0].tableHeaders()
  }

  buildTableData() {
    const tableColumns = this._covidData.map((covidDatum) => {
      return covidDatum.tableColumns();
    });
    return tableColumns;
  }
}