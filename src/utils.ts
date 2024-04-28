import { App, TFile } from 'obsidian';
import BearableDataImportSettings from '../main';
import { importMoodData } from './dataTypes/moodData'; // Import the function to import mood data
import { importEnergyData } from './dataTypes/energyData'; // Import the function to import energy data
import { importSleepData } from './dataTypes/sleepData'; // Import the function to import sleep data
import { importHealthMeasurementsData } from './dataTypes/healthMeasurementsData'; // Import the function to import health measurements data
import { importSymptomData } from './dataTypes/symptomData'; // Import the function to import symptom data
import { importMedsData } from './dataTypes/medsData'; // Import the function to import meds data)
import { importCustomData } from './dataTypes/customData'; // Import the function to import custom data
import { importBmData } from './dataTypes/bowelMovementData'; // Import the function to import bowel movement data

// Utility to find a daily note based on a date format
export function findDailyNote(app: App, dateFormat: string): TFile | null {
    const dateStr = window.moment().format(dateFormat); // Format today's date according to the dateFormat
    const files = app.vault.getFiles(); // Get all files in the vault
    const foundFile = files.find(file => file.basename === dateStr); // Find the first file where the basename matches the formatted date
    return foundFile || null; // Return the found file or null if no file is found
}

export function importData(rows: any[], settings: BearableDataImportSettings): string {
    //console.log("Settings:", settings); // Debugging line
    let markdown = ""; // Initialize a variable to store the markdown content

    if (settings.importMood) {
        markdown += importMoodData(rows);  // Assume this function is defined to handle Mood data.
    }
    if (settings.importEnergy) {
        markdown += importEnergyData(rows);  // Assume this function is defined to handle Energy data.
    }
    if (settings.importSleep) {
        markdown += importSleepData(rows);  // Assume this function is defined to handle SLeep data.
    }
    if (settings.importHealthMeasurements) {
        markdown += importHealthMeasurementsData(rows);  // Assume this function is defined to handle Health data.
    }
    if (settings.importSymptoms) {
        markdown += importSymptomData(rows);  // Assume this function is defined to handle Symptom data.
    }
    if (settings.importMeds) {
        markdown += importMedsData(rows);  // Assume this function is defined to handle Medication & Supplements data.
    }
    if (settings.importCustomRatings) {
        markdown += importCustomData(rows, settings); // Assume this function is defined to handle Custom Ratings data.
    }
    if (settings.importBm) {
        markdown += importBmData(rows); // Assume this function is defined to handle Custom Ratings data.
    }

    return markdown;
}

export function getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}