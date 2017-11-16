//we store a json stringified item class inside of the #items value. 

//Click X to delete memo
$("td").on("click","span",function(event){
	var memos = JSON.parse($("#memos").val());
	for(var i = 0; i < memos.length; i++){
	    var memo = memos[i];
	    if(memo.desc == $(this).parent().attr("value")){
	        memos.splice(i,1);
	        $(this).parent().fadeOut().remove();
			event.stopPropagation();
			$("#memos").val(JSON.stringify(memos));
			break;
	    }
	}
});

$("#add").on("click",function(){
 var memo = $("#newmemo").val();
 if(memo != ""){
    $(".newrow").append("<tr><td><div value='"+memo+"')><span><i class='fa fa-trash-o' aria-hidden='true'></i></span>"+memo+"</div></td></tr>");
    var memos = JSON.parse($("#memos").val());
    memos.push({desc:memo});
    $("#memos").val(JSON.stringify(memos));
    $("#newmemo").val("");
 }
});

$("#save").on("click",function(){
	console.log("saved checklist!!");
});