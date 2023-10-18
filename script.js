function calculateDRR(rowNumber) {
    var startDate = new Date(document.getElementById("start-date-" + rowNumber).value);
    var endDate = new Date(document.getElementById("end-date-" + rowNumber).value);
    var leadCount = parseInt(document.getElementById("lead-count-" + rowNumber).value);

    // checking if the end date is earlier than the start date
    if (endDate < startDate) {
        alert("End date cannot be earlier than the start date.");
        document.getElementById("end-date-" + rowNumber).value = ""; // Clear the invalid end date
        return;
    }

    var excludedDates = document.getElementById("exclude-dates-" + rowNumber).value.split(',');
    var daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    var excludedDays = 0;

    excludedDates.forEach(function(date) {
        var excludedDate = new Date(date);
        if (!isNaN(excludedDate) && excludedDate >= startDate && excludedDate <= endDate) {
            excludedDays++;
        }
    });

    var numDays = daysDiff - excludedDays;
    var expectedDrr = numDays === 0 ? 0 : leadCount / numDays;

    document.getElementById("month-year-" + rowNumber).textContent = startDate.toLocaleString('en-us', { month: 'long' }) + " " + startDate.getFullYear();
    document.getElementById("num-days-" + rowNumber).textContent = numDays;
    document.getElementById("expected-drr-" + rowNumber).textContent = expectedDrr.toFixed(2);
}
function validateEndDate(rowNumber) {
    var startDate = new Date(document.getElementById("start-date-" + rowNumber).value);
    var endDate = new Date(document.getElementById("end-date-" + rowNumber).value);

    // Validate if the end date is earlier than the start date
    if (endDate < startDate) {
        alert("End date cannot be earlier than the start date.");
        document.getElementById("end-date-" + rowNumber).value = ""; // Clear the invalid end date
    }
}

function addRow() {
    var table = document.getElementById("drr-table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);

    var lastRowNumber = table.rows.length - 1;
    var newRowNumber = lastRowNumber + 1;

    newRow.id = "row-" + newRowNumber;

    newRow.innerHTML = `<td><input type="number" id="id-num-${newRowNumber}" class="input" name="id"></td>
    <td><input type='date' id='start-date-${newRowNumber}' name='start-date'></td>
                        <td><input type='date' id='end-date-${newRowNumber}' name='end-date'></td>
                        <td id='month-year-${newRowNumber}'></td>
                        <td><input type='text' placeholder="YYYY-MM-DD" id='exclude-dates-${newRowNumber}' name='exclude-dates'></td>
                        <td id='num-days-${newRowNumber}'></td>
                        <td><input type='number' id='lead-count-${newRowNumber}' name='lead-count'></td>
                        <td id='expected-drr-${newRowNumber}'></td>
                        <td><button class='calculate-button' data-row='${newRowNumber}'>Calculate</button></td>
                        <td><button class='add-row-button' data-row='${newRowNumber}'>Add Row</button></td>`;

    // Adding an input event listener to the new end date input field
    newRow.querySelector(`#end-date-${newRowNumber}`).addEventListener("input", function() {
        validateEndDate(newRowNumber);
    });

    newRow.querySelector(`.calculate-button`).addEventListener("click", function() {
        var rowNumber = this.getAttribute("data-row");
        calculateDRR(rowNumber);
    });

    
    newRow.querySelector(`.add-row-button`).addEventListener("click", function() {
        addRow();
    });
}


document.getElementById("end-date-1").addEventListener("input", function() {
    validateEndDate(1);
});

document.getElementById("drr-table").addEventListener("click", function(event) {
    if (event.target.classList.contains("calculate-button")) {
        var rowNumber = event.target.getAttribute("data-row");
        calculateDRR(rowNumber);
    }
});
