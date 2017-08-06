const uuidv4 = require('uuid/v4');
var fs = require('fs');

var eventTools = require('./eventTools');

function createLane(header, topValue) {
    return {
        "id":header.id,
        "title":header.title,
        "color":header.color,
        "top":topValue
    } 
};

function createResult(lanes, events) {
    return [
        {
            "id" : "history",
            "title" : "Hisotry of the western World in the 20st century",
            "description" : "Hisotry of the western World in the 20st century",
            
            "focus_date":"1950",
		    "initial_zoom":"47",
            
            "lanes" : lanes,
            
            "events" : events
        }
    ];
}

function readData(file, topValue) {
    var inputData=require(file);

    var lane=createLane(inputData.header, topValue);

    var stringCompare = function(s1,s2) {
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        return 0;
    }
    // TODO: sort by start date to adjust colors
    var events=inputData.events
        .sort(function(a,b){return stringCompare(a.startDate, b.startDate)})
        .map(function(event, index) { return eventTools.mapEvent(event, index, inputData.header, lane.id)});

    return {
        "lane" : lane,
        "events" : events
    }
}

var lanes = [];
var events = [];
var topValue = 100;

index = require("../data/index.json")
index.sources.forEach(function(element) {
    console.log("processing " + element);
    data = readData("../data/" + element + ".json", topValue)
    lanes.push(data.lane);
    events = events.concat(data.events);
    topValue += 50;
}, this);

result = createResult(lanes, events);

var outFile="../viewer/json/lanes.json";
fs.writeFile(outFile, JSON.stringify(result, null, 4), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The data written to: " + outFile);
}); 
