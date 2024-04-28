interface Row {
    dateFormatted: string;
    timeOfDay: string;
    category: string;
    detail: string;
    ratingAmount: string;
    notes: string;
}

export function importMedsData(rows: Row[]): string {
    let markdown = "";
    
    markdown += "### Medications & Supplements\n";

    rows.forEach(row => {
        const category = row.category.replace(/"/g, '').trim();
        if (category === 'Meds/Supplements') {
            markdown += formatMedsMarkdown(row);
        }
    });
    
    return markdown;
}

function formatMedsMarkdown(row: Row): string {
    return `Medication:: {Time:"${row.timeOfDay.replace(/"/g, '')}", Type:"${row.detail.replace(/"/g, '')}", Dose:"${row.ratingAmount.replace(/"/g, '').replace(/\|/g, ',')}"}\n`;
   }
