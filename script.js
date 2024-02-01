import { intervalToDuration } from "./node_modules/date-fns/intervalToDuration.mjs";
const fromDay = document.getElementById("fromDay");
const fromMonth = document.getElementById("fromMonth");
const fromYear = document.getElementById("fromYear");
const fromError = document.getElementById("fromError");

const toDay = document.getElementById("toDay");
const toMonth = document.getElementById("toMonth");
const toYear = document.getElementById("toYear");
const toError = document.getElementById("toError");

const yearResult = document.getElementById("yearResult");
const monthResult = document.getElementById("monthResult");
const dayResult = document.getElementById("dayResult")

// Get Checkboxes
const includeEndDate = document.getElementById("includeEndDate");
const includeYears = document.getElementById("includeYears");
const includeMonths = document.getElementById("includeMonths");
const includeDays = document.getElementById("includeDays");

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

function countLeapYears(sYear, eYear) {
    var days = 0;
    sYear = parseInt(sYear);
    eYear = parseInt(eYear);
    sYear++;
    if (isLeapYear(sYear)) {
        while (sYear <= eYear) {
            days += 1;
            sYear += 4;
        }
    }
    else {
        while (!isLeapYear(sYear)) sYear++;
        while (sYear <= eYear) {
            days += 1;
            sYear += 4;
        }
    }
    return days;
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

fromDay.addEventListener("focusout", () => checkDay('from'));
toDay.addEventListener("focusout", () => checkDay('to'));

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

fromMonth.addEventListener("focusout", () => checkMonth('from'));
toMonth.addEventListener("focusout", () => checkMonth('to'));


function checkYear() {
    compareDates();
}

fromYear.addEventListener("focusout", () => checkYear());
toYear.addEventListener("focusout", () => checkYear());

function calculateResults() {
    var diffObj = intervalToDuration({
        start: new Date(fromYear.value, fromMonth.value - 1, fromDay.value),
        end: new Date(toYear.value, toMonth.value - 1, toDay.value),
    });
    if (includeEndDate.checked) {
        diffObj.days++;
        if (diffObj.days > 31) {
            diffObj.days = 0;
            diffObj.months++;
            if (diffObj.months > 12) {
                diffObj.months = 0;
                diffObj.years++;
            }
        }
    }
    if (diffObj.days > 30) {
        diffObj.days = diffObj.days % 30;
        diffObj.months = diffObj.months % 12;
        if (diffObj.months > 12) diffObj.years = diffObj.years + 1;
    }
    yearResult.textContent = diffObj.years ? diffObj.years : 0;
    monthResult.textContent = diffObj.months ? diffObj.months : 0;
    dayResult.textContent = diffObj.days ? diffObj.days : 0;
    if (!includeYears.checked && includeMonths.checked && includeDays.checked) {
        yearResult.textContent = '--';
        if (diffObj.years)
            monthResult.textContent = parseInt(monthResult.textContent) + (diffObj.years * 12);
    }
    else if (!includeYears.checked && !includeMonths.checked && includeDays.checked) {
        console.log(countLeapYears(fromYear.value, toYear.value))
        yearResult.textContent = "--";
        monthResult.textContent = "--";
        if (diffObj.months) {
            dayResult.textContent = parseInt(dayResult.textContent) + parseInt(diffObj.months * 30.4167) + (diffObj.years ? diffObj.years * 365 : 0) + countLeapYears(fromYear.value, toYear.value);
        }
        else if (diffObj.years) {
            dayResult.textContent = parseInt(dayResult.textContent) + (diffObj.months ? parseInt(diffObj.months * 30.4167) : 0) + (diffObj.years * 365) + countLeapYears(fromYear.value, toYear.value);
        }
    }
    else if (includeYears.checked && !includeMonths.checked && includeDays.checked) {
        console.log(diffObj)
        yearResult.textContent = diffObj.years ? diffObj.years : 0;
        monthResult.textContent = "--";
        if (diffObj.months)
            dayResult.textContent = parseInt(dayResult.textContent) + parseInt(diffObj.months * 30.4167);
    }
}

function onCheckBoxesChange() {
    if (includeDays.checked) return;
    if (includeYears.checked && includeMonths.checked && includeDays.checked) return;
    else {
        document.getElementById("includeDays").checked = true;
        document.getElementById("includeMonths").checked = true;
    }
}
includeYears.addEventListener("click", onCheckBoxesChange);
includeMonths.addEventListener("click", onCheckBoxesChange);
includeDays.addEventListener("click", onCheckBoxesChange);

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
document.getElementById("themeButton").addEventListener("click", changeTheme);