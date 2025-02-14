// Function to fetch the content of the TXT file and insert it into the page
fetch('../check-outs/sprint_1/4_9_24.txt')  // Adjust the path if needed
    .then(response => response.text())  // Get the content as text
    .then(data => {
        // Insert the content into the 'content' div
        document.getElementById('content').innerHTML = data;
    })
    .catch(error => console.error('Error loading the file:', error));  // Handle errors
