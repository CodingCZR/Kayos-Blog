/* Posts Page JavaScript */

//"use strict";

// script.js

    // Get the button that opens the modal
    var openModalButton = document.getElementById("openModalButton");

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Function to handle modal submission
function submitModal() {
    var modalTextBoxValue = document.getElementById("modalTextBox").value;
    alert("You entered: " + modalTextBoxValue);
    closeModal(); // Close the modal after submission (you can modify this behavior)
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

