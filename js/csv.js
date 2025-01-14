export const exportToCSV = () => {
    const rows = Array.from(document.querySelectorAll("#table-body tr"));
    const csvData = [];

    // Intestazione personalizzata
    csvData.push(',"N°,DESCRIZIONE,CODICE,<FONT style=B>Q.tà",,');

    // Raccolta dati dalla tabella
    rows.forEach((row, index) => {
        const qty = row.querySelector("input[type='number']").value;
        const code = row.querySelector("input[type='text']").value.trim();
        const desc = row.querySelector("span").textContent;

        if (qty > 0) {
            // Formattazione delle righe secondo il formato richiesto
            const formattedDesc = `"${desc.replace(/"/g, '""')}"`; // Escape delle virgolette doppie
            csvData.push(`${index + 1},${formattedDesc},${code},${qty}`);
        }
    });

    // Generazione del file CSV
    const csvContent = csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "custom_compressori.csv";
    a.click();

    console.log("Funzione exportToCSV chiamata!");
    
};
