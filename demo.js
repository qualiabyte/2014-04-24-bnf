var fs = require('fs');
var diagram = require('ebnf-diagram');
var exec = require('child_process').exec;

var grammars = {
  simple: fs.readFileSync('./grammars/simple.grammar', 'utf8')
, literal: '"My literal grammar" { a = "a". } "Pretty neat!"'
};

var renderGrammars = function() {
  for (var type in grammars) {
    var grammar = grammars[type];
    diagram.fromText(grammar, './build/' + type + '.png', 800, 600);
  }
};

var main = function() {
  exec('mkdir -p build', function(err, stdout, stderr) {
    renderGrammars();
  });
};

main();
