//OK(finished)
var n = 0;
var w1, w2, w3, w4, c1, c2, c3, c4;
var handler1 = 'null';
var handler2 = 'null';
var handler3 = 'null';
var objid = [];
var ally;
var newresultLayer = 'null';
var allresultLayer = 'null';
var editableLayerss;

// var map, url = "http://localhost:8090/iserver/services/map-kaifa-4/rest/maps/xxk_china";

// var url2 = "http://localhost:8090/iserver/services/data-kaifa-5/rest/data";

// var url3 = "http://localhost:8090/iserver/services/data-kaifa-5/rest/data/datasources/xuxiake/datasets/roadNode";

// var url4 = "http://localhost:8090/iserver/services/transportationAnalyst-kaifa-5/rest/networkanalyst/xuxiake_Network@xuxiake";


// var url5="http://localhost:8090/iserver/services/data-kaifa-5/rest/data";

var map, url = "http://localhost:8090/iserver/services/map-kaifa/rest/maps/xxk_china";

var url2 = "http://localhost:8090/iserver/services/data-kaifa/rest/data";

var url3 = "http://localhost:8090/iserver/services/data-kaifa/rest/data/datasources/xuxiake/datasets/roadNode";

var url4 = "http://localhost:8090/iserver/services/transportationAnalyst-kaifa/rest/networkanalyst/xuxiake_Network@xuxiake";


var url5="http://localhost:8090/iserver/services/data-kaifa/rest/data";

// 创建地图窗口
map = L.map('map', {
    crs: L.CRS.EPSG4326,
    center: [34.09, 105.84],
    minZoom: 0.1,
    maxZoom: 18,
    zoom: 3
});


L.supermap.tiledMapLayer(url, { cacheEnabled: false, noWrap: true }).addTo(map);
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);
$("#map").css("position", "sticky");
map.on(L.Draw.Event.CREATED, completed);
//echarts
var myChartlight = echarts.init(document.getElementById('light'));

// 右边按钮组的方法
function Fullwidth() {
    var latlng = L.latLng(34, 106);
    map.setView([34, 106], 2);
}
function enlarge() {
    map.zoomIn();
}
function narrow() {
    map.zoomOut();
}
function measure() {
    handler1 = new L.Draw.Polygon(map);
    handler1.enable();
}
function distance() {
    handler2 = new L.Draw.Polyline(map);
    handler2.enable();
}
function translation() {
    map.panTo([36, 107]);
}
function clearr() {
    oo.clearLayers();
    layertest = [];
    route.clearLayers();
    map.removeLayer(myGrouptest);
    map.removeLayer(myGroupstart);
    myGroupend.clearLayers();
    myGroupstart.clearLayers();
    map.removeLayer(myGroupp);

}