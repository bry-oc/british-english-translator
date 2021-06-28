const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translateToAmerican(text) {

    }

    translateToBritish(text) {
        let words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
            if (americanOnly[words[i].toLowerCase()]) {
                words[i] = americanOnly[words[i].toLowerCase()];
            }
            if (americanToBritishSpelling[words[i].toLowerCase()]) {
                words[i] = americanToBritishSpelling[words[i].toLowerCase()];
            }
            if (americanToBritishTitles[words[i].toLowerCase()]) {
                words[i] = americanToBritishTitles[words[i].toLowerCase()];
            }
        }
        let result = words.join(' ');
        return result;
    }


}

module.exports = Translator;