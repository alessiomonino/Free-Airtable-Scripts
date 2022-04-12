//---------------------
//GET TABLE AND RECORDS
//---------------------
let sales_table = await base.getTable("Sales")
let input_value = await input.recordAsync("Label", sales_table)
let junction_table = await base.getTable("Junction Table");

//---------
//MAIN CODE
//---------
let should_end = true;
let i = 1;
let update_array = [];
while (should_end) {
    try {

        if (input_value.getCellValue("Product " + i) != null && input_value.getCellValue("Product " + i) != "") {
            let product = input_value.getCellValueAsString("Product " + i);
            let product_Quantity = input_value.getCellValueAsString("Product " + i + " Quantity");
            let Customer_Email = input_value.getCellValueAsString("Customer Email");
            let Customer_Name = input_value.getCellValueAsString("Customer Name");

            //---------
            //Storing data into array
            //---------
            update_array.push({
                "fields": {
                    "Customer Name": Customer_Name,
                    "Customer Email": Customer_Email,
                    "Product Name": product,
                    "Quantity": product_Quantity,
                }
            })

        } else {
            break;
        }
        i++;
    } catch (e) {
        break;
    }
}

//---------
//Creating records
//---------
while (update_array.length > 0) {
    await junction_table.createRecordsAsync(update_array.slice(0, 50));
    update_array = update_array.slice(50);
};