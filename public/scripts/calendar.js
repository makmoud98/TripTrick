$(document).ready(function() {
    // page is now ready, initialize the calendar...
    var events = JSON.parse($('#events').val());
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        height:500,
        events:events
    })
});