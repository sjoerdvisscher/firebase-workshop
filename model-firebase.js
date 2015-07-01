var Root = new Firebase('https://vivid-heat-8925.firebaseio.com/');
var Clients = Root.child('clients');
var Bombs = Root.child('bombs');

var model = {
  createMe: function() {
    this.myRef = Clients.push(me);
    this.myId = this.myRef.key();
  },
  updateMe: function(me) {
    this.myRef.set(me);
  },
  removeMe: function() {
    this.myRef.remove();
  },
  increaseKills: function(owner) {
    Clients.child(owner).child('kills').transaction(function (kills) {
      return kills + 1;
    });
  },
  createBomb: function(item) {
    var bomb = Bombs.push(item);
    return function() {
      bomb.remove();
    };
  }
};

Bombs.on('child_added', function (snapshot) {
  var item = snapshot.val();
  model.onBombAdded(item);
});

Clients.on('child_added', function (snapshot) {
  var item = snapshot.val();
  var id = snapshot.key();
  model.onClientAdded(id, item);
});

Clients.on('child_changed', function (snapshot) {
  var id = snapshot.key();
  var item = snapshot.val();
  model.onClientChanged(id, item);
  // Kills updated by other client -> update me
  if (id == model.myId)
    me = item;
});

Clients.on('child_removed', function (snapshot) {
  model.onClientRemoved(snapshot.key());
});
