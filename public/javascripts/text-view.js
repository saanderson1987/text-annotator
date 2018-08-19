const text = document.getElementById('text');
const wordEl = document.getElementById('word');
const def = document.getElementById('def');

const dict = {
  from: 'fra',
  to: 'eng'
}

$('.dictionary').change(function(event) {
  const language = event.target.value;
  const dictionaryType = event.target.id;
  dict[dictionaryType] = language;
  console.log(dict);
});

text.addEventListener('click', function () {
  if (event.target.classList.contains('word')) {
    let word = event.target.innerHTML;
    console.log(`word: ${word}`);
    $('#def-line').toggle();
    $('#def-loader').toggle();
    getDefinition(word, dict).then((data) => {
      console.log(data);
      const entryWord = data[0];
      const defText = data[1];
      $('#def-loader').toggle();
      $('#def-line').toggle();
      wordEl.textContent = `${entryWord}: `;
      // def.textContent = `${defText}`;
      $('#def').html($.parseHTML(defText));
    });
  }
});

function getDefinition(word, dict) {
  return $.ajax({
    method: 'POST',
    url: '/trans',
    data: {word: word, from: dict.from, to: dict.to},
  });
}
