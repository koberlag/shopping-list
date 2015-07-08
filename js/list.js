$(document).ready(function(){
	var itemsList = $(".items-list").find("li");

	itemsList.click(function(){

		$(this).find(".fa-check").toggleClass("checked");
	})
})