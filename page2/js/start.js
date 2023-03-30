var quanjuobj;
var quanjulist = [];
var e = 0;
var oo = L.geoJSON();
var YYY, XXX;
var startx, starty;
var endx, endy;
var myIconstart;
var route = L.geoJSON();
var routepng;
var layertest = [];
var myGrouptest = L.layerGroup();
var myGroupstart = L.layerGroup();
var myGroupend = L.layerGroup();
var kk, kkk;


function completed(e) {
    editableLayers.addLayer(e.layer);
    var param1 = new SuperMap.MeasureParameters(e.layer);
    ally = e.layer.toGeoJSON();
    if (handler1 != 'null') {
        L.supermap.measureService(url).measureArea(param1, function (result) {
            alert(result.result.area + "平方米");
            editableLayers.removeLayer(e.layer);
        });
        handler1 = 'null';
    }

    if (handler2 != 'null') {
        L.supermap.measureService(url).measureDistance(param1, function (result) {
            alert(result.result.distance + "米");
            editableLayers.removeLayer(e.layer);
        });
        handler2 = 'null';
    }
    if (handler3 != 'null') {
        editableLayerss.addLayer(e.layer);
        handler3 = 'null';
    }
}

function next() {
    w1 = document.getElementById('myul');
    w2 = document.getElementById('myull');
    w3 = document.getElementById('myulll');
    w4 = document.getElementById('myullll');
    c1 = $('#myul').children().size();
    c2 = $('#myull').children().size();
    c3 = $('#myulll').children().size();
    c4 = $('#myullll').children().size();
    // 通过点击下一页，判断每一页的样式
    if (w1.style.display == 'block' && w2.style.display == 'none' && w3.style.display == 'none' && w4.style.display == 'none' && c1 == 4 && c2 > 0) {
        w1.style.display = 'none';
        w2.style.display = 'block';
        w3.style.display = 'none';
        w4.style.display = 'none';
        $('#lib').removeClass("disabled");
    } else if (w1.style.display == 'none' && w2.style.display == 'block' && w3.style.display == 'none' && w4.style.display == 'none' && c2 == 4 && c3 > 0) {
        w1.style.display = 'none';
        w2.style.display = 'none';
        w3.style.display = 'block';
        w4.style.display = 'none';
    } else if (w1.style.display == 'none' && w2.style.display == 'none' && w3.style.display == 'block' && w4.style.display == 'none' && c3 <= 4 && c4 > 0) {
        w1.style.display = 'none';
        w2.style.display = 'none';
        w3.style.display = 'none';
        w4.style.display = 'block';
        $("#lia").addClass("disabled");
    }
    // 设置之后，当页是否需要设置disabled
    if (w1.style.display == 'none' && w2.style.display == 'block' && w3.style.display == 'none' && w4.style.display == 'none' && c2 <= 4 && c3 == 0) {
        $("#lia").addClass("disabled");
    }
    if (w1.style.display == 'none' && w2.style.display == 'none' && w3.style.display == 'block' && w4.style.display == 'none' && c3 <= 4 && c4 == 0) {
        $("#lia").addClass("disabled");
    }
}

function previous() {
    if (w1.style.display == 'none' && w2.style.display == 'block' && w3.style.display == 'none' && w4.style.display == 'none') {
        w1.style.display = 'block';
        w2.style.display = 'none';
        w3.style.display = 'none';
        w4.style.display = 'none';
        $('#lib').addClass("disabled");
        $(function () { $("[data-toggle='tooltip']").tooltip(); });
        $("#lia").removeClass("disabled");
    } else if (w1.style.display == 'none' && w2.style.display == 'none' && w3.style.display == 'block' && w4.style.display == 'none') {
        w1.style.display = 'none';
        w2.style.display = 'block';
        w3.style.display = 'none';
        w4.style.display = 'none';
        $("#lia").removeClass("disabled");
    } else if (w1.style.display == 'none' && w2.style.display == 'none' && w3.style.display == 'none' && w4.style.display == 'block') {
        w1.style.display = 'none';
        w2.style.display = 'none';
        w3.style.display = 'block';
        w4.style.display = 'none';
        $("#lia").removeClass("disabled");
    }
}



// 清除结果                              
function donthave() {
    $('#dropdownMenu1').val('');
    $('#dropdownMenu2').val('');
    $("#qidian").val('');
    $("#zhongdian").val('');
    clearlist2();
    clearr();
}

