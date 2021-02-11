# DemoCordovaProject
Sample project to demo Cordova app using core JS and form validation

Author Name: Shivam B. Parikh
App Name: Account Management

Assumptions:
• For this project, storing password in plaintext/unencrypted form is okay.
Technologies Used: Cordova, HTML, CSS, JS, LocalStorage
This application allows following operations:
• Account registration
• Login using username and password
• Logout
• Delete Account

User is prompted with a simple landing page with options to “Sign Up” or “Sign In”
Landing Page

Sign Up/Registration:
Every single field on this page is a required field and app will prevent user from successfully registering the account for entering blank or invalid input.

After valid input:
App will store user info to LocalStorage using ‘username’ as a key and json object as value. ‘username’ is lower cased to prevent issues while logging in. 

Registration Page Sign In:
After successful registration user is redirected to landing page and can choose to sign in. User needs to enter valid username and password. App will prevent users from enter blank or invalid ‘username’ and ‘password’ combination. Once user is successfully authenticated, app will add a login entry to LocalStorage and also append user info to URI and redirect to profile page.

User Profile Page:
Once user successfully loggs in only then user is directed to User profile page. This page is not accessible without going through the successful log in process. To serve this authorized page, the app transfers information down to this page using URL parameters from login page and also checks for LocalStorage entry.

Sign out:
Once user signs out, user cannot come back to user profile page using ‘back’ button. This action also removed the login entry from LocalStorage.

Delete Account:
This option allows users to delete their account and once deleted successfully user is redirected to landing page.

How to run this app:
• Unzip ‘cordovaProject.zip’ file.
• User terminal for following commands
• cd cordovaProject
• cordova platform add android or cordova platform add browser
• cordova build android or cordova run browser
• [optional] cordova build android

There is an apk file under ‘cordovaProject/apk/’ which can be used to load into android emulator.

Note: given it didn’t increase the size of project significantly, I have left the android platform folder as is for easy access.
