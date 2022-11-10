# infinitum-fitness
This is a toy fitness application primarily developed for primarily for educational purposes.  

The technology stack includes MYSQL, Node.js, Express and React.

## Functionality Overview
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
  
### Functionality I hope to implement
Once the existing functionality in version 1 is succesfully migrated to version 2, I would like to eventually implement the following features (most of these are rather unrealistic, but are worth thinking about)
- Full CRUD Operations on Exercises and Routines
- Image uploads served from the backend to the frontend
- Implementation of a routine scheduling system that can be shown via a calendar component
- Implementation of some sort of algorithmically generated workout/fitness recommendations based on inputs.
- Ability for users to interact with each other.
- User notifications given for upcoming workouts and other events
- Ability to change user settings (i.e. theme, turn off/on notifications, etc.)
- Implementation of other pages featured on the navigation menu.
- A more highly abstracted CustomChart class that allows users to plot more types of data with more customizable options.

### Working ERD Diagram
Below is a working Entity-Relationship Diagram showing the existing database tables.

<br />

![image](https://user-images.githubusercontent.com/83676679/200991226-81344846-ee19-4e9f-836c-37742f9da841.png)

### Working UML Diagram
This is a working UML diagram strictly of the existing Model classes within the backend MVC implementation.  View and Presenter classes
are omitted for simplicity.

<br />

![image](https://user-images.githubusercontent.com/83676679/200994346-74835646-4dcb-4085-beaa-44a00996bfe0.png)


## Working Screenshots
### Version 1
#### Logging in
![image](https://user-images.githubusercontent.com/83676679/200715057-aabb134d-2abd-499f-91d3-a506a291c6e6.png)
The user is prevented from accessing any pages other than the signup or login prior to being authenticated and assigned a user session by the server. 

<br/>

![image](https://user-images.githubusercontent.com/83676679/200904693-5e783c51-db58-4207-9c0e-df57467ba80a.png)
Upon logging in, the user is taken to the homepage.  Note that the sidebar contains placeholder values for now.

<br/>
<br/>
<br/>

#### Changing User Profile Photo
![image](https://user-images.githubusercontent.com/83676679/200715236-23d85de0-b470-40b7-b800-83f42cd380db.png)
The user may set their profile photo from a number of provided default images or upload their own image.  Note that the image picker
is a custom component that may be re-used in a variety of contexts.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200715314-a4a01e7f-c5ae-4f47-973b-94bd1da35245.png)
Assuming the image is validated (within the file size limitations and of the allowed file extensions), it is uploaded to the server and 
the path to the file is associated with the user in the database.  The UI updates to reflect this change.

<br/>
<br/>
<br/>

#### Charting our data
![image](https://user-images.githubusercontent.com/83676679/200716914-1676a77e-9b49-438c-bbc8-b6cd2e126fd4.png)
The dashboard allows the user to track and visualize their weight and body fat percentages over time.  It provides a number of options 
for displaying the data, such as viewing data for custom timespans, adding multiple data series, modifying the scale of the graph and showing gridlines.
Here, we see the user tracking their weight over a period of about a month.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200717081-025d6c16-f40c-4987-a603-98a878c20f6c.png)
In this screenshot, the user adds in the 7 day running average for the specified time as a second data series.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200717174-0ae4e6e8-68dc-4dc2-839f-e2838af83192.png)
The chart is now displaying both daily and average body fat percentage values over a slightly longer period of time.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200717419-5988a46b-66b0-41f8-b027-5b75c23856e2.png)
The user logs their data.  This data is sent to the server and stored in the database.

<br/>
<br/>
<br/>

#### Registering a new account

![image](https://user-images.githubusercontent.com/83676679/200901269-df9ed38e-ad77-4c2d-bd8b-c11bfcf840e8.png)
Here, the user tries to register an account with an already registered email address and are prevented from doing so.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200899317-733bf048-98e1-43ce-8615-49e1e5891cad.png)
They enter a unique email address in instead.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200718744-012f7c01-d82b-4bf1-8673-7fa20016a3ce.png)
The registration form features very thorough validation to ensure necessary fields are entered and valid values are provided.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200718835-0c13c8f7-cf1d-4021-8d0f-76c1a93c5006.png)
This data serves no real purpose at the moment, but could theoretically be utilized to algorithmically generate fitness/dietary 
suggestions to the user later on.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200718904-c4b89124-a27a-4a61-93d0-3c1bd82dd3d5.png)
The user chooses a default photo as their profile picture.

<br/>
<br/>
<br/>

#### Signing in with 2 accounts simultaneously
![image](https://user-images.githubusercontent.com/83676679/200719443-ecac78f4-2155-4345-8f96-8abc3d8f0a51.png)

<br/>

![image](https://user-images.githubusercontent.com/83676679/200720337-64044fd7-ed1f-4dcf-afff-32f81d6f57ef.png)
When a user signs in, they are assigned a session by the server.  This allows mutltiple accounts to be logged in to the app simulataneously.
Ideally, these sessions will eventually be stored in the database.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200720420-dbbe570c-435c-4f96-9e80-025aae2a6752.png)
Here, a user logs out and we see the other account's session persist.

<br/>
<br/>
<br/>

### Version 2

#### Home page
![image](https://user-images.githubusercontent.com/83676679/200711248-6908ae25-3feb-4c1d-82e3-6a5f22fd3fd3.png)
The homepage is largely the same in this version of the app, though the "featured" items such as "Discover New Workouts" are fetched from
the server as opposed to being hardcoded.

<br/>
<br/>
<br/>

#### Routines page
![image](https://user-images.githubusercontent.com/83676679/200711550-17541672-381f-4a3a-ae00-1e0779ce9f2a.png)
We see a list of routines.  These are non-modifiable placeholder values for now, but are fetched from the server.

<br/>
<br/>
<br/>

#### Adding a new routine
![image](https://user-images.githubusercontent.com/83676679/200711625-97dba3b9-461f-423a-9001-e81b8682fb96.png)
The user can create their own workout routines.  They may select the days of the week they wish to work out and add 
a series of exercises on those days.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200711759-5c852638-b51b-48ec-a938-bf8388c7b239.png)
They may change the name of the workout and, eventually the image (this functionality has not yet been migrated).

<br/>

![image](https://user-images.githubusercontent.com/83676679/200712205-396a2e21-a7e4-4817-948f-da8f36f09597.png)
The user may choose from a provided list of exercises fetched from the server.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200712445-149cf2cc-810a-4ce0-9ff2-bbfef121b865.png)
They can also modify the sets, reps, weight and rest period for a specific scheduled exercise.

<br/>

![image](https://user-images.githubusercontent.com/83676679/200713169-88508bb1-7e32-46b4-8f5c-015f1dcab4f9.png)
The lists of exercises are packaged up into a map that associates each of the 7 days of the week with an array of scheduled exercises,
in accordance with the UML class diagram.  
This, along with the other pertinent form data is stored as a piece of state in React.  Upon clicking save, this data is sent to an API endpoint on the server
using the fetch API.  However, backend processing of this data has yet to be implemented, so the data does not persist.

<br/>
<br/>
<br/>

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
- On the first terminal, navigate to root/backend and run the command *nodemon app*
- In the second terminal window, navigate to root/frontend and run the command *npm start*




