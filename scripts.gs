function updateInventorySummary() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var formSheet = sheet.getSheetByName("Form responses");  
  var summarySheet = sheet.getSheetByName("Inventory Summary"); 

  var formData = formSheet.getDataRange().getValues();
  var summaryData = summarySheet.getDataRange().getValues();

  // Get headers
  var formHeaders = formData[0];  
  var summaryHeaders = summaryData[0];  

  // Find the latest form entry
  var lastRow = formData.length - 1;  // Last row in form responses
  var formDate = formData[lastRow][1];  // Column B contains Date

  // Check if the date column already exists in summary sheet
  var summaryCol = summaryHeaders.indexOf(formDate);

  if (summaryCol === -1) {  
    // If date is not found, add it as a new column at the end
    summaryCol = summaryHeaders.length;  
    summarySheet.getRange(1, summaryCol + 1).setValue(formDate);  
  }

  // Create a mapping of item names from the form entry
  var formItemMap = {};
  for (var i = 2; i < formHeaders.length; i++) {  // Skipping Timestamp & Date
    formItemMap[formHeaders[i]] = formData[lastRow][i];
  }

  // Update inventory summary with the latest values
  for (var j = 2; j < summaryData.length; j++) {  // Starting row 3 (items list)
    var itemName = summaryData[j][0];  // Item names are in column A
    if (formItemMap.hasOwnProperty(itemName)) {
      summarySheet.getRange(j + 1, summaryCol + 1).setValue(formItemMap[itemName]); 
    }
  }
}
