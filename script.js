const fromDay = document.getElementById("fromDay");
const fromMonth = document.getElementById("fromMonth");
const fromYear = document.getElementById("fromYear");
const fromError = document.getElementById("fromError");

const toDay = document.getElementById("toDay");
const toMonth = document.getElementById("toMonth");
const toYear = document.getElementById("toYear");
const toError = document.getElementById("toError");

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
        if (year % 100 === 0) {
            return (year % 400) === 0;
        }
        return true;
    }
    return false;
}

function setError(type) {
    if (type === 'f') fromError.classList.remove("hidden");
    else toError.classList.remove("hidden");
}

function removeError(type) {
    if (type === 'f') fromError.classList.add("hidden");
    else toError.classList.add("hidden");
}

function checkDay(e, type) {
    if (!e.value) {
        if (type === 'f') fromDay.value = date.getDate();
        else toDay.value = date.getDate();
        return;
    }
    if (e.value < 1) setError(type);
    else {
        if (e.value > 31) setError(type);
        else removeError(type);
    }
}
function checkMonth(e, type) {
    if (!e.value) {
        if (type === 'f') fromMonth.value = date.getMonth() + 1;
        else toMonth.value = date.getMonth() + 1;
        return;
    }
    if (e.value < 0) setError(type);
    else {
        if (e.value > 12) setError(type);
        else removeError(type);
    }
}