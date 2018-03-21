'use strict'
const port =process.env.PORT || 3001;
const express = require('express');
const bodyParser = require('body-parser');
const wkhtmltopdf = require('wkhtmltopdf');
const path = require('path');
const app = express();
var blobStream = require('blob-stream');
const fs = require('fs');
const PDFDocument = require('./pdfkit-tables');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.get('/', (req,res)=>{
  var doc = new PDFDocument({
  size: 'legal',
  layout: 'landscape' // default is portrait
});
  var stream = doc.pipe(blobStream());

  // draw some text
  doc.fontSize(25)
     .text('Titulo', 20, 30);
  doc.fontSize(12)
    .text('Fecha:20/03/2018', 820, 30);
  doc.moveDown().fontSize(15)
      .text('Variables', 20, 70);///20 ese ancho y 70  la altura

  // some vector graphics
  const table0 = {
    headers: ['Word', 'Comment', 'Summary','asd','asss'],
    rows: [
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa'],
        ['Apple', 'Not this one', 'Lor','ass','assa'],
        ['Tire', 'Smells like funny', 'Lor','ass','assa']
    ]
};

doc.moveDown().table(table0, {
    prepareHeader: () => doc.font('Helvetica-Bold'),
    prepareRow: (row, i) => doc.font('Helvetica').fontSize(10)
});



  // end and display the document in the iframe to the right
  doc.pipe(res);
  doc.end();


  stream.on('finish', function() {
  //  iframe.src = stream.toBlobURL('application/pdf');
  });
});



app.listen(3000, () =>{
    console.log(`Api rest  corriendo en el puerto : ${port}`);
 })
