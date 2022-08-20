
# Digital Bread Inventory and Ordering Web App

A web app that aids in the daily process of monitoring the bread inventory and ordering the right amount of bread based on previous sales and current stock.




## Tech Stack

**Client:** React, Chakra UI, Formik

**Server:** Node, Express

**Database:** MongoDB, Mongoose


## List of File Contents

```
C:.
|   .gitignore
|   package-lock.json
|   package.json
|
+---backend
|   |   server.js                       # main backend javascript code
|   |   initDB.js                       # script for initializing database
|   |   package-lock.json
|   |   package.json
|   |
|   +---Models
|   |   |   bread.js                    # schema for breads
|   |   |   order.js                    # schema for weekly orders
|   |   |   user.js                     # schema for users
|   |
|   +---Routes
|       |   data.js                     # handles any data related requests
|       |   index.js                    # handles user authentication and general requests
|
+---frontend
|   |   package-lock.json
|   |   package.json
|   |
|   +---public
|   |   |   index.html                  # root html
|   |   |   style.css                   # root css
|   |
|   +---src
|       |   App.js                      # main React App
|       |   index.js                    # root component
|       |
|       +---components
|       |   |   BreadInput.jsx          # numerical input component 
|       |   |   CollapsibleTable.jsx    # custom accordion component
|       |   |   TableRow.jsx            # table component
|       |   |   FormPage.jsx            # multistep form component
|       |   |   Home.jsx                # home page component
|       |   |   Login.jsx               # login page component
|       |   |   PreviousOrderForm.jsx   # step 1 component for multistep form
|       |   |   SaleStatusForm.jsx      # step 2 component for multistep form
|       |   |   EditOrderForm.jsx       # step 3 component for multistep form
|       |   |   Redirect.jsx            # empty component for redirecting at root
|       |
|       +---themes
|           |   index.js                # root custom themes
|           |
|           +---components
|               |   TableStyle.js       # TableRow custom theme

```
