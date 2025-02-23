import express from 'express'
import { Liquid } from 'liquidjs';

const squadResponse = await fetch('https://fdnd.directus.app/items/squad?filter={"_and":[{"cohort":"2425"},{"tribe":{"name":"FDND Jaar 1"}}]}')
const squadResponseJSON = await squadResponse.json()
const app = express()

app.use(express.static('public'))
const engine = new Liquid();
app.engine('liquid', engine.express()); 
app.set('views', './views')
app.use(express.urlencoded({extended: true}))


app.get('/', async function (request, response) {
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=website,squads.squad_id.name&filter={"squads":{"squad_id":{"name":{"_eq":"1G"}}}}')
  const personResponseJSON = await personResponse.json()

  response.render('index.liquid', {website: personResponseJSON.data})
})

app.post('/', async function (request, response) {
  response.redirect(303, '/')
})

app.set('port', process.env.PORT || 8080)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
