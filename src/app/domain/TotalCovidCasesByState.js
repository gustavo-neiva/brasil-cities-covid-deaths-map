export default class TotalCovidCasesByState {
    constructor({
        country,
        state,
        totalCases,
        totalCasesMS,
        notConfirmedByMS,
        deaths,
        deathsMS,
        URL,
        deaths_per_100k_inhabitants,
        totalCases_per_100k_inhabitants,
        deaths_by_totalCases,
        recovered,
        suspects,
        tests,
        tests_per_100k_inhabitants,
        vaccinated,
        vaccinated_per_100k_inhabitants,
        date,
        newCases,
        newDeaths
    }) {
        this._country 												= country,
        this._state 													= state,
        this._totalCases 											= totalCases,
        this._totalCasesMS 										= totalCasesMS,
        this._notConfirmedByMS								= notConfirmedByMS,
        this._deaths 													= deaths,
        this._deathsMS 												= deathsMS,
        this._URL 														= URL,
        this._deaths_per_100k_inhabitants     = deaths_per_100k_inhabitants,
        this._totalCases_per_100k_inhabitants = totalCases_per_100k_inhabitants,
        this._deaths_by_totalCases 						= deaths_by_totalCases,
        this._recovered 											= recovered,
        this._suspects 												= suspects,
        this._tests 													= tests,
        this._tests_per_100k_inhabitants 			= tests_per_100k_inhabitants,
        this._vaccinated 											= vaccinated,
        this._vaccinated_per_100k_inhabitants = vaccinated_per_100k_inhabitants,
        this._date 														= date,
        this._newCases 												= newCases,
        this._newDeath 												= newDeaths
    }

    get country() { return this._country }
    get state() { return this._state }
    get totalCases() { return this._totalCases }
    get totalCasesMS() { return this._totalCasesMS }
    get notConfirmedByMS() { return this._notConfirmedByMS }
    get deaths() { return this._deaths }
    get deathsMS() { return this._deathsMS }
    get URL() { return this._URL }
    get deathsPer100kInhabitants() { return this._deaths_per_100k_inhabitants }
    get totalCasesPer100kInhabitants() { return this._totalCases_per_100k_inhabitants }
    get deathsByTotalCases() { return this._deaths_by_totalCases }
    get recovered() { return this._recovered }
    get suspects() { return this._suspects }
    get tests() { return this._tests }
    get testsPer100kInhabitants() { return this._tests_per_100k_inhabitants }
    get vaccinated() { return this._vaccinated }
    get vaccinatedPer100kInhabitants() { return this._vaccinated_per_100k_inhabitants }
    get date() { return this._date }
    get newCases() { return this._newCases }
		get newDeaths() { return this._newDeaths }

		deathsPerCapita() {
			return {
				state_name: this._state,
				death_per_100k: parseFloat(this._deaths_per_100k_inhabitants).toFixed(2)
			}
		}

}