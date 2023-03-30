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

function my_Queryroute1(){
  if($('#jiaotong').val()==''){
  alert('请输入查询路线');
}else{
Fullwidth();
rankss=[];
modal=[];
ooo.clearLayers();
$("#thebuild").find("ul").remove();
  biaoobj=[];
  var sqlParam_new = new SuperMap.GetFeaturesBySQLParameters({
          queryParameter: {
              name: "h_totalroute@xuxiake",
              attributeFilter: "OBJECTID = " + $('#jiaotong').val().toString() 
          },
          datasetNames: ["xuxiake:h_totalroute"],
          //toIndex:1000
      });
      L.supermap
          .featureService(url5)
          .getFeaturesBySQL(sqlParam_new, function (serviceResult) {
            console.log(serviceResult);
             if(serviceResult.result.features.features.length==0){
                  alert('未查询到任何信息');
              }
              else
              {
                
                var build=document.getElementById("thebuild");
                newresultLayer = L.geoJSON(serviceResult.result.features).addTo(map);
                var r=serviceResult.result.features.features;
                for(i=0;i<r.length;i++)
                {
                  biaoobj.push(r[i]);
                  rankss.push(document.createElement("ul"));
                  modal.push(document.createElement("tbody"));
                  modal[i].innerHTML='<tr><td class="success">'+r[i].properties.OBJECTID +'</td>'+'<td class="success">'+r[i].properties.DSECRIPTION+'</td>'+'<td class="success">'+r[i].properties.TYPE+'</td>'+'<td class="success">'+r[i].properties.ID+'</td></tr>';

                  build.appendChild(rankss[i]);
                  $("#shuoming").addClass("table");
                  $("#shuoming").addClass("table-bordered");
                }
              }
            });
}
//这里else结束
}

