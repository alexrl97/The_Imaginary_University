let IDallocation = 0;
let students = [
    [CreateUniqueID(), 'Alexander', 'Rühle', '17.09.1997', 'Male', 'Programming', 'fakemail@mail.de'],
    [CreateUniqueID(), 'Tanja', 'Schneider', '10.02.1993', 'Female', 'Data Banks', 'dummymail@mail.de'],
    [CreateUniqueID(), 'Felix', 'Schmidt', '30.11.2000', 'Male', 'Mathematics', 'randommail@mail.de'],
    [CreateUniqueID(), 'Peter', 'Doll', '05.04.1998', 'Male', 'Web Development', 'othermail@mail.de'],
    [CreateUniqueID(), 'Dieter', 'Doll', '05.04.1998', 'Male', 'Web Development', 'othermail@mail3.de'],
    [CreateUniqueID(), 'Anna', 'Schneider', '10.02.1993', 'Female', 'Computer Networks', 'dummymail5@mail.de'],
    [CreateUniqueID(), 'Fritz', 'Schmidt', '30.11.2000', 'Male', 'Computer Graphics', 'randommail4@mail.de']
];

let employees = [
    [CreateUniqueID(), 'Wolfgang', 'Rühle', '17.09.1961', 'Male', 'Programming', 'fakemail2@mail.de'],
    [CreateUniqueID(), 'Maria', 'Schneider', '10.02.1988', 'Female', 'Data Banks', 'dummymail2@mail.de'],
    [CreateUniqueID(), 'Otto', 'Schmidt', '30.11.1975', 'Male', 'Mathematics', 'randommail2@mail.de'],
    [CreateUniqueID(), 'Hans', 'Doll', '05.04.1977', 'Male', 'Web Development', 'othermail2@mail.de'],
    [CreateUniqueID(), 'Claudia', 'Schneider', '10.02.1993', 'Female', 'Computer Networks', 'dummymail9@mail.de'],
    [CreateUniqueID(), 'Otto', 'Schmidt', '30.11.2000', 'Male', 'Computer Graphics', 'randommail6@mail.de']
];

function CreateUniqueID()
{
    const ID = IDallocation + 1;
    IDallocation = IDallocation + 1;
    return ID;
}

window.addEventListener("load", function(){

    var current_page = document.getElementsByTagName("title")[0].innerHTML;

    if(current_page === "Students") {
        for (let i = 0; i < students.length; i++)
            addPerson(students[i]);
    }
    if(current_page === "Staff") {
        for (let i = 0; i < employees.length; i++)
            addPerson(employees[i]);
    }
});

function createCourseButtons() {

    let courses = [];

    for (let i = 0; i < students.length; i++)
        courses[courses.length] = students[i][5];

    let uniqueCourses = courses.filter((x, i, a) => a.indexOf(x) === i)


    for (let i = 0; i < uniqueCourses.length; i++) {
        let btn = document.createElement("button");
        btn.id = uniqueCourses[i]
        btn.innerHTML = uniqueCourses[i];
        document.body.appendChild(btn);

        document.getElementById(uniqueCourses[i]).addEventListener('click', function () {

            document.getElementById('tblbody2').innerHTML = "</td>";

            const course = uniqueCourses[i];

            for (let i = 0; i < students.length; i++)
                if(course === students[i][5]) {

                    var tablerow =

                        "<td class='td-data'>" + students[i][0] + "</td>"
                        + "<td class='td-data'>" + students[i][1] + "</td>"
                        + "<td class='td-data'>" + students[i][2] + "</td>"
                        + "<td class='td-data'>" + students[i][5] + "</td>"
                        +"</td>"
                        + "</tr>";

                    document.getElementById('tblbody2').innerHTML += tablerow;
                }
        });
    }
}


