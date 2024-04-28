interface Row {
    dateFormatted: string;
    timeOfDay: string;
    category: string;
    detail: string;
    ratingAmount: string;
    notes: string;
}

export function importEnergyData(rows: Row[]): string {
    let markdown = "";
    
    markdown += "### Energy\n";
    const averageEnergyRating = calculateAverageEnergyRating(rows);
    markdown += `Energy Average:: ${averageEnergyRating.toFixed(1)}\n\n`;

    rows.forEach(row => {
        const category = row.category.replace(/"/g, '').trim();
        if (category === 'Energy') {
            markdown += formatEnergyMarkdown(row);
        }
    });
    
    return markdown;
}

function formatEnergyMarkdown(row: Row): string {
    return `Energy Rating:: {Time:"${row.timeOfDay.replace(/"/g, '')}", Rating:"${row.ratingAmount.replace(/"/g, '')}", Description:"${row.detail.replace(/"/g, '').replace(/\|/g, ',')}"}\n`;
    //return `Time:${row.timeOfDay.replace(/"/g, '')}: ${row.ratingAmount.replace(/"/g, '')} ${row.detail.replace(/"/g, '')} - **Rating:** ${row.ratingAmount.replace(/"/g, '')} - **Notes:** ${row.notes.replace(/"/g, '')}\n`;
}

function calculateAverageEnergyRating(rows: Row[]): number {
    let totalRating = 0;
    let count = 0;
    rows.forEach(row => {
        const category = row.category.replace(/"/g, '').trim();
        if (category === "Energy") {
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