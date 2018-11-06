var tblNumberOfRows = 0;
var tbl = document.getElementById("tblBodyContacts");
var currentRow = 0;

function btnAddAppendContact(){
    let s = document.getElementById("btnAddAppendContact");
    if (s.innerHTML === "Add"){
        addNewContact();
    }
    else if (s.innerHTML === "Save" && currentRow > 0)
    {
        saveChangesToContact(currentRow);
    }
    else
    {
        return;
    }
}

function addNewContact() {
    // control number of rows, on which ID numbering is based
    var rowId = ++tblNumberOfRows;
    
    // additional buttons to include in each row of the table > to manipulate table entries
    let btnEdit = '<button class="btn btnEdit" id="'+rowId+'" type="button" onclick="editContact(this.id)">Edit</button>'; // id number is the number of the row - used as a control for passing parameter
    let btnDelete = '<button class="btn btnDelete" id="'+rowId+'" type="button" onclick="deleteContact(this.id)">Delete</button>'; // id number is the number of the row - used as a control for passing parameter
    
    // obtain all values
    let firstName = "m"+tblNumberOfRows;//document.getElementById("inputFirstName").value;
    let lastName = "n"+tblNumberOfRows;//document.getElementById("inputLastName").value;
    let phone = "o"+tblNumberOfRows;//document.getElementById("inputPhone").value;
    let email = "p"+tblNumberOfRows;//document.getElementById("inputEmail").value;
       
/*
    // validation
    if (firstName === "" || lastName === "" || phone === "" || email === "") {
        alert("Please enter all the details");
        return;
    }

    if (firstName.length < 2 || firstName.length > 15 || lastName.length < 2 || lastName.length > 15 || !isNaN(firstName) || !isNaN(lastName)) {
        alert("Invalid first or last name.\nThe length of your names must be between 2 and 15 characters. Use only letters.");
        return;
    }

    if (phone.length !== 11 || isNaN(phone)) {
        alert("Phone number invalid format! \n Phone number should have 11 digits. Use only digits and no spaces.");
        return;
    }

    if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
        alert("Invalid e-mail address.");
        return;
    }
*/

    // build new row
    let newRow = '<tr class="tableRowContactsList" id="row'+rowId+'"><td class="cellID">'
            + rowId + '</td><td>'
            + firstName + '</td><td>'
            + lastName + '</td><td>'
            + phone + '</td><td>'
            + email + '</td><td>'
            + btnEdit + '</td><td>'
            + btnDelete + '</td></tr>';

    
    // add new row to the existing table
    document.getElementById("tblBodyContacts").innerHTML += newRow;
    clearInputFields();
    
}

function saveChangesToContact(row_id){
    
    let rowCells = document.getElementById('row'+row_id).childNodes;
    
    rowCells[1].innerHTML = document.getElementById("inputFirstName").value; 
    rowCells[2].innerHTML = document.getElementById("inputLastName").value; 
    rowCells[3].innerHTML = document.getElementById("inputPhone").value; 
    rowCells[4].innerHTML = document.getElementById("inputEmail").value; 
    
    alert('Changes to the entry in a row '+row_id+' has been saved!');
    
    currentRow = 0; // reset the 'currentRow' counter as it is checked against 'save' mechanism every time it tries to update the row
    
    clearInputFields();
    // bring back the button text to default "Add" which is used as control variable in 'btnAddAppendContact()'
    document.getElementById("btnAddAppendContact").innerHTML = 'Add';
}

function cancelChangesToContact(){
    clearInputFields();
    // bring back the button text to default "Add" which is used as control variable in 'btnAddAppendContact()' 
    // to allow add new contact
    document.getElementById("btnAddAppendContact").innerHTML = 'Add';
    document.getElementById("btnCancelEditContact").className = 'hide';
}

function editContact(row_id){
    let rowCells = document.getElementById('row'+row_id).childNodes;
    currentRow = row_id; // global var, required to be passed to 'saveChangesToContact()'
    
    document.getElementById("inputFirstName").value = rowCells[1].innerHTML; 
    document.getElementById("inputLastName").value = rowCells[2].innerHTML; 
    document.getElementById("inputPhone").value = rowCells[3].innerHTML; 
    document.getElementById("inputEmail").value = rowCells[4].innerHTML; 
    
    document.getElementById("btnAddAppendContact").innerHTML = 'Save'; 
    document.getElementById("btnCancelEditContact").className = 'show'; 
}

function deleteContact(row_id){
    alert('Row '+row_id+' will be deleted.');
    let rowToDelete = document.getElementById('row'+row_id);
    rowToDelete.parentNode.removeChild(rowToDelete);

    tblNumberOfRows--;
    tblUpdateRowIDs();
}

function clearInputFields(){
    // clear input fields after adding new contact to the list
    //document.getElementsByClassName("inputArea").value = "";
    document.getElementById("inputFirstName").value = "";
    document.getElementById("inputLastName").value = "";
    document.getElementById("inputPhone").value = "";
    document.getElementById("inputEmail").value = "";
}

function tblUpdateRowIDs(){
    let tbl = document.getElementById("tblBodyContacts");
    let allIDcells = tbl.getElementsByClassName("cellID");
    let allTableRowIDs = tbl.getElementsByClassName("tableRowContactsList");
    let allEditButtons = tbl.getElementsByClassName("btnEdit");
    let allDeleteButtons = tbl.getElementsByClassName("btnDelete");
    
    for(let i=0;i<=allIDcells.length;i++){
        allIDcells[i].innerHTML = i+1;
        allTableRowIDs[i].id = 'row'+(i+1);
        allEditButtons[i].id = i+1;
        allDeleteButtons[i].id = i+1;
    }
}
