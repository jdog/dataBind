/* Example of primitive version */
J.addWait(
	"Modules.dataBindExample"
	, [
			"Constructors.DataBind"
			, "DomContentLoaded" 
	]
	, function dataBindExample_factory(ref) {

		var e = {
			example1 : document.getElementById("example1")
			, example2 : document.getElementById("example2")
			, example3 : document.getElementById("example3")
			, example1_source : document.getElementById("example1_source")
			, example2_source : document.getElementById("example2_source")
			, example3_source : document.getElementById("example3_source")
			, example4 : document.getElementById("example4")
			, example5 : document.getElementById("example5")
			, grid : document.getElementById("grid")
			, limit : document.querySelector("input[data-bind='limit']")
			, speed : document.querySelector("input[data-bind='speed']")
			, letters : document.querySelector("input[data-bind='letters']")
			, limitDisplay : document.querySelector("span[data-bind='limit']")
			, speedDisplay : document.querySelector("span[data-bind='speed']")
		}

		var dog = {
			e : e
			, ref : ref
			, db : ref.DataBind()
		}
		, db = dog.db


		function setBinding() {

			db
				// these examples set the data, but it could easily be set as an attribute
				.bind(e.example1, "example1Data")
				.bind(e.example2, "example2Data")
				.bind(e.example3, "example3Data")

				// this one assumes the attribute, so no data source is passed
				.bind(e.example4)
				.bind(e.example1_source)
				.bind(e.example2_source)
				.bind(e.example3_source)
				.bind(e.example5)

				.bind(e.limit)
				.bind(e.speed)
				.bind(e.limitDisplay)
				.bind(e.speedDisplay)
				.bind(e.letters)
				.bind(e.grid)

			e.example1_source.onkeyup = function(event) {
				db.set("example1Data", event.srcElement.value)
					.update()
			}

			e.example2_source.onkeyup = function(event) {
				db.set("example2Data", event.srcElement.value)
					.update()
			}

			e.example3_source.onkeyup = function(event) {
				db.set("example3Data", event.srcElement.value)
					.update()
			}

			e.letters.onkeyup = function(event) {
				db.set("letters", event.srcElement.value)
				db.update()
					.trigger("updateGrid")
			}

			e.limit.onkeyup = function(event) {
				db.set("limit", event.srcElement.value)
				db.update()
					.trigger("updateGrid")
			}

			e.speed.onkeyup = function(event) {
				db.set("speed", event.srcElement.value)
				db.update()
					.trigger("updateGrid")
			}

			// fancy concatination example
			db.on("update", function() {
				db.set("moreComplicated.example.name"
					, db.get("example1Data") + db.get("example2Data") + db.get("example3Data"))
			})

			// DEMO of changing the data to see it work
			setTimeout(function() {
				db.set("example3Data", "Server side example")
				.update()
			}, 2000)

		}

		// initialize all of the data
		;(function init() {

			db.set("letters", "a b c d e f g h i j k l m n o p q r s t u v w x y z ∅ ∈ ∀ ⑀ ⑄ ⑆")
			db.set("limit", "500")
			db.set("speed", "100")
			db.set("example1Data", "hello world")
			db.set("example2Data", "hello world 2")
			db.set("SampleData.People", [
				{
					FirstName : "John"
					, LastName : "Frank"
				}
				, {
					FirstName : "George"
					, LastName : "Beans"
				}
				, {
					FirstName : "Oliver"
					, LastName : "Lloyd"
				}
			])

			setBinding()

		}())

		return dog

})
