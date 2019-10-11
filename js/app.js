// @ts-nocheck
$.ajax({
	url: "https://randomuser.me/api/?results=12&nat=us",
	dataType: "json",
	success: function(data) {
		// Show data being returned in console
		console.log(data);

		// Global variables
		let employeeIndex = 0;

		// For loop to format birthdates and abbreviate state names
		for (let i = 0; i < data.results.length; i++) {
			// Format birthdates
			let year = data.results[i].dob.date.substr(0, 4);
			let month = data.results[i].dob.date.substr(5, 2);
			let day = data.results[i].dob.date.substr(8, 2);
			data.results[i].dob = month + "/" + day + "/" + year;

			// Abbreviate state names
			for (let j = 0; j < states.length; j++) {
				if (
					data.results[i].location.state.toUpperCase() ==
					states[j].name.toUpperCase()
				) {
					// Log state abbreviations to console for troubleshooting
					console.log(states[j].abbrev);

					// Change state names to state abbreviations
					data.results[i].location.state = states[j].abbrev;
				} // end if statement
			} // end for loop (state abbreviation)
		} // end for loop

		// Function to searchEmployees and dynamically populate HTML
		function searchEmployees(event) {
			// Dynamic HTML for employee data
			let employeeHTML = $(`<div id="employee-html"></div>`);

			// Overlay variables for employee data (returns more information when employee cell is clicked)
			let overlay = $(`<div id="overlay"></div>`);
			let overlayWrapperOuter = $(`<div id="overlay-wrapper-outer"></div>`);
			let overlayWrapperInner = $(`<div id="overlay-wrapper-inner"></div>`);

			let overlayHTML = $(`<div id="overlay-html"></div>`);
			let overlayHTML_close = $(`<span class="close-button"></span>`);
			let overlayHTML_next = $(`</span><span class="next-button"></span>`);
			let overlayHTML_back = $(`<span class="back-button"></span>`);

			overlay.append(overlayWrapperOuter);
			overlayWrapperOuter.append(overlayWrapperInner);
			overlayWrapperInner.append(overlayHTML);
			overlayHTML
				.append(overlayHTML_close)
				.append(overlayHTML_back)
				.append(overlayHTML_next);

			// Variable to store search input value
			let searchInput = $("#search")
				.val()
				.toUpperCase();

			// For loop to see if search input value matches employee name or username
			for (let i = 0; i < data.results.length; i++) {
				// Local variables for employee data
				let employee_fullname =
					data.results[i].name.first + " " + data.results[i].name.last;
				let employee_username = data.results[i].login.username;
				let employee_address =
					data.results[i].location.street.number +
					" " +
					data.results[i].location.street.name;

				// If statement to see if employee name or username includes search field value
				if (
					employee_fullname.toUpperCase().includes(searchInput) ||
					employee_username.toUpperCase().includes(searchInput)
				) {
					// build employeeHTML section and elements
					let employeeHTML_container = $(
						`<div class="div-employee-html"></div>`,
					);
					let employeeHTML_link = $(`<a></a>`);
					let employeeHTML_img = $(
						`<img src="${data.results[i].picture.large}"></img>`,
					);
					let employeeHTML_list = $(`<li class="div-li"></li>`);
					let employeeHTML_data = $(`<div class="employee-data"></div>`);
					let employeeHTML_name = $(
						`<p class="name">${employee_fullname}</p>`,
					);
					let employeeHTML_email = $(
						`<p class="email">${data.results[i].email}</p>`,
					);
					let employeeHTML_city = $(
						`<p class="city">${data.results[i].location.city}</p>`,
					);

					// append employeeHTML elements to document
					employeeHTML.append(employeeHTML_container);
					employeeHTML_container.append(employeeHTML_link);
					employeeHTML_link
						.append(employeeHTML_img)
						.append(employeeHTML_list);
					employeeHTML_list.append(employeeHTML_data);
					employeeHTML_data
						.append(employeeHTML_name)
						.append(employeeHTML_email)
						.append(employeeHTML_city);

					// build overlayHTML section and elements
					let overlayHTML_container = $(`<div class="div-overlay-html">`);
					let overlayHTML_img = $(
						`<img src="${data.results[i].picture.large}">`,
					);
					let overlayHTML_data = $(
						`<div class="employee-data-overlay"></div>`,
					);
					let overlayHTML_name = $(
						`<p class="name">${employee_fullname}</p>`,
					);
					let overlayHTML_username = $(
						`<p class="username">${employee_username}</p>`,
					);
					let overlayHTML_email = $(
						`<p class="email">${data.results[i].email}</p>`,
					);
					let overlayHTML_break = $(`<div class="divider"></div>`);
					let overlayHTML_cell = $(
						`<p class="phone">${data.results[i].cell}</p>`,
					);
					let overlayHTML_address = $(
						`<p class="address">${employee_address}</br>${data.results[i].location.city}, ${data.results[i].location.state}  ${data.results[i].location.postcode}</p>`,
					);
					let overlayHTML_birthday = $(
						`<p class="birthday">${data.results[i].dob}</p>`,
					);

					// append overlayHTML elements to document
					overlayHTML.append(overlayHTML_container);
					overlayHTML_container
						.append(overlayHTML_img)
						.append(overlayHTML_data);
					overlayHTML_data
						.append(overlayHTML_name)
						.append(overlayHTML_username)
						.append(overlayHTML_email)
						.append(overlayHTML_break)
						.append(overlayHTML_cell)
						.append(overlayHTML_address)
						.append(overlayHTML_birthday);
				} // end if  statement
			} // end for loop

			// Add employeeHTML data to .div-main
			$(".div-main").html(employeeHTML);

			// Add overlayHTML data to the overlayWrapperInner
			overlayWrapperInner.html(overlayHTML);

			// Add overlayWrapperInner to OverlayWrapperOuter
			overlayWrapperOuter.html(overlayWrapperInner);

			// Add overlayWrapperOuter to overlay
			overlay.html(overlayWrapperOuter);

			// Add overlay data to .div-main
			$(".div-main").append(overlay);

			// Initiialy hides all employee HTML on the overlay
			$(".div-overlay-html").hide();

			// Initially hides the overlay
			overlay.hide();

			// Click event on anchor element (shows the overlay)
			$(".div-employee-html").click(function(event) {
				// Sets employeeIndex to clicked employee
				employeeIndex = $(".div-employee-html").index(this);

				// Prevents link from opening to new window
				event.preventDefault();

				// Shows the correct overlayHTML
				$($(".div-overlay-html")[employeeIndex]).show();

				// Shows the overlay
				overlay.show();

				// Log properties to console for troubleshooting
				console.log(employeeIndex);
				console.log($(".div-employee-html"));
				console.log($(".div-overlay-html"));
				console.log($(".div-overlay-html")[employeeIndex]);
			}); // end anchor click event

			// Click event on overlay close button
			$(".close-button").click(function(event) {
				// Hides the overlayHTML
				$(".div-overlay-html").hide();

				// Hides the overlay
				overlay.hide();
			}); // end close click event

			// Click event on overlay back button
			$(".back-button").click(function(event) {
				// Hides the current overlayHTML
				$($(".div-overlay-html")[employeeIndex]).hide();

				// Decreases employeeIndex by 1
				employeeIndex--;

				// Reset employeeIndex if outside of range
				if (employeeIndex < 0) {
					employeeIndex = $(".div-overlay-html").length - 1;
				}

				// Hides the next overlayHTML
				$($(".div-overlay-html")[employeeIndex]).show();
			}); // end back click event

			// Click event on overlay next button
			$(".next-button").click(function(event) {
				// Hides the current overlayHTML
				$($(".div-overlay-html")[employeeIndex]).hide();

				// Increases employeeIndex by 1
				employeeIndex++;

				// Reset employeeIndex if outside of range
				if (employeeIndex > $(".div-overlay-html").length - 1) {
					employeeIndex = 0;
				}

				// Hides the next overlayHTML
				$($(".div-overlay-html")[employeeIndex]).show();
			}); // end next click event
		} // end searchEmployees function

		// Run initial searchEmployees function
		searchEmployees();

		// Search event to filter users by name or username
		$("#search").keyup(searchEmployees);
	}, // end success
}); // end ajax
