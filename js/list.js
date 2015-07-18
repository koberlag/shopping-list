$(document).ready(function(){
	$("items-content").find(".active-list li").click(toggleCheckedItem);
	$(".side-bar-handle").click(toggleSideBar);
	$(".side-bar-handle").click(toggleSideBarHandleIcon);
	$("#item-textbox").keypress(addItemToContentList);
    $(".fa-times").click(removeItem);
    $("#add-list-button").click(addNewList);
	$("#save-button").click(saveList);
	$("#title-textbox").focus(setOldValue).change(saveList);//keypress(setOldValue).keyup(saveList);
	$(".saved-list").sortable();
	$(".items-content").find(".active-list").sortable();
	initialize();
});

function initialize(){
	if(localStorage.length > 0){
		loadItemsForSavedLists();
	}
}

function loadItemsForSavedLists(){
	var savedList = $(".saved-list");
	for (var i = 0; i <= localStorage.length -1; i++) {
		var savedListItem = $("<li>"),
			listName = localStorage.key(i);

		savedListItem.append(listName);
		savedList.append(savedListItem);
		if(i === 0){
			loadItemsForContentList(JSON.parse(localStorage.getItem(listName)));
			savedList.find("li").eq(i).addClass("active-list");
			$("#title-textbox").val(listName);
		}
	};
}

function loadItemsForContentList(listItems){
	var activeList = $(".items-content").find(".active-list");
	for (var i = 0; i <= listItems.length - 1; i++) {
		var listItem = $("<li>"),
			itemName = listItems[i];
		listItem.append(itemName);
		activeList.append(listItem);
	};
}

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

		itemsList.prepend(createContentItem()); //Add New Item To Top Of List
		itemsList.find("li").first().hide().show("slow");
		$("#item-textbox").val("");//Clear Input Field
	}	
}

function addItemToSavedList(){
	var savedList 	= $(".saved-list"),
		newListItem = $(createSavedListItem()).addClass("active-list");

		savedList.children().removeClass("active-list");
		savedList.append(newListItem);
		newListItem.hide().show("slow");
		savedList.find("li").click(selectList);
}

function removeItem(){
	event.stopPropagation();//Prevent events from bubbling up on li.
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

function setOldValue(){
	$(this).data("oldValue", $(this).val())
}

function saveList(){
	var newValue = $(this).val(),
		oldValue = $(this).data('oldValue'),
		//listItem = localStorage.getItem(oldValue),
		keys = Object.keys(localStorage),
		oldIndex = keys.indexOf(oldValue);

	if(oldIndex !== -1){
		localStorage.setItem(newValue, localStorage.getItem(oldValue));
		localStorage.removeItem(oldValue);
	}
}

// function saveList(){
// 	//If enter or left mouse pressed
// 	if (event.which === 13 || event.which === 1){
// 		var savedList 	= $(".saved-list").find(".active-list"),
// 	    	titleTextBox = $("#title-textbox");

// 		if(titleTextBox.val() === "")
// 		{
// 			titleTextBox.effect("shake");
// 			return;
// 		}

// 		if(savedList.length === 0)
// 		{
// 			//add new list
// 			addItemToSavedList();
// 		}
// 		else
// 		{
// 			//Update list name
// 			savedList.find(".title-span").html(titleTextBox.val());
// 		}
		
// 		//Create ul in saved list item for holding content list items
// 		var listItems = $(".items-content").find(".active-list li"),
// 			newSavedList = $("<ul class='saved-list-content'>").append(listItems.clone());

// 		if($(".saved-list").find(".active-list").find(".saved-list-content").length ===0)
// 		{
// 			$(".saved-list").find(".active-list").append(newSavedList);
// 		}
// 		else
// 		{
// 			$(".saved-list").find(".active-list").find("ul").replaceWith(newSavedList);
// 		}

// 		$(".saved-list").find(".active-list").find("ul").hide();
// 	}
// }

function selectList(){
	var savedListContent = $(this).find(".saved-list-content"),
		listTitle = $(this).find(".title-span").text(),
		itemsList = $(".items-content").find(".active-list");

	$(".saved-list").children().removeClass("active-list");
	savedListContent.parent().addClass("active-list");
	itemsList.empty().append(savedListContent.find("li").clone());
	$("#title-textbox").val(listTitle);
	itemsList.find("li").click(toggleCheckedItem);
	itemsList.find("li .fa-times").first().click(removeItem);
}

function createContentItem(){
	var newListItem = $("<li>" + createCheckIcon() + $("#item-textbox").val() + createDeleteIcon() +"</li>");
		newListItem.find(".fa-times").click(removeItem);
		newListItem.click(toggleCheckedItem);
		return newListItem;
}

function createSavedListItem(){
	var newListItem = $("<li>" + createTitleSpan() + createDeleteIcon() +"</li>");
		newListItem.find(".fa-times").click(removeItem);
		return newListItem;
}

function createTitleSpan(){
	return "<span class='title-span'>" + $("#title-textbox").val() + "</span>";
}

function createDeleteIcon(){
	return "<i class='fa fa-times fa-lg'></i>";
}

function createCheckIcon(){
	return "<i class='fa fa-check fa-lg'></i>";
}