'use strict';

const Firebase = require('firebase');
const asciiRef = Firebase.database().ref('ascii');
const messagesRef = Firebase.database().ref('messages');
let ASCIIStore = {};

module.exports = (slapp) => {

  asciiRef.on('value', (snapshot) => {
    ASCIIStore = snapshot.val();
  }, (err) => {
    console.error(err);
  });

  function trackAscii(msg, name) {
    const user = msg.body.user_id || msg.body.user.id; // jshint ignore:line
    const channel = msg.body.channel_id || msg.body.channel.id; // jshint ignore:line
    const team = msg.body.team_id || msg.body.team.id; // jshint ignore:line

    messagesRef.push({
      ascii: name,
      user,
      channel,
      team,
      ts: Firebase.database.ServerValue.TIMESTAMP
    });
  }

  function sendError(msg) {
    msg.say(`o(╥﹏╥)o, Something bad happened`);
  }

  function sendAscii(msg, name) {
    console.log('sendASCII', msg.body);
    if(!ASCIIStore[name]) {
      msg.respond({
        text: `o(╥﹏╥)o Oh no, we didn't find the ascii '${name}'. Maybe one of these will work?`,
        attachments: [
          {
            text: '',
            callback_id: 'suggest_ascii', // jshint ignore:line
            actions: [
              {
                name: 'answer',
                text: ASCIIStore.tableflip,
                type: 'button',
                value: 'tableflip'
              },
              {
                name: 'answer',
                text: ASCIIStore.shrug,
                type: 'button',
                value: 'shrug'
              },
              {
                name: 'answer',
                text: ASCIIStore.tableflip,
                type: 'button',
                value: 'tableflip'
              },
              {
                name: 'answer',
                text: ASCIIStore.shrug,
                type: 'button',
                value: 'shrug'
              },
              {
                name: 'answer',
                text: ASCIIStore.tableflip,
                type: 'button',
                value: 'tableflip'
              },
              {
                name: 'answer',
                text: ASCIIStore.shrug,
                type: 'button',
                value: 'shrug'
              }
            ]
          }
        ],
        as_user: false // jshint ignore:line
      });
      return;
    } else {
      msg.say({
        text: ASCIIStore[name],
        response_type: 'in_channel', // jshint ignore:line
        as_user: true // jshint ignore:line
      }, (err) => {
        if(err) {
          sendError(msg);
          return;
        }
        trackAscii(msg, name); // jshint ignore:line
      });
    }
  }

  slapp.command('/slascii', '(.*)', (msg, text, name) => {
    sendAscii(msg, name);
  });

  slapp.action('suggest_ascii', 'answer', (msg, answer) => {
    msg.respond(msg.body.response_url, '( ⌒o⌒)人(⌒-⌒ )'); // jshint ignore:line
    sendAscii(msg, answer);
  });

}
