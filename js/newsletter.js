const submitButton = document.getElementById("submitButton");
const emailInput = document.getElementById("newsletteremail");

submitButton.addEventListener("click", function() {

    // Replace with your deployed Apps Script web app URL (ensure it's HTTPS)
    const url = 'https://script.google.com/macros/s/AKfycbzS_Grd1xcKCXu_hYPnEQnHQdU6_zKVCMEn9r9kYtzJzj-i42TKZB5T7GIRqhbjsYnBZA/exec';

    fetch(url, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({
            "email" : emailInput.value
        }),
        headers: {
            'Content-Type' : "text/plain;charset=utf-8"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 200) {
            alert("Email added successfully!");
            emailInput.value = ""; // Clear the input field
        } else {
            alert("Error adding email: " + data.code);
        }
    })
    .catch(error => {
        console.error(error);
        alert("An error occurred. Please try again later.");
    });
});