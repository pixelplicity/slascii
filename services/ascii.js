'use strct';

const Firebase = require('firebase');

class Service {
  constructor() {
    this.db = Firebase.database().ref('ascii');
    this.asciiStore = {};

    this.db.on('value', (snapshot) => {
      this.asciiStore = snapshot.val();
    }, (err) => {
      console.error(err);
    });
  }
  find(){

  }
  get(name) {
    return new Promise((resolve, reject) => {
      this.asciiStore[name] ? resolve(this.asciiStore[name]) : reject();
    });
  }
}

module.exports = new Service();
