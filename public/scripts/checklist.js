//we store a json stringified item class inside of the #items value. 

$("td").on("click","div", function(){
	var items = JSON.parse($("#items").val());//then we parse it to reconstruct our class object
	for(var i = 0; i < items.length; i++){//then make some changes in the loop
	    var item = items[i];
	    if(item.name == $(this).attr("value")){
	        item.crossed=!item.crossed;
	        $(this).toggleClass("checked")
	        $("#items").val(JSON.stringify(items));//we re-stringify the new items class that we just modifed and store it back into the #items value
	        break;
	    }
	}
});

//Click X to delete item
$("td").on("click","span",function(event){
	var items = JSON.parse($("#items").val());
	for(var i = 0; i < items.length; i++){
	    var item = items[i];
	    if(item.name == $(this).parent().attr("value")){
	        items.splice(i,1);
	        $(this).parent().fadeOut().remove();
			event.stopPropagation();
			$("#items").val(JSON.stringify(items));
			break;
	    }
	}
});

$("#add").on("click",function(){
 var item = $("#newitem").val();
 if(item != ""){
    $(".newrow").append("<tr><td><div class='' value='"+item+"')><span><i class='fa fa-trash-o' aria-hidden='true'></i></span>"+item+"</div></td></tr>");
    var items = JSON.parse($("#items").val());
    items.push({name:item,crossed:false});
    $("#items").val(JSON.stringify(items));
    $("#newitem").val("");
 }
});

$("#save").on("click",function(){
	console.log("saved checklist!!");
});