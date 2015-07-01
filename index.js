var Root = new Firebase("https://vivid-heat-8925.firebaseio.com/");
var Clients = Root.child("clients");

Clients.on('child_added', function (snapshot) {
  var item = snapshot.val();
  var id = snapshot.key();
  var li = $("<li>").appendTo("#clients").attr("id", "client" + id);
  if (myId == id || !myId) {
    $("<input>").appendTo(li).val(item.name).on("change", function() {
      Clients.child(id).child("name").set(this.value);
    })
  } else {
    li.text(item.name);
  }
})

Clients.on('child_removed', function (snapshot) {
  $("#client" + snapshot.key()).remove();
})

var myId = Clients.push({
  name: "New user",
  lives: 5,
  kills: 0
}).key();

window.onunload = function() {
  Clients.child(myId).remove();
}
