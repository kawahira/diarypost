function postAnnouncement() {
  // 投稿先のURL
  var posturl    = 'https://hogehoge/diary/';
  // 参照するカレンダーIDを指定する
  var calenderid = 'calender@hoge.com'

  var timezone   = "Asia/Tokyo"
  var timeformat = "HH:mm"
  var datetime   = new Date();
  var cal        = CalendarApp.getCalendarById(calenderid);
  var events     = cal.getEventsForDay( datetime );
  if (events.length > 0) {
    var today      = Utilities.formatDate(datetime,timezone, "yyyy/MM/dd");
    var html       = '本日の予定は' + events.length + '件でした。<br><br>'
    for (var i in events ) {
      var evt   = events[i];
      var start = Utilities.formatDate(evt.getStartTime(),timezone,timeformat) + '〜';
      var end   = Utilities.formatDate(evt.getEndTime(),timezone,timeformat) + ' : ';
      html     += start + end + evt.getTitle() + '<br>';
    }
    var encodedTitle = encodeURI(today);
    var parent       = SitesApp.getPageByUrl(posturl);
    var created      = parent.createAnnouncement(encodedTitle, html);
    created.setTitle(today);
  }
}