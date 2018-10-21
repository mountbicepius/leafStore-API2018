# Online Store API

This is a demo for a mobile enabled back end API for an online store.Developed using Nodejs and ExpressJs Framework, the client can perform the following tasks using this API.

 - Perform a universal order search
 - Fetch  individual order based on particular order ID
 - Assign an delivery agent as per availability
 - Live Tracking of the delivery agent

## Prerequisites


 - [x] [RequestsJs](https://www.npmjs.com/package/requestsjs) to make and parse requests in and out of the API
 - [x] [NPM](https://www.npmjs.com)
 - [x] Your Favorite Text Editor

## Functional Concept

> We will be following the Micro service approach  to implement the API at any mobile device
> The Communication Mechanism will follow with a centralized Database which stores all details for any order related transaction
> The Database comes pre-mapped with the API  using ORM logic
> Once the client device places an order ,the order info is exchanged from the client to the server based on location , delivery timing and order details.
> The developers can implement their own middleware likewise if they wish to add any special events during order exchange
> Once an order is accepted the agent service will generate an automated request and yield 'NA' in case no delivery agents are available.

    {
    	"id" : "1223ajsfaghj-125765" ,
    	{
    		"agentID" : " ",
    		"location" : "NA",
    		"delayTime" : 99999
    	}
    }

> In case of available delivery agents the JSON response will be as per below

    {	"id" : "akjgsbahkg-142756-1afs",
    	{
    	"agentID" : "john doe",
    	"location" : "Aadarsh Pally",
    	"delayTime" : 0
    	}
    }
> Agents will be providing their details via their client App and the GPS data
> shall be parsed into the ordering service as provided here
```mermaid

graph LR;
    OrdersDB --> API;
    API -->|CRUD| Client;
    subgraph ;
    API -->|Reqeust Availbility| AgentService;
    AgentService -->|Respond agentid ,delayTime| API;
    end
    subgraph ;
    AgentService --> AgentID;
    AgentService --> Location;
    AgentService --> delayTime;
    end
    subgraph ;
    API -->|Agent Data| Client
    end
```



## Deploying your own custom middleware
#### Install the Heroku CLI

Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line).

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

    $ heroku login

#### Clone the repository

Use Git to clone onlinestoreapi-201018's source code to your local machine.

    $ heroku git:clone -a onlinestoreapi-201018
    $ cd onlinestoreapi-201018

#### Deploy your changes

Make some changes to the code you just cloned and deploy them to Heroku using Git.

    $ git add .
    $ git commit -am "make it better"
    $ git push heroku master

## Testing Implemention using MochaJS

-   -   Testing diff output. Mocha generates diff output unless the assertion library decides to do this itself. Since `unexpected` generates its _own_ diff output, we need to use an assertion library that does not; we use the built-in `assert` module.
    -   `test/unit/runnable.spec.js` must avoid 3rd-party code; read source for more info
    -   Tests asserting interop with other specific assertion libraries.
-   All tests have extension `.spec.js`.
-   All test fixtures have extension `.fixture.js`.
-   All test fixtures are _ignored_ by ESLint.
-   `mocha.opts` will require `test/setup.js`, which is the main harness.
-   `test/assertions.js` contains Mocha-specific types and assertions for `unexpected`
-   `test/node-unit/` only runs in Node.js; `test/browser-specific/` only runs in the browser.
    -   See `../karma.conf.js` for more information on which tests run in the browser.
-   We can't run all of the Node.js tests in one `mocha` command, because we need to use different command-line options to test the various reporters and interfaces.
    -   See `../package-scripts.js` for more info about how things are split up.

> Written By Anirudh Srivastav
