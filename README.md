# Tax calculator


npm i & npm start

### End points
/vehicle/:id/
/vehicle/:id/:month/
/vehicle/:id/:month/:day/


### Folder structure.

./test
Test folder which consists of tests for HTTP requests and tests for the calculator

./src
All the code


./src/index.ts
Index page where the express server gets set up.


./src/routes
Logic for the routing.


./src/controller/vehicleController.ts
If the routes were valid the functions inside the controller folder gets run. There are the functions. One for getting all the dates of a car, one for a specific month and one for a specific date.
The function filters through the database to find the correct vehicle, if there was match, the function uses the key values of the match to create a new vehicle class object. 

./src/controller/congestionTaxCalculator.ts
The prewritten calculator for this project. 
My changes:
* Converted the date strings to Dates in order for the date methods to work.
* Removed the changes of totalFee in the for loop. The totalFee never went above 60 even if the dates in the array were on different days.
Added a dayFee instead that calculates fees for individual days.
* In the original loop, the current fee was compared to the first date of the array instead of the date before the current. 
* Added a map in order to track which dates have already been calculated. If the day has already been calculated it gets skipped in the for loop.
* Changed the getTollFee function on line 94. The condition before gave wrong calculations. Every hour after 8 where minutes were below 30 did not get registered.
* Removed the else statements, if the condition is met the function returns. Making the else redundant.
* Changed vehicleType. Replaced tractor with Buss.
* Removed the +1 from getDay method inside the isTollFreeDate function because it showed the wrong day.

./src/db/vehicleList
The data base for storing vehicles. Each entry is an object that has a vehicle object and an array of dates.

./src/interfaces/
Logic for typescript interfaces

./src/models/
Logic for vehicle class. The original project had two classes, one for the vehicle type of car and one for motorcycles. Both classes had the same functions that returned static strings of their own vehicle type. Since there are 6 different vehicle types, creating a seperate class for each and everyone of them would take up unnessary space and be repetitive. Instead I replaced the two with the Vehicle class that has the properties of id, vehicleType and a function that returns the vehicleType value.  