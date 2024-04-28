interface Row {
    dateFormatted: string;
    timeOfDay: string;
    category: string;
    detail: string;
    ratingAmount: string;
    notes: string;
}

export function importSleepData(rows: Row[]): string {
    let markdown = "";
    
    markdown += "### Sleep\n";

    rows.forEach(row => {
        const category = row.category.replace(/"/g, '').trim();
        if (category === 'Sleep') {
            markdown += formatSleepTimeMarkdown(row);
        }
        if (category === 'Sleep quality') {
            markdown += formatSleepQualityMarkdown(row);
        }
    });
    
    return markdown;
}

function formatSleepTimeMarkdown(row: Row): string {
    const detail = row.detail.replace(/"/g, '');
    const [asleepTime, inBedTime] = detail.split('. In bed ');
    return `Sleep Time:: ${row.ratingAmount.replace(/"/g, '')} \nAsleep:: ${asleepTime.replace('Asleep', '')} \nIn Bed:: ${inBedTime} \n`;
}

function formatSleepQualityMarkdown(row: Row): string {
    return `Sleep Rating:: ${row.ratingAmount.replace(/"/g, '')} \n`;
    }
