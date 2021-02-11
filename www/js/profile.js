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

var username;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    document.getElementById('deviceready').classList.add('ready');
}

/**
 * This function will check for unauthorized access.
 * if this page is access is unauthorized then user will be alerted a message and redirected to landing page.
 * check for URI component and loggedinuser entry in localstorage both to authenticate this request.
 */
function onload() {
    var userString = decodeURIComponent(location.search);
    userString = userString.substring(1);
    var profileInfo = userString.split("&");

    document.getElementById("firstname").innerText = profileInfo[0];
    document.getElementById("lastname").innerText = profileInfo[1];
    document.getElementById("dobMonth").innerText = profileInfo[2];
    document.getElementById("dobDate").innerText = profileInfo[3];
    document.getElementById("dobYear").innerText = profileInfo[4];
    document.getElementById("email").innerText = profileInfo[5];
    username = profileInfo[6];

    if ((userString == "") || (localStorage.getItem("loggedinuser") !== username)) {
        //unauthorized access
        alert("You must login first");
        location.href = "index.html";
    }

}

/**
 * This function will delete the account along with localstorage login entry
 */
function deleteAccount() {
    localStorage.removeItem(username);
    localStorage.removeItem("loggedinuser");
    location.href = "index.html";
}

/**
 * This function will allow user to return to landing page after removing localstorage login entry
 */
function logout() {
    localStorage.removeItem("loggedinuser");
    location.href = "index.html";
}