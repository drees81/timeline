var should = require('chai').should();

var eventTools = require('../eventTools');

var dataEventTruman = {
    "title": "Harry S. Truman"
    , "startdate": "1945-04-12"
    , "enddate": "1953-01-20"
};

var dataBrexitPoll =  {
    "title": "Brexit Poll"
    , "startdate": "2016-06-23"
    , "link": "https://de.wikipedia.org/wiki/EU-Austritt_des_Vereinigten_K%C3%B6nigreichs"
}  

var header = {
    "colors": [ "#9ebce5", "#78a7e6"]
}

describe('eventTools.mapEvent', function() {

    describe('Basic event', function() {

        it('should contain formal properties', function() {
            result = eventTools.mapEvent(dataEventTruman, 0, header, "hos-us");

            result.date_display.should.equal("da");
            result.low_threshold.should.equal("1");
            result.high_threshold.should.equal("100");
        });

        it('should contain importance properties', function() {
            result = eventTools.mapEvent(dataEventTruman, 0, header, "hos-us");
            result.importance.should.equal(48);
        });

        it('should contain basic data properties', function() {
            result = eventTools.mapEvent(dataEventTruman, 0, header, "hos-us");

            result.should.have.property('id').with.lengthOf(36);
            result.title.should.equal('Harry S. Truman');
            result.startdate.should.equal('1945-04-12');
            result.enddate.should.equal('1953-01-20');
            result.lane.should.equal('hos-us');
        });
    });

    describe('Event with extendes data fields', function() {
        it('should contain link', function() {
            result = eventTools.mapEvent(dataBrexitPoll, 0, header, "hos-us");
            result.link.should.equal("https://de.wikipedia.org/wiki/EU-Austritt_des_Vereinigten_K%C3%B6nigreichs");
        });
    });

    describe('Alternating colors', function() {
        it('should contain color1 for even ids', function() {
            result = eventTools.mapEvent(dataEventTruman, 0, header, "hos-us");
            result.span_color.should.equal("#9ebce5");
        });

        it('should contain color2 for odd ids', function() {
            result = eventTools.mapEvent(dataEventTruman, 1, header, "hos-us");
            result.span_color.should.equal("#78a7e6");
        });
    });

    describe('Event without end date', function() {
        it('should not contain startdate but no enddate', function() {
            result = eventTools.mapEvent(dataBrexitPoll, 0, header, "hos-us");
            result.startdate.should.equal('2016-06-23');
            result.should.not.have.property("enddate");
        });
        it('should contain importance properties', function() {
            result = eventTools.mapEvent(dataBrexitPoll, 0, header, "hos-us");
            result.importance.should.equal(49);
        });
        it('should contain icon', function() {
            result = eventTools.mapEvent(dataBrexitPoll, 0, header, "hos-us");
            result.icon.should.equal('circle_blue.png');
        });    
    });

});