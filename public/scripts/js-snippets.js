let longpress = document.querySelector('.longpress-button');
let longpressOutput = document.querySelector('.longpress-output');

// de functie aan roepen
holdTime(longpress);


// de fuctie die berekent hoeveel miliseconden de knop ingedrukt was.
function holdTime(link) {
  link.addEventListener('mousedown', (e) => {
    // 0 is de linker muisknop
    console.log(e.button);

    if (e.button == 0) {
      // sla op: de huidige tijd, in miliseconden, op het moment van mousedown
      startTime = Date.now();

      // check wat gebeurt
      console.log('start time ' + startTime);

      // haal de oude losGelaten class weg. voor de volgende keer dat de knop los gelaten wordt.(hier onder)
      link.classList.remove('losGelaten');

      // op mousedown add een class die de link kleiner maakt en van kleur veranderd.
      link.classList.add('ingedrukt');
    }
  });

  link.addEventListener('mouseup', (f) => {
    if (f.button == 0) {
      // sla op: de huidige tijd, in miliseconden, op het moment van mouseup
      stopTime = Date.now()

      // bereken het verschil tussen de start en stop tijden. dit is de tijd hoelang de knop ingedrukt was.
      holdTijd = stopTime - startTime;

      // check wat gebeurt
      console.log('stop time ' + stopTime);
      console.log('verschil ' + holdTijd);
      longpressOutput.textContent = 'Ik was ingedrukt voor ' + holdTijd + ' miliseconden'
    }

    // als het langer dan 2 seconden ingedrukt was, verander de kleur
    if (holdTijd >= 2000) {
      link.classList.add('losGelaten');
    } else {
      // haal de ingedrukt class weg als het niet lang genoeg ingedrukt was.
      link.classList.remove('ingedrukt');
      console.log('probeer tenminste 2 seconden ingedrukt te houden');
    }
  });
}
