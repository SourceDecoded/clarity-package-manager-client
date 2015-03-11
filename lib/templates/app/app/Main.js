var app = app || {};
app.Main = function(elem, tags, scope) {
  var message = tags['message'];
  var song = ["I can see clearly now",
     "the rain is gone.",
     "I can see all the obstacles"
     "in my way."];
  var line = 0;

  var nextLine = function(){
    message.innerHTML = song[line % 4];
    line += 1;
  };

  nextLine();
  setTimeout(nextLine, 2000);
}
