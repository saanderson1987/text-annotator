const axios = require('axios');

exports.getTrans = function (req, res) {
  const dict = {from: req.body.from, to: req.body.to};
  let word = req.body.word;
  parseRequestWord(word, dict.from)
    .then( (word) => {
      fetchTrans(word, dict)
        .then( (data) => {
          res.send(data);
        });
    });

};

function fetchTrans(word, dict) {
  const from = dict.from;
  const to = dict.to;
  const url = `https://glosbe.com/gapi/translate?from=${from}&dest=${to}&format=json&phrase=${word}&pretty=true`;
  console.log('fetchTrans url:', url);
  return axios.get(url)
    .then( (res) => {
      console.log(parseData(res.data));
      return parseData(res.data);
    })
    .catch( (error) => {
      console.log(error);
    });
}

function parseData(data) {
  // data = JSON.parse(data);
  const word = data.phrase;
  const notFound = [word, 'DEFINITION NOT FOUND']
  if (!data.tuc) return notFound;
  let entries = data.tuc.slice(0, 2);
  entries = entries.map( entry => {
    if (entry.phrase) return entry.phrase.text;
  })
  if (entries[0] === undefined && entries[1] === undefined) return notFound;
  let entryText = entries.join('; ');
  return [word, entryText];
}

function parseRequestWord(word, lang) {
  word = word.toLowerCase();
  word = encodeURIComponent(word); // convert accents to % encoding for URI.
  return lemmatizeWord(word, lang)
  .then((lemma) => {
    return lemma;
  });
}

function lemmatizeWord(word, lang) {
  const meaningCloudlang = {
    fra: 'fr',
    spa: 'es',
    eng: 'en'
  };
  lang = meaningCloudlang[lang];
  const url = `https://api.meaningcloud.com/parser-2.0?key=7064e8088431023a42fd7ef5c7d3db41&lang=${lang}&txt=${word}`
  return axios.get(url)
  .then( (res) => {
    let lemma = res.data.token_list[0].token_list[0].token_list[0].analysis_list[0].lemma;
    lemma = encodeURIComponent(lemma)
    return lemma;
  })
  .catch( (error) => {
    console.log(error);
  })
}
