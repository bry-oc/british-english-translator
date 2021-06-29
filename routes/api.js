'use strict';

const multer = require('multer');

const Translator = require('../components/translator.js');

module.exports = function (app) {
  const upload = multer();
  const translator = new Translator();

  app.route('/api/translate')
    .post(upload.none(), (req, res) => {
      let text = req.body.text;
      let locale = req.body.locale;
      if(!text || !locale) {
        return res.json({ error: 'Required field(s) missing' });
      }
      if(text.length <= 0){
        return res.json({ error: 'No text to translate' });
      }
      if(locale != 'american-to-british' && locale != 'british-to-american'){
        return res.json({ error: 'Invalid value for locale field' });
      }
      if(locale === 'american-to-british'){
        let translation = translator.translateToBritish(text);
        return res.json({text: text, translation: translation});
      }
    });
};
