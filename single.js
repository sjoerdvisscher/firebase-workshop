var model = {
  myId: "me",
  createMe: function(me) {
    this.onClientAdded("me", me);
  },
  updateMe: function(me) {
    this.onClientChanged("me", me);
  },
  removeMe: function() {
    this.onClientRemoved("me");
  },
  increaseKills: function(owner) {},
  createBomb: function(bomb) {
    this.onBombAdded(bomb);
    return function removeBomb() {};
  }
};
