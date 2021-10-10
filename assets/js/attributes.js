import { fadeout } from "./utility.js"
import { steam_inventory_update_attributes } from "./steam_inventory.js"

export function edit_attributes() {
	if (document.getElementById("input")) {
		document.getElementById("input").remove()
	}
	if (document.getElementById("popup")) {
		document.getElementById("popup").remove()
	}
	var input = document.createElement("div")
	input.id = "input"

	var overlay = document.createElement("div")
	overlay.classList.add("input_overlay")
	input.appendChild(overlay)

	var title = document.createElement("h1")
	title.textContent = "Edit attributes"
	title.classList.add("input_text")
	input.appendChild(title)

	var desc = document.createElement("p")
	desc.innerHTML = "Each line is a different attribute to the weapon. <span class='positive'>+ Positive attribute</span> <span class='negative'>- Negative attribute</span> <span class='title'>> Item set</span> <span class='description'>} Item set item</span> <span class='descriptor'>& Descriptor</span> <span class='strange_part'>% Strange Part</span>"
	desc.classList.add("input_text")
	input.appendChild(desc)

	var editor = document.createElement("textarea")
	var editorText = []
	for (const element of document.getElementsByClassName("attribute")) {
		console.log(element)
		if (element.classList.contains("positive")) {
			editorText.push("+ " + element.textContent)
		} else if (element.classList.contains("negative")) {
			editorText.push("- " + element.textContent)
		} else if (element.classList.contains("title")) {
			editorText.push("> " + element.textContent)
		} else if (element.classList.contains("description")) {
			editorText.push("} " + element.textContent)
		} else if (element.classList.contains("descriptor")) {
			editorText.push("& " + element.textContent)
		} else if (element.classList.contains("strange_part")) {
			editorText.push("% " + element.textContent)
		}
	}
	editor.textContent = editorText.join("\n")
	editor.classList.add("input_editor")
	input.appendChild(editor)

	var button = document.createElement("button")
	button.textContent = "OK"
	button.classList.add("input_button")
	button.onclick = function() {
		fadeout(input,1)
		steam_inventory_update_attributes(editor.value.split("\n"))
	}
	input.appendChild(button)

	document.body.appendChild(input)

	// center the popup directly in the middle of the screen. using left: 50%; or top: 50%; doesn't align it properly
	input.style.left = (screen.availWidth/2 - input.offsetWidth/2) + "px"
	input.style.top = (screen.availHeight/2.5 - input.offsetHeight/2) + "px"
}