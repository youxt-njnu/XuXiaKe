//queryall
var j = 0;
var list = [];
var m = 0;
var layers = [];
var layers2 = [];
var layers3 = [];
var myGroup;
var myGrouppp;
var timer;
var arrayone = [];
var arraytwo = [];
var wq = ['30%', '100%'];
var p = 0;

function queryall() {
  $("#previous").find("button").addClass("isvisited");
  layers2 = [];
  var mm = document.getElementById('light');
  mm.style.display = 'block';
  var mmmm = document.getElementById('tttr');
  mmmm.style.display = 'block';
  mm.style.width = '0px';
  if (j == 0 && m == 0) {
    var innerHTMLStr;
    var qq = document.getElementById("myul");
    var qqq = document.getElementById("myull");
    var qqqq = document.getElementById("myulll");
    var qqqqq = document.getElementById("myullll");
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
      queryParameter: {
        name: "roadNode@xuxiake"
      },
      datasetNames: ["xuxiake:roadNode"],
      toIndex: 1000
    });
    L.supermap
      .featureService(url2)
      .getFeaturesBySQL(sqlParam, function (serviceResult) {
        var r = serviceResult.result.features.features;
        for (i = 0; i < serviceResult.result.features.features.length; i++) {
          if (r[i].properties.ISVISITED == '是') {
            var myIcon = L.icon({
              iconUrl: 'img/streetlight2.png',
              iconSize: [45],
              iconAnchor: [-5, -5]
            });
            var content = '<span>' + r[i].properties.NAME + '</span>';
            var point = L.point(20, 20);
            var popup = L.popup({ closeButton: true }).setLatLng([r[i].properties.POINT_Y, r[i].properties.POINT_X]).setContent(content);
            var layer = L.marker([r[i].properties.POINT_Y, r[i].properties.POINT_X], { icon: myIcon }).bindPopup(popup);
            layers.push(layer);
          } else if (r[i].properties.ISVISITED == '否') {
            var myIcon = L.icon({
              iconUrl: 'img/bsl.png',
              iconSize: [30],
              iconAnchor: [-5, -5]
            });
            var content = '<span style="font-size:15px;font-weight:bold;">地点:</span>' + '<span style="font-size:15px;font-weight:bold;">' + r[i].properties.NAME + '</span>' + '<br>' + '<span style="font-size:15px;font-weight:bold;">类型:</span>' + '<span style="font-size:15px;font-weight:bold;">' + r[i].properties.TYPE + '</span>';
            var point = L.point(20, 20);
            var popup = L.popup({ closeButton: true, offset: L.point(0, 0) }).setLatLng([r[i].properties.POINT_Y, r[i].properties.POINT_X]).setContent(content);
            var layer2 = L.marker([r[i].properties.POINT_Y, r[i].properties.POINT_X], { highlight: "permanent", icon: myIcon }).bindPopup(popup);
            layers2.push(layer2);
            if (r[i].properties.isvisited == '是') {
              arrayone.push(r[i]);
            } else {
              arraytwo.push(r[i]);
            }
            list.push(document.createElement("ul"));
            list[m].innerHTML = '<li style="float:left;width:100%;">' + '&nbsp;' + '&nbsp;' + '<span  style="font-size:0px;"></span>' + '&nbsp;' + '&nbsp;' + '<span style="font-size:14px;font-weight:bold;color:#eeeaea">' + r[i].properties.NAME + '&nbsp;' + '&nbsp;' + '(' + r[i].properties.TYPE + ')' + '</span>' + '&nbsp;' + '&nbsp;' + '</li>';
            // class="glyphicon glyphicon-lamp"
            list[m].setAttribute('a', r[i].properties.POINT_Y);
            list[m].setAttribute('b', r[i].properties.POINT_X);
            list[m].id = j;
            list[m].style.height = '40px';
            list[m].style.lineHeight = '37px';
            qq.appendChild(list[m]);
            var nba = $('#myul').children().size();
            var cba = $('#myull').children().size();
            var ccba = $('#myulll').children().size();
            if (nba == 5) {
              qqq.appendChild(list[m]);
            }
            if (cba == 4) {
              qqqq.appendChild(list[m]);
            }
            if (ccba == 4) {
              qqqqq.appendChild(list[m]);
            }
            var cba = $('#myull').children().size();
            var ccba = $('#myulll').children().size();
            if (nba == 5 && cba == 1) {
              $("#lia").removeClass("isvisited");
            }
            if (nba == 4 && cba == 0) {
              $("#lia").addClass("isvisited");
            }
            list[m].onclick = function () {
              var Y = this.getAttribute('a');
              var X = this.getAttribute('b');
              map.flyTo([Y, X], 6);
            }
            j = j + 1;
            m = m + 1;
          }
        }
        myGroup = L.layerGroup(layers2);
        map.addLayer(myGroup);
       
        myChartlight.clear();
        //myChartlight.setOption(option1);
        arrayone = [];
        arraytwo = [];
      });
    $("#tty").addClass("isvisited");
  } else {
    alert('请先关闭再查询');
  }
  timer = setInterval(function () {
    myChartlight.setOption({
      series: [{
        barGap: wq[p]
      }]
    });
    if (p == 0) {
      p = p + 1;
    } else {
      p = p - 1;
    }
  }, 2000);
  map.setView([34, 105], 3);
}

$("#close").click(function () {
  var mmmm = document.getElementById('tttr');
  mmmm.style.display = 'none';
  for (var h = 0; h < layers2.length; h++) {
    layers2[h].disablePermanentHighlight();
  }
  $("#myul").find("ul").remove();
  $("#myull").find("ul").remove();
  $("#myulll").find("ul").remove();
  $("#myullll").find("ul").remove();
  $("#next").addClass("disabled");
  $("#previous").next().addClass("disabled");
  w1 = document.getElementById('myul');
  w2 = document.getElementById('myull');
  w3 = document.getElementById('myulll');
  w4 = document.getElementById('myullll');
  w1.style.display = 'block';
  w2.style.display = 'none';
  w3.style.display = 'none';
  w4.style.display = 'none';
  myGroup.clearLayers();
  Fullwidth();
  j = 0;
  m = 0;
  layers = [];
  layers2 = [];
  $("#tty").removeClass("disabled");
})





