const fs = require('fs');

const text = fs.readFileSync('test.txt', 'utf-8');
const lines = text.split('\n\n');

let html =
  `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <link rel='stylesheet' type='text/css' href='stylesheets/style.css'>
    </head>
    <body>
      <div id='text' class='section'>`;

for(let i = 0; i < lines.length; i++) {
  let line = '<p>';
  const lineWords = lines[i].split(' ');
  for(let j = 0; j < lineWords.length; j++) {
    let lineWord = lineWords[j];
    let words = lineWord.split('\n');
    for(let wordIdx = 0; wordIdx < words.length; wordIdx++) {
      let word = words[wordIdx];
      word = getRidOfQuotes(word);
      const lastChar = word[word.length - 1];
      let endingPunctuation = '';
      if (isEndingPunctuation(lastChar)) {
        endingPunctuation = lastChar;
        // word = word.split(lastChar)[0];
        word = word.slice(0, word.length - 1);
      }
      word = getRidOfQuotes(word);
      line += createWordLink(word) + endingPunctuation + ' ';
    }
  }
  line = clearTrailingWhiteSpace(line);
  line += '</p>';
  html += '\n' + line;
}
const defSect = `
  <div id='def-sect' class='section'>
    <div id='def-loader' class='loader'></div>
    <div id='def-line'><span id='word'></span><span id='def'></span></div>
  </div>
  `;
html += '\n' + '</div>\n' + defSect + '<script src="javascripts/main.js"></script>\n</body>\n</html>';

fs.writeFileSync('public/test.html', html);

console.log(lines);

function createWordLink(word) {
  let wordLink = '<span class="word">';
  wordLink += word;
  wordLink += '</span>';
  return wordLink;
}

function isEndingPunctuation(lastChar) {
  const endingPunctuation = {
    ',': true,
    '.': true,
    '?': true,
    '!': true,
    ':': true,
  };
  if (endingPunctuation[lastChar]) return true;
  else return false;
}


function getRidOfQuotes(string) {
  const quotes = {
    '"': true,
    "'": true,
  };
  if (quotes[string[0]]) {
    string = string.slice(1);
  }
  if (quotes[string[string.length - 1]]) {
    string = string.slice(0, string.length - 1);
  }
  return string;
}

function clearTrailingWhiteSpace(string) {
  let end = string.length;
  for (let i = string.length -1; i >= 0; i--) {
    if (string[i] === ' ') {
      end--;
    } else break;
  }
  return string.slice(0, end);
}
