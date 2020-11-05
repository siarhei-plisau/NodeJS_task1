import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import { Writable } from 'stream';
import { pipeline } from 'stream';

const txtFilePath = path.resolve('src/txt/result.txt');
const csvFilePath = path.resolve('src/csv/nodejs-hw1-ex1.csv');
const readStream = fs.createReadStream(csvFilePath);

fs.open(txtFilePath, 'w', (err) => {
  if(err) throw err;
  console.log('txt file open');
});

function CSVtoJSON() {
  return (
    csv()
         .on('data', (data) => console.log(`read from csv:${data.toString('utf8')}`) )
         .on('error', (err) => console.log(err) )
  )
}

function writeStream() {
  return (
    new Writable({
      write(json, encoding,callback) {
              fs.appendFile(txtFilePath, json, (err) => {
              if(err) throw err;
              });
              if ( json.length !== 0 ) { 
                callback( console.log(`write to txt file:${json}`) );
              } else callback( new Error('chunk is invalid'));
            },
              objectMode:true
      }
    ).on('error', (err) => console.log(err))
  )
}

pipeline(
readStream,
CSVtoJSON(),
writeStream(),
(err) => {
  if (err) {
    console.error('Pipeline failed.', err);
  } else console.log('Pipeline succeeded.');
});
