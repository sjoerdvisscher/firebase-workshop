var lastBombTime = new Date();
var name = prompt("What's your name?");

var Root = new Firebase('https://vivid-heat-8925.firebaseio.com/');
var Clients = Root.child('clients');
var Bombs = Root.child('bombs');

Bombs.on('child_added', function (snapshot) {
  var item = snapshot.val();
  var div = $('<div>').appendTo('#items').addClass('bomb').css({
    left: item.x + '00%',
    top: item.y + '00%'
  });
  setTimeout(function() {
    div.remove();
    var firex = $('<div>').appendTo('#items').addClass('fire').css({
      left: (item.x - 5) + '00%',
      top: item.y + '00%',
      width: '1100%'
    });
    var firey = $('<div>').appendTo('#items').addClass('fire').css({
      left: item.x + '00%',
      top: (item.y - 5) + '00%',
      height: '1100%'
    });
    setTimeout(function() {
      firex.remove();
      firey.remove();
    }, 500);
    if ((item.x == me.x && Math.abs(item.y - me.y) < 5) ||
        (item.y == me.y && Math.abs(item.x - me.x) < 5)) {
      me.lives--;
      if (me.lives == 0) {
        myRef.remove();
        location.reload();
        return;
      }
      myRef.set(me);
      if (item.owner != myRef.key()) {
        Clients.child(item.owner).child('kills').transaction(function (kills) {
          return kills + 1;
        });
      }
    }
  }, 3000)
});

Clients.on('child_added', function (snapshot) {
  var item = snapshot.val();
  var id = snapshot.key();
  var div = $('<div>').appendTo('#items').attr('id', 'client' + id).addClass('client');
  $('<div class=name>').appendTo(div);
  updateClient(snapshot);
})

Clients.on('child_changed', updateClient);

Clients.on('child_removed', function (snapshot) {
  $('#client' + snapshot.key()).remove();
})

function updateClient(snapshot) {
  var item = snapshot.val();
  var id = snapshot.key();
  var div = $('#client' + id)
  div.css({
    left: item.x + '00%',
    top: item.y + '00%'
  });
  div.find(".name").text(item.name).append("<br>" + item.lives + " lives / " + item.kills + " kills");
  if (myRef && id == myRef.key())
    me = item;
}

var me = {
  name: name,
  lives: 5,
  kills: 0,
  x: Math.floor(Math.random()*20),
  y: Math.floor(Math.random()*10)
};
var myRef = Clients.push(me);

$(window).on('unload', function() {
  myRef.remove();
})

$(document.body).on('keydown', function(evt) {
  switch (evt.which) {
    case 32:
      if (new Date - lastBombTime < 3000)
        return;
      lastBombTime = new Date;
      var bomb = Bombs.push({
        owner: myRef.key(),
        x: me.x,
        y: me.y
      });
      setTimeout(function() { bomb.remove() }, 5000);
      break;
    case 37: if (me.x > 0) me.x--; break;
    case 38: if (me.y > 0) me.y--; break;
    case 39: if (me.x < 19) me.x++; break;
    case 40: if (me.y < 9) me.y++; break;
    default:
      console.log(evt.which)
      return;
  }
  myRef.set(me);
})
