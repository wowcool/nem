//User List Data Array for Filling in info box. 
var userListData = [];

//Dom Ready 
$(document).ready(function() { 
    //Populate the table
    populateTable();

});

//Functions

//Fill the table with data

function populateTable() {
    console.log("running"); 

    //Empty Content String
    var tableContent = " ";

    //JQuery get the JSON
    $.getJSON( '/users/userlist', function (data){ 

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

};//End Function Pupulate Table