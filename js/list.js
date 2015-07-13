$(document).ready(function(){
	$("items-content").find(".active-list li").click(toggleCheckedItem);
	$(".side-bar-handle").click(toggleSideBar);
	$(".side-bar-handle").click(toggleSideBarHandleIcon);
	$("#item-textbox").keydown(addItemToContentList);
	$("#title-textbox").keydown(saveList);
    $(".fa-times").click(removeItem);
    $("#add-list-button").click(addNewList);
	$("#save-button").click(saveList);
	$(".saved-list").sortable();
	$(".items-content").find(".active-list").sortable();
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

function addItemToContentList(){
	//If enter pressed
	if (event.which == 13 && $("#item-textbox").val() !== ""){
		var itemsList 	= $(".items-content").find(".active-list");

		itemsList.prepend(CreateContentItem()); //Add New Item To Top Of List
		itemsList.find("li").first().hide().show("slow");
		$("#item-textbox").val("");//Clear Input Field
	}	
}

function addItemToSavedList(){
	var savedList 	= $(".saved-list"),
		newListItem = $(CreateSavedListItem()).addClass("active-list");

		savedList.children().removeClass("active-list");
		savedList.append(newListItem);
		newListItem.hide().show("slow");
		savedList.find("li").click(selectList);
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
	var titleTextBox = $("#title-textbox");
	titleTextBox.val("");
	titleTextBox.focus();
	$(".items-content").find(".active-list").empty();
	$(".saved-list").find("li").removeClass("active-list");
}

function saveList(){
	//If enter or left mouse pressed
	if (event.which === 13 || event.which === 1){
		var savedList 	= $(".saved-list").find(".active-list"),
	    	titleTextBox = $("#title-textbox");

		if(titleTextBox.val() === "")
		{
			titleTextBox.effect("shake");
			return;
		}

		if(savedList.length === 0)
		{
			//add new list
			addItemToSavedList();
		}
		else
		{
			//Update list name
			savedList.find(".title-span").html(titleTextBox.val());
		}
		
		//Create ul in saved list item for holding content list items
		var listItems = $(".items-content").find(".active-list li"),
			newSavedList = $("<ul class='saved-list-content'>").append(listItems.clone(true));

		if($(".saved-list").find(".active-list").find(".saved-list-content").length ===0)
		{
			$(".saved-list").find(".active-list").append(newSavedList);
		}
		else
		{
			$(".saved-list").find(".active-list").find("ul").replaceWith(newSavedList);
		}

		$(".saved-list").find(".active-list").find("ul").hide();
	}
}

function selectList(){
	var savedListContent = $(this).find(".saved-list-content").find("li"),
		listTitle = $(this).find(".title-span").text(),
		itemsList = $(".items-content").find(".active-list");
	
	if(itemsList.find("li").length === 0)
	{
		itemsList.append(savedListContent.clone());
	}
	else
	{
		itemsList.empty().append(savedListContent.clone());
	}
	
	$("#title-textbox").val(listTitle);
	itemsList.find("li").click(toggleCheckedItem);
	itemsList.find("li .fa-times").first().click(removeItem);
}

function CreateContentItem(){
	var newListItem = $("<li>" + CreateCheckIcon() + $("#item-textbox").val() + CreateDeleteIcon() +"</li>");
		newListItem.find(".fa-times").click(removeItem);
		newListItem.click(toggleCheckedItem);
		return newListItem;
}

function CreateSavedListItem(){
	var newListItem = $("<li>" + CreateTitleSpan() + CreateDeleteIcon() +"</li>");
		newListItem.find(".fa-times").click(removeItem);
		return newListItem;
}

function CreateTitleSpan(){
	return "<span class='title-span'>" + $("#title-textbox").val() + "</span>";
}

function CreateDeleteIcon(){
	return "<i class='fa fa-times fa-lg'></i>";
}

function CreateCheckIcon(){
	return "<i class='fa fa-check fa-lg'></i>";
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