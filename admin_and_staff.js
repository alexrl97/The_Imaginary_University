let IDallocation = 0;
let students = [
    [CreateUniqueID(), 'Alexander', 'Rühle', '1997-09-17', '2015-04-01', 'Male', 'Programming', 'fakemail@mail.de'],
    [CreateUniqueID(), 'Tanja', 'Schneider', '1993-02-10', '2015-04-01', 'Female', 'Data Banks', 'dummymail@mail.de'],
    [CreateUniqueID(), 'Felix', 'Schmidt', '2000-11-30', '2015-04-01', 'Male', 'Mathematics', 'randommail@mail.de'],
    [CreateUniqueID(), 'Peter', 'Doll', '1998-03-06', '2015-10-01', 'Male', 'Web Development', 'othermail@mail.de'],
    [CreateUniqueID(), 'Dieter', 'Doll', '1998-03-01', '2015-10-01', 'Male', 'Web Development', 'othermail@mail3.de'],
    [CreateUniqueID(), 'Anna', 'Schneider', '1993-09-12', '2015-10-01', 'Female', 'Computer Networks', 'dummymail5@mail.de'],
    [CreateUniqueID(), 'Fritz', 'Schmidt', '2000-12-15', '2015-10-01', 'Male', 'Computer Graphics', 'randommail4@mail.de']
];

let employees = [
    [CreateUniqueID(), 'Wolfgang', 'Rühle', '1961-03-01', '2015-04-01', 'Male', 'Programming', 'fakemail2@mail.de'],
    [CreateUniqueID(), 'Maria', 'Schneider', '1988-11-06', '2015-04-01', 'Female', 'Data Banks', 'dummymail2@mail.de'],
    [CreateUniqueID(), 'Otto', 'Schmidt', '1975-08-21', '2015-04-01', 'Male', 'Mathematics', 'randommail2@mail.de'],
    [CreateUniqueID(), 'Hans', 'Doll', '1977-04-11', '2015-10-01', 'Male', 'Web Development', 'othermail2@mail.de'],
    [CreateUniqueID(), 'Claudia', 'Schneider', '1993-09-19', '2015-10-01', 'Female', 'Computer Networks', 'dummymail9@mail.de'],
    [CreateUniqueID(), 'Otto', 'Schmidt', '2000-01-27', '2015-10-01', 'Male', 'Computer Graphics', 'randommail6@mail.de']
];

function CreateUniqueID()
{
    const ID = IDallocation + 1;
    IDallocation = IDallocation + 1;
    return ID;
}

function getCurrentPage(){
    return document.getElementsByTagName("title")[0].innerHTML;
}

window.addEventListener("load", function(){

    if(getCurrentPage() === "Students") {
        for (let i = 0; i < students.length; i++)
            addPerson(students[i]);
    }
    if(getCurrentPage() === "Staff") {
        for (let i = 0; i < employees.length; i++)
            addPerson(employees[i]);
    }

    document.getElementById("txtDOB").setAttribute("max", maxCalenderDate());
    setMinID();
});

function setMinID(){
    let ID = 0;
    for (let i = 0; i < students.length; i++)
        if (students[i][0] > ID)
            ID = students[i][0];
    for (let i = 0; i < employees.length; i++)
        if (employees[i][0] > ID)
            ID = employees[i][0];

    ID++;
    document.getElementById("txtID").setAttribute("min", ID)
    return ID;
}

document.getElementById("filterDepartment").addEventListener("change", function (){
    addFilteredPersons();
})

document.getElementById("filterSemester").addEventListener("change", function (){
    addFilteredPersons();
})

function addFilteredPersons(){

    let persons;
    if(getCurrentPage() === "Students") {
        persons = students;
    }
    if(getCurrentPage() === "Staff") {
        persons = employees;
    }

    clearList();
    for (let i = 0; i < persons.length; i++) {
        if(checkFilterConditions(persons[i][4], persons[i][6]))
            addPerson(persons[i]);
    }
}

function checkFilterConditions(personJoinDate, personDepartment){
    let department = document.getElementById("filterDepartment").value;
    let semester = document.getElementById("filterSemester").value;
    let splitDate = personJoinDate.split('-');

    return (semester === "All" ||
            (semester === "WW" && (splitDate[1] >= "10" || splitDate[1] <= "03")) ||
            (semester === "SS" && (splitDate[1] <= "09" && splitDate[1] >= "04"))) &&
        (department === personDepartment || department === "All");

}

function clearList(){

    if(getCurrentPage() === "Students") {
        for (let i = 0; i < students.length; i++)
            if(document.getElementById(students[i][0]) != null)
                document.getElementById(students[i][0]).remove();
    }
    if(getCurrentPage() === "Staff") {
        for (let i = 0; i < employees.length; i++)
            if(document.getElementById(employees[i][0]) != null)
                document.getElementById(employees[i][0]).remove();
    }
}

function maxCalenderDate(){

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return formatDate(yesterday);
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}



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
                if(course === students[i][6]) {

                    let tablerow =

                        "<td class='td-data'>" + students[i][0] + "</td>"
                        + "<td class='td-data'>" + students[i][1] + "</td>"
                        + "<td class='td-data'>" + students[i][2] + "</td>"
                        + "<td class='td-data'>" + students[i][6] + "</td>"
                        +"</td>"
                        + "</tr>";

                    document.getElementById('tblbody2').innerHTML += tablerow;
                }
        });
    }
}


function addPerson(person){

    const btneditId = "btnedit" + person[0];
    let btndeleteId = "btndelete" + person[0];

    let tablerow = "<tr Id='" + person[0] + "'   data-ID='" + person[0] + "'   data-FirstName='" + person[1] + "'   data-LastName='" + person[2] + "'   data-DOB='" + person[3] + "'  data-JoinDate='" + person[4] + "'  data-Gender='" + person[5] + "'   data-Department='" + person[6] + "'   data-EMail='" + person[7] + "'>"

        + "<td class='td-data'>" + person[0] + "</td>"
        + "<td class='td-data'>" + person[1] + "</td>"
        + "<td class='td-data'>" + person[2] + "</td>"
        + "<td class='td-data'>" + person[3] + "</td>"
        + "<td class='td-data'>" + person[4] + "</td>"
        + "<td class='td-data'>" + person[5] + "</td>"
        + "<td class='td-data'>" + person[6] + "</td>"
        + "<td class='td-data'>" + person[7] + "</td>"
        + "<td class='td-data'>" +
        "<button id='" + btneditId + "' class='btn edit' onclick='showeditrow(" + person[0] + ")'><i aria-hidden='true'></i>Edit</button>" +
        "<button id='" + btndeleteId + "' class='btn edit' onclick='deleteRow(" + person[0] + ")'><i aria-hidden='true'>Delete</button>"
        + "</td>"
        + "</tr>";
    debugger;

    document.getElementById('tblbody').innerHTML += tablerow;

}

