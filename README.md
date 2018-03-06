
**Live**: https://ebay-fav-search.herokuapp.com/

Welcome to eBay Favorite Search App!
=====================


### What does it do? 
eBay Favorite Search App allows you to instantly search items from eBay, and add them in your favorite list through Local-Storage and Database thus allowing you to look and manage them in the sidebar (Built in React/Redux, Node.js/Express, PostgreSQL)

### How does it work? 
#### When You:
- **Search** for an item so it makes an api request to the back-end using react -> redux, then in back-end it makes an api request to eBay API to get the items from eBay, then it sends the data back to front-end in redux -> react which then shows the data to you.
- **Favorite** the items so they get stored in your local storage, if you are not logged in.
- **Login** then the items from your local storage are transfered to the database and are attached to your user account, thus allowing you to also see them later on in other computers.
#### `User Authentication:`
- **Register or Login** react fetches to the back-end with the "credentials: same-origin" which allows the back-end and front-end browser to keep the same cookies, thus allowing each other to share the information of a user.
  
#### `Database:`
  >Database is Relational, it contains 3 tables: "Items", "Users", and a "Favorite" table which keeps the reference of a user and an item which he/she marked as a favorite.

 - **Favorite** an item, so first it checks if that item's id already exists in the "Items" table in database by any user, if it doesn't then it will create that item in the "Items" table, if it does exists then it will go to the next part.
- Then "Favorite" table which acts as a refernce table, creates a new row with the reference of that user and a reference of that item. This way the same items aren't stored multiple times.
- **Remove** an item from the favorite, so it deletes the row in "Favorite" table which based on your user and item, and then it checks if that item is marked favorite by any user. If it is then it leaves it, otherwise it also deletes that item from the "Items" table so this way unused information is automatically deleted.
                                            
### How to use it?
 - Visit the website
 - Search for an item by typing into the search box and adding the search filters 
 - Click on the "More Details" Button to see more information about the item
 - If you like an item then click on the star button to add it into your favorite list
 - If you would also like to see your favorite items later on on a different computer then login if you have an account otherwise register, and your favorites items would get transfered to your account.
 - > Demo Account => ***Username***: **`example`** | ***Password***: **`example`**

### What techs are being used? 
 - React
 - Redux
 - React Router
 - Node.js/Express
 - eBay API
 - RESTFUL API
 - User Authentication
 - Isomorphic Fetch (To fetch through back-end, after creating a middleware)
 - Javascript
 - LESS - (CSS)
 - Moment.js 
 - PostgreSQL
 - Node Package Manager(npm)

### How to run it locally? 
 - Download the repository in your local machine
 - Create a database and modify the config file located in 'db' directory based on the database, and then migrate the database structure file located in "db/migrations" with the database
 - Open a terminal, and navigate to "eBay-Favorite-Search" directory
 - Once you are there then do "npm install", to install the dependencies¹ needed to run the back-end of this app
 - Create ".env" file and store `SECRET_KEY` and `EBAY_API_SECRET_KEY`² in that file
 - After packages have finished installing then type "npm start" to run the back-end server
 - Open another terminal, and navigate to "client" directory
 - Do "npm install" again, to install the react packages³ needed to run the front-end of this app
 - After packages have finished installing then type "npm start" to run the front-end part of this app
 - After the server has started running, then navigate to your browser and go to this address: "http://localhost:3006/"

1) Back-End Dependencies Needed: bcryptjs, body-parser, cookie-parser, cors, dotenv, express, express-session, isomorphic-fetch, method-override, morgan, nodemon, passport, passport-local, path, pg-promise

2) To get eBay Api Key: https://developer.ebay.com/join/

3) Some react packages: moment, react-burger-menu, react-dates, react-dropdown, react-flip-move, react-rangeslider, react-redux, react-router, react-router-dom, redux, redux-logger, redux-promise-middleware, redux-thunk

  
 
 
![alt text](https://raw.githubusercontent.com/askflow1111/eBay-Favorite-Search/master/client/src/images/screenshot.png)
