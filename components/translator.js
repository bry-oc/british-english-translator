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
                let title = [];
                let titleLength = americanToBritishTitles[words[i].toLowerCase()].length;
                for(let j = 0; j < titleLength; j++){
                    if(j === 0) {
                        title.push(americanToBritishTitles[words[i].toLowerCase()][j].toUpperCase());
                    } else {
                        title.push(americanToBritishTitles[words[i].toLowerCase()][j]);
                    }                    
                }
                title = title.join('');               
                words[i] = title;
            }
            if(words[i].match(/\d\d?:\d{2}/)){
                words[i] = words[i].replace(':','.');
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
    }


}

module.exports = Translator;