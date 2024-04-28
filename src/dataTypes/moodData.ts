interface Row {
    dateFormatted: string;
    timeOfDay: string;
    category: string;
    detail: string;
    ratingAmount: string;
    notes: string;
}

export function importMoodData(rows: Row[]): string {
    let markdown = "";
    
    markdown += "### Mood\n";
    const averageMoodRating = calculateAverageMoodRating(rows);
    markdown += `Mood Average:: ${averageMoodRating.toFixed(1)}\n\n`;

    rows.forEach(row => {
        const category = row.category.replace(/"/g, '').trim();
        if (category === 'Mood') {
            markdown += formatMoodMarkdown(row);
        }
    });
    
    return markdown;
}

function formatMoodMarkdown(row: Row): string {
    return `Mood Rating:: {Time:"${row.timeOfDay.replace(/"/g, '')}", Rating:"${row.ratingAmount.replace(/"/g, '')}", Description:"${row.detail.replace(/"/g, '').replace(/\|/g, ',')}"}\n`;
    //return `Time:${row.timeOfDay.replace(/"/g, '')}: ${row.ratingAmount.replace(/"/g, '')} ${row.detail.replace(/"/g, '')} - **Rating:** ${row.ratingAmount.replace(/"/g, '')} - **Notes:** ${row.notes.replace(/"/g, '')}\n`;
}

function calculateAverageMoodRating(rows: Row[]): number {
    let totalRating = 0;
    let count = 0;
    rows.forEach(row => {
        const category = row.category.replace(/"/g, '').trim();
        if (category === "Mood") {
            const ratingAmount = row.ratingAmount.replace(/"/g, '').trim(); // Remove quotes
            // console.log('Rating amount:', ratingAmount); // Log the rating amount
            const rating = parseInt(ratingAmount);
            // console.log('Parsed rating:', rating); // Log the parsed rating
            if (!isNaN(rating)) {
                totalRating += rating;
                count++;
            }
        }
    });
    // console.log('Total rating:', totalRating); // Log the total rating
    // console.log('Count:', count); // Log the count
    if (count === 0) {
        return 0;
    }
    return totalRating / count; // Calculate the average by dividing the total rating by the count
}