const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator;

suite('Unit Tests', () => {
    suite('Translate from American English to British English', function () {
        test('Translate Mangoes are my favorite fruit. to British English', function () {
            let translated = translator.translateToBritish('Mangoes are my favorite fruit.');
            assert.equal(translated, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        });
        test('Translate I ate yogurt for breakfast. to British English', function () {
            let translated = translator.translateToBritish('I ate yogurt for breakfast.');
            assert.equal(translated, 'I ate <span class="highlight">yoghurt</span> for breakfast.');
        });
        test('Translate We had a party at my friend\'s condo. to British English', function () {
            let translated = translator.translateToBritish('We had a party at my friend\'s condo.');
            assert.equal(translated, 'We had a party at my friend\'s <span class="highlight">flat</span>.');
        });
        test('Translate Can you toss this in the trashcan for me? to British English', function () {
            let translated = translator.translateToBritish('Can you toss this in the trashcan for me?');
            assert.equal(translated, 'Can you toss this in the <span class="highlight">bin</span> for me?');
        });
        test('Translate The parking lot was full. to British English', function () {
            let translated = translator.translateToBritish('The parking lot was full.');
            assert.equal(translated, 'The <span class="highlight">car park</span> was full.');
        });
        test('Translate Like a high tech Rube Goldberg machine. to British English', function () {
            let translated = translator.translateToBritish('Like a high tech Rube Goldberg machine.');
            assert.equal(translated, 'Like a high tech <span class="highlight">Heath Robinson device</span>.');
        });
        test('Translate To play hooky means to skip class or work. to British English', function () {
            let translated = translator.translateToBritish('To play hooky means to skip class or work.');
            assert.equal(translated, 'To <span class="highlight">bunk off</span> means to skip class or work.');
        });
        test('Translate No Mr. Bond, I expect you to die. to British English', function () {
            let translated = translator.translateToBritish('No Mr. Bond, I expect you to die.');
            assert.equal(translated, 'No <span class="highlight">Mr</span> Bond, I expect you to die.');
        });
        test('Translate Dr. Grosh will see you now. to British English', function () {
            let translated = translator.translateToBritish('Dr. Grosh will see you now.');
            assert.equal(translated, '<span class="highlight">Dr</span> Grosh will see you now.');
        });
        test('Translate Lunch is at 12:15 today. to British English', function () {
            let translated = translator.translateToBritish('Lunch is at 12:15 today.');
            assert.equal(translated, 'Lunch is at <span class="highlight">12.15</span> today.');
        });
    })
});
