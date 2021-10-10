import { popup } from "./utility.js"
import { edit_attributes } from "./attributes.js"
import { preset } from "./preset.js"
import { steam_inventory_update } from "./steam_inventory.js"

// utility


function update() {
	var quality = document.getElementById("input_quality").value

	if (quality == "Unusual" || quality == "Strange Unusual") {
		document.getElementById("disableunusual").style.display = "block"
	} else {
		document.getElementById("disableunusual").style.display = "none"
	}

	if (quality == "Strange" || quality == "Strange Unusual") {
		document.getElementById("disablestrange").style.display = "block"
	} else {
		document.getElementById("disablestrange").style.display = "none"
	}

	steam_inventory_update()
}

// setup inputs

for (var element of document.querySelectorAll("select")) {
	element.value = element.getAttribute("default")
	element.oninput = update
}

for (var element of document.querySelectorAll("input")) {
	element.value = element.getAttribute("default")
	element.oninput = update
}

for (var element of document.querySelectorAll("img")) {
	element.src = element.getAttribute("default")
}

document.getElementById("input_attributes").onclick = function() {
	edit_attributes()
}

document.getElementById("link").onclick = function() {
	preset()
}

update()

// detect mobile

if (window.matchMedia("only screen and (max-width: 760px)").matches) {
	popup("Mobile support", "Mobile devices are not supported! Continue with caution.")
}

// detect ie

var user_agent = navigator.userAgent
if (user_agent.indexOf("MSIE ") > -1 || user_agent.indexOf("Trident/") > -1) {
	popup("Internet Explorer support", "Internet Explorer is not supported! Continue with caution.")
}

// loop

setInterval(function() {
	if (document.getElementById("input")) {
		var input = document.getElementById("input")
		input.style.left = (screen.availWidth/2 - input.offsetWidth/2) + "px"
		input.style.top = (screen.availHeight/2.5 - input.offsetHeight/2) + "px"
	}

	if (document.getElementById("popup")) {
		var popup = document.getElementById("popup")
		popup.style.left = (screen.availWidth/2 - popup.offsetWidth/2) + "px"
		popup.style.top = (screen.availHeight/2.5 - popup.offsetHeight/2) + "px"
	}

	if (document.getElementById("preset")) {
		var popup = document.getElementById("preset")
		preset.style.left = (screen.availWidth/2 - preset.offsetWidth/2) + "px"
		preset.style.top = (screen.availHeight/2.5 - preset.offsetHeight/2) + "px"
	}
}, 50)