const uuidv4 = require('uuid/v4');

module.exports.mapEvent = function(event, index, header, lane) {

    var result = {
		"id":            uuidv4(),
		"title":         event.title,
		"startdate":     event.startdate,
		"date_display":  "da",
		"low_threshold": "1",
		"high_threshold":"100",
		"span_color":    header.colors[index % header.colors.length],
		"lane": lane			
	};

	if (event.hasOwnProperty("description")) {
		result.description = event.description;
	}

	if (event.hasOwnProperty("link")) {
		result.link = event.link;
	}

    if (event.hasOwnProperty("enddate")) {
        result.importance = 48;
		result.enddate = event.enddate;
	} else {
        result.importance = 49;
        result.icon = "circle_blue.png";
	}

	return result;
}
