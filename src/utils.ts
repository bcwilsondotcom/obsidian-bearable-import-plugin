import { App, TFile } from 'obsidian';

// Utility to find a daily note based on a date format
export function findDailyNote(app: App, dateFormat: string): TFile | null {
    const dateStr = window.moment().format(dateFormat); // Format today's date according to the dateFormat
    const files = app.vault.getFiles(); // Get all files in the vault
    const foundFile = files.find(file => file.basename === dateStr); // Find the first file where the basename matches the formatted date
    return foundFile || null; // Return the found file or null if no file is found
}


export function getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}