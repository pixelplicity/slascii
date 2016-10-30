'use strct';

const Firebase = require('firebase');
const ASCIIService = require('../services/ascii');

class Service {
  constructor() {
    this.db = Firebase.database().ref('messages');
  }
  _track(user, channel, team, name){
    this.db.push({
      ascii: name,
      user,
      channel,
      team,
      ts: Firebase.database.ServerValue.TIMESTAMP
    });
  }
  send(msg, name) {
    return new Promise((resolve, reject) => {
      ASCIIService.get(name).then((ascii) => {
        msg.say({
          text: ascii,
          response_type: 'in_channel', // jshint ignore:line
          as_user: true // jshint ignore:line
        }, (err) => {
          if(err) {
            this.error(msg);
          }
          this._track(msg.body.user_id, msg.body.channel_id, msg.body.team_id, name); // jshint ignore:line
        });
      })
      .catch(() => {
        this.notFound()
      });
      this.asciiStore[name] ? resolve(this.asciiStore[name]) : reject();
    });
  }
  notFound(msg, name) {
    return new Promise((resolve, reject) => {
      ASCIIService.get(name).then((ascii) => {
        msg.respond({
          text: `(⋟﹏⋞) Oh no, we didn't find the ascii '${name}'. Maybe one of these will work?`,
          attachments: [
            {
              text: '',
              callback_id: 'suggest_ascii',
              actions: [
                {
                  name: 'answer',
                  text: ascii['tableflip'],
                  type: 'button',
                  value: 'tableflip'
                },
                {
                  name: 'answer',
                  text: ascii['shrug'],
                  type: 'button',
                  value: 'shrug'
                }
              ]
            }
          ],
          as_user: false // jshint ignore:line
        });
      });
    });
  }
  error(msg) {
    msg.say(`(╥﹏╥), Something bad happened`);
  }
}

module.exports = new Service();
