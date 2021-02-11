/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    document.getElementById('deviceready').classList.add('ready');
}

/**
 * This function will validate user input and prevent any blank or invalid input.
 * If user input passes validation then this function process info to registration processor.
 */
function onSignup() {
    document.getElementById("Username").style.borderColor = "white";
    document.getElementById("Password").style.borderColor = "white";
    document.getElementById("FirstName").style.borderColor = "white";
    document.getElementById("LastName").style.borderColor = "white";
    document.getElementById("date").style.borderColor = "white";
    document.getElementById("EMail").style.borderColor = "white";

    var username = document.getElementById("Username").value.toLowerCase();
    var password = document.getElementById("Password").value;
    var firstName = document.getElementById("FirstName").value;
    var lastName = document.getElementById("LastName").value;
    var dob = document.getElementById("date").value.split("-");
    var dobYear = dob[0];
    var dobMonth = dob[1];
    var dobDate = dob[2];
    var email = document.getElementById("EMail").value;

    //regex check if the email is entered using correct format
    var emailformatRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    var formValidity;
    var errorMessage = "";

    if (username == "") {
        errorMessage += "<li>Username is required. </li>";
        document.getElementById("Username").style.borderColor = "red";
        formValidity = false;
    }

    if (password == "") {
        errorMessage += "<li>Password is required. </li>";
        document.getElementById("Password").style.borderColor = "red";
        formValidity = false;
    }

    if (firstName == "") {
        errorMessage += "<li>First name is required. </li>";
        document.getElementById("FirstName").style.borderColor = "red";
        formValidity = false;
    }

    if (lastName == "") {
        errorMessage += "<li>Last name is required. </li>";
        document.getElementById("LastName").style.borderColor = "red";
        formValidity = false;
    }

    if (dob == "") {
        errorMessage += "<li>date of birth is required. </li>";
        document.getElementById("date").style.borderColor = "red";
        formValidity = false;
    }

    if (dobMonth > 12 || dobMonth < 1) {
        errorMessage += "<li>Enter valid birth month. </li>";
        document.getElementById("date").style.borderColor = "red";
        formValidity = false;
    }

    if (dobDate > 31 || dobDate < 1) {
        errorMessage += "<li>Enter valid birth date. </li>";
        document.getElementById("date").style.borderColor = "red";
        formValidity = false;
    }

    if (dobYear > 2020 || dobYear < 1800) {
        errorMessage += "<li>Enter valid birth year. </li>";
        document.getElementById("date").style.borderColor = "red";
        formValidity = false;
    }

    if (email == "") {
        errorMessage += "<li>E-Mail is required. </li>";
        document.getElementById("EMail").style.borderColor = "red";
        formValidity = false;
    }

    if (!emailformatRegex.test(String(email).toLowerCase())) {
        errorMessage += "<li>Valid E-Mail is required. </li>";
        document.getElementById("EMail").style.borderColor = "red";
        formValidity = false;
    }

    if (formValidity == false) {
        document.getElementById("errorBlock").innerHTML = "Validation Error: <br/><ul>" + errorMessage + "</ul>";
        errorMessage = "";
    } else {
        errorMessage = "";
        document.getElementById("errorBlock").innerHTML = errorMessage; // clear the errors
        registartionProcesser(username, password, firstName, lastName, dobMonth, dobDate, dobYear, email); //send the registration details to processor
    }
}

/**
 * This function will check if user already exists or not, if user exists then prompt a message.
 * Else, it will add the registration detail to LocalStorage
 */
function registartionProcesser(username, password, firstName, lastName, dobMonth, dobDate, dobYear, email) {
    if (userExists(username)) {
        alert("Username is already taken");
    } else {
        storeRegistration(username, password, firstName, lastName, dobMonth, dobDate, dobYear, email);
    }
}

/**
 * This function takes @param {*} username and checks if the user exists or not
 */
function userExists(username) {
    if (localStorage.getItem(username) == null) {
        return false;
    } else {
        return true;
    }
}

/**
 * This function takes following params to add a user to LocalStorage
 * @param {*} username 
 * @param {*} password 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} dobMonth 
 * @param {*} dobDate 
 * @param {*} dobYear 
 * @param {*} email 
 * 
 * if for somereason LocalStorage is not available - user will be prompted wih=th appropriate message
 */
function storeRegistration(username, password, firstName, lastName, dobMonth, dobDate, dobYear, email) {
    localStorage.setItem(username, JSON.stringify({
        "username": username,
        "password": password,
        "firstname": firstName,
        "lastname": lastName,
        "dobMonth": dobMonth,
        "dobDate": dobDate,
        "dobYear": dobYear,
        "email": email
    }));

    if (localStorage.getItem(username)) {
        alert("Your account has been successfully registered.");
        location.href = "index.html"
    } else {
        alert("Sorry! We are having an issue registering you.");
    }
}