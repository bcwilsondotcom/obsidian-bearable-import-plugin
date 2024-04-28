import { App, PluginSettingTab, Setting } from 'obsidian';
import BearableDataImport from '../main';


export class BearableDataImportSettingsTab extends PluginSettingTab {
    plugin: BearableDataImport;

    constructor(app: App, plugin: BearableDataImport) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        let { containerEl } = this;

        containerEl.empty();

        // Setting for the CSV file path
        new Setting(containerEl)
            .setName('CSV File Path')
            .setDesc('Path to the CSV file within the vault.')
            .addText(text => text
                .setValue(this.plugin.settings.csvFilePath)
                .onChange(async (value) => {
                    this.plugin.settings.csvFilePath = value.trim();
                    await this.plugin.saveSettings();
                }));
        
        // Setting for the date format of the daily notes
        new Setting(containerEl)
            .setName('Date Format')
            .setDesc('Specify the date format for your daily notes.')
            .addText(text => text
                .setValue(this.plugin.settings.dateFormat)
                .onChange(async (value) => {
                    this.plugin.settings.dateFormat = value;
                    await this.plugin.saveSettings();
                }));

        // Setting for the header name under which data will be placed
        new Setting(containerEl)
            .setName('Header Name')
            .setDesc('Specify the header name under which the data should be placed.')
            .addText(text => text
                .setValue(this.plugin.settings.headerName)
                .onChange(async (value) => {
                    this.plugin.settings.headerName = value;
                    await this.plugin.saveSettings();
                }));
        
        new Setting(containerEl)
            .setName('Import Mood Data')
            .setDesc('Toggle to import or ignore Mood data.')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.importMood)
                .onChange(async (value) => {
                    this.plugin.settings.importMood = value;
                    await this.plugin.saveSettings();
                }));

                new Setting(containerEl)
                .setName('Import Energy Data')
                .setDesc('Toggle to import or ignore Energy data.')
                .addToggle(toggle => toggle
                    .setValue(this.plugin.settings.importEnergy)
                    .onChange(async (value) => {
                        this.plugin.settings.importEnergy = value;
                        await this.plugin.saveSettings();
                    }));
                
                new Setting(containerEl)
                .setName('Import Sleep Data')
                .setDesc('Toggle to import or ignore Sleep data.')
                .addToggle(toggle => toggle
                    .setValue(this.plugin.settings.importSleep)
                    .onChange(async (value) => {
                        this.plugin.settings.importSleep = value;
                        await this.plugin.saveSettings();
                    }));

                new Setting(containerEl)
                .setName('Import Health Measurements')
                .setDesc('Toggle to import or ignore Health Measurements data.')
                .addToggle(toggle => toggle
                    .setValue(this.plugin.settings.importHealthMeasurements)
                    .onChange(async (value) => {
                        this.plugin.settings.importHealthMeasurements = value;
                        await this.plugin.saveSettings();
                    }));

                new Setting(containerEl)
                .setName('Import Symptoms')
                .setDesc('Toggle to import or ignore Symptom data.')
                .addToggle(toggle => toggle
                    .setValue(this.plugin.settings.importSymptoms)
                    .onChange(async (value) => {
                        this.plugin.settings.importSymptoms = value;
                        await this.plugin.saveSettings();
                    }));

                new Setting(containerEl)
                .setName('Import Medication & Supplements')
                .setDesc('Toggle to import or ignore Medication & Suppluments data.')
                .addToggle(toggle => toggle
                    .setValue(this.plugin.settings.importMeds)
                    .onChange(async (value) => {
                        this.plugin.settings.importMeds = value;
                        await this.plugin.saveSettings();
                    }));

                    new Setting(containerEl)
                    .setName('Import Custom Ratings')
                    .setDesc('Toggle to import or ignore Custom Ratings data.')
                    .addToggle(toggle => toggle
                        .setValue(this.plugin.settings.importCustomRatings)
                        .onChange(async (value) => {
                            this.plugin.settings.importCustomRatings = value;
                            await this.plugin.saveSettings();
                        }))
                    .addText(text => text
                        .setValue(this.plugin.settings.customRatingsList)
                        .onChange(async (value) => {
                            this.plugin.settings.customRatingsList = value;
                            await this.plugin.saveSettings();
                        }));

                    new Setting(containerEl)
                    .setName('Import Bowel Movement Data')
                    .setDesc('Toggle to import or ignore Mowel Movement data.')
                    .addToggle(toggle => toggle
                        .setValue(this.plugin.settings.importBm)
                        .onChange(async (value) => {
                            this.plugin.settings.importBm = value;
                            await this.plugin.saveSettings();
                        }));
    
    }
}
