const fromDay = document.getElementById("fromDay");
const fromMonth = document.getElementById("fromMonth");
const fromYear = document.getElementById("fromYear");
const fromError = document.getElementById("fromError");

const toDay = document.getElementById("toDay");
const toMonth = document.getElementById("toMonth");
const toYear = document.getElementById("toYear");
const toError = document.getElementById("toError");

const cError = document.getElementById("cError");

const date = new Date();

fromDay.setAttribute("min", 1);
fromDay.setAttribute("max", 31);
fromMonth.setAttribute("min", 1);
fromMonth.setAttribute("max", 12);
fromDay.value = date.getDate();
fromMonth.value = date.getMonth() + 1;
fromYear.value = date.getFullYear();

toDay.setAttribute("min", 1);
toDay.setAttribute("max", 31);
toMonth.setAttribute("min", 1);
toMonth.setAttribute("max", 12);
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
        if (type === 'from') fromDay.value = date.getDate();
        else toDay.value = date.getDate();
        return;
    }
    if (day < 1 || day > 31 || month < 1 || month > 12) setError(prefix);
    else removeError(prefix);

    compareDates();
}
function checkMonth(prefix) {
    const day = document.getElementById(`${prefix}Day`).value;
    const month = document.getElementById(`${prefix}Month`).value;
    if (!month) {
        if (type === 'from') fromMonth.value = date.getMonth() + 1;
        else toMonth.value = date.getMonth() + 1;
        return;
    }
    if (day < 1 || day > 31 || month < 1 || month > 12) setError(prefix);
    else removeError(prefix);

    compareDates();
}

