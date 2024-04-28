interface Row {
    dateFormatted: string;
    timeOfDay: string;
    category: string;
    detail: string;
    ratingAmount: string;
    notes: string;
}

export function importSymptomData(rows: Row[]): string {
    let markdown = "";
    
    markdown += "### Symptoms\n";
    const totalRating = calculateTotalSymptomRating(rows);
    markdown += `Symptoms Rating:: ${totalRating}\n\n`;

    rows.forEach(row => {
        const category = row.category.replace(/"/g, '').trim();
        if (category === 'Symptom') {
            markdown += formatSymptomMarkdown(row);
        }
    });
    
    return markdown;
}

function formatSymptomMarkdown(row: Row): string {
    return `Symptom:: {Time:"${row.timeOfDay.replace(/"/g, '')}", Type:"${row.detail.replace(/"/g, '')}", Rating:"${row.ratingAmount.replace(/"/g, '').replace(/\|/g, ',')}"}\n`;
   }

function calculateTotalSymptomRating(rows: Row[]): number {
    let totalRating = 0;
    rows.forEach(row => {
        const category = row.category.replace(/"/g, '').trim();
        if (category === "Symptom") {
            const ratingAmount = row.ratingAmount.replace(/"/g, '').trim(); // Remove quotes
            const rating = parseInt(ratingAmount);
            if (!isNaN(rating)) {
                totalRating += rating;
            }
        }
    });
    return totalRating;
}