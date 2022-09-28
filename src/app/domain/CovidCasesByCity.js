export default class CovidCasesByCity {
  constructor({
    country,
    state,
    city,
    ibgeID,
    cod_RegiaoDeSaude,
    name_RegiaoDeSaude,
    deaths,
    totalCases,
    deaths_per_100k_inhabitants,
    totalCases_per_100k_inhabitants,
    deaths_by_totalCases,
    _source,
    date,
    newCases,
    newDeaths,
    last_info_date,
  }) {
      this._country 												= country,
      this._state 													= state,
      this._city 											      = city,
      this._ibgeID										      = ibgeID,
      this._cod_RegiaoDeSaude								= cod_RegiaoDeSaude,
      this._name_RegiaoDeSaude 							= name_RegiaoDeSaude,
      this._deaths												  = deaths,
      this._totalCases 											= totalCases,
      this._deaths_per_100k_inhabitants     = deaths_per_100k_inhabitants,
      this._totalCases_per_100k_inhabitants = totalCases_per_100k_inhabitants,
      this._deaths_by_totalCases 						= deaths_by_totalCases,
      this._source											    = _source,
      this._last_info_date									= last_info_date,
      this._date 														= date,
      this._newCases 												= newCases,
      this._newDeath 												= newDeaths
  }

  get country() { return this._country}
  get state() { return this._state}
  get city() { return this._city}
  get ibgeID() { return this._ibgeID}
  get codRegiaoDeSaude() { return this._cod_RegiaoDeSaude}
  get nameRegiaoDeSaude() { return this._name_RegiaoDeSaude}
  get deaths() { return this._deaths}
  get totalCases() { return this._totalCases}
  get deathsPer100kInhabitants() { return this._deaths_per_100k_inhabitants}
  get totalCasesPer100kInhabitants() { return this._totalCases_per_100k_inhabitants}
  get deathsByTotalCases() { return this._deaths_by_totalCases}
  get source() { return this._source}
  get date() { return this._date}
  get newCases() { return this._newCases}
  get newDeaths() { return this._newDeaths}
  get lastInfoDate() { return this._last_info_date}

  deathsPerCapita() {
    return {
      ibgeID: this._ibgeID,
      name: this._city,
      deaths: this._deaths,
      death_per_100k: this._parseNumber(this._deaths_per_100k_inhabitants)
    }
  }

  tableHeaders() {
    const tableHeaders = [
      {
        label: 'UF',
        field: 'uf',
      },
      {
        label: 'Município',
        field: 'city',
      },
      {
        label: 'Casos',
        field: 'casos',
        type: 'number',
      },
      {
        label: 'Mortes',
        field: 'mortes',
        type: 'number',
      }
    ]
    return tableHeaders
  }

  tableColumns() {
    return {
      ibgeID: this._ibgeID,
      uf: this._state,
      city: this._city,
      casos: this._totalCases,
      mortes: this._deaths
    }
  }

  _parseNumber(number) {
    return parseFloat(number).toFixed(2)
  }

}