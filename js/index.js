$("#location-bar a").click(function(event){
  event.preventDefault();
  
  var $this = $(this),
      $li = $this.parent(),
      selectedMap = $this.attr("href"),
      selectedLocation = $this.data('location');
 
  $li.addClass('active').siblings('li').removeClass('active');

  //Update #map bkimage with the image from the location
  $('#map').css('background-image', 'url(' + selectedMap + ')');  
  //update tooltip 'address'
  $('.selectedLocation').text(selectedLocation);
});

function send(url, data, verb, success_msg){
  // Creates Ajax request and alerts the response
  var xhr = new XMLHttpRequest();
  xhr.open(verb, url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  // xhr.setRequestHeader("Access-Control-Allow-Origin", "https://6b0qxqwymf.execute-api.us-east-1.amazonaws.com")
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        alert(success_msg);
      }
  };
  xhr.send(data);
}

$("#subscribe").submit(function(event){
  event.preventDefault();
  event.stopImmediatePropagation();
  var url = "https://6b0qxqwymf.execute-api.us-east-1.amazonaws.com/beta/subs";
  var msg = "Your subscription is done, sms incoming!"
  pn = this[0].value;
  name = this[1].value;
  var data = JSON.stringify({
    'pn': pn,
    'name': name
  });
  send(url, data, "POST", msg);
  return false;
});

$("#unsubscribe").submit(function(event){
  event.preventDefault();
  event.stopImmediatePropagation();
  var url = "https://6b0qxqwymf.execute-api.us-east-1.amazonaws.com/beta/subs";
  var msg = "Done! Feel free to subscribe anytime again!"
  pn = this[0].value;
  var data = JSON.stringify({
    'pn': pn
  });
  send(url, data, "DELETE", msg);
  return false;
});

$('#pn').keyup(function(event){
    var pn = $('#pn').val()
    document.getElementById('phone').innerHTML = "<span class='entypo-phone'></span><a href='#'>"+ pn +"</a>";
})

$('#name').keyup(function(event){
    var name = $('#name').val()
    document.getElementById('user').innerHTML = "<span class='entypo-user'></span><a href='#'>"+ name +"</a>";
})