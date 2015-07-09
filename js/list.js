$(document).ready(function(){
	$(".side-bar-handle").click(toggleSideBar);
	$(".items-list").find("li").click(toggleCheckedItem);
	$(".side-bar-handle").click(toggleSideBarHandleIcon);
	$(".item-input").keydown(addItem);
});

function toggleCheckedItem(){
	$(this).find(".fa-check").toggleClass("checked");
}

function toggleSideBar(){
	var savedListSection = $(".saved-list-section"),
		mainHeading = $(".main-heading"),
		outerListContainer = $(".outer-list-container");
	if(savedListSection.hasClass("side-bar-collapsed"))
	{
		savedListSection.animate({left: "+=25%"});
		outerListContainer.animate({marginLeft:"25%"});
		mainHeading.animate({marginLeft:"25%"});
	}
	else
	{
	 	savedListSection.animate({left: "-=25%"});
		outerListContainer.animate({marginLeft:"0%"});
		mainHeading.animate({marginLeft:"0%"});
	}
	 savedListSection.toggleClass("side-bar-collapsed");
}

function addItem(event)
	{
		//If enter pressed
		if (event.which == 13 ) {
			var itemInput 	= $(this),
				inputValue 	= itemInput.val(),
				itemsList 	= $(".items-list"),
				checkIcon 	= "<i class='fa fa-check fa-lg'></i>",
				deleteIcon 	= "<i class='fa fa-times fa-lg'></i>",
				newListItem = "<li>" + checkIcon + inputValue + deleteIcon +"</li>";

				itemsList.prepend(newListItem);//Add New Item To Top Of List
				itemInput.val("");//Clear Input Field
				itemsList.find("li").first()
									.hide()
									.show("slow")
									.click(toggleCheckedItem);
				
		}
	}

function toggleSideBarHandleIcon(){
	var sideBarHandleIcon = $(this).find("i");
	sideBarHandleIcon.toggleClass("fa-angle-left");
	sideBarHandleIcon.toggleClass("fa-angle-right");
}