//获取结果
function gethave() {
    oo.clearLayers();
    layertest = [];
    route.clearLayers();
    map.removeLayer(myGrouptest);
    map.removeLayer(myGroupstart);
    map.removeLayer(myGroupend);
    myGroupend.clearLayers();
    myGroupstart.clearLayers();
    var kl = $("#dropdownMenu1").val();
    var km = $("#dropdownMenu2").val();
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: "roadNode@xuxiake",
            attributeFilter: "roadNode.Name in (" + "'" + kl + "'" + "," + "'" + km + "'" + ")"
        },
        datasetNames: ["xuxiake:roadNode"],
        toIndex: 1000
    });
    L.supermap.featureService(url2).getFeaturesBySQL(sqlParam,
        function (serviceResult) {
            var f = serviceResult.result.features.features;
            var gg = f[0].properties.NAME;
            if (gg.indexOf(kl) == 0) {
                if (serviceResult.result.features.features.length < 2) {
                    alert('信息模糊，请输入详细信息');
                } else {
                    var startx = f[0].properties.POINT_X;
                    var starty = f[0].properties.POINT_Y;
                    var endx = f[1].properties.POINT_X;
                    var endy = f[1].properties.POINT_Y;
                    var myIconend = L.icon({
                        iconUrl: 'img/start.png',
                        iconSize: [30, 30]
                    });
                    var layerend20 = L.marker([starty, startx], {
                        icon: myIconend
                    });
                    var myIconend = L.icon({
                        iconUrl: 'img/end.png',
                        iconSize: [30, 30]
                    });
                    var layerend22 = L.marker([endy, endx], {
                        icon: myIconend
                    });
                    var findPathService = L.supermap.networkAnalystService(url4);
                    //创建最佳路径分析参数实例
                    var resultSetting = new SuperMap.TransportationAnalystResultSetting({
                        returnEdgeFeatures: true,
                        returnEdgeGeometry: true,
                        returnEdgeIDs: true,
                        returnNodeFeatures: true,
                        returnNodeGeometry: true,
                        returnNodeIDs: true,
                        returnPathGuides: true,
                        returnRoutes: true
                    });
                    var analystParameter = new SuperMap.TransportationAnalystParameter({
                        resultSetting: resultSetting
                    });
                    var findPathParameter = new SuperMap.FindPathParameters({
                        isAnalyzeById: false,
                        nodes: [L.point(startx, starty), L.point(endx, endy)],
                        parameter: analystParameter
                    });
                    var myIcon = L.icon({
                        iconUrl: "img/walk.png",
                        iconSize: [20, 20]
                    });
                    //进行查找
                    findPathService.findPath(findPathParameter,
                        function (serviceResult) {
                            var result = serviceResult.result;
                            if (result.pathList.length == 0) {
                                alert('未检索到路线，请尝试其他方案');
                            } else {
                                result.pathList.map(function (result) {
                                    route.addData(result.route);
                                    map.addLayer(route);
                                    routepng = L.geoJSON(result.pathGuideItems, {
                                        pointToLayer: function (geoPoints, latlng) {
                                            var q = L.marker(latlng, {
                                                icon: myIcon
                                            });
                                            layertest.push(q);
                                            myGrouptest = L.layerGroup(layertest);
                                            map.addLayer(myGrouptest);
                                        },
                                        filter: function (geoJsonFeature) {
                                            if (geoJsonFeature.geometry && geoJsonFeature.geometry.type === 'Point') {
                                                return true;
                                            }
                                            return false;
                                        }
                                    });
                                    map.addLayer(routepng);
                                    myGroupend.addLayer(layerend20);
                                    myGroupend.addLayer(layerend22);
                                    map.addLayer(myGroupend);
                                })
                            }
                        });
                }
            } else {
                if (serviceResult.result.features.features.length < 2) {
                    alert('信息模糊，请输入详细信息');
                } else {
                    var startx = f[1].properties.POINT_X;
                    var starty = f[1].properties.POINT_Y;
                    var endx = f[0].properties.POINT_X;
                    var endy = f[0].properties.POINT_Y;
                    var myIconend = L.icon({
                        iconUrl: 'img/start.png',
                        iconSize: [30, 30]
                    });
                    var layerend20 = L.marker([starty, startx], {
                        icon: myIconend
                    });
                    var myIconend = L.icon({
                        iconUrl: 'img/end.png',
                        iconSize: [30, 30]
                    });
                    var layerend22 = L.marker([endy, endx], {
                        icon: myIconend
                    });
                    var findPathService = L.supermap.networkAnalystService(url4);
                    //创建最佳路径分析参数实例
                    var resultSetting = new SuperMap.TransportationAnalystResultSetting({
                        returnEdgeFeatures: true,
                        returnEdgeGeometry: true,
                        returnEdgeIDs: true,
                        returnNodeFeatures: true,
                        returnNodeGeometry: true,
                        returnNodeIDs: true,
                        returnPathGuides: true,
                        returnRoutes: true
                    });
                    var analystParameter = new SuperMap.TransportationAnalystParameter({
                        resultSetting: resultSetting
                    });
                    var findPathParameter = new SuperMap.FindPathParameters({
                        isAnalyzeById: false,
                        nodes: [L.point(startx, starty), L.point(endx, endy)],
                        parameter: analystParameter
                    });
                    var myIcon = L.icon({
                        iconUrl: "img/walk.png",
                        iconSize: [20, 20]
                    });
                    //进行查找
                    findPathService.findPath(findPathParameter,
                        function (serviceResult) {
                            var result = serviceResult.result;
                            if (result.pathList.length == 0) {
                                alert('未检索到路线，请尝试其他方案');
                            } else {
                                result.pathList.map(function (result) {
                                    route.addData(result.route);
                                    map.addLayer(route);
                                    routepng = L.geoJSON(result.pathGuideItems, {
                                        pointToLayer: function (geoPoints, latlng) {
                                            var q = L.marker(latlng, {
                                                icon: myIcon
                                            });
                                            layertest.push(q);
                                            myGrouptest = L.layerGroup(layertest);
                                            map.addLayer(myGrouptest);
                                        },
                                        filter: function (geoJsonFeature) {
                                            if (geoJsonFeature.geometry && geoJsonFeature.geometry.type === 'Point') {
                                                return true;
                                            }
                                            return false;
                                        }
                                    });
                                    map.addLayer(routepng);
                                    myGroupend.addLayer(layerend20);
                                    myGroupend.addLayer(layerend22);
                                    map.addLayer(myGroupend);
                                })
                            }
                        });
                }
            }
        });
}

function clearlist2() {
    var biao = document.getElementById('biaodan');
    var biao1 = document.getElementById('biao');
    $("#biaodan tr").remove();
    biao1.style.display = 'none';
}