document.getElementById("btnaddPerson").addEventListener("click", function (event) {
    event.preventDefault();

    let ID = document.getElementById("txtID").value;
    let FirstName = document.getElementById("txtFirstName").value;
    let LastName = document.getElementById("txtLastName").value;
    let DOB = document.getElementById("txtDOB").value;
    let JoinDate = document.getElementById("txtJoinDate").value;
    let Gender = document.getElementById("txtGender").value;
    let Department = document.getElementById("txtDepartment").value;
    let EMail = document.getElementById("txtMail").value;
    //let btneditId = "btnedit" + ID;

    if((ID!== "" && ID >= setMinID()) && FirstName !== "" && Department !== "" && EMail !== "" && checkStudentDOB(DOB) && DOB !== "" && new Date(JoinDate).getFullYear() >= 2015 && JoinDate !== "") {

        let persons;

        if(getCurrentPage() === "Students") {
            persons = students;
            students.push([ID,FirstName,LastName,DOB,JoinDate,Gender,Department,EMail]);
        }
        if(getCurrentPage() === "Staff") {
            persons = employees;
            employees.push([ID,FirstName,LastName,DOB,JoinDate,Gender,Department,EMail]);
        }

        setMinID();
        clearList();
        for (let i = 0; i < persons.length; i++)
            addPerson(persons[i]);


        let inputs = document.querySelectorAll('input');
        let selections = document.querySelectorAll('select');
        inputs.forEach(input => input.value = '');
        inputs.forEach(input => input.style.backgroundColor = "white");

        selections.forEach(selection => selection.value = '');
        selections.forEach(selection => selection.style.backgroundColor = "white");

        document.getElementById('filterDepartment').selectedIndex = 0;
        document.getElementById('filterSemester').selectedIndex = 0;
    }
    else{
        if(ID === "" || ID < setMinID()) {
            document.getElementById('txtID').style.backgroundColor = "rgba(254,0,0,0.4)";
            if(ID < setMinID() && ID !== "")
                alert("ID already taken");
        }
        else
            document.getElementById('txtID').style.backgroundColor = "white";
        if(FirstName === "")
            document.getElementById('txtFirstName').style.backgroundColor = "rgba(254,0,0,0.4)";
        else
            document.getElementById('txtFirstName').style.backgroundColor = "white";
        if(Department === "")
            document.getElementById('txtDepartment').style.backgroundColor = "rgba(254,0,0,0.4)";
        else
            document.getElementById('txtDepartment').style.backgroundColor = "white";
        if(EMail === "")
            document.getElementById('txtMail').style.backgroundColor = "rgba(254,0,0,0.4)";
        else
            document.getElementById('txtMail').style.backgroundColor = "white";
        if(checkStudentDOB(DOB) === false  || DOB === "") {
            document.getElementById('txtDOB').style.backgroundColor = "rgba(254,0,0,0.4)";
            if(DOB !== "")
                alert("Invalid DOB for Student. The Student must be between 17 and 60 years old.")
        }
        else
            document.getElementById('txtDOB').style.backgroundColor = "white";
        if(new Date(JoinDate).getFullYear() < 2015 || JoinDate === "") {
            document.getElementById('txtJoinDate').style.backgroundColor = "rgba(254,0,0,0.4)";
            if(JoinDate !== "")
                alert("Joining Dates start in 2015.")
        }
        else
            document.getElementById('txtJoinDate').style.backgroundColor = "white";

    }
});

function checkStudentDOB(DOB){

    if(getCurrentPage() === "Students" ) {
        return getAge(DOB) >= 17 && getAge(DOB) <= 60;
    }
    else
        return true;
}

function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


