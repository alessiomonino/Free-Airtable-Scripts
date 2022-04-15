/* ------------------------------------
        Getting Task Table Data
------------------------------------ */
let tasks_base = base.getTable("Tasks");
let tasks_data = await tasks_base.selectRecordsAsync();


/* ------------------
Iterating  & Storing
--------------------- */
let update_array = [];

update_array = tasks_data.records.map(record => {
    return {
        id: record.getCellValue("Project")[0].id,
        fields: {
            "Status": { name: record.getCellValue("Status").name }
        }
    }
})

/* ------------------
       Filtering
--------------------- */
let final_update_array = [];
let id_already_taken = [];

final_update_array = [];
update_array.map(record_1 => {
    let result = update_array.find(record_2 => {
        return record_1.id == record_2.id && record_2.fields["Status"].name == "Working";
    })
    if (result == undefined) {
        if (id_already_taken.length == 0) {
            id_already_taken.push(record_1.id)
            final_update_array.push(record_1)
        } else {
            let exists = false;
            for (let id of id_already_taken) {
                if (id == record_1.id) {
                    exists = true;
                }
            }
            if (!exists) {
                id_already_taken.push(record_1.id)
                final_update_array.push(record_1)
            }
        }
    } else {
        if (id_already_taken.length == 0) {
            id_already_taken.push(result.id)
            final_update_array.push(result)
        } else {
            let exists = false;
            for (let id of id_already_taken) {
                if (id == record_1.id) {
                    exists = true;
                }
            }
            if (!exists) {
                id_already_taken.push(result.id)
                final_update_array.push(result)
            }
        }
    }
})

/* ------------------
    Updating
--------------------- */
while (final_update_array.length > 0) {
    await base.getTable("Projects").updateRecordsAsync(final_update_array.slice(0, 50));
    final_update_array = final_update_array.slice(50);
};