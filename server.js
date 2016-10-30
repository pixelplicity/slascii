'use strict';

const config = require('config');
const express = require('express');
const Firebase = require('firebase');
const Slapp = require('slapp');
const BeepBoopConvoStore = require('slapp-convo-beepboop');
const BeepBoopContext = require('slapp-context-beepboop');
const port = process.env.PORT || config.get('port');
const slapp = Slapp({
  record: 'out.jsonl',
  convo_store: BeepBoopConvoStore(), // jshint ignore:line
  context: BeepBoopContext()
});

Firebase.initializeApp({
  serviceAccount: config.get('firebase.service'),
  databaseURL: config.get('firebase.url')
});

require('./flows')(slapp);
const app = slapp.attachToExpress(express())

app.get('/', function (req, res) {
  res.send('┬┴┬┴┤･ω･)ﾉ├┬┴┬┴');
});

const server = app.listen(port);

server.on('listening', () => {
  console.log(`Slascii started on ${port}`);
});
