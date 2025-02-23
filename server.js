import express from 'express'
import { Liquid } from 'liquidjs';

import fs from 'fs';
import path from 'path';

const app = express()

app.use(express.static('public'))
const engine = new Liquid();
app.engine('liquid', engine.express()); 
app.set('views', './views')
app.use(express.urlencoded({extended: true}))


// app.get('/', async function (request, response) {
//   const personResponse = await fetch('/database/sprint1.json')
//   const personResponseJSON = await personResponse.json()

//   response.render('index.liquid', {website: personResponseJSON.data})
// })

app.get('/', async function (request, response) {
  try {
    // Pad naar het JSON-bestand in je project
    const jsonPath = './database/sprint1.json';
    
    // Lees het bestand synchronisch met fs
    const data = fs.readFileSync(jsonPath, 'utf8'); 

    // Parse de inhoud van het bestand als JSON
    const sprintDataJSON = JSON.parse(data);

    // Render de Liquid template met de data
    response.render('index.liquid', { data: sprintDataJSON.articles });
  } catch (err) {
    console.error('Error reading the JSON file:', err);
    response.status(500).send('Error reading JSON file');
  }
});

app.post('/', async function (request, response) {
  response.redirect(303, '/')
})

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
