import AgileTaskNotesPlugin, { BearableDataImportSettings } from 'main';
import { BearableDataImportSettingsTab } from '../settings';


interface Row {
    dateFormatted: string;
    timeOfDay: string;
    category: string;
    detail: string;
    ratingAmount: string;
    notes: string;
}


export function importCustomData(rows: any[], settings: BearableDataImportSettings): string {
    let markdown = "";
    markdown += "### Custom Ratings\n";

    //console.log("Settings:", settings);

    rows.forEach(row => {
        const category = row.category.replace(/"/g, '').trim();
        const categories = settings.customRatingsList.split(", ").map((category: string) => category.trim());
        
        if (categories.includes(category)) {
            markdown += formatCustomMarkdown(row);
        }
    });
    
    return markdown;
}

function formatCustomMarkdown(row: Row): string {
    return `${row.category.replace(/"/g, '')}:: ${row.ratingAmount.replace(/"/g, '')}\n`;
}

