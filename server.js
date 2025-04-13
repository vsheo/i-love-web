import express from "express";
import { Liquid } from "liquidjs";

import fs from "fs";
import { readdir, readFile } from "node:fs/promises";
// const markedUpFileContetnt = await readFile ("content" + req.params.iets)
import { marked } from "marked";

const app = express();

app.use(express.static("public"));

const engine = new Liquid();
app.engine("liquid", engine.express());

app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));


// index json ophalen
// Pad naar het JSON-bestand in je project
const jsonPath = "./database/checkOut.json";
// Lees het bestand synchronisch met fs
const data = fs.readFileSync(jsonPath, "utf8");
// Parse de inhoud van het bestand als JSON
const sprintDataJSON = JSON.parse(data);


app.get("/", async function (request, response) {
    try {
        // Render de Liquid template met de data
        response.render("index.liquid", { data: sprintDataJSON.data });
    } catch (err) {
        console.error("JSON is kapot:", err);
        response.status(500).send("JSON werkt niet meer");
    }
});

app.get("/journal/:slug", async function (request, response) {
    // haal de slug op uit de url
    const slug = request.params.slug;
    // console.log(slug);

    try {
        // zoek sprint data die overeen komt met de slug
        const sprintCheckOuts = sprintDataJSON.data.find(
            (sprint) => sprint.slug == slug
        );
        // console.log(sprintCheckOuts)

		// data: [sprintCheckOuts]: een array met alleen de checkouts van 1 sprint zodat de liquid for loop blijft werken
        response.render("index.liquid", { data: [sprintCheckOuts] });
    } catch (err) {
        console.error("JSON is kapot:", err);
        response.status(500).send("JSON werkt niet meer");
    }
});

app.get("/progress/:slug", async function (request, response) {
    const slug = request.params.slug;

    try {
        const jsonPath = "./database/progress.json";
        const progressData = fs.readFileSync(jsonPath, "utf8");
        const progressDataJSON = JSON.parse(progressData);
        const sprintData = progressDataJSON.data.find(
            (sprint) => sprint.slug == slug
        );

        response.render("progress.liquid", { data: sprintData });
    } catch (err) {
        console.error("JSON is kapot:", err);
        response.status(500).send("JSON werkt niet meer");
    }
});


// json & liquid testen
app.get("/checkout-test", async function (request, response) {
	const jsonPath = "./database/dataTest.json";
	const data = fs.readFileSync(jsonPath, "utf8");
	const dataJSON = JSON.parse(data);
	response.render("checkout-test.liquid", { data: dataJSON.data[0].data });
  });
  


app.post("/", async function (request, response) {
    response.redirect(303, "/");
});

app.set("port", process.env.PORT || 8001);

app.listen(app.get("port"), "0.0.0.0", function () {
    console.log(`Application started on http://localhost:${app.get("port")}`);
});
