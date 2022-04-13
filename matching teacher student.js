/* ---------------------------------
    Getting Teachers table and data
 --------------------------------- */
 let teachers_table = base.getTable("Teachers");
 let teachers_data = await teachers_table.selectRecordsAsync(
     {
         sorts: [
             { field: "createdTime" }]
     }
 );
 
 
 /* -------------------------------------------
     Configuration to get last inserted record
 ------------------------------------------- */
 const inputConfig = input.config()
 const recordID = inputConfig["recordID"];
 const studentAge = inputConfig["Age"];
 let teachers;
 
 
 /* -------------------------------------------
     Based on condition finding teacher
 ------------------------------------------- */
 if (studentAge == 5) {
     teachers = teachers_data.records.filter(record => {
         if (record.getCellValue("Students") != null) {
             if (record.getCellValue("Students").length < record.getCellValue("Max Students Allowed")) {
                 return record.getCellValue("Class") == "1st Standard";
             }
         } else {
             return record.getCellValue("Class") == "1st Standard";
         }
     })
 } else if (studentAge == 6) {
     teachers = teachers_data.records.filter(record => {
         if (record.getCellValue("Students") != null) {
             if (record.getCellValue("Students").length < record.getCellValue("Max Students Allowed")) {
                 return record.getCellValue("Class") == "2st Standard";
             }
         } else {
             return record.getCellValue("Class") == "2st Standard";
         }
     })
 } else if (studentAge == 7) {
     teachers = teachers_data.records.filter(record => {
         if (record.getCellValue("Students") != null) {
             if (record.getCellValue("Students").length < record.getCellValue("Max Students Allowed")) {
                 return record.getCellValue("Class") == "3rd Standard";
             }
         } else {
             return record.getCellValue("Class") == "3rd Standard";
         }
     })
 } else if (studentAge == 8) {
     teachers = teachers_data.records.filter(record => {
         if (record.getCellValue("Students") != null) {
             if (record.getCellValue("Students").length < record.getCellValue("Max Students Allowed")) {
                 return record.getCellValue("Class") == "4th Standard";
             }
         } else {
             return record.getCellValue("Class") == "4th Standard";
         }
     })
 } else if (studentAge == 9) {
     teachers = teachers_data.records.filter(record => {
         if (record.getCellValue("Students") != null) {
             if (record.getCellValue("Students").length < record.getCellValue("Max Students Allowed")) {
                 return record.getCellValue("Class") == "5th Standard";
             }
         } else {
             return record.getCellValue("Class") == "5th Standard";
         }
     })
 }
 
 /* -------------------------------------------
     Storing first teacher's ID
 ------------------------------------------- */
 let teacher_id = teachers[0].id;
 
 
 /* -------------------------------------------
     Updating record
 ------------------------------------------- */
 let student_table = base.getTable("Students");
 await student_table.updateRecordAsync(recordID, { "Teacher": [{ "id": teacher_id }] })