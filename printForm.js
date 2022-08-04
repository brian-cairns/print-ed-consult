const params = new URLSearchParams(window.location.search)
for (const [key, value] of params) { let id = value; }

//Show animation 
document.getElementById('pageTitle').style.display = "none";
document.getElementById('formBody').style.display = "none";
document.getElementById('returnSection').style.display = "none";

//fetch data
createSearchQuery('educationalConsultation', id)

function createSearchQuery(form, id) {
     console.log(id, form)

    //fetch data
    const url = `https://pffm.azurewebsites.net/getForms/?form=${form}&id=${id}`
    const header = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    fetch(url, {
        method: "GET",
        headers: header
    })
        .then(response => response.json())
        .then(data => populatePage(data))
        .catch(console.error)
}

async function populatePage(data) {
    document.getElementById('staffEmail').innerHTML = data.employeeEmail;
    document.getElementById('clientName').innerHTML = data.clientName;
    document.getElementById('members').innerHTML = data.membersPresent;
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('start').innerHTML = data.start;
    document.getElementById('end').innerHTML = data.end;
    document.getElementById('notes').innerHTML = data.notes;
    document.getElementById('followUp').innerHTML = data.followUp;
    document.getElementById('staffName').innerHTML = data.staffName;

    //create arrays
    concern = [data.parentalConcern1, data.parentalConcern2, data.parentalConcern3];
    resolution = [data.resolution1, data.resolution2, data.resolution3];
    nextSteps = [data.nextSteps1, data.nextSteps2, data.nextSteps3];
    
    //show arrays
    for (let i = 1; i < 4; i++) {
        document.getElementById(`concern${i}`).innerHTML = data.parentalConcerns[i];
        document.getElementById(`resolution${i}`).innerHTML = data.resolution[i];
        document.getElementById(`nextSteps${i}`).innerHTML = data.nextSteps[i];
        if(!data.parentalConcerns[i+1]) {i=4}
    }
    showPage()
}

function showPage() {
    document.getElementById('pageTitle').style.display = "block";
    document.getElementById('formBody').style.display = "block";
    document.getElementById('returnSection').style.display = "block";
    document.getElementById('loadingAnimationSection').style.display = "none";
}

let printToPDF = document.getElementById('printToPDF')
printToPDF.addEventListener('click', (e) = {})

let exit = document.getElementById('exit') 
exit.addEventListener('click', (e) => {
    history.back()
})
