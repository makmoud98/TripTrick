$("#submitmap").on("click",function(){
    var location = {lat:0,long:0,zoom:10};
    var url = $("#map").val();
    if(url.trim() == ""){
        return;
    }
    $("#map").val("");//clear the input box
    var tokens = url.split("/");
    for(var i = 0;i < tokens.length;i++){
        var token = tokens[i];
        console.log("token"+i);
        if(token[0] == "@"){
            console.log("found @");
            var data = token.split(",");
            location.lat = parseFloat(data[0].substr(1));
            location.long = parseFloat(data[1]);
            var zoom = "10";
            if(data[2]){
            zoom = data[2].substr(0,data[2].length-1);
            }
            location.zoom = parseFloat(zoom);
            $("#location").val(JSON.stringify(location));
            console.log("edited location");
            break;
        }
    }
	console.log("saved map!!");
});

