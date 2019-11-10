$(function () {
    var elem = $('#moodcloud');
    if( elem.length == 0 )
        return;

    $.getJSON("https://joe.pwnagotchi.ai/api/v1/query/moodcloud.json", function (data) {
        var words = [];

        for( var i = 0; i < data.num_records; i++ ) {
            var record = data.records[i];
            if( record.tot > 1 ) {
                words.push({text:record.face, weight:record.tot});
            }
        }
        // console.log(data);

        elem.jQCloud(words,{
            autoResize: true,

        });
    });
});