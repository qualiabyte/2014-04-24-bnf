var fs = require('fs');
var diagram = require('ebnf-diagram');
var exec = require('child_process').exec;

var grammars = {
  literal: 'a = "a".'
, simple: fs.readFileSync('./grammars/simple.grammar', 'utf8')
, objects: fs.readFileSync('./grammars/objects.ebnf', 'utf8')
};

var renderGrammars = function() {
  for (var type in grammars) {
    var grammar = grammars[type];
    var title = 'My ' + type + ' grammar.';
    var comment = "Pretty neat!";
    var input = '"' + title + '" {\n' + grammar + '\n}"' + comment + '"';
    diagram.fromText(input, './build/' + type + '.png', 2000, 4000);
  }
};

var main = function() {
  exec('mkdir -p build', function(err, stdout, stderr) {
    renderGrammars();
  });
};

main();
