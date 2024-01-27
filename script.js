const fromDay = document.getElementById("fromDay");
const fromMonth = document.getElementById("fromMonth");
const fromYear = document.getElementById("fromYear");
const fromError = document.getElementById("fromError");

const toDay = document.getElementById("toDay");
const toMonth = document.getElementById("toMonth");
const toYear = document.getElementById("toYear");
const toError = document.getElementById("toError");

const cError = document.getElementById("cError");
const calBtn = document.getElementById("calBtn");

const date = new Date();

fromDay.setAttribute("min", 1);
fromDay.setAttribute("max", 31);
fromMonth.setAttribute("min", 1);
fromMonth.setAttribute("max", 12);
fromYear.setAttribute("min", 1971);
fromDay.value = date.getDate();
fromMonth.value = date.getMonth() + 1;
fromYear.value = date.getFullYear();

toDay.setAttribute("min", 1);
toDay.setAttribute("max", 31);
toMonth.setAttribute("min", 1);
toMonth.setAttribute("max", 12);
toYear.setAttribute("min", 1971);
toDay.value = date.getDate();
toMonth.value = date.getMonth() + 1;
toYear.value = date.getFullYear();

function isLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) return (year % 400) === 0;
        return true;
    }
    return false;
}

function checkRange(value, max) {
    if (value < 1 || value > max) return false;
    return true;
}

function setError(prefix) {
    if (prefix === 'from') fromError.classList.remove("hidden");
    else toError.classList.remove("hidden");
}

function removeError(prefix) {
    if (prefix === 'from') fromError.classList.add("hidden");
    else toError.classList.add("hidden");
}

function compareDates() {
    const fromDate = new Date(`${fromYear.value}-${fromMonth.value}-${fromDay.value}`);
    const toDate = new Date(`${toYear.value}-${toMonth.value}-${toDay.value}`);
    if (fromDate.getTime() > toDate.getTime()) cError.classList.remove("hidden");
    else cError.classList.add("hidden");
}

function checkDay(prefix) {
    const day = document.getElementById(`${prefix}Day`).value;
    const month = document.getElementById(`${prefix}Month`).value;
    if (!day) {
        if (prefix === 'from') fromDay.value = date.getDate();
        else toDay.value = date.getDate();
        return;
    }
    if (!checkRange(day, 31) || !checkRange(month, 12)) setError(prefix);
    else removeError(prefix);

    compareDates();
}

function checkMonth(prefix) {
    const day = document.getElementById(`${prefix}Day`).value;
    const month = document.getElementById(`${prefix}Month`).value;
    if (!month) {
        if (prefix === 'from') fromMonth.value = date.getMonth() + 1;
        else toMonth.value = date.getMonth() + 1;
        return;
    }
    if (!checkRange(day, 31) || !checkRange(month, 12)) setError(prefix);
    else removeError(prefix);

    compareDates();
}

function checkYear() {
    compareDates();
}

function calculateResults() {
    var fromDate = moment(`${fromYear.value}-${fromMonth.value}-${fromDay.value}`);
    var toDate = moment(`${toYear.value}-${toMonth.value}-${toDay.value}`);

    const diffObj = moment.duration(toDate.diff(fromDate));
    document.getElementById("yearResult").textContent = diffObj._data.years;
    document.getElementById("monthResult").textContent = diffObj._data.months;
    document.getElementById("dayResult").textContent = diffObj._data.days;
}

calBtn.addEventListener("click", function () {

    if (fromMonth.value == 2) {
        if (isLeapYear(fromYear.value)) {
            if (!checkRange(fromDay.value, 29)) fromError.classList.remove("hidden");
            else fromError.classList.add("hidden");
        }
        else {
            if (!checkRange(fromDay.value, 28)) fromError.classList.remove("hidden");
            else fromError.classList.add("hidden");
        }
    }
    else {
        // Months with 31 days
        switch (parseInt(fromMonth.value)) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                if (!checkRange(fromDay.value, 31)) fromError.classList.remove("hidden");
                else fromError.classList.add("hidden");
                break;
            // Months with 30 days
            case 4:
            case 6:
            case 9:
            case 11:
                if (!checkRange(fromDay.value, 30)) fromError.classList.remove("hidden");
                else fromError.classList.add("hidden");
                break;
            default:
                fromError.classList.remove("hidden");
        }
    }

    if (toMonth.value == 2) {
        if (isLeapYear(toYear.value)) {
            if (!checkRange(toDay.value, 29)) toError.classList.remove("hidden");
            else toError.classList.add("hidden");
        }
        else {
            if (!checkRange(toDay.value, 28)) toError.classList.remove("hidden");
            else toError.classList.add("hidden");
        }
    }
    else {
        // Months with 31 days
        switch (parseInt(toMonth.value)) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                if (!checkRange(toDay.value, 31)) toError.classList.remove("hidden");
                else toError.classList.add("hidden");
                break;
            // Months with 30 days
            case 4:
            case 6:
            case 9:
            case 11:
                if (!checkRange(toDay.value, 30)) toError.classList.remove("hidden");
                else toError.classList.add("hidden");
                break;
            default:
                toError.classList.remove("hidden");
        }
    }
    if (cError.classList.contains("hidden") && fromError.classList.contains("hidden") && toError.classList.contains("hidden")) calculateResults();
});

function changeTheme() {
    var htmlTag = document.getElementsByTagName("html")[0];
    if (htmlTag.classList.contains("dark"))
        htmlTag.setAttribute("class", "");
    else htmlTag.setAttribute("class", "dark");
}