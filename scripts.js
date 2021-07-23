$(document).ready(function () {
  // setInterval(function () {
  //   window.location.reload(1)
  // }, 6000);

  $.ajax({
    url: "https://mocki.io/v1/5eab8add-4e9f-4b24-9634-4c20531d7dc7",
    method: 'GET',
    success: function (apiData) {
      localStorage.setItem('calendar', JSON.stringify(apiData));

      var data = JSON.parse(localStorage.getItem('calendar'));

      $(".calendar .main-div").html('');
      var list = '';
      $.each(data, function (index, value) {
        list += "<div class='todo'><div class='timeframe'>" + value.start + ' - ' + value.end + "</div>" + "<div class='title'>" + value.title + "</div></div>";
      })
      $(".calendar .main-div").append(list);
    }
  });

  navigator.geolocation.getCurrentPosition(function (pos) {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude + "&appid=787782cf355584046bc318521c5b9783&units=imperial",
      method: 'GET',
      success: function (apiData) {
        localStorage.setItem('weather', JSON.stringify(apiData));

        var data = JSON.parse(localStorage.getItem('weather'));
        $('.weather .city').text(data.name + ' ,' + data.sys.country);
        $('.weather .temp span').text(Math.round(data.main.temp) + '°F');
        var iconUrl = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
        $('.weather .temp img').attr('src', iconUrl);
      }
    })
  });
  $('.weather .date').text(dateFormat());

  function analogClock() {
    now = new Date();

    document.getElementById("hour-hand").style.transform = "rotate(" + (now.getHours() * 30 + now.getMinutes() / 2) + "deg)";

    document.getElementById("min-hand").style.transform = "rotate(" + (now.getMinutes() * 6 + now.getSeconds() / 10) + "deg)";

    document.getElementById("sec-hand").style.transform = "rotate(" + now.getSeconds() * 6 + "deg)";

    setTimeout(function () {
      analogClock();
    }, 1000);
  }
  analogClock();

  function digitalClock() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    // AM, PM setting
    var session = "AM";
    if (h == 0) {
      h = 12;
    }
    if (h >= 12) {
      session = "PM";
    }
    if (h > 12) {
      h = h - 12;
    }
    m = (m < 10) ? m = "0" + m : m;
    s = (s < 10) ? s = "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session + " " + Intl.DateTimeFormat().resolvedOptions().timeZone;

    //putting time in our div
    $('.digital-clock').html(time);
    //to change time in every seconds
    setTimeout(function () { digitalClock() }, 1000);
  }
  digitalClock();

  function digitalTwentyFourClock() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    if (h.toString().length == 1) {
      h = '0' + h;
    }
    if (m.toString().length == 1) {
      m = '0' + m;
    }
    if (s.toString().length == 1) {
      s = '0' + s;
    }

    var time = h + ":" + m + ":" + s + " " + Intl.DateTimeFormat().resolvedOptions().timeZone;

    //putting time in our div
    $('.digital-twentyfour-clock').html(time);
    //to change time in every seconds
    setTimeout(function () { digitalTwentyFourClock() }, 1000);
  }
  digitalTwentyFourClock();

  function dateFormat() {
    var weekDayNumber = new Date().getDay();
    var weekDay = '';

    switch (weekDayNumber) {
      case 0:
        weekDay = 'Sunday';
        break;
      case 1:
        weekDay = 'Monday';
        break;
      case 2:
        weekDay = 'Tuesday';
        break;
      case 3:
        weekDay = 'Wednesday';
        break;
      case 4:
        weekDay = 'Thursday';
        break;
      case 5:
        weekDay = 'Friday';
        break;
      case 6:
        weekDay = 'Saturday';
        break;
    }

    var date = new Date().getDate();

    var monthNumber = new Date().getMonth();
    var month = '';
    switch (monthNumber) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
      default:
        month = '';
    }

    var year = new Date().getFullYear();

    return weekDay + ', ' + month + " " + date + ', ' + year;
  }

  $.ajax({
    url: "https://mocki.io/v1/5eab8add-4e9f-4b24-9634-4c20531d7dc7",
    method: 'GET',
    success: function (apiData) {
      localStorage.setItem('notes', JSON.stringify(apiData));

      var data = JSON.parse(localStorage.getItem('notes'));

      $(".notes ul").html('');
      var list = '';
      $.each(data, function (index, value) {
        list += '<li>' + value.title + '</li>';
      })
      $(".notes ul").append(list);
    }
  });
})
