const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translateToAmerican(text) {

    }

    translateToBritish(text) {
        console.log(text);
        //let words = text.split(/\s|(?=[\.](?!\s))/);
        let words = text.split(/\s|(?=[\.])/);
        console.log(words);
        let translated = []
        let word;
        for (let i = 0; i < words.length; i++) {
            if (americanOnly[words[i].toLowerCase()]) {
                word = '<span class="highlight">' + americanOnly[words[i].toLowerCase()] + '</span>';
            } else if(i + 1 <= words.length - 1 && americanOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase()]){
                word = '<span class="highlight">' + americanOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase()] + '</span>';
                i++;
            } else if(i + 2 <= words.length - 1 && americanOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase() + " " + words[i+2].toLowerCase()]){
                word = '<span class="highlight">' + americanOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase() + " " + words[i+2].toLowerCase()] + '</span>';
                i++;
                i++;
            } else if (americanToBritishSpelling[words[i].toLowerCase()]) {
                word = '<span class="highlight">' + americanToBritishSpelling[words[i].toLowerCase()] + '</span>';
            } else if (americanToBritishTitles[words[i].toLowerCase() + '.']) {
                console.log('this is a title');
                let title = [];
                let titleLength = americanToBritishTitles[words[i].toLowerCase() + '.'].length;
                for(let j = 0; j < titleLength; j++){
                    if(j === 0) {
                        title.push(americanToBritishTitles[words[i].toLowerCase() + '.'][j].toUpperCase());
                    } else {
                        title.push(americanToBritishTitles[words[i].toLowerCase() + '.'][j]);
                    }                    
                }
                title = title.join('');          
                word = '<span class="highlight">' + title + '</span>';
                i++;
            } else if(words[i].match(/\d\d?:\d{2}/)){
                word = '<span class="highlight">' + words[i].replace(':','.') + '</span>';
            } else {
                word = words[i];
            }
            if(words[i + 1] === '.'){
                words[i] += '.';
                translated.push(word + '.');
                i++;
            } else {
                translated.push(word);
            }
        }
        if( translated[translated.length - 1] === '.'){
            console.log('period')
            let last = translated.pop();
            let result = translated.join(' ');
            result += last;
            return result;
        } else {
            console.log('no period')
            let result = translated.join(' ');
            return result;
        }                
    }


}

module.exports = Translator;