var tabs = document.querySelectorAll(".lboard_tabs ul li");
var overall = document.querySelector(".overall");
var helloiot = document.querySelector(".helloiot");
var iothustle = document.querySelector(".iothustle");
var items = document.querySelectorAll(".lboard_item");

tabs.forEach(function(tab){
	tab.addEventListener("click", function(){
		var currenttab = tab.getAttribute("data-li");
		
		tabs.forEach(function(tab){
			tab.classList.remove("active");
		})

		tab.classList.add("active");

		items.forEach(function(item){
			item.style.display = "none";
		})

		if(currenttab == "overall"){
			overall.style.display = "block";
		}
		else if(currenttab == "helloiot"){
			helloiot.style.display = "block";
		}
		else{
			iothustle.style.display = "block";
		}

	})
})