interface Row {
    dateFormatted: string;
    timeOfDay: string;
    category: string;
    detail: string;
    ratingAmount: string;
    notes: string;
}

export function importHealthMeasurementsData(rows: Row[]): string {
    let markdown = "";
    
    markdown += "### Health Measurements\n";

    rows.forEach(row => {
        const category = row.category.replace(/"/g, '').trim();
        if (category === 'Health measurements') {
            markdown += formatHealthMeasurementsMarkdown(row);
        }
    });
    
    return markdown;
}

function formatHealthMeasurementsMarkdown(row: Row): string {
    return `${row.detail.replace(/"/g, '')}:: ${row.ratingAmount.replace(/"/g, '')}\n`;    
}
