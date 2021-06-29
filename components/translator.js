const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translateToAmerican(text) {
        let words = text.split(/\s|(?=[\.](?!\d{2}))|(?=[\?|\!])/);
        console.log(words);
        let translated = []
        let word;
        for(let i = 0; i < words.length; i++) {            
            if(i + 2 <= words.length - 1 && britishOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase() + " " + words[i+2].toLowerCase()]){
                word = '<span class="highlight">' + britishOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase() + " " + words[i+2].toLowerCase()] + '</span>';
                i++;
                i++;
            } else if(i + 1 <= words.length - 1 && britishOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase()]){
                word = '<span class="highlight">' + britishOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase()] + '</span>';
                i++;
            } else if (britishOnly[words[i].toLowerCase()]) {
                word = '<span class="highlight">' + britishOnly[words[i].toLowerCase()] + '</span>'; 
            } else if(this.getKeyByValue(americanToBritishSpelling, words[i].toLowerCase())){
                word = '<span class="highlight">' + this.getKeyByValue(americanToBritishSpelling, words[i].toLowerCase()) + '</span>';
            } else if(this.getKeyByValue(americanToBritishTitles, words[i].toLowerCase())){
                let title = this.getKeyByValue(americanToBritishTitles, words[i].toLowerCase());
                word = '<span class="highlight">' + title.charAt(0).toUpperCase() + title.slice(1) + '</span>';                
            } else if(words[i].match(/\d\d?\.\d{2}/)){
                word = '<span class="highlight">' + words[i].replace('.',':') + '</span>';
            } else {
                word = words[i];
            }
            if(i + 1 <= words.length && (words[i + 1] === '.' || words[i + 1] === '?' || words[i + 1] === '!')){
                translated.push(word + words[i + 1]);
                i++;
            } else {
                translated.push(word);
            }              
        }
        console.log(translated.join(' '));
        let result = translated.join(' ');
        return result;  
    }

    translateToBritish(text) {
        let words = text.split(/\s|(?=[\.|\?|\!])/);
        let translated = []
        let word;
        for (let i = 0; i < words.length; i++) {            
            if(i + 2 <= words.length - 1 && americanOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase() + " " + words[i+2].toLowerCase()]){
                word = '<span class="highlight">' + americanOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase() + " " + words[i+2].toLowerCase()] + '</span>';
                i++;
                i++;
            } else if (americanOnly[words[i].toLowerCase()]) {                
                word = '<span class="highlight">' + americanOnly[words[i].toLowerCase()] + '</span>';
            } else if(i + 1 <= words.length - 1 && americanOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase()]){
                word = '<span class="highlight">' + americanOnly[words[i].toLowerCase() + " " + words[i+1].toLowerCase()] + '</span>';
                i++;
            } else if (americanToBritishSpelling[words[i].toLowerCase()]) {
                word = '<span class="highlight">' + americanToBritishSpelling[words[i].toLowerCase()] + '</span>';
            } else if (i + 1 <= words.length - 1 && americanToBritishTitles[words[i].toLowerCase() + words[i+1].toLowerCase()]) {
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
            if(i + 1 <= words.length && (words[i + 1] === '.' || words[i + 1] === '?' || words[i + 1] === '!')){
                translated.push(word + words[i+1]);
                i++;
            } else {
                translated.push(word);
            }
        }        
        let result = translated.join(' ');
        return result;               
    }

    getKeyByValue(obj, value){
        return Object.keys(obj).find(key => obj[key] === value);
    }
}

module.exports = Translator;