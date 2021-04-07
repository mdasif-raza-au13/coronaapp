$('#select-country').submit(function(event){
    event.preventDefault();
    let from_country = $('#from-country').val();
    
    console.log('from country', from_country);

    $.ajax({
        type: 'GET',
        url: 'https://api.covid19api.com/summary',
        success: displayCoronaDetail
    });
})

function displayCoronaDetail(data, status) {

    let from_country = $('#from-country').val();
    console.log('global check',from_country)
    let countries = data.Countries;
    let details = $('#details');

    if(from_country == "Global"){
        details.empty().append(`<div><h3>Global</h3></div>
        <div><span>Toatal Confirmed: </span><b>${from_country.TotalConfirmed}</b></div><br>
        <div><span>Toatal Deceased: </span><b>${from_country.TotalDeaths}</b></div><br>
        <div><span>Toatal Recovered: </span><b>${from_country.TotalRecovered}</b></div><br>
        <div><span>New Confirmed: </span><b>${from_country.NewConfirmed}</b></div><br>
        <div><span>New Recovered: </span><b>${from_country.NewRecovered}</b></div>`)
    }else{
    countries.forEach(function(country){
        if(from_country == country.Country){
            details.empty().append(`<div><h3>${country.Country}</h3></div>
            <div><span>Toatal Confirmed: </span><b>${country.TotalConfirmed}</b></div><br>
            <div><span>Toatal Deceased: </span><b>${country.TotalDeaths}</b></div><br>
            <div><span>Toatal Recovered: </span><b>${country.TotalRecovered}</b></div><br>
            <div><span>New Confirmed: </span><b>${country.NewConfirmed}</b></div><br>
            <div><span>New Recovered: </span><b>${country.NewRecovered}</b></div>`)
        }
        // from_country.append(`<option value=${country}>${country}</option>`)
    })}
}

$(document).ready(function() {
    $.ajax({
        type:'GET',
        url: 'https://api.covid19api.com/summary',
        success: populateTheCurrencies
    });

})

function populateTheCurrencies(data, status) {
    console.log(data)
    
    let all_countries = data.Countries;
    
    console.log('all_rates',all_countries);
    
    let from_country = $('#from-country');
    
    all_countries.forEach(function(country) {
        from_country.append(`<option value=${country.Country}>${country.Country}</option>`)
    });
}