/** Class representing a traffic light object. */
class TrafficLight {
	/**
	 * Create a traffic light.
	 * @param  {string}		url			The URL of the web page.
	 * @param  {number} position	The traffic light's index in the array of traffic lights.
	 */
	constructor(url, position) {
		this.url = url;
		this.position = position;
		this.timesChecked = 0;
	}

	/**
	 * Check the URL.
	 * Store the HTTP status code of the response.
	 * Update it's current display.
	 */
	checkURL() {
		$.get(this.url)
			.done((data, textStatus, jqXHR) => {
				this.status = 200;
				handlers.displayTrafficLight(this.position, this.timesChecked, this.url);
				this.timesChecked++;
			})
			.fail(() => {
				this.status = "error";
				handlers.displayTrafficLight(this.position, this.timesChecked, this.url);
				this.timesChecked++;
			})
	}

	/**
	 * Immediately check the URL.
	 * Start checking the URL every 10 seconds.
	 */
	startInterval() {
		this.checkURL();
		this.interval = setInterval(() => this.checkURL(this.url), 10000);
	}

	/**
	 * (Bonus) Update the URL of a traffic light.
	 * Reset the current timer.
	 * @param  {string} url 	The URL of the web page.
	 */
	updateURL(url) {
		this.url = url;
		clearInterval(this.interval);
		this.startInterval();
	}
}

/**
 * The Model. Store and start the traffic lights.
 * @type {Object}
 */
var trafficLightList = {
	trafficLights: [],
	addTrafficLight: function(url) {
		var position = this.trafficLights.length;
		this.trafficLights.push(new TrafficLight(url, position));
		this.trafficLights[position].startInterval();
	}
}

/*
Note: ES6 arrow functions point "this" to global window object,
rather than local object, so traditional syntax used when needed.
 */

/**
 * The View. Render the traffic lights.
 * @type {Object}
 */
var view = {
	/**
	 * Render each traffic light.
	 * @param  {number} position     The traffic light's index in the array of traffic lights.
	 * @param  {number} timesChecked The number of responses.
	 * @param  {string} url          The URL of the web page.
	 * The wrapper div's around the li's keep them in their original positions.
	 * Otherwise the delete/add update every 10s interval shifts each to the end of the list.
	 * Also, li#X is not a valid query selector.
	 */
	displayTrafficLight: function(position, timesChecked, url) {
		$("#" + position).remove(); // Clear old li
		var status = trafficLightList.trafficLights[position].status;
		// Truncate long URLs for tidier display
		if (url.length > 26) {
			url = url.slice(0, 23) + "...";
		}
		if (timesChecked) { // Update by creating a new div>li
			$("ul > div#d" + position).append('<li id=' + position + '><div class="traffic-light"><div class="red-' + status + '"></div><div class="green-' + status + '"></div></div><p class="url">' + url + '</p></li>');
		} else { // Initially, create a div>li
			$("ul").append('<div id=d' + position + '><li id=' + position + '><div class="traffic-light"><div class="red-' + status + '"></div><div class="green-' + status + '"></div></div><p class="url">' + url + '</p></li></div>');
		}
	}
}

/**
 * The Controller. Respond to events. Invoke changes on the Model and View.
 * @type {Object}
 */
var handlers = {
	/**
	 * Invoke the Model to create a traffic light, with the URL from the View.
	 * @param  {Object} input The input HTML element.
	 */
	addTrafficLight: (input) => {
		trafficLightList.addTrafficLight(input.value);
		input.value = ''; // Clear textbox
	},
	/**
	 * Invoke the View to update the display of a traffic light.
	 * @param  {number} position			The traffic light's index in the array of traffic lights.
	 * @param  {number} timesChecked	The number of responses.
	 * @param  {string} url						The URL of the web page.
	 */
	displayTrafficLight: (position, timesChecked, url) => {
		view.displayTrafficLight(position, timesChecked, url);
	}
}

/**
 * (Bonus) Update the URL, via the console.
 * @param  {number} position The traffic light's index in the array of traffic lights.
 * @param  {string} url      The URL of the web page.
 */
function updateURL(position, url) {
	trafficLightList.trafficLights[position].updateURL(url);
}

/*
Handy Chrome Extension for testing in DevTools:
Allow-Control-Allow-Origin: *
 */
