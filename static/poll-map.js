var prev = {};
var map = null;

function doPoll() {
    if( $('#unitsmap').length == 0 )
        return;

    const url = "https://api.pwnagotchi.ai/api/v1/units/by_country";
    console.log("polling " + url);
    $.getJSON(url, function (data) {
        // console.log(data);
        let byCountry = {};
        let total = 0;
        let countries = data.length;

        for (let i = 0; i < data.length; i++) {
            const group = data[i];
            byCountry[group.country] = {units: group.units};

            total += group.units;

            if( !prev[group.country] || prev[group.country].units !== group.units) {
                console.log(group.units + " units in " + group.country);
            }
        }

        data = {
            data: {
                units: {
                    name: 'Active Units',
                    format: '{0}',
                    thresholdMax: 100000,
                    thresholdMin: 0
                }
            },
            applyData: 'units',
            values: byCountry
        };

        $('#unitstotal').html(total);
        $('#unitscountries').html(countries);
        $('#unitsmap').html('');


        map = new svgMap({
            targetElementID: 'unitsmap',
            data: data
        });

        prev = byCountry;
        setTimeout(doPoll, 5000);
    });
}

$(function () {
    doPoll();
});