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
 * This function will validate the request to make sure user didn't enter blank input
 * If the user input passes validation then this function calls authentication function.
 */
function onSignin() {
    document.getElementById("Username").style.borderColor = "white";
    document.getElementById("Password").style.borderColor = "white";

    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;

    var formValidity;
    var errorMessage = "";

    if (username == "") {
        errorMessage += "<li>Username is required.</li>";
        document.getElementById("Username").style.borderColor = "red";
        formValidity = false;
    }

    if (password == "") {
        errorMessage += "<li>Password is required.</li>";
        document.getElementById("Password").style.borderColor = "red";
        formValidity = false;
    }

    if (formValidity == false) {
        document.getElementById("errorBlock").innerHTML = "Validation Error: <br/><ul>" + errorMessage + "</ul>";
        errorMessage = "";
    } else {
        errorMessage = "";
        document.getElementById("errorBlock").innerHTML = errorMessage;
        authenticate(username, password);
    }

}

/**
 * This function takes two params:
 * @param {*} username 
 * @param {*} password 
 * 
 * function checks to see if user exists and if the user exists then app will try to authenticate.
 * if auth is successful then user will be redirected to User Profile Page with appropriate user profile details.
 */
function authenticate(username, password) {
    if (userExists(username)) {
        var user = JSON.parse(localStorage.getItem(username));
        if (password === user.password) {
            //authentication successful
            //redirect them to profile page
            var profileVars = "?" + user.firstname + "&" + user.lastname + "&" + user.dobMonth + "&" + user.dobDate + "&" + user.dobYear + "&" + user.email + "&" + user.username;
            location.href = "profile.html" + profileVars;
            localStorage.setItem("loggedinuser", username);

        } else {
            // authentication failed
            alert("Login Failed - Username or password did not match");
        }
    } else {
        //user doesn't exist with that username
        alert("Login Failed - Username or password did not match");
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