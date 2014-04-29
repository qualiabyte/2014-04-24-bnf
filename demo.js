var fs = require('fs');
var diagram = require('ebnf-diagram');
var exec = require('child_process').exec;

var grammars = {
  literal: 'a = "a".'
, simple: fs.readFileSync('./grammars/simple.ebnf', 'utf8')
, objects: fs.readFileSync('./grammars/objects.ebnf', 'utf8')
};

var renderGrammars = function() {
  for (var type in grammars) {
    var grammar = grammars[type];
    var title = 'My ' + type + ' grammar.';
    var comment = "Pretty neat!";
    var input = '"' + title + '" {\n' + grammar + '\n}"' + comment + '"';
    var matches = grammar.match(/\n+/g) || [];
    var lines = matches.length || 1;
    var w = 1600;
    var h = Math.max(1200, lines*100);
    var outfile = './build/' + type + '.png';
    diagram.fromText(input, outfile, w, h);
  }
};

var main = function() {
  exec('mkdir -p build', function(err, stdout, stderr) {
    renderGrammars();
  });
};

main();
