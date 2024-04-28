import { Plugin, PluginSettingTab, Setting, App, TFile } from 'obsidian';
import { BearableDataImportSettingsTab } from 'src/settings';
import { findDailyNote, importData, getCurrentDate } from 'src/utils';
import { importCustomData } from 'src/dataTypes/customData';

export interface BearableDataImportSettings {
    csvFilePath: string; // Path to the CSV file within the vault
    dateFormat: string; // Date format for the daily notes
    headerName: string; // New field to specify the header name
    importMood: boolean; // Toggle to import or ignore Mood data
    importEnergy: boolean; // Toggle to import or ignore Energy data
    importSleep: boolean; // Toggle to import or ignore Sleep data
    importHealthMeasurements: boolean; // Toggle to import or ignore Health Measurements data
    importSymptoms: boolean; // Toggle to import or ignore Symptoms data
    importMeds: boolean; // Toggle to import or ignore Medication & Suppluments data
    importCustomRatings: boolean; // Toggle to import or ignore Custom Ratings data
    customRatingsList: string; // List of custom ratings to import
    importBm: boolean; // Toggle to import or ignore Bowel Movement data
}

export const DEFAULT_SETTINGS: BearableDataImportSettings = {
    csvFilePath: 'Resources/bearable-export.csv', // Default file location
    dateFormat: 'YYYY-MM-DD',   // Default date format
    headerName: 'Daily Recap',  // Default header name
    importMood: true, // Default to import Mood data
    importEnergy: true, // Default to import Energy data
    importSleep: true, // Default to import Sleep data
    importHealthMeasurements: true, // Default to import Health Measurements data
    importSymptoms: true, // Default to import Symptoms dataratingAmount
    importMeds: true, // Default to import Medication & Suppluments data
    importCustomRatings: true, // Default to import Custom Ratings data
    customRatingsList: 'Productivity, Mindfulness, Social life, Love life, Family life, Hygiene, Relaxation', // Default custom ratings list
    importBm: true, // Default to import Bowel Movement data
};

export default class BearableDataImport extends Plugin {
    settings: BearableDataImportSettings;
    headerName: any;
    importMood: any;
    importEnergy: any;
    importSleep: any;
    importHealthMeasurements: any;
    importSymptoms: any;
    importMeds: any;
    importCustomRatings: any;
    customRatingsList: any;
    importBm: any;

    async onload() {
        await this.loadSettings();
        //console.log("Loaded settings:", this.settings); // Debugging line

        this.addSettingTab(new BearableDataImportSettingsTab(this.app, this));
        this.addCommand({
            id: 'import-bearable-data',
            name: 'Import Bearable Data',
            callback: () => this.convertCSVToMarkdown(),
        });
    }

    async loadSettings() {
        // Load settings and provide default if not previously saved
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async convertCSVToMarkdown() {
        const csvFile = this.app.vault.getAbstractFileByPath(this.settings.csvFilePath);
        if (csvFile instanceof TFile) {
            
            const csvData = await this.app.vault.read(csvFile);
            const rows = this.parseCSV(csvData);
            const newData = importData(rows, this.settings);

            const dailyNote = findDailyNote(this.app, this.settings.dateFormat);
            if (dailyNote) {
                const noteContent = await this.app.vault.read(dailyNote);
                const updatedContent = this.updateNoteContent(noteContent, newData, this.settings.headerName);
                await this.app.vault.modify(dailyNote, updatedContent);
                console.log("Data written to daily note under header:", this.settings.headerName);
            } else {
                console.log("Daily note not found for date:", this.settings.dateFormat);
            }
        } else {
            console.log("CSV file not found at path:", this.settings.csvFilePath);
        }
    }

    parseCSV(data: string): any[] {
        //console.log("Raw CSV data:", data);  // Log the raw CSV data for debugging
        if (!data.trim()) {
            console.log("No data to parse. CSV is empty.");
            return [];
        }
        
        const rows = data.split('\n').slice(1); // Skip the header and split rows
        return rows.map(row => {
            
            const values = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g); // Handle CSV parsing with regex that accounts for quoted commas
            
            if (!values) {
                //console.log("Row could not be parsed:", row);
                return null; // Handle rows that might not parse correctly
            }
            
            const currentDate = getCurrentDate();
            // if ((values[1].toString().replace(/"/g, '')) === currentDate.toString()) {
            //     console.log("Current date found in CSV data.");
            // }

            const [date, dateFormatted, weekday, timeOfDay, category, ratingAmount, detail, notes] = values;
            if (values[1].toString().replace(/"/g, '') === currentDate.toString()) {
                return { date, dateFormatted, weekday, timeOfDay, category, ratingAmount, detail, notes };
            }
            
            return null;
        }).filter(row => {
            if (!row) {
            //console.log("Row could not be parsed:", row);
            return false;
            }
            return true;
        });
    }
    
    updateNoteContent(originalContent: string, newData: string, headerName: string): string {
        const header = `## ${headerName}`;
        const headerIndex = originalContent.indexOf(header);
    
        if (headerIndex !== -1) {
            // Header exists, find the end of the header line
            let endOfHeaderIndex = originalContent.indexOf('\n', headerIndex);
            endOfHeaderIndex = endOfHeaderIndex === -1 ? originalContent.length : endOfHeaderIndex;
    
            // Find the next header to determine the end of the current section
            const nextHeaderIndex = originalContent.indexOf('##', endOfHeaderIndex + 1);
            const startOfNextSection = nextHeaderIndex === -1 ? originalContent.length : nextHeaderIndex;
    
            // Replace the existing section with new data, or append if section extends to the end of the content
            return originalContent.substring(0, endOfHeaderIndex + 1) + newData + 
                   (nextHeaderIndex !== -1 ? originalContent.substring(startOfNextSection) : "");
        } else {
            // If the header doesn't exist, append the header and the new data at the end
            return originalContent + '\n' + header + '\n' + newData;
        }
    }    

}
