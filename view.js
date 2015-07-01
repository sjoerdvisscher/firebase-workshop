var view = {
  createClient: function(id, item) {
    $('<div><div class=name>').appendTo('#items').attr('id', 'client' + id).addClass('client');
    view.updateClient(id, item);
  },
  updateClient: function(id, item) {
    var div = $('#client' + id)
    div.css({
      left: item.x + '00%',
      top: item.y + '00%'
    });
    div.find(".name").text(item.name).append("<br>" + item.lives + " lives / " + item.kills + " kills");
  },
  removeClient: function(id) {
    $('#client' + id).remove();
  },
  createBomb: function (item) {
    var div = $('<div>').appendTo('#items').addClass('bomb').css({
      left: item.x + '00%',
      top: item.y + '00%'
    });
    return function trigger() {
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
    }
  }
};
