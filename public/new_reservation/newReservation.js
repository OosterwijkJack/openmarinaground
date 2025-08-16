let startDatePicker;
let endDatePicker;

window.onload = async function(){
    startDatePicker = flatpickr("#startDate", {
        dateFormat: "Y-m-d",
        inline: true,
        onChange: function(selectedDates, dateStr, instance) {
            // Update the display
            let nextDay = new Date(selectedDates[0]);
            nextDay.setDate(nextDay.getDate() + 1);
            endDatePicker.setDate(nextDay, true);

            //document.getElementById('startDateDisplay').textContent = dateStr || 'Not selected';

        }
    });

// Initialize the end date picker
    endDatePicker = flatpickr("#endDate", {
        dateFormat: "Y-m-d",
        inline: true,
        onChange: function(selectedDates, dateStr, instance) {
            // Update the display
            //document.getElementById('endDateDisplay').textContent = dateStr || 'Not selected';
            
            // Set the maximum date for start date picker
        }
    });
}