function addPerson(person){

    var btneditId = "btnedit" + person[0];
    var btndeleteId = "btndelete" + person[0];
    var tablerow = "<tr Id='" + person[0] + "'   data-ID='" + person[0] + "'   data-FirstName='" + person[1] + "'   data-LastName='" + person[2] + "'   data-DOB='" + person[3] + "'   data-Gender='" + person[4] + "'   data-Department='" + person[5] + "'   data-EMail='" + person[6] + "'>"

        + "<td class='td-data'>" + person[0] + "</td>"
        + "<td class='td-data'>" + person[1] + "</td>"
        + "<td class='td-data'>" + person[2] + "</td>"
        + "<td class='td-data'>" + person[3] + "</td>"
        + "<td class='td-data'>" + person[4] + "</td>"
        + "<td class='td-data'>" + person[5] + "</td>"
        + "<td class='td-data'>" + person[6] + "</td>"
        + "<td class='td-data'>" +
        "<button id='" + btneditId + "' class='btn edit' onclick='showeditrow(" + person[0] + ")'><i aria-hidden='true'></i>Edit</button>" +
        "<button id='" + btndeleteId + "' class='btn edit' onclick='deleteRow(" + person[0] + ")'><i aria-hidden='true'>Delete</button>"
        + "</td>"
        + "</tr>";
    debugger;

    document.getElementById('tblbody').innerHTML += tablerow;

}

document.getElementById("btnaddPerson").addEventListener("click", function (event) {
    event.preventDefault()
    var ID = CreateUniqueID();
    var FirstName = document.getElementById("txtFirstName").value;
    var LastName = document.getElementById("txtLastName").value;
    var DOB = document.getElementById("txtDOB").value;
    var Gender = document.getElementById("txtGender").value;
    var Department = document.getElementById("txtDepartment").value;
    var EMail = document.getElementById("txtMail").value;
    var btneditId = "btnedit" + ID;
    var btndeleteId = "btndelete" + ID;
    var tablerow = "<tr Id='" + ID + "'   data-ID='" + ID + "'   data-FirstName='" + FirstName + "'   data-LastName='" + LastName + "'   data-DOB='" + DOB + "'   data-Gender='" + Gender + "'   data-Department='" + Department + "'   data-EMail='" + EMail + "'>"

        + "<td class='td-data'>" + ID + "</td>"
        + "<td class='td-data'>" + FirstName + "</td>"
        + "<td class='td-data'>" + LastName + "</td>"
        + "<td class='td-data'>" + DOB + "</td>"
        + "<td class='td-data'>" + Gender + "</td>"
        + "<td class='td-data'>" + Department + "</td>"
        + "<td class='td-data'>" + EMail + "</td>"
        + "<td class='td-data'>" +
        "<button id='" + btneditId + "' class='btn edit' onclick='showeditrow(" + ID + ")'><i aria-hidden='true'></i>Edit</button>" +
        "<button id='" + btndeleteId + "' class='btn delete' onclick='deleteRow(" + ID + ")'><i aria-hidden='true'>Delete</button>"
        + "</td>"
        + "</tr>";

    if(FirstName != "" && Department != "" && EMail != "") {
        document.getElementById('tblbody').innerHTML += tablerow;
        document.getElementById('txtFirstName').value = "";
        document.getElementById('txtLastName').value = "";
        document.getElementById('txtPostalCode').value = "";
        document.getElementById('txtDOB').value = "";
        document.getElementById('txtGender').value = "";
        document.getElementById('txtDepartment').value = "";
        document.getElementById('txtMail').value = "";
        document.getElementById('txtFirstName').style.backgroundColor = "white";
        document.getElementById('txtDepartment').style.backgroundColor = "white";
        document.getElementById('txtMail').style.backgroundColor = "white";
    }
    else{
        if(FirstName == "")
            document.getElementById('txtFirstName').style.backgroundColor = "rgba(254,0,0,0.4)";
        if(Department == "")
            document.getElementById('txtDepartment').style.backgroundColor = "rgba(254,0,0,0.4)";
        if(EMail == "")
            document.getElementById('txtMail').style.backgroundColor = "rgba(254,0,0,0.4)";
    }
});

function showeditrow(ID)
{
    debugger;
    var PersonRow = document.getElementById(ID);

    var data = PersonRow.querySelectorAll(".td-data");

    var ID = data[0].innerHTML;
    var FirstName = data[1].innerHTML;
    var LastName = data[2].innerHTML;
    var DOB = data[3].innerHTML;
    var Gender = data[4].innerHTML;
    var Department = data[5].innerHTML;
    var EMail = data[6].innerHTML;
    var btneditId = "btnedit" + ID;
    data[0].innerHTML = '<input name="txtupdate_ID"  disabled id="txtupdate_ID" value="' + ID + '"/>';
    data[1].innerHTML='<input name="txtupdate_FirstName" id="txtupdate_FirstName" value="' + FirstName + '"/>';
    data[2].innerHTML='<input name="txtupdate_LastName" id="txtupdate_LastName" value="' + LastName + '"/>';
    data[3].innerHTML='<input name="txtupdate_DOB" id="txtupdate_DOB" value="' + DOB + '"/>';
    data[4].innerHTML='<input name="txtupdate_Gender" id="txtupdate_Gender" value="' + Gender + '"/>';
    data[5].innerHTML='<input name="txtupdate_Department" id="txtupdate_Department" value="' + Department + '"/>';
    data[6].innerHTML='<input name="txtupdate_EMail" id="txtupdate_EMail" value="' + EMail + '"/>';

    data[7].innerHTML =
        "<button class='btn update' onclick='updatePerson(" + ID + ")'>" +
        "<i aria-hidden='true'></i>Update</button>"
        + "<button class='btn cancel' onclick='cancelupdate(" + ID + ")'><i aria-hidden='true'></i>Cancel</button>"
        + "<button class='btn delete' onclick='deleteRow(" + ID + ")'>"
        + "<i aria-hidden='true'></i>Delete</button>"
}
function cancelupdate(ID)
{
    debugger;
    var btneditId = "btnedit" + ID;
    var btndeleteId = "btndelete" + ID;

    var PersonRow = document.getElementById(ID);
    var data = PersonRow.querySelectorAll(".td-data");

    var FirstName = PersonRow.getAttribute("data-FirstName");
    var LastName = PersonRow.getAttribute("data-LastName");
    var DOB = PersonRow.getAttribute("data-DOB");
    var Gender = PersonRow.getAttribute("data-Gender");
    var Department = PersonRow.getAttribute("data-Department");
    var EMail = PersonRow.getAttribute("data-EMail");


    data[0].innerHTML = ID;
    data[1].innerHTML = FirstName;
    data[2].innerHTML = LastName;
    data[3].innerHTML = DOB;
    data[4].innerHTML = Gender;
    data[5].innerHTML = Department;
    data[6].innerHTML = EMail;

    var actionbtn = "<button id='" + btneditId + "' class='btn edit' onclick='showeditrow(" + ID + ")'><i aria-hidden='true'></i>Edit</button>" +
        "<button id='" + btndeleteId + "' class='btn delete' onclick='deleteRow(" + ID + ")'><i aria-hidden='true'>Delete</button>"
    data[7].innerHTML = actionbtn;
}
function deleteRow(ID)
{
    document.getElementById(ID).remove();
}
function updatePerson(ID)
{
    var btneditId = "btnedit" + ID;
    var btndeleteId = "btndelete" + ID;

    var PersonRow = document.getElementById(ID);
    var data = PersonRow.querySelectorAll(".td-data");

    var FirstName = data[1].querySelector("#txtupdate_FirstName").value;
    var LastName = data[2].querySelector("#txtupdate_LastName").value;
    var DOB = data[3].querySelector("#txtupdate_DOB").value;
    var Gender = data[4].querySelector("#txtupdate_Gender").value;
    var Department = data[5].querySelector("#txtupdate_Department").value;
    var EMail = data[6].querySelector("#txtupdate_EMail").value;


    data[0].innerHTML = ID;
    data[1].innerHTML = FirstName;
    data[2].innerHTML = LastName;
    data[3].innerHTML = DOB;
    data[4].innerHTML = Gender;
    data[5].innerHTML = Department;
    data[6].innerHTML = EMail;

    var actionbtn = "<button id='" + btneditId + "' class='btn edit' onclick='showeditrow(" + ID + ")'><i aria-hidden='true'></i>Edit</button>" +
        "<button id='" + btndeleteId + "' class='btn delete' onclick='deleteRow(" + ID + ")'><i aria-hidden='true'>Delete</button>"
    data[7].innerHTML = actionbtn;
}