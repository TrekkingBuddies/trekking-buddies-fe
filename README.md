# Trekking Buddies

---

Project Overview

This repository is the frontend for the Trekking Buddies app, it uses endpoints and other files of the Trekking Buddies backend https://github.com/TrekkingBuddies/trekking-buddies-be.

This project gives an android app to use the functionality avaiable on the backend in a user friendly way along on smartphones.

Currently this is only possible by using Expo and is not aviavle for download independently.  

Minimum Node version: v22.9.0
Minimum Expo version: 52.0.37
Minimum Android version: 6+

---

Environment Setup

To keep the database secured, the information for the necessary .env will have to be requested from one of the owners of the repository.

---

Instructions for Running the App

To run the app you will need to do the following:

1. Clone and open up the code in your chosen editor.

2. Run 'npm install' or 'npm i'  in the terminal to install the needed dependencies.

3. Setup the environment file, which you need to be requested.

4. Download the Expo Go app from the play story on your android smartphone.

5. Run 'npx expo start' in the terminal to run expo

6. Scan the QR code in the terminal with the Expo Go app.

---

Instructions for App use

Login - 

-The login screen allows users to login to their account by entering thier email and password and then pressing 'Login'.

-The user may also sign up if they don't have an account by pressing 'Sign up'.


Sign Up - 

-The sign up screen allows the user to input the information needed for thier account.

-The user selects an avatar to use by pressing one the choices.

-The first of these is the Username, Email, Password and Bio which are simple text fields.

-The location field will take the location given by the user and find the coordinates of the location to be stores with their data.

-The 'Select Skill Level' drop down menu will aloow the user to select thier skill level.

-The preferences section includes checkboxes the user may press to add to their account for better search results.

-Pressing the 'Sign up' button will submit the user data. Any missing or invalid data will be flagged to the user.

-Completing this process will long in the user and take them to the Hikers screen.


Hikers - 

-This screen shows the other users/hikers signed up to the Trekking Buddies app. It shows the other hikers basic information including their: avatar, username, location, bio preview, skill level and distance to current user.

-The list of hikers uses pagination to limit load times.

-Pressing the 'Message' button on a hiker's card will open up a direct message to them.

-Pressing on a hiker's username will bring up an expanded view of the hiker's profile including more of their bio along with their preferences.

-Pressing any of the preference options ('uphill', 'flat', 'countryside', 'dog friendly') will limit the shown hikers to those that have those preferences. Selecting more will further limit results.

-Changing the 'Skill Level' drop down will limit the shown hikers to those with the chosen skill level.

-Changing the 'Distance' drop down will limit the shown hikers to those within the chosen distance.


Sign out - 

-Pressing this button in the top right of the screen will log the current user out and return them to the 'Login' screen.

-This button is not shown on the 'Login' or 'Sign Up' screens.


Bottom Buttons - 

-The left most button called 'Hikers' will redirect to the Hikers screen.

-The middle button called 'Messages' will redirect to the Messages screen.

-The right most button with the user avatar will redirect to the current user profile.


Profile - 

-This screen displays the logged in user's information except thier password.

-Pressing the 'Edit profile' button will change the fields to be editable allowing the user to change their information. These work the same as the 'Create Profile' screen.

-Pressing the 'Save' button will save the changes to the database.

-Pressing the 'Delete profile' button will delete the user's profile from the database and logs them out sending them back to the 'Login' screen.


Messages - 


Direct Message - 