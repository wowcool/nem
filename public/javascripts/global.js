//User List Data Array for Filling in info box. 
var userListData = [];

//Dom Ready 
$(document).ready(function() { 
    //Populate the table
    populateTable();
    //Username Link Click 
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    //Add User Click Button
    $('#btnAddUser').on('click', addUser);

});

//Functions

//Fill the table with data

function populateTable() {
    console.log("running"); 

    //Empty Content String
    var tableContent = " ";

    //JQuery get the JSON
    $.getJSON( '/users/userlist', function (data){ 

        userListData = data;

        $.each(data, function(){ 
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';

        });

    //Insert the entire content string into our html table. 
    $('#userList table tbody').html(tableContent);

    });

};//End Function Populate Table

//Show user Info 
function showUserInfo(event) { 

    //Prevent Default
    event.preventDefault();
    //Retieve username from link rel attribute
    var thisUserName = $(this).attr('rel');
    //Get index of object based on ID value
    var arrayPosition = userListData.map(function(arrayItem) {
        return arrayItem.username;}).indexOf(thisUserName);

    //Get User Object 
    var thisUserObject = userListData[arrayPosition];

    //Populate the InfoBox
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.fullname);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};//End showUserInfo

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};





