var fs = require('fs');
var csv = require('csv');
var async = require('async');
var angel = require('angellist');
var json2csv = require('json2csv');

// Set this to your AngelList params for your registered application
var clientID = 'https://api.angel.co/1';
var clientSecret = '436c4e00aa39c52f0c04e68a5373d407';

angel.init(clientID, clientSecret);


var functionsToRunAsync = [];


var fields = [
    'name'
    ,'email'
    , 'product_desc'
    , 'high_concept'
    , 'location'
    ,'market1'
    ,'market2'
    ,'market3'
];


var data = [];
var pages = [];

var tagID = '1695'; 
var pageCount = 0;
var startupCount = 0;

for (var page = 1; page <= 21; page++) {
    pages.push(page);
    functionsToRunAsync.push(function (callback) {
        var page = pages[pageCount];
        angel.searchByStartupTag(tagID, page, function (error, results) {
            if (!error) {
                var startups = results.startups;
                for (var i = 0; i < startups.length; i++) {
                    location = '';
                     var markets = [];
                     
                    if(startups[i].locations) {
                        location = startups[i].locations[0].display_name;
                    }
                    if(startups[i].name) {
                       
                    
                         for (var j = 0; j < startups[i].markets.length; ++j) {
                            markets.push(startups[i].markets[j].display_name);
}
                        

   
                        var startup = {
                            'name': startups[i].name
                            
                            , 'product_desc': startups[i].product_desc
                            , 'high_concept': startups[i].high_concept
                            ,'email':startups[i].company_url
                            , 'location': location
                            ,'market1':markets[0]
                            ,'market2':markets[1]
                            ,'market3':markets[2]
                        };
                        startupCount++;
                        data.push(startup);
                    }
                }
                callback();
            } else {
                console.log(error);
                callback();
            }
        });
        pageCount++;
    });
}

async.parallel(
    functionsToRunAsync,
    function (err, results) {
        json2csv({data: data, fields: fields}, function (err, csv) {
            if (err) console.log(err);
            fs.writeFile('u2Startups.csv', csv, function (err) {
                if (err) throw err;
                console.log('File saved. There were ' + startupCount + ' records.');
            });
        });
    }
);