const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('Translation with text and locale fields: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                text: 'Paracetamol takes up to an hour to work.',
                locale: 'british-to-american'
            })
            .end(function (err, res) {
                assert.equal(res.body.text, 'Paracetamol takes up to an hour to work.');
                assert.equal(res.body.translation, '<span class=\"highlight\">Tylenol</span> takes up to an hour to work.');
                done();
            })
    });
    test('Translation with text and invalid locale field: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                text: 'this is a test with invalid locale',
                locale: 'invalid_locale'
            })
            .end(function (err, res) {
                assert.equal(res.body.error, 'Invalid value for locale field');
                done();
            })
    });
    test('Translation with missing text field: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                locale: 'british-to-american'
            })
            .end(function (err, res) {
                assert.equal(res.body.error, 'Required field(s) missing');
                done();
            })
    });
    test('Translation with missing locale field: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                test: 'this is a test without a locale'
            })
            .end(function (err, res) {
                assert.equal(res.body.error, 'Required field(s) missing');
                done();
            })
    });
    test('Translation with empty text: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                text: '',
                locale: 'british-to-american'
            })
            .end(function (err, res) {
                assert.equal(res.body.error, 'No text to translate');
                done();
            })
    });
    test('Translation with text that needs no translation: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                text: 'Paracetamol takes up to an hour to work.',
                locale: 'american-to-british'
            })
            .end(function (err, res) {
                assert.equal(res.body.text, 'Paracetamol takes up to an hour to work.');
                assert.equal(res.body.translation, 'Everything looks good to me!');
                done();
            })
    });
});
