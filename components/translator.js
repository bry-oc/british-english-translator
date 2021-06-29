const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translateToAmerican(text) {

    }

    translateToBritish(text) {
        console.log(text);
        let words = text.split(/\s|(?=[\.](?!\s))/);
        console.log(words);
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
        if( words[words.length - 1] === '.'){
            console.log('period')
            let last = words.pop();
            let result = words.join(' ');
            result += last;
            return result;
        } else {
            console.log('no period')
            let result = words.join(' ');
            return result;
        }        
        //console.log(result);
        
    }


}

module.exports = Translator;