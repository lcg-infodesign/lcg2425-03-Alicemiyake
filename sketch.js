let data;
let rows;

//colori
let rectColor = "darkblue";
let continentColors = {
  "Africa": "#88d4ca",
  "South America": "#59709c",
  "Asia": "#6497b1",
  "North America": "#266CA9",
  "Australia": "#ADE1FB",
  "Europe": "#b3cde0",
  "Oceania": "#81D8D0"
};

function preload() {
  data = loadTable("Assets/data.csv", "csv", "header" );
}



function setup() {
  //otteniamo le righe del dataset
  rows = data.getRows();

  //calcolo larghezza finestra 
  let canvasWidth = rows.length * 20;

  //calcolo altezza finestra 
  let canvasHeight = rows.length * 20; 

  createCanvas(canvasWidth, canvasHeight);

  

}
  


function draw() {
  background(220);
    

// Posizione iniziale per la lista di cerchi colorati, accanto al titolo
  let startX = 60; // Posiziona la lista di cerchi a destra del titolo
  let startY = 150;

  // Ciclo sui continenti con i loro colori
  let i = 0;
  for (let continent in continentColors) {
    let color = continentColors[continent];
    
    // Disegna un cerchio e un'etichetta per ogni continente
    drawColoredCircleWithLabel(startX, startY + i * 30, color, continent);
    
    i++;
  }
  
  //scrivo titolo 
    textSize(50);
    fill("black");
    text("Rivers in the World", startX - 10, startY - 50);

  //sposto tutto verso il basso 
  let yOffset = 400;
  translate(0, yOffset);

  //definisco dimensioni rect
  let rectWidth = 2;
  let rectHeight = 80;

  //ciclo for per diseganre un glifo per ogni riga
  for(let i = 0; i < rows.length; i++) {

    //carico i dati della riga
    let rowData = rows[i].obj;

    //decido posizione rect
    let x = 50 + i * 20;
    let y = 500;

    drawGlyph(x, y, rectWidth, rectHeight, rowData); 
    
  } 
  

}


function drawGlyph(x, y, width, height, rowData) {

  //allungo rect in base a lunghezza fiume
  let riverLength = map(rowData.length, 0, 6650, 20, windowHeight / 2);

  //assegno colore in base a continente
  let continentColor = continentColors[rowData.continent] || "darkblue";

  //disegno minirect per ogni fiume
  fill(continentColor);
  noStroke();
  rect(x, y - riverLength, width, riverLength);

  //disegno cerchietto per ogni fiume
  ellipse(x + width / 2, y, 10, 10);

  //scrivo il nome
  fill(continentColor);
  textSize(12);
  textAlign(RIGHT, RIGHT); //posiziono testo alla base del rect

  //Salvo stato trasformazione
  push();

  //posiziono testo in verticale
  translate (x + width / 2, y + 10 ); //posiziono punto d'origine alla base del rect
  rotate(-HALF_PI);
  text (rowData.name, 0, 0);
  
  
  //ripristino stato di trasformazione
  pop();
}

function drawColoredCircleWithLabel(x, y, color, label) {
  // Disegna il cerchio
  fill(color);
  noStroke();
  ellipse(x, y, 20, 20); // Disegna un cerchio di raggio 10
  
  // Disegna l'etichetta accanto al cerchio
  fill("black");
  textSize(14);
  textAlign(LEFT, CENTER);
  text(label, x + 15, y); // Posiziona il testo a destra del cerchio
}
