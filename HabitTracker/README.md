# HabitTrackHabit Tracker Application
This is an alpha version, with many bugs that still need to be resolved.  This expo app is a habit-tracking app that makes tracking habits simple leading to sustaining a healthy lifestyle for those who either need reminders about the habits that will help them reach their goals or for those that are trying to make changes by implementing new habits 

##Features
###Frontend:

- A dropdown menu to select one of seven parent categories.
- A text input field for entering the habit.
- A save button to store habits in the backend.
- Review page that shows how consistantly a habit is completed

###Backend:

- REST API to handle saving habits to the MongoDB database.
- Data validation to ensure all required fields are filled.

##Technology Stack
- Operating system- Javascript
- Querying & data storage- MongoDB
- Backend framework- NodeJS, Express 
- Frontend framework- Expo, React, Material UI 
- Authentication- JWT

##Installation
###Prerequisites
- Node.js (>=14.x)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Expo CLI (install with npm install -g expo-cli)

###Steps
Backend
Clone the repository:

 git clone <repository-url>
cd <repository-directory>


Navigate to the backend folder:

 cd backend


Install dependencies:

 npm install


Set up your MongoDB connection:


Replace <your-mongodb-connection-string> in the server.js file with your MongoDB URI.
Start the server:

 node server.js


Frontend
Navigate to the frontend folder:

 cd frontend


Install dependencies:

 npm install


Start the Expo development server:

 npm start


Use the Expo Go app or an emulator to run the application.



##API Endpoints
POST /habits
####Description:
 Save a new habit to the database.
####Request Body:
 {
  "parent": "Parent1",
  "habit": "Drink water every morning"
}
####Response:
- 201: Habit saved successfully.
- 400: Missing required fields.
- 500: Server error.

##Project Structure
.
├── backend
│   ├── middleware  
│       └── authMiddleware.js     # middleware for authentication   
│   ├── Routes    
│       └── apiRoutes.js      
│       └── habitRoutes.js     
│       └── userRoutes.js       
│   ├── uploads\users    
│       └── server.js     
│   └── models
│       └── habitModle.js      #  formatting the required information for habits
│       └── userModle.js      # formatting the required information for user login   
├── frontend
│   ├── .expo
│   ├── app
│   │   └── (tabs) #within this folder contains the pages that can be navigated through the nav bar
│   │   └── _layout.jsx  #this is a stack screen file that contains the front-end routes for log-in, user setup and not found page 
│   │   └── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   └── Assets # this contained information for fonts, images and utilities
├── package.json  
├── .env
└── README.md


##Future Improvements
- Resolve backend- frontend connection issues, currently, the database runs in the backend but is not properly connected to the front causing it to throw errors when saving, accessing and formatting the habits properly
- Resolve bugs surrounding the review page, currently opening the page throws an error preventing it from opening 
- Change font, there is currently code in the files to change the font but it is not working
- Resolve issues with the login and registration pages, currently, the pages should be working but they are not showing when opening the app
- Looking to add meaningful icons to the navigation bar 
- Add push notifications, to set reminders to complete the apps 

###Contact
If you have any questions or suggestions, feel free to contact me:
Discord: @ARoseEdits
GitHub: https://github.com/ARoseEdits/HabitTracker