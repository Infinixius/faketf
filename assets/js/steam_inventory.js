const qualitycolors = {
	"Normal": "B2B2B2",
	"Unique": "7D6D00",
	"Vintage": "476291",
	"Genuine": "4D7455",
	"Strange": "CF6A32",
	"Strange Unusual": "8650AC",
	"Unusual": "8650AC",
	"Haunted": "38F3AB",
	"Collector's": "AA0000",
	"Decorated": "FAFAFA",
	"Community": "70B04A",
	"Self-Made": "70B04A",
	"Valve": "A50F79"
}

const strangeranks = [
	{"kills": 0, "rank": "Strange"},
	{"kills": 10, "rank": "Remarkable"},
	{"kills": 25, "rank": "Scarcely Lethal"},
	{"kills": 45, "rank": "Mildly Menacing"},
	{"kills": 70, "rank": "Somewhat Threatening"},
	{"kills": 100, "rank": "Uncharitable"},
	{"kills": 135, "rank": "Notably Dangerous"},
	{"kills": 175, "rank": "Sufficiently Lethal"},
	{"kills": 225, "rank": "Truly Feared"},
	{"kills": 275, "rank": "Spectacularly Lethal"},
	{"kills": 350, "rank": "Gore-Splattered"},
	{"kills": 500, "rank": "Wicked Nasty"},
	{"kills": 750, "rank": "Positively Inhumane"},
	{"kills": 999, "rank": "Totally Ordinary"},
	{"kills": 1000, "rank": "Face-Melting"},
	{"kills": 1500, "rank": "Rage-Inducing"},
	{"kills": 2500, "rank": "Server-Clearing"},
	{"kills": 5000, "rank": "Epic"},
	{"kills": 7500, "rank": "Legendary"},
	{"kills": 7616, "rank": "Australian"},
	{"kills": 8500, "rank": "Hale's Own"}
]

export function steam_inventory_update() {
	var quality = document.getElementById("input_quality").value
	var level = document.getElementById("input_level").value
	var kills = document.getElementById("input_kills").value
	var rank
	
	if (isNaN(kills)) {
		rank = "NaN"
	} else if (kills < 1) {
		rank = "Strange"
	} else if (kills > 8500) {
		rank = "Hale's Own"
	} else {
		var rank = strangeranks.find(value => {
			if (kills > value.kills && kills < strangeranks[strangeranks.indexOf(value) + 1].kills) {
				return true
			} else if (kills == value.kills) {
				return true
			}
		})
		if (rank) rank = rank.rank // fixes a bug where if nothing was found during find() an error would be thrown if rank was assigned directly.
	}

	var name = document.getElementById("input_name").value
	if (quality != "Unique") { // unique items start with "The"
		document.getElementById("steam_inventory_title").textContent = quality + " " + name
	} else {
		document.getElementById("steam_inventory_title").textContent = "The " + name
	}

	var type = document.getElementById("input_type").value
	if (quality != "Strange" && quality != "Strange Unusual") {
		document.getElementById("steam_inventory_game_type").textContent = "Level " + level + " " + type
	} else {
		document.getElementById("steam_inventory_game_type").textContent = rank + " " + type + " - Kills: " + kills
	}

	var icon = document.getElementById("input_icon").value
	document.getElementById("steam_inventory_icon").src = icon

	var unusual = document.getElementById("input_unusual").value
	if (unusual != "" && quality == "Unusual" || quality == "Strange Unusual") {
		var unusual_tag = document.getElementById("unusual_tag")
		if (unusual_tag) {
			unusual_tag.textContent = "★ Unusual Effect: "+unusual
		} else {
			var unusual_tag = document.createElement("p")
			unusual_tag.classList.add("title")
			unusual_tag.id = "unusual_tag"
			unusual_tag.textContent = "★ Unusual Effect: "+unusual
			document.getElementById("steam_inventory_stats").prepend(unusual_tag)
		}
	} else {
		var unusual_tag = document.getElementById("unusual_tag")
		if (unusual_tag) {
			unusual_tag.remove()
		}
	}

	var tags = document.getElementById("input_tags").value
	if (quality != "Strange Unusual") {
		document.getElementById("steam_inventory_tags").textContent = `Tags: ${quality}, ${tags}`
	} else {
		document.getElementById("steam_inventory_tags").textContent = `Tags: Strange, Unusual, ${tags}`
	}
	
	var color = qualitycolors[quality]

	document.getElementById("steam_inventory").style.borderColor = color
	document.getElementById("steam_inventory_title").style.color = color
}

export function steam_inventory_update_attributes(list) {
	var oldAttributes = document.getElementsByClassName("attribute")

	while (oldAttributes[0]) {
		oldAttributes[0].remove()
		// thanks https://stackoverflow.com/questions/10842471/how-to-remove-all-elements-of-a-certain-class-from-the-do
		// this weird way of looping is required because getElementsByClassName returns a live list, and that's kinda finicky
	}
	for (var attribute of list.reverse()) { // has to be reserved since we use prepend later on
		var element = document.createElement("p")
		element.classList.add("attribute")
		element.textContent = attribute.slice(1)
		document.getElementById("steam_inventory_stats").prepend(element)
		switch (attribute.slice(0,2)) { // first two letters in the string
			case "+ ":
				element.classList.add("positive")
				break
			case "- ":
				element.classList.add("negative")
				break
			case "> ":
				element.classList.add("title")
				break
			case "} ":
				element.classList.add("description")
				break
			case "& ":
				element.classList.add("descriptor")
				break
			case "% ":
				element.classList.add("strange_part")
				break
			default:
				element.textContent = attribute // we have to set it here because if we dont it'll set it to be sliced on line 116
		}
	}
}