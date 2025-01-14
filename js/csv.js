export const exportToCustomCSV = () => {
    const rows = Array.from(document.querySelectorAll("#table-body tr"));
    const csvData = [];

    // Riga di intestazione personalizzata
    csvData.push(',"N°,DESCRIZIONE,CODICE,<FONT style=B>Q.tà",,');

    // Raccolta dati dalla tabella
    rows.forEach((row, index) => {
        const supplier = row.querySelector("select").value;
        const qty = row.querySelector("input[type='number']").value;
        const code = row.querySelector("input[type='text']").value.trim();
        const desc = row.querySelector("span").textContent;

        if (qty > 0) {
            // Formatta i valori e gestisci le virgolette doppie
            const formattedDesc = `"${desc.replace(/"/g, '""')}"`;
            csvData.push(`${index + 1},${formattedDesc},${code},${qty}`);
        }
    });

    // Generazione del file CSV
    const csvContent = csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "custom_compressori.csv";
    a.click();
};
