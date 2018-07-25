function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
function main() {
  data = '';
  var d = new Date(Date.parse(document.getElementsByClassName('roundStarted') [0].innerHTML.substring(22, 34).replace(',', '')));
  var nl = '&#10;';
  data += '[Event "' + document.getElementsByClassName('title') [0].innerHTML + '"]' + nl;
  data += '[Date "' +  d.getFullYear() + '.' +String('0' + d.getMonth()).slice( - 2) + '.' + String('0' + d.getDate()).slice( - 2) + '"]' + nl;
  data += '[White "' + document.getElementsByClassName('name')[2].innerHTML + '"]' + nl;
  data += '[Black "' + document.getElementsByClassName('name') [1].innerHTML + '"]' + nl;
  data += '[WhiteElo "' + document.getElementsByClassName('elo white') [0].innerHTML + '"]' + nl;
  data += '[BlackElo "' + document.getElementsByClassName('elo black') [0].innerHTML + '"]' + nl + nl;
  var res = document.getElementsByClassName('score')[0].innerHTML;
  data += '[Result "' + (res == decodeHtml('&frac12;') ? '1/2-1/2' : (res == 0 ? '1-0' :'0-1')) + '"]' + nl + nl;
  var moves = document.getElementsByClassName('move');
  var game = '';
  for (var i = 0; i < moves.length; i++) {
    if (i % 2 == 0) {
      if (i != 0) {
        game += ' ';
      }
      game += ((i + 2) / 2) + '.';
    }
    game += ' ' + moves[i].innerHTML.trim();
  }
  data += game;
  var d = document.createElement('button');
  d.innerHTML = 'Copy game';
  d.style.position = 'absolute';
  d.style.top = '60%';
  d.style.left = '25%';
  d.style.zIndex = '9999';
  d.id = 'copy';
  d.onclick = function () {
    try {
      var t = document.createElement('textarea');
      t.innerHTML = data;
      document.body.appendChild(t);
      t.focus();
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
      var b = document.getElementById('copy');
      document.body.removeChild(b);
      alert('PGN copied successfully!');
    } catch (e) {
      alert('PGN copying failed!');
    };
  };
  document.body.appendChild(d);
}
main();
