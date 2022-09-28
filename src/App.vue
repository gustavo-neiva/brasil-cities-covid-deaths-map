<template>
  <div id="app">
    <Map :covidCasesData="covidCityCasesCityData"/>
    <br>
  </div>
</template>

<script>
import Map from './components/Map.vue'
import AllCovidCases from "./app/repositories/AllCovidCases"

export default {
  name: 'App',
  components: {
    Map,
  },
  data() {
    return {
      covidCityCasesCityData: [],
      tableDataColumns: [],
      tableDataRows: [],
      paginationOptions: {
        enabled: true,
      },
      searchOptions: {
        enabled: true,
      },
    };
  },
  mounted() {
    const allCovidCases = new AllCovidCases();
    allCovidCases.getCityData()
    .then((covidCityCasesData) => {
      this.covidCityCasesCityData = covidCityCasesData.buildChoroplethDataObject();
      this.tableDataColumns = covidCityCasesData.buildTableDataHeaders()
      this.tableDataRows = covidCityCasesData.buildTableData();
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
