var prev = {};
var map = null;

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escape(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}

function doPoll() {
    if( $('#unitsmap').length == 0 )
        return;

    var units_url = "https://api.pwnagotchi.ai/api/v1/units";
    console.log("polling " + units_url);
    $.getJSON(units_url, function (data) {
        // console.log(data);
        $('#unitslist').html('');
        for(var i = 0; i < 25; i++ ) {
            var unit = data.units[i];
            var html = "<li>" +
                    "<a href='/pwnfile/#" + unit.fingerprint + "' target='_blank'>" +
                        escape(unit.name) + "</a>" +
                     " was active " + $.timeago(unit.updated_at) + " from " + countries[unit.country] +
                (unit.networks ? (" <strong>(pwned " + unit.networks + " networks so far)</strong>") : "" )+
                    "</li>";



            $(html).appendTo('#unitslist');
        }
    });

    var country_url = "https://api.pwnagotchi.ai/api/v1/units/by_country";
    console.log("polling " + country_url);
    $.getJSON(country_url, function (data) {
        // console.log(data);
        var byCountry = {};
        var total = 0;
        var countries = data.length;

        for (var i = 0; i < data.length; i++) {
            var group = data[i];
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

        document.title = total + ' Pwnagotchis'

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