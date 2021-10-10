import { fadeout } from "./utility.js"
import { steam_inventory_update, steam_inventory_update_attributes } from "./steam_inventory.js"

export function preset() {
	if (document.getElementById("input")) {
		document.getElementById("input").remove()
	}
	if (document.getElementById("popup")) {
		document.getElementById("popup").remove()
	}
	if (document.getElementById("preset")) {
		document.getElementById("preset").remove()
	}

	var preset = document.createElement("div")
	preset.id = "preset"

	var overlay = document.createElement("div")
	overlay.classList.add("input_overlay")
	preset.appendChild(overlay)

	var title = document.createElement("h1")
	title.textContent = "Select Preset"
	title.classList.add("input_text")
	preset.appendChild(title)

	var desc = document.createElement("p")
	desc.innerHTML = "Work in progress, only Scout and some Soldier weapons are here."
	desc.classList.add("input_text")
	preset.appendChild(desc)

	var list = document.createElement("div")
	list.classList.add("preset_list")
	preset.appendChild(list)

	var button = document.createElement("button")
	button.textContent = "Cancel"
	button.classList.add("input_button")
	button.onclick = function() {
		fadeout(preset,1)
	}
	preset.appendChild(button)

	document.body.appendChild(preset)

	// center the popup directly in the middle of the screen. using left: 50%; or top: 50%; doesn't align it properly
	preset.style.left = (screen.availWidth/2 - preset.offsetWidth/2) + "px"
	preset.style.top = (screen.availHeight/2.5 - preset.offsetHeight/2) + "px"

	fetch("./assets/data/weapons.json")
		.then(res => res.text())
		.then(text => {
			var json = JSON.parse(text)

			for (const jsonweapon of json) {
				var weapon = document.createElement("div")
				var text = document.createElement("p")
				var image = document.createElement("img")

				weapon.classList.add("preset_weapon")

				text.textContent = jsonweapon.name
				text.classList.add("preset_text")
				image.src = jsonweapon.icon
				image.classList.add("preset_image")

				weapon.append(image)
				weapon.append(text)
				list.appendChild(weapon)
				weapon.onclick = function() {
					fadeout(this.parentNode.parentNode,1)
					var weapondata = json.find(wep => {
						return wep.name == this.children[1].textContent
					})

					document.getElementById("input_name").value = weapondata.name

					var level = weapondata.level.split("Level")[1].split(" ")
					level.shift() // get rid of empty string at the beginning
					document.getElementById("input_level").value = level[0]
					level.shift() // get rid of level number at the start
					document.getElementById("input_type").value = level.join(" ")

					document.getElementById("input_icon").value = weapondata.backpack_icon
					
					steam_inventory_update_attributes(weapondata.attributes)
					steam_inventory_update()
				}
			}
		})
		.catch(error => { console.error(error) })
}