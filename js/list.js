$(document).ready(function(){
	$("items-content").find(".active-list li").click(toggleCheckedItem);
	$(".side-bar-handle").click(toggleSideBar);
	$(".side-bar-handle").click(toggleSideBarHandleIcon);
	//$("#new-list-input").keydown(addList);
	$("#item-input").keydown(addItem);
	$("#title-textbox").keydown(saveList);
    $(".fa-times").click(removeItem);
    $("#add-list-button").click(addNewList);
	$("#save-button").click(saveList);
	// $("#title-textbox").blur(updateName);
	// $(".saved-list").find("li").click(selectActiveList);
});

function toggleCheckedItem(){
	if(!$(event.target).hasClass('fa-times')){
		$(this).toggleClass("checked");            
   }
}

function toggleSideBar(){
	var savedListSection 	= $(".saved-list-section"),
		outerListContainer 	= $(".outer-list-container");
	if(savedListSection.hasClass("side-bar-collapsed")){
		savedListSection.animate({left: "+=25%"});
		outerListContainer.animate({marginLeft:"25%"});
	}
	else
	{
	 	savedListSection.animate({left: "-=25%"});
		outerListContainer.animate({marginLeft:"0%"});
	}
	 savedListSection.toggleClass("side-bar-collapsed");
}

function toggleSideBarHandleIcon(){
	var sideBarHandleIcon = $(this).find("i");
		sideBarHandleIcon.toggleClass("fa-angle-left");
		sideBarHandleIcon.toggleClass("fa-angle-right");
}

function addList(){
	var itemInput 	= $("#title-textbox"),
		inputValue 	= itemInput.val();
	//If enter pressed
	//if (event.which == 13 && inputValue !== ""){
		var savedList = $(".saved-list"),
			deleteIcon = "<i class='fa fa-times fa-lg'></i>",
			newListItem = $("<li><span>" + inputValue + "</span>" + deleteIcon + "</li>")
							.addClass("active-list");

		savedList.children().removeClass("active-list");
		savedList.append(newListItem);
		newListItem.hide().show("slow");
		newListItem.find(".fa-times").first().click(removeItem);
		$(".saved-list").find("li").click(selectList);
	//}
}

function addItem(){
	var itemInput 	= $(this),
		inputValue 	= itemInput.val();
	//If enter pressed
	if (event.which == 13 && inputValue !== ""){

			var itemsList 	= $(".items-content .active-list"),
				checkIcon 	= "<i class='fa fa-check fa-lg'></i>",
				deleteIcon 	= "<i class='fa fa-times fa-lg'></i>",
				newListItem = "<li>" + checkIcon + inputValue + deleteIcon +"</li>";

			itemsList.prepend(newListItem); //Add New Item To Top Of List
			itemInput.val("");//Clear Input Field
			itemsList.find("li").first()
								.hide()
								.show("slow")
								.click(toggleCheckedItem);
							
			itemsList.find("li .fa-times").first().click(removeItem);
	}	
}

function removeItem(){
	var icon = $(this),
		item = icon.parent();

	if(item.hasClass("active-list"))
	{
		addNewList();
	}

	item.slideUp("slow", function(){ $(this).remove(); });
}

function addNewList(){
	$("#title-textbox").val("");
	$(".items-content").find(".active-list").empty();
	$(".saved-list").find("li").removeClass("active-list");
}

function saveList(){
	var savedList = $(".saved-list").find(".active-list"),
	    titleTextBox = $("#title-textbox"),
	    titleSpan = "<span>" + $("#title-textbox").val() + "</span>",
	    deleteIcon = "<i class='fa fa-times fa-lg'></i>";

	if (event.which == 13 && $(this).data('clicked', true)){
		if(titleTextBox.val() !== "")
		{
			if(savedList.length === 0)
			{
				addList();
			}
			else
			{
				savedList.html(titleSpan + deleteIcon);
				savedList.find(".fa-times").first().click(removeItem);
			}
			//Why is savedList and x not the same?
			var x = $(".saved-list").find(".active-list");
			var listItems = $(".items-content").find(".active-list li"),
				newSavedList = $("<ul>").append(listItems.clone());
			if($(".saved-list").find(".active-list").find("ul").length ===0)
			{
				$(".saved-list").find(".active-list").append(newSavedList);
			}
			else
			{
				$(".saved-list").find(".active-list").find("ul").replaceWith($(".items-content").find(".active-list"));
			}

			$(".saved-list").find(".active-list").find("ul").hide();
		}
		else
		{
			titleTextBox.effect("shake");
		}
	}
}

function selectList(){
	var savedList = $(this).find("ul").find("li"),
		listTitle = $(this).find("span").text(),
		itemsList = $(".items-content").find(".active-list");
	
	$("#title-textbox").val(listTitle);
	if($(".items-content").find(".active-list li").length === 0)
	{
		itemsList.append(savedList.clone());
	}
	else
	{
		itemsList.empty().append(savedList.clone());
	}
	
	itemsList.find("li").click(toggleCheckedItem);
	itemsList.find("li .fa-times").first().click(removeItem);
}

// function addItem(event){
// 	var itemInput 	= $(this),
// 		inputValue 	= itemInput.val();
// 	//If enter pressed
// 	if (event.which == 13 && inputValue !== ""){
		
// 			var itemsList 	= $(".active-list"),
// 				checkIcon 	= "<i class='fa fa-check fa-lg'></i>",
// 				deleteIcon 	= "<i class='fa fa-times fa-lg'></i>",
// 				newListItem = "<li>" + checkIcon + inputValue + deleteIcon +"</li>";

// 			itemsList.prepend(newListItem);//Add New Item To Top Of List
// 			itemInput.val("");//Clear Input Field
// 			itemsList.find("li").first()
// 								.hide()
// 								.show("slow")
// 								.click(toggleCheckedItem);
// 			itemsList.find("li .fa-times").first().click(removeItem);
			
// 	}
// }


// function addList(event){
// 	var itemInput 	= $(this),
// 		inputValue 	= itemInput.val();
// 	//If enter pressed
// 	if (event.which == 13 && inputValue !== ""){
		
// 			var savedList 		= $(".saved-list"),
// 				deleteIcon 		= "<i class='fa fa-times fa-lg'></i>",
// 				newItemsList 	= $("<ul>").addClass("active-list"),
// 				titleTextBox 	= $("#title-textbox"),
// 				newListItem 	= $("<li>").text(inputValue).append(newItemsList);

// 			//savedList.find("li").find("ul").removeClass("active-list");//remove existing active list
// 			//$(".saved-list").find(".items-list").hide();

// 			titleTextBox.val(inputValue);
// 			savedList.prepend(newListItem);//Add New Item To Top Of List
// 			itemInput.val("");//Clear Input Field
// 			savedList.find("li").first()
// 								.hide()
// 								.show("slow");

// 			//$(".items-content .active-list").replaceWith(newItemsList);
// 			$(".items-content .active-list").html(newItemsList.children());
// 			savedList.find("li .fa-times").first().click(removeItem);
			
// 	}
// }

// function selectActiveList(){
// 	$(this).parent().find("li ul").removeClass("active-list");
// }



// function saveList(){
// 	var titleTextBox = $("#title-textbox");
// 	if(titleTextBox.val() !== "")
// 	{
// 		var listNameItem = "<li>" + titleTextBox.val() +  "<i class='fa fa-times fa-lg'></i></li>",
// 			savedItemsList = $(".saved-list .active-list"),
// 			itemsList = $(".items-content").find(".active-list");

// 		savedItemsList.html(itemsList.children());
// 		titleTextBox.css({border:"none"})
// 	}
// 	else
// 	{
// 		titleTextBox.css({border:"4px solid brown"})
// 		titleTextBox.effect( "shake" );
// 	}
// }

// function updateName(){	
// 	$(".saved-list").find(".active-saved-item").text($(this).val());
// }