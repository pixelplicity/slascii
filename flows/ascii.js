'use strict'

module.exports = (slapp) => {

  slapp.command('/slascii', '(.*)', (msg, text, name) => {
    msg.respond({
      text: `(╯°□°）╯︵ ┻━┻`,
      response_type: 'in_channel',
      as_user: true
    }, (err) => {
      if(err) {
        console.error(err);
      }
    });
  });

}
