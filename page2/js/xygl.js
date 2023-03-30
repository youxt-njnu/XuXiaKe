var otk=[];
var biaolist=[];
var biaoobj=[];
var rankss=[];
var modal=[];
var ooo=L.geoJSON();
var resultLayerpop;
var f;
var z=0;
var listt = [];
var drawControl=null;

function donot1(){
  Fullwidth();
  rankss=[];
  ooo.clearLayers();
  $("#thebuild").find("ul").remove();
  $("#jiaotong").val("");
  if(newresultLayer!='null'){
    map.removeLayer(newresultLayer);
    newresultLayer='null';
    }
}




function gaibian() {
    bn = 0;
    carName = [];
    // 先做一个查询
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: "roadNode@xuxiake"
        },
        datasetNames: ["xuxiake:roadNode"],
        toIndex: 1000
    });
    L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
    function(serviceResult) {
        var f = serviceResult.result.features.features;
        console.log(f);
        for (var h = 0; h < f.length; h++) {
            carName.push(f[h].properties.NAME);
        }
        $('#xialai').css({
            'display': 'block'
        });
        var kkk = $('#dropdownMenu1').val().toString();
        if (kkk == '') {
            arr = [];
            $(".dropdown-menu").find("li").remove();
            $('#xialai').css({
                'display': 'none'
            });
        } else {
            //字符串方法indexOf
            var len = carName.length;
            var arr = [];
            for (var i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (carName[i].indexOf(kkk) >= 0) {
                    arr.push(carName[i]);
                }
            }
            console.log(arr);
            $(".dropdown-menu").find("li").remove();
            for (var t = 0; t < arr.length; t++) {
                listt.push(document.createElement("li"));
                listt[t].innerHTML = '<a>' + arr[t] + '</a>';
                listt[t].setAttribute('name', arr[t]);
                listt[t].onclick = function() {
                    var YYY = this.getAttribute('name');
                    $('#dropdownMenu1').val(YYY);
                    $('#xialai').css({
                        'display': 'none'
                    });
                }
                var qqq = document.getElementById('xialai');
                qqq.appendChild(listt[t]);
            }
        }
    });
}

// input框监听事件
function gaibian2() {
    bn = 0;
    carName = [];
    // 先做一个查询
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: "roadNode@xuxiake"
        },
        datasetNames: ["xuxiake:roadNode"],
        toIndex: 1000
    });
    L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
    function(serviceResult) {
        var f = serviceResult.result.features.features;
        for (var h = 0; h < f.length; h++) {
            carName.push(f[h].properties.NAME);
        }
        $('#xialai2').css({
            'display': 'block'
        });
        var kkk = $('#dropdownMenu2').val().toString();
        if (kkk == '') {
            arr = [];
            $(".dropdown-menu").find("li").remove();
            $('#xialai2').css({
                'display': 'none'
            });
        } else {
            //字符串方法indexOf
            var len = carName.length;
            var arr = [];
            for (var i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (carName[i].indexOf(kkk) >= 0) {
                    arr.push(carName[i]);
                }
            }
            $(".dropdown-menu").find("li").remove();
            for (var t = 0; t < arr.length; t++) {
                listt.push(document.createElement("li"));
                listt[t].innerHTML = '<a>' + arr[t] + '</a>';
                listt[t].setAttribute('name', arr[t]);
                listt[t].onclick = function() {
                    var YYY = this.getAttribute('name');
                    $('#dropdownMenu2').val(YYY);
                    $('#xialai2').css({
                        'display': 'none'
                    });
                }
                var qqq = document.getElementById('xialai2');
                qqq.appendChild(listt[t]);
            }
        }
    });
}

// 这是一个键盘监听
$("#dropdownMenu1").keydown(function(e) {
    switch (e.keyCode) {
    case 40:
        var g = $(".dropdown-menu").find("li").length;
        if (bn < g) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn).addClass('active');
            bn = bn + 1;
        }
        break;
    case 38:
        if (bn > 1) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn - 2).addClass('active');
            bn = bn - 1;
        }
        break;
    case 13:
        var YYY = $('.dropdown-menu').find(".active").attr('name');
        if(YYY==undefined){
           $('#xialai').css({
            'display': 'none'
        });
        }else{
            $('#dropdownMenu1').val(YYY);
        $('#xialai').css({
            'display': 'none'
        });
        }
        $('.dropdown-menu').find(".active").removeClass('active');
        bn = 0;
        break;
    default:
        break;
    }
});

$("#dropdownMenu2").keydown(function(e) {
    switch (e.keyCode) {
    case 40:
        var g = $(".dropdown-menu").find("li").length;
        if (bn < g) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn).addClass('active');
            bn = bn + 1;
        }
        break;
    case 38:
        if (bn > 1) {
            $(".dropdown-menu").find("li").removeClass('active');
            $(".dropdown-menu").find("li").eq(bn - 2).addClass('active');
            bn = bn - 1;
        }
        break;
    case 13:
        var YYY = $('.dropdown-menu').find(".active").attr('name');
        if(YYY===undefined){
        $('#xialai2').css({
            'display': 'none'
        });
        }else{
           $('#dropdownMenu2').val(YYY);
        $('#xialai2').css({
            'display': 'none'
        });
        }
        $('.dropdown-menu').find(".active").removeClass('active');
        bn = 0;
        break;
    default:
        break;
    }
});

