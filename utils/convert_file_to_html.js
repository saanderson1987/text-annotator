const fs = require('fs');

module.exports = convertFileToHTML;

function convertFileToHTML(inputPath, outputPath, lang) {
  const text = fs.readFileSync(inputPath, 'utf-8');
  const lines = text.split('\n\n');

  let html = `<div id='text' class='section'>`;

  for(let i = 0; i < lines.length; i++) {
    let line = '<p>';
    const lineWords = lines[i].split(' ');
    for(let j = 0; j < lineWords.length; j++) {
      let lineWord = lineWords[j];
      let words = lineWord.split('\n');
      for(let wordIdx = 0; wordIdx < words.length; wordIdx++) {
        let word = words[wordIdx];
        const firstChar = word[0];
        function lastChar(string) {
          return string[string.length - 1];
        }

        const quotes = {
          '"': true,
          "'": true,
        }
        let firstQuote = '';
        let endOuterQuote = '';
        let endInnerQuote = '';
        if (quotes[word[0]]) {
          firstQuote = firstChar;
          word = word.slice(1);
        }
        if (quotes[word[word.length - 1]]) {
          endOuterQuote = word[word.length - 1];
          word = word.slice(0, word.length - 1);
        }
        let endingPunctuation = '';
        if (isEndingPunctuation(word[word.length - 1])) {
          endingPunctuation = word[word.length - 1];
          word = word.slice(0, word.length - 1);
        }
        if (quotes[word[word.length - 1]]) {
          endInnerQuote = word[word.length - 1];
          word = word.slice(0, word.length -1);
        }
        if (lang !== 'en') {
          const wordsSplitByApostrophe = word.split("'");
          if (wordsSplitByApostrophe.length > 1) {
            word = '';
            wordsSplitByApostrophe.forEach((wordSplit, idx) => {
              word += createWordLink(wordSplit);
              if (idx === 0) word += "'";
            });
          } else {
            word = createWordLink(word);
          }
        } else {
          word = createWordLink(word);
        }
        line += firstQuote + word + endInnerQuote + endingPunctuation + endOuterQuote + ' ';
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
  html += '\n' + '</div>\n' + defSect;

  fs.writeFileSync(outputPath, html);

  // console.log(lines);

}


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
