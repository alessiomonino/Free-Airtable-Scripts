/* ------------------------------
  Getting Discussion table data
------------------------------ */ 
let discussion_logs_table = base.getTable("Discussion Logs");
let discussion_logs_data = await discussion_logs_table.selectRecordsAsync({
  sorts: [
    { field: "Discussion Date" },
  ]
});


/* ------------------------------------------------------------
  Finding Last records status and storing in update array
------------------------------------------------------------ */ 
let update_array = [];
let update_array_projects = [];
let ids_included = [];
let ids_included_1 = [];
let counter = 0;
let counter_1 = 0;
for (let data_1 of discussion_logs_data.records) {
  let sould_continue = true;
  if (ids_included.length == 0) {
    sould_continue = true;
  } else {
    for (let id of ids_included) {
      if (id == data_1.id) {
        sould_continue = false;
        break;
      }
    }
  }
  if (sould_continue) {
    let last_status;
    ids_included.push(data_1.id)
    for (let data_2 of discussion_logs_data.records) {
      sould_continue = true
      for (let id of ids_included) {
        if (id == data_2.id) {
          sould_continue = false;
          break;
        }
      }
      if (sould_continue) {
        if (data_1.getCellValue("Project")[0].id == data_2.getCellValue("Project")[0].id) {
          last_status = data_2.getCellValue("Status");
          ids_included.push(data_2.id)
        }
      }
    }
    if (last_status == undefined) {
      last_status = data_1.getCellValue("Status")
    }
    update_array_projects[counter_1] = {
      id: data_1.getCellValue("Project")[0].id,
      fields: {
        "Status": { name: last_status.name }
      }
    }
    counter_1++
    sould_continue = true;
    if (ids_included_1.length == 0) {
      sould_continue = true;
    } else {
      for (let id of ids_included_1) {
        if (id == data_1.id) {
          sould_continue = false;
          break;
        }
      }
    }
    if (sould_continue) {
      update_array[counter] = {
        id: data_1.id,
        fields: {
          "Status": last_status
        }
      }
      ids_included_1.push(data_1.id)
      counter++
      for (let data_3 of discussion_logs_data.records) {
        sould_continue = true
        if (data_1.getCellValue("Project")[0].id == data_3.getCellValue("Project")[0].id) {
          for (let id of ids_included_1) {
            if (id == data_3.id) {
              sould_continue = false;
              break;
            }
          }
          if (sould_continue) {
            update_array[counter] = {
              id: data_3.id,
              fields: {
                "Status": last_status
              }
            }
            ids_included_1.push(data_3.id)
            counter++;
          }
        }
      }
    }
  }
}

/* ------------------------------
  Sending data for updation
------------------------------ */ 

while (update_array.length > 0) {
  await discussion_logs_table.updateRecordsAsync(update_array.slice(0, 50));
  update_array = update_array.slice(50);
};

let projects_table = base.getTable("Project");

while (update_array_projects.length > 0) {
  await projects_table.updateRecordsAsync(update_array_projects.slice(0, 50));
  update_array_projects = update_array_projects.slice(50);
};