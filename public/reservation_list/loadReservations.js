let table;

window.onload = async function() {
    
    table = new DataTable('#reservationTable');

    table.searching = true;
    /*
    table.row.add([
        "1",
        "August 14",
        "August 15",
        "Jack Oosterwijk",
        "Power",
        "20",
        "new dock 2",       
        "$0.00",
        "$495.00", 
        '<button class="show-btn">Show</button>',
        '<button class="check-in-btn">Check in</button>',
        '<button class="cancel-btn">Cancel</button>'
    ]).draw();
    */
    /*
    let data = {
        start: '2025-08-14',
        end: '2025-08-14',
        name: 'John Doe',
        type: 'Sail',
        length: '30ft',
        space: 'East Dck 2',
        payment: '$0.00',
        due: '$50.00',
        address: '186 st',
        state: 'ns',
        postal: "B0J2E0",
        phone: "9022988912",
        email: "email@a.ca",
        boat_name: "kildoon"
    } 
    await writeReservationDB(data);
    */

    await appendTable();
}
async function appendTable(){
    let reservationList;

    await fetch('/api/reservations', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data =>{
        reservationList = data;
    })

    let row;
    for(let i=0; i<reservationList.length; i++){
        // make dates easy to read for the hard working marina employee
        reservationList[i]["start"] = humanizeDate(reservationList[i]["start"])
        reservationList[i]["end"] = humanizeDate(reservationList[i]["end"])

        row = Object.values(reservationList[i]).slice(0,9);
        // append buttons
        row.push('<button class="show-btn">Show</button>', '<button class="check-in-btn">Check in</button>', '<button class="cancel-btn">Cancel</button>');
        let node = table.row.add(row).draw().node();

        if(false){ // will use for checking in and overdue in future
            $(node).css('background-color', '#ff0000ff'); // light red
        }
    }
    table.draw();
}
async function writeReservationDB(customerData){
    await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
    });
}

function humanizeDate(dateStr){
    const date = new Date(dateStr); // parse the string

    // Options for formatting
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const humanReadable = date.toLocaleDateString('en-US', options);
    return humanReadable;
}

// Show button handler
$('#reservationTable').on('click', '.show-btn', function () {
    let rowData = table.row($(this).parents('tr')).data();
    console.log('Editing:', rowData);
});

// Check in button
$('#reservationTable').on('click', '.check-in-btn', function () {
    let rowData = table.row($(this).parents('tr')).data();
    console.log('Editing:', rowData);
});

// cancel button
$('#reservationTable').on('click', '.cancel-btn', function () {
    let rowData = table.row($(this).parents('tr')).data();
    console.log('Editing:', rowData);
});