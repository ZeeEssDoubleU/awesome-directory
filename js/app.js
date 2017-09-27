$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function (data) {

        // Show data being returned in console
        console.log(data);

        // Global variables
        let employeeIndex = 0;

        // Array listing state name abbreviations
        let states = new Array({
            'name': 'Alabama',
            'abbrev': 'AL'
        }, {
            'name': 'Alaska',
            'abbrev': 'AK'
        }, {
            'name': 'Arizona',
            'abbrev': 'AZ'
        }, {
            'name': 'Arkansas',
            'abbrev': 'AR'
        }, {
            'name': 'California',
            'abbrev': 'CA'
        }, {
            'name': 'Colorado',
            'abbrev': 'CO'
        }, {
            'name': 'Connecticut',
            'abbrev': 'CT'
        }, {
            'name': 'Delaware',
            'abbrev': 'DE'
        }, {
            'name': 'Florida',
            'abbrev': 'FL'
        }, {
            'name': 'Georgia',
            'abbrev': 'GA'
        }, {
            'name': 'Hawaii',
            'abbrev': 'HI'
        }, {
            'name': 'Idaho',
            'abbrev': 'ID'
        }, {
            'name': 'Illinois',
            'abbrev': 'IL'
        }, {
            'name': 'Indiana',
            'abbrev': 'IN'
        }, {
            'name': 'Iowa',
            'abbrev': 'IA'
        }, {
            'name': 'Kansas',
            'abbrev': 'KS'
        }, {
            'name': 'Kentucky',
            'abbrev': 'KY'
        }, {
            'name': 'Louisiana',
            'abbrev': 'LA'
        }, {
            'name': 'Maine',
            'abbrev': 'ME'
        }, {
            'name': 'Maryland',
            'abbrev': 'MD'
        }, {
            'name': 'Massachusetts',
            'abbrev': 'MA'
        }, {
            'name': 'Michigan',
            'abbrev': 'MI'
        }, {
            'name': 'Minnesota',
            'abbrev': 'MN'
        }, {
            'name': 'Mississippi',
            'abbrev': 'MS'
        }, {
            'name': 'Missouri',
            'abbrev': 'MO'
        }, {
            'name': 'Montana',
            'abbrev': 'MT'
        }, {
            'name': 'Nebraska',
            'abbrev': 'NE'
        }, {
            'name': 'Nevada',
            'abbrev': 'NV'
        }, {
            'name': 'New Hampshire',
            'abbrev': 'NH'
        }, {
            'name': 'New Jersey',
            'abbrev': 'NJ'
        }, {
            'name': 'New Mexico',
            'abbrev': 'NM'
        }, {
            'name': 'New York',
            'abbrev': 'NY'
        }, {
            'name': 'North Carolina',
            'abbrev': 'NC'
        }, {
            'name': 'North Dakota',
            'abbrev': 'ND'
        }, {
            'name': 'Ohio',
            'abbrev': 'OH'
        }, {
            'name': 'Oklahoma',
            'abbrev': 'OK'
        }, {
            'name': 'Oregon',
            'abbrev': 'OR'
        }, {
            'name': 'Pennsylvania',
            'abbrev': 'PA'
        }, {
            'name': 'Rhode Island',
            'abbrev': 'RI'
        }, {
            'name': 'South Carolina',
            'abbrev': 'SC'
        }, {
            'name': 'South Dakota',
            'abbrev': 'SD'
        }, {
            'name': 'Tennessee',
            'abbrev': 'TN'
        }, {
            'name': 'Texas',
            'abbrev': 'TX'
        }, {
            'name': 'Utah',
            'abbrev': 'UT'
        }, {
            'name': 'Vermont',
            'abbrev': 'VT'
        }, {
            'name': 'Virginia',
            'abbrev': 'VA'
        }, {
            'name': 'Washington',
            'abbrev': 'WA'
        }, {
            'name': 'West Virginia',
            'abbrev': 'WV'
        }, {
            'name': 'Wisconsin',
            'abbrev': 'WI'
        }, {
            'name': 'Wyoming',
            'abbrev': 'WY'
        })



        // For loop to format birthdates and abbreviate state names
        for (i = 0; i < data.results.length; i++) {

            // Format birthdates
            let year = data.results[i].dob.substr(0, 4);
            let month = data.results[i].dob.substr(5, 2);
            let day = data.results[i].dob.substr(8, 2);
            data.results[i].dob = month + '/' + day + '/' + year;

            // Abbreviate state names
            for (j = 0; j < states.length; j++) {
                if (data.results[i].location.state.toUpperCase() == states[j].name.toUpperCase()) {

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
            let employeeHTML = '<div id="employee-html">';

            // Overlay variables for employee data (returns more information when employee cell is clicked)
            let $overlay = $('<div id="overlay"></div>');
            let $overlayWrapperOuter = $('<div id="overlay-wrapper-outer"></div>');
            let $overlayWrapperInner = $('<div id="overlay-wrapper-inner"></div>');
            let overlayHTML = '<div id="overlay-html"><span class="close-button"></span><span class="back-button"></span><span class="next-button"></span>';

            // Variable to store search input value
            let searchInput = $('#search').val().toUpperCase();

            // For loop to see if search input value matches employee name or username
            for (i = 0; i < data.results.length; i++) {

                // Local variables for employee data
                let employeeFullName = data.results[i].name.first + ' ' + data.results[i].name.last;
                let employeeUsername = data.results[i].login.username;

                // If statement to see if employee name or username includes search field value
                if (employeeFullName.toUpperCase().includes(searchInput) || employeeUsername.toUpperCase().includes(searchInput)) {
                    // Create layout and add data to employeeHTML
                    employeeHTML += '<div class="div-employee-html"><a>';
                    employeeHTML += '<img src=' + data.results[i].picture.large + '>';
                    employeeHTML += '<div class="div-li"><div class="employee-data"><p class="name">' + data.results[i].name.first + ' ' + data.results[i].name.last + '</p>';
                    employeeHTML += '<p class="email">' + data.results[i].email + '</p>';
                    employeeHTML += '<p class="city">' + data.results[i].location.city + '</p></div></div>';
                    employeeHTML += '</a></div>'

                    // Create layout and add data to overlayHTML
                    overlayHTML += '<div class="div-overlay-html"><img src=' + data.results[i].picture.large + '>';
                    overlayHTML += '<div class="employee-data-overlay"><p class="name">' + data.results[i].name.first + ' ' + data.results[i].name.last + '</p>';
                    overlayHTML += '<p class="username">' + data.results[i].login.username + '</p>';
                    overlayHTML += '<p class="email">' + data.results[i].email + '</p>';
                    overlayHTML += '<div class="divider"></div>';
                    overlayHTML += '<p class="phone">' + data.results[i].cell + '</p>';
                    overlayHTML += '<p class="address">' + data.results[i].location.street + '</br>' + data.results[i].location.city + ', ' + data.results[i].location.state + '  ' + data.results[i].location.postcode + '</p>';
                    overlayHTML += '<p class="birthday">Birthday: ' + data.results[i].dob + '</p></div></div>';
                } // end if  statement
            } // end for loop

            employeeHTML += '</div>';
            overlayHTML += '</div>';



            // Add employeeHTML data to .div-main
            $('.div-main').html(employeeHTML);

            // Add overlayHTML data to the overlayWrapperInner
            $overlayWrapperInner.html(overlayHTML);

            // Add overlayWrapperInner to OverlayWrapperOuter
            $overlayWrapperOuter.html($overlayWrapperInner)

            // Add overlayWrapperOuter to overlay
            $overlay.html($overlayWrapperOuter);

            // Add overlay data to .div-main
            $('.div-main').append($overlay);

            // Initiialy hides all employee HTML on the overlay
            $('.div-overlay-html').hide();

            // Initially hides the overlay
            $overlay.hide();



            // Click event on anchor element (shows the overlay)
            $('.div-employee-html').click(function (event) {

                // Sets employeeIndex to clicked employee
                employeeIndex = $('.div-employee-html').index(this);

                // Prevents link from opening to new window
                event.preventDefault();

                // Shows the correct overlayHTML
                $($('.div-overlay-html')[employeeIndex]).show();

                // Shows the overlay
                $overlay.show();

                // Log properties to console for troubleshooting
                console.log(employeeIndex);
                console.log($('.div-employee-html'));
                console.log($('.div-overlay-html'));
                console.log($('.div-overlay-html')[employeeIndex]);
            }); // end anchor click event



            // Click event on overlay close button
            $('.close-button').click(function (event) {
                // Hides the overlayHTML
                $('.div-overlay-html').hide();

                // Hides the overlay
                $overlay.hide();
            }); // end close click event



            // Click event on overlay back button
            $('.back-button').click(function (event) {

                // Hides the current overlayHTML
                $($('.div-overlay-html')[employeeIndex]).hide();

                // Decreases employeeIndex by 1
                employeeIndex--;

                // Reset employeeIndex if outside of range
                if (employeeIndex < 0) {
                    employeeIndex = $('.div-overlay-html').length - 1;
                }

                // Hides the next overlayHTML
                $($('.div-overlay-html')[employeeIndex]).show();
            }); // end back click event



            // Click event on overlay next button
            $('.next-button').click(function (event) {

                // Hides the current overlayHTML
                $($('.div-overlay-html')[employeeIndex]).hide();

                // Increases employeeIndex by 1
                employeeIndex++;

                // Reset employeeIndex if outside of range
                if (employeeIndex > $('.div-overlay-html').length - 1) {
                    employeeIndex = 0;
                }

                // Hides the next overlayHTML
                $($('.div-overlay-html')[employeeIndex]).show();
            }); // end next click event
        } // end searchEmployees function



        // Run initial searchEmployees function
        searchEmployees();



        // Search event to filter users by name or username
        $('#search').keyup(searchEmployees);
    } // end success
}); // end ajax