function showeditrow(ID)
{
    debugger;
    let PersonRow = document.getElementById(ID);

    let data = PersonRow.querySelectorAll(".td-data");

    //let ID = data[0].innerHTML;
    let FirstName = data[1].innerHTML;
    let LastName = data[2].innerHTML;
    let DOB = data[3].innerHTML;
    let JoinDate = data[4].innerHTML;
    let Gender = data[5].innerHTML;
    let Department = data[6].innerHTML;
    let EMail = data[7].innerHTML;
    data[0].innerHTML = '<input name="txtupdate_ID"  disabled id="txtupdate_ID" value="' + ID + '"/>';
    data[1].innerHTML='<input name="txtupdate_FirstName" id="txtupdate_FirstName" value="' + FirstName + '"/>';
    data[2].innerHTML='<input name="txtupdate_LastName" id="txtupdate_LastName" value="' + LastName + '"/>';
    data[3].innerHTML='<input name="txtupdate_DOB" id="txtupdate_DOB" value="' + DOB + '"/>';
    data[4].innerHTML='<input name="txtupdate_JoinDate" id="txtupdate_JoinDate" value="' + JoinDate + '"/>';
    data[5].innerHTML='<input name="txtupdate_Gender" id="txtupdate_Gender" value="' + Gender + '"/>';
    data[6].innerHTML='<input name="txtupdate_Department" id="txtupdate_Department" value="' + Department + '"/>';
    data[7].innerHTML='<input name="txtupdate_EMail" id="txtupdate_EMail" value="' + EMail + '"/>';

    data[8].innerHTML =
        "<button class='btn update' onclick='updatePerson(" + ID + ")'>" +
        "<i aria-hidden='true'></i>Update</button>"
        + "<button class='btn cancel' onclick='cancelupdate(" + ID + ")'><i aria-hidden='true'></i>Cancel</button>"
        + "<button class='btn delete' onclick='deleteRow(" + ID + ")'>"
        + "<i aria-hidden='true'></i>Delete</button>"
}
function cancelupdate(ID)
{
    debugger;
    let btneditId = "btnedit" + ID;
    let btndeleteId = "btndelete" + ID;

    let PersonRow = document.getElementById(ID);
    let data = PersonRow.querySelectorAll(".td-data");

    let FirstName = PersonRow.getAttribute("data-FirstName");
    let LastName = PersonRow.getAttribute("data-LastName");
    let DOB = PersonRow.getAttribute("data-DOB");
    let JoinDate = PersonRow.getAttribute("data-JoinDate");
    let Gender = PersonRow.getAttribute("data-Gender");
    let Department = PersonRow.getAttribute("data-Department");
    let EMail = PersonRow.getAttribute("data-EMail");


    data[0].innerHTML = ID;
    data[1].innerHTML = FirstName;
    data[2].innerHTML = LastName;
    data[3].innerHTML = DOB;
    data[4].innerHTML = JoinDate;
    data[5].innerHTML = Gender;
    data[6].innerHTML = Department;
    data[7].innerHTML = EMail;

    data[8].innerHTML = "<button id='" + btneditId + "' class='btn edit' onclick='showeditrow(" + ID + ")'><i aria-hidden='true'></i>Edit</button>" +
        "<button id='" + btndeleteId + "' class='btn delete' onclick='deleteRow(" + ID + ")'><i aria-hidden='true'>Delete</button>";
}
function deleteRow(ID)
{
    if(confirm("Delete '" + document.getElementById(ID).getAttribute("data-FirstName") + " " + document.getElementById(ID).getAttribute("data-LastName") +"' ?"))
        document.getElementById(ID).remove();
}
function updatePerson(ID)
{
    let btneditId = "btnedit" + ID;
    let btndeleteId = "btndelete" + ID;

    let PersonRow = document.getElementById(ID);
    let data = PersonRow.querySelectorAll(".td-data");

    let FirstName = data[1].querySelector("#txtupdate_FirstName").value;
    let LastName = data[2].querySelector("#txtupdate_LastName").value;
    let DOB = data[3].querySelector("#txtupdate_DOB").value;
    let JoinDate = data[4].querySelector("#txtupdate_JoinDate").value;
    let Gender = data[5].querySelector("#txtupdate_Gender").value;
    let Department = data[6].querySelector("#txtupdate_Department").value;
    let EMail = data[7].querySelector("#txtupdate_EMail").value;


    data[0].innerHTML = ID;
    data[1].innerHTML = FirstName;
    data[2].innerHTML = LastName;
    data[3].innerHTML = DOB;
    data[4].innerHTML = JoinDate;
    data[5].innerHTML = Gender;
    data[6].innerHTML = Department;
    data[7].innerHTML = EMail;


    data[8].innerHTML = "<button id='" + btneditId + "' class='btn edit' onclick='showeditrow(" + ID + ")'><i aria-hidden='true'></i>Edit</button>" +
        "<button id='" + btndeleteId + "' class='btn delete' onclick='deleteRow(" + ID + ")'><i aria-hidden='true'>Delete</button>";
}