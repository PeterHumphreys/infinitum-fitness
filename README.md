# infinitum-fitness
This is a toy fitness application primarily developed for primarily for educational purposes.  

The technology stack includes MYSQL, Node.js, Express and React.


## Working Screenshots
![image](https://user-images.githubusercontent.com/83676679/200715057-aabb134d-2abd-499f-91d3-a506a291c6e6.png)
![image](https://user-images.githubusercontent.com/83676679/200715236-23d85de0-b470-40b7-b800-83f42cd380db.png)
![image](https://user-images.githubusercontent.com/83676679/200715314-a4a01e7f-c5ae-4f47-973b-94bd1da35245.png)
![image](https://user-images.githubusercontent.com/83676679/200716914-1676a77e-9b49-438c-bbc8-b6cd2e126fd4.png)
![image](https://user-images.githubusercontent.com/83676679/200717081-025d6c16-f40c-4987-a603-98a878c20f6c.png)
![image](https://user-images.githubusercontent.com/83676679/200717174-0ae4e6e8-68dc-4dc2-839f-e2838af83192.png)
![image](https://user-images.githubusercontent.com/83676679/200717419-5988a46b-66b0-41f8-b027-5b75c23856e2.png)
![image](https://user-images.githubusercontent.com/83676679/200717591-90c07144-f98f-41e7-85a7-6fb19c043adb.png)

![image](https://user-images.githubusercontent.com/83676679/200718413-aa910009-0f47-4021-8a4d-4ffc19c5b1a4.png)
![image](https://user-images.githubusercontent.com/83676679/200718744-012f7c01-d82b-4bf1-8673-7fa20016a3ce.png)
![image](https://user-images.githubusercontent.com/83676679/200718835-0c13c8f7-cf1d-4021-8d0f-76c1a93c5006.png)

![image](https://user-images.githubusercontent.com/83676679/200718904-c4b89124-a27a-4a61-93d0-3c1bd82dd3d5.png)
![image](https://user-images.githubusercontent.com/83676679/200718846-72d82696-4561-4ad0-8e71-16b9c1f6d69d.png)

![image](https://user-images.githubusercontent.com/83676679/200719443-ecac78f4-2155-4345-8f96-8abc3d8f0a51.png)
![image](https://user-images.githubusercontent.com/83676679/200720337-64044fd7-ed1f-4dcf-afff-32f81d6f57ef.png)
![image](https://user-images.githubusercontent.com/83676679/200720420-dbbe570c-435c-4f96-9e80-025aae2a6752.png)










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




