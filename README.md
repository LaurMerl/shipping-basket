# shipping-basket
The whole project is written in *JavaScript*, both front-end (pure JS, no library required) and back-end (NodeJS + Express). NodeJs is used as server with routing functionality which defines application's endpoints (URIs) and how they respond to client requests. Each URI implements a module middleware that composes the final response. It results in a kind of API service that, when invoked, returns a computed result.

The front-end interface is rendered in *HTML + CSS*, made dynamic by the addition of JavaScript. All the dynamic functionalities are possible by the use of DOM, scanning and changing property or values.
Assuming a retrieve action that set the item details from a server, all data are stored in localStorage, which allows saving a basket among different sessions. Using cookies, the user interests are updated in real-time.
Any particular development is better referenced as note comment in the code.

