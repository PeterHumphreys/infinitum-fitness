# infinitum-fitness
This is a toy fitness application primarily developed for primarily for educational purposes.  

The technology stack includes MYSQL, Node.js, Express and React.


## Working Screenshots
![image](https://user-images.githubusercontent.com/83676679/200711248-6908ae25-3feb-4c1d-82e3-6a5f22fd3fd3.png)
![image](https://user-images.githubusercontent.com/83676679/200711550-17541672-381f-4a3a-ae00-1e0779ce9f2a.png)
![image](https://user-images.githubusercontent.com/83676679/200711625-97dba3b9-461f-423a-9001-e81b8682fb96.png)
![image](https://user-images.githubusercontent.com/83676679/200711759-5c852638-b51b-48ec-a938-bf8388c7b239.png)
![image](https://user-images.githubusercontent.com/83676679/200712205-396a2e21-a7e4-4817-948f-da8f36f09597.png)
![image](https://user-images.githubusercontent.com/83676679/200712445-149cf2cc-810a-4ce0-9ff2-bbfef121b865.png)
![image](https://user-images.githubusercontent.com/83676679/200713169-88508bb1-7e32-46b4-8f5c-015f1dcab4f9.png)







## Important Disclaimer
Please note that as of the writing of this document, this application is still in development.  I am currently in the process of migrating functionality from the original version of the application (which can be found in Fitness_App) to the newer version of the app (found in root).

### Functionality Currently in Version 1 (In Fitness_App, uses server-side rendering)
- The User may create an account
- The User may upload images to the server
- The User may update their profile photo to either one of a series of default images or a custom uploaded image
- The User may log weight and body fat percentage data for a given day
- This data is plotted on chart with customizable options for dataset and formatting
- Multiple users may be logged in concurrently and are assigned different sessions by the server
- The User may log in or out.  This affects whether or not they may access restricted resources.

### Functionality Currently in Version 2 (In root, uses client-side rendering)
- There is currently no authentication capability, so a user test account is logged into by default
- Routing is accomplished client-side via React Router
- The User may create and modify a workout routine using a number of workouts loaded from the database.
  This data is stored client-side as a piece of state in React and is structured in accordance with the provided UML diagram.  The data is then sent to the proper API endpoint.  However, the backend functionality to actually store the data has yet to be implemented.

---
## Requirements
For development, you will need to install Node.js and MYSQL.

After initializing MYSQL, please run the *fitness_script.sql* script to initialize the database.

### To run version 1 (Fitness_App) 
In the project root directory, you will need to create a .env file containing the following information: 

- NODE_ENV=development
- PORT=5000
- DB_HOST= localhost
- DB_USER= *Your MYSQL username*
- DB_PORT = *Your MYSQL port*
- DB_NAME = fitness_project
- DB_PASSWORD= *Your MYSQL password*

You will then need to install the following node packages using npm or whatever tool you prefer:
- body-parser
- express
- express-mysql
- express-session
- mysql2
- path
- fs
- multer
- ejs
- dotenv
- connect-livereload
- nodemon
- uuid
- npm-run-all
- cors
- parcel-bundler
- sass


### To run version 2 (root)
This directory contains 2 subdirectories- frontend and backend.  Each is a separate project.
#### frontend
Install the following node packages in the frontend directory
- sass
- uuid

#### backend
The backend requires the same packages as Fitness_App, minus sass.

## How to run development versions of app
Version 1 (Fitness_App) can be run by navigating to the directory (Fitness_App) and running the command * nodemon app * in the terminal.

Version 2 (root) requires you to use 2 terminals.
- On the first terminal, navigate to root/backend and run the command * nodemon app *
- In the second terminal window, navigate to root/frontend and run the command * npm start *




