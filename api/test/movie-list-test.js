const assert = require('chai').expect;

const page = require('../page/movie-list-page.js');

const testCase = {
 "positive" : {
    "getList" : "As a User, I want to be able to get OMDB Movie list",
 },
 "negative" : {
    "noSearch" : "As a User, I should got error message when I send request without key of search",
    "invalidApiKey" : "As a User, I should got error 401 when I send request with invalid API Key",
    "noApiKey" : "As a User, I should got error message when I send request without API Key",
    "InvalidTitle" : "As a User, I should got error message when I send request with invalid movie title"
 }
}

describe(`OMDB Movie List`, () => {
 const apiKey = '6b9912f0';
 const invalidApiKey = 'sdfsdf';
 const keySearch = 'museum';
 const InvalidTitle = 'museumz';

 it(`@get ${testCase.positive.getList}`, async() => {
  const response = await page.getMovieList(apiKey, keySearch);
  assert(response.status).to.equal(200);
 }),

 it(`@get ${testCase.negative.noSearch}`, async() => {
    const response = await page.getMovieList(apiKey, '');
    assert(response.status).to.equal(200);
   }),

 it(`@get ${testCase.negative.invalidApiKey}`, async() => {
    const response = await page.getMovieList(invalidApiKey, keySearch);
    assert(response.status).to.equal(401, response.body.Error);
    assert(response.body.Response).to.equal('False');
    assert(response.body.Error).to.equal('Invalid API key!');
   }),

 it(`@get ${testCase.negative.noApiKey}`, async() => {
    const response = await page.getMovieList('', keySearch);
    assert(response.status).to.equal(401, response.body.Error);
    assert(response.body.Response).to.equal('False');
    assert(response.body.Error).to.equal('No API key provided.');
   }),

   it(`@get ${testCase.negative.InvalidTitle}`, async() => {
    const response = await page.getMovieList(apiKey, InvalidTitle);
    assert(response.status).to.equal(200);
   })
 }) 