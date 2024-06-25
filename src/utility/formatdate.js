import { addDays, format } from 'date-fns';
import { vi } from 'date-fns/locale';

function formatDateString(dateString) {
    const date = new Date(dateString);
    const formattedDate = format(date, "dd-MM-yyyy", { locale: vi });
    return formattedDate;
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function formatDateCustom(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function formatDateToTime(date) {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

function formatDateExpected(dateString, day) {
    const date = new Date(dateString);
    const newDate = addDays(date, day);
    const formattedDate = format(newDate, "dd-MM-yyyy", { locale: vi });
    return formattedDate;
}

function formatDateHourString(dateString) {
    const date = new Date(dateString);
    const formattedDate = format(date, "dd-MM-yyyy, HH:mm", { locale: vi });
    return formattedDate;
}

export {
    formatDate,
    formatDateString,
    formatDateCustom,
    formatDateToTime,
    formatDateExpected,
    formatDateHourString
};