'use strict'

module.exports = (slapp) => {

  slapp.command('slascii', '(.*)', (msg, text, name) => {
    console.log(msg, text, name);
  });

}
