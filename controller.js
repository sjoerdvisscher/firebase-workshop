var lastBombTime = new Date();
var name = prompt("What's your name?");

model.onBombAdded = function(item) {
  var trigger = view.createBomb(item);
  setTimeout(function() {
    trigger();
    if ((item.x == me.x && Math.abs(item.y - me.y) < 5) ||
        (item.y == me.y && Math.abs(item.x - me.x) < 5)) {
      me.lives--;
      if (me.lives <= 0) {
        model.removeMe();
        location.reload();
        return;
      }
      model.updateMe(me);
      if (item.owner != model.myId)
        model.increaseKills(item.owner);
    }
  }, 3000)
};

model.onClientAdded = view.createClient;
model.onClientChanged = view.updateClient;
model.onClientRemoved = view.removeClient;

var me = {
  name: name,
  lives: 5,
  kills: 0,
  x: Math.floor(Math.random()*20),
  y: Math.floor(Math.random()*10)
};
model.createMe(me);

$(window).on('unload', function() {
  model.removeMe();
})

$(document.body).on('keydown', function(evt) {
  switch (evt.which) {
    case 32:
      if (new Date - lastBombTime < 3000)
        return;
      lastBombTime = new Date;
      var removeBomb = model.createBomb({
        owner: model.myId,
        x: me.x,
        y: me.y
      });
      setTimeout(removeBomb, 5000);
      break;
    case 37: if (me.x > 0) me.x--; break;
    case 38: if (me.y > 0) me.y--; break;
    case 39: if (me.x < 19) me.x++; break;
    case 40: if (me.y < 9) me.y++; break;
    default:
      console.log(evt.which)
      return;
  }
  model.updateMe(me);
})
