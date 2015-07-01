var Root = new Firebase('https://vivid-heat-8925.firebaseio.com/');
var Clients = Root.child('clients');

Clients.on('child_added', function (snapshot) {
  var item = snapshot.val();
  var id = snapshot.key();
  var div = $('<div>').appendTo('#clients').attr('id', 'client' + id);
  if (myId == id || !myId) {
    $('<input>').appendTo(div).val(item.name).on('change', function() {
      Clients.child(id).child('name').set(this.value);
    })
  } else {
    $('<span>').appendTo(div).text(item.name);
  }
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
  div.find("span").text(item.name);
}

var myId = Clients.push({
  name: 'New user',
  lives: 5,
  kills: 0,
  x: Math.floor(Math.random()*20),
  y: Math.floor(Math.random()*10)
}).key();

window.onunload = function() {
  Clients.child(myId).remove();
}
