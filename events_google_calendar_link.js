//--------------------------
//GET TABLES & TARGET RECORD
//--------------------------
let table_weddings = base.getTable("Weddings");
let table_events = base.getTable("Events");
let records = await input.recordAsync('',table_weddings).catch()
let recordId = records.id; // we need to create a 'recordId' input variable connected to a record trigger


//-----------
//GET RECORDS
//-----------
let records_weddings = await table_weddings.selectRecordsAsync({
    fields: [
    'Name',
    'Couple',
    'Status',
    'Events',
    'Couple String'
    ]
});
let record = records_weddings.getRecord(recordId);

let records_events_raw = await table_events.selectRecordsAsync({
    fields: [
    'Wedding',
    'Event Type',
    'Status',
    'Starting Time',
    'Ending Time',
    "Event Name"
    ]
});
let records_events = records_events_raw.records


//-------------------
//GET DATA DICTIONARY
//-------------------
var dictionary = {
    name : record.getCellValue('Name'),
    events : record.getCellValue('Events'),
    couple_names : record.getCellValue('Couple String')
}


//---------
//MAIN CODE
//---------
let chosen_records = records_events.filter(row => row.getCellValue("Wedding")[0]['id'] == recordId)
let update_records = []
for (let chosen_record_index of chosen_records){
    update_records.push({id:chosen_record_index.id, fields: {
        "Book in Calendly" : true,
        "Status" : {name : "Booked"}
    }})
}

while (update_records.length > 0) {
    await table_events.updateRecordsAsync(update_records.slice(0,50));
    update_records = update_records.slice(50)
}


//---------------------
//CREATE EMAIL FUNCTION
//---------------------
function createEmail(dictionary, chosen_records) {
    let email_text = ""
    email_text = "## " + dictionary["name"] + "\n"
    email_text = email_text + '*Couple*: ' + dictionary["couple_names"] + '\n'
    email_text = email_text + "Here is the events list\n"
    for (let record of chosen_records) {
        let date = new Date(record.getCellValue('Starting Time'))
        let date_day = date.getDay()
        let date_month = date.getMonth()
        email_text = email_text + ' - *' + date_month + "/" + date_day + '*: ' + record.getCellValue('Event Name') + '\n'
    }
    return email_text
}


//------------
//CREATE EMAIL
//------------
let emailContent = createEmail(dictionary,chosen_records)
console.log(recordId)
await table_weddings.updateRecordAsync(recordId, {
    "Email Content" : emailContent,
    "Status" : {name : "Booked"}
})
