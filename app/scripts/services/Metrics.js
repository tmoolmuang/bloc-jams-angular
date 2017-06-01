(function() {
  function Metrics() {
    var Metrics = {};

    Metrics.report = function(eventName) {
      var event = {event: { name: eventName }};
      var request = new XMLHttpRequest();
      request.open("POST", "https://metrics-tm.herokuapp.com/api/events", true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(event));
    };    
		
    return Metrics;
  }
  angular
    .module('blocJams')
    .service('Metrics', Metrics);
})();