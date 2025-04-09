import express from 'express'
import { Liquid } from 'liquidjs';

import fs from 'fs';
import { readdir, readFile } from 'node:fs/promises'
// const markedUpFileContetnt = await readFile ("content" + req.params.iets)
import { marked } from 'marked'

const app = express()

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

app.use(express.urlencoded({extended: true}))

// const files = await readdir('/database/checkOut.json')
// console.log(files)

app.get('/', async function(request, response) {
  try {
    // Pad naar het JSON-bestand in je project
    const jsonPath = './database/checkOut.json';
    
    // Lees het bestand synchronisch met fs
    const data = fs.readFileSync(jsonPath, 'utf8'); 

    // Parse de inhoud van het bestand als JSON
    const sprintDataJSON = JSON.parse(data);

    // Render de Liquid template met de data
    response.render('index.liquid', { data: sprintDataJSON });
  }
  catch (err) {
    console.error('JSON is kapot:', err);
    response.status(500).send('JSON werkt niet meer');
  }
});

app.get('/sprint/:sprintNumber', async function(request, response) {
  try {
    // Het nummer van de sprint ophalen uit de URL
    const sprintNumber = request.params.sprintNumber;

    // Pad naar het JSON-bestand in je project
    const jsonPath = './database/projectProgress.json';

    // Lees het bestand synchronisch met fs
    const data = fs.readFileSync(jsonPath, 'utf8'); 

    // Parse de inhoud van het bestand als JSON
    const contentJSON = JSON.parse(data);

    // Zoek de sectie voor de juiste sprint
    const sprintData = contentJSON.data.find(sprint => sprint.title.toLowerCase() === sprintNumber.toLowerCase());

    if (!sprintData) {
      return response.status(404).send('Sprint niet gevonden');
    }

    // Render de Liquid template met de gevonden sprintdata
    response.render('progress', { data: sprintData });
  }
  catch (err) {
    console.error('Er is iets mis met de JSON:', err);
    response.status(500).send('Er is een probleem met de data');
  }
});




app.get('/filter-test', async function (request, response) {
  const personsResponse = await fetch('https://fdnd.directus.app/items/person/?fields=*')
  const personsResponseJSON = await personsResponse.json()

  response.render('filter-test.liquid', {persons: personsResponseJSON.data})
});

app.post('/', async function (request, response) {
  response.redirect(303, '/')
})

app.set('port', process.env.PORT || 8001)

app.listen(app.get('port'), '0.0.0.0', function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
