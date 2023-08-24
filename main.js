function filterNumberInput(input, maxLength){
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, maxLength);
}

function addError(fieldName, errorMessage){
    let errorText = document.getElementById("error-text-" + fieldName);
    if(errorMessage != ""){
        errorText.textContent = errorMessage;
        errorText.style.visibility = "visible";
    }
    else{
        errorText.textContent = "Error";
    }
    document.getElementById(fieldName + "-input").classList.add("error");
}

function removeError(fieldName){
    let errorText = document.getElementById("error-text-" + fieldName);
    errorText.textContent = "Error";
    errorText.style.visibility = "hidden";
    document.getElementById(fieldName + "-input").classList.remove("error");
}

function clearShownErrors(){
    removeError("day");
    removeError("month");
    removeError("year");
}

function calculateAge(){
    clearShownErrors();

    day = document.getElementById("day-input").value;
    month = document.getElementById("month-input").value;
    year = document.getElementById("year-input").value;

    let error = false;

    if(day.length == 0){
        addError("day", "This field is required");
        error = true;
    }
    if(month.length == 0){
        addError("month", "This field is required");
        error = true;
    }
    if(year.length == 0){
        addError("year", "This field is required");
        error = true;
    }

    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    if(day > 31 || day < 1){
        addError("day", "Must be a valid day");
        error = true;
    }
    if(month > 12 || month < 1){
        addError("month", "Must be a valid month");
        error = true;
    }
    if(year > new Date().getFullYear()){
        addError("year", "Must be in the past");
        error = true;
    }

    if(error)
        return;

    
    let days_count = {
        "1": 31,
        "2": 28,
        "3": 31,
        "4": 30,
        "5": 31,
        "6": 30,
        "7": 31,
        "8": 31,
        "9": 30,
        "10": 31,
        "11": 30,
        "12": 31
    };

    if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
        days_count[2] = 29;
    }

    if(day > days_count[month]){
        addError("day", "Must be a valid date");
        addError("month", "");
        addError("year", "");
        error = true;
    }

    if(error)
        return;

    month--;

    let curDate = new Date();
    let curYear = curDate.getFullYear();
    let curMonth = curDate.getMonth();
    let curDay = curDate.getDate();

    if(year == curYear && (month > curMonth || (month == curMonth && day > curDay))){
        addError("day", "Must be in the past");
        addError("month", "");
        addError("year", "");
        error = true;
    }

    if(error)
        return;

    if(curMonth < month){
        curYear - 1;
        curMonth = curMonth + (12 - month); 
    }

    let days = curDay - day;
    if(curDay < day){
        curMonth--;
        days = days_count[month] - day + curDay;
    }
    let months = curMonth - month;
    if(curMonth < month){
        curYear--;
        months = 12 - month + curMonth;
    }
    let years = curYear - year;

    document.getElementById("years-number").textContent = years;
    document.getElementById("days-number").textContent = days;
    document.getElementById("months-number").textContent = months;
}