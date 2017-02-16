# Traffic Light Server Status
![](https://github.com/leotm/traffic-light-server-status/blob/master/README-traffic-lights.png)
## Description
In object-oriented JavaScript, and using HTML, CSS and preferably jQuery, create a traffic light object that achieves the following:
- The object renders a traffic light on the web page, like the one shown above
- Every 10 seconds the object checks a URL (e.g. "/status") and retrieves the HTTP status code of the response
- If the status code is 200, the green light is illuminated and the red light is dimmed
- If the status code is not 200 or there is a timeout or other error, the green light is dimmed and the red light is illuminated and set flashing
- One can place multiple objects on the same page monitoring different URLs
- The object should include a function for triggering fetching the URL, which can be executed via the JavaScript console or via a future button onclick handler.

## Demo
[Run](https://rawgit.com/leotm/traffic-light-server-status/master/index.html)
