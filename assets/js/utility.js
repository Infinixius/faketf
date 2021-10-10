export function fadeout(element, fadeout) {
    var op = 1  // initial opacity
    var timer = setInterval(function() {
        if (op <= 0.1) {
            clearInterval(timer)
            element.style.display = "none"
        }
        element.style.opacity = op
        element.style.filter = "alpha(opacity=" + op * 100 + ")"
        op -= op * 0.1;
    }, (fadeout * 10))
} // credit to http://stackoverflow.com/questions/6121203/ddg#6121270

export function popup(titleText, descriptionText) {
	if (document.getElementById("input")) {
		document.getElementById("input").remove()
	}
	if (document.getElementById("popup")) {
		document.getElementById("popup").remove()
	}
	var popup = document.createElement("div")
	popup.id = "popup"

	var overlay = document.createElement("div")
	overlay.classList.add("popup_overlay")
	popup.appendChild(overlay)

	var title = document.createElement("h1")
	title.textContent = titleText
	title.classList.add("popup_text")
	popup.appendChild(title)

	var desc = document.createElement("p")
	desc.textContent = descriptionText
	desc.classList.add("popup_text")
	popup.appendChild(desc)

	var button = document.createElement("button")
	button.textContent = "OK"
	button.classList.add("popup_button")
	button.onclick = function() {
		fadeout(popup,1)
	}
	popup.appendChild(button)

	document.body.appendChild(popup)

	// center the popup directly in the middle of the screen. using left: 50%; or top: 50%; doesn't align it properly
	popup.style.left = (screen.availWidth/2 - popup.offsetWidth/2) + "px"
	popup.style.top = (screen.availHeight/3 - popup.offsetHeight/2) + "px"
}
