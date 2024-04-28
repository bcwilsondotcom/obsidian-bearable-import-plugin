interface Row {
    dateFormatted: string;
    timeOfDay: string;
    category: string;
    detail: string;
    ratingAmount: string;
    notes: string;
}

export function importBmData(rows: Row[]): string {
    let markdown = "";
    
    markdown += "### Bowel Movements\n";
    //const averageBmRating = calculateAverageBmRating(rows);
    //markdown += `Bm Average:: ${averageBmRating.toFixed(1)}\n\n`;

    rows.forEach(row => {
        const category = row.category.replace(/"/g, '').trim();
        if (category === 'Bowel Movements') {
            markdown += formatBmMarkdown(row);
        }
    });
    
    return markdown;
}

function formatBmMarkdown(row: Row): string {
    return `BM Rating:: {Time:"${row.timeOfDay.replace(/"/g, '')}", Rating:"${row.ratingAmount.replace(/"/g, '')}", Description:"${row.detail.replace(/"/g, '').replace(/\|/g, ',')}" \n`;
   }

// function calculateAverageBmRating(rows: Row[]): number {
//     let totalRating = 0;
//     let count = 0;
//     rows.forEach(row => {
//         const category = row.category.replace(/"/g, '').trim();
//         if (category === "Bm") {
//             const ratingAmount = row.ratingAmount.replace(/"/g, '').trim(); // Remove quotes
//             // console.log('Rating amount:', ratingAmount); // Log the rating amount
//             const rating = parseInt(ratingAmount);
//             // console.log('Parsed rating:', rating); // Log the parsed rating
//             if (!isNaN(rating)) {
//                 totalRating += rating;
//                 count++;
//             }
//         }
//     });
//     // console.log('Total rating:', totalRating); // Log the total rating
//     // console.log('Count:', count); // Log the count
//     if (count === 0) {
//         return 0;
//     }
//     return totalRating / count; // Calculate the average by dividing the total rating by the count
// }
