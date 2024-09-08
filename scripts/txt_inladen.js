
fetch('../txt_bestanden/day_journal/sprint_1/8_9_24.txt') // Het pad naar je tekstbestand
      .then(response => {
        if (!response.ok) { // Controleer of het verzoek succesvol was
          throw new Error('Netwerkprobleem: ' + response.statusText);
        }
        return response.text(); // Zet de response om in tekst
      })
      .then(data => {
        document.getElementById('text-container').textContent = data; // Plaats de opgehaalde tekst in de div
      })
      .catch(error => console.error('Fout bij het laden van het bestand:', error));
