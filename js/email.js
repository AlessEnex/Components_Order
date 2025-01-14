export const openOutlookWithEmail = () => {
    const rows = Array.from(document.querySelectorAll("#table-body tr"));
    let emailBody = "Dati compressori:\n\n";
    emailBody += "Fornitore\tQuantità\tCodice\tDescrizione\n";

    const csvData = [["Fornitore", "Quantità", "Codice", "Descrizione"]];
    rows.forEach((row) => {
        const supplier = row.querySelector("select").value;
        const qty = row.querySelector("input[type='number']").value;
        const code = row.querySelector("input[type='text']").value.trim();
        const desc = row.querySelector("span").textContent;

        if (qty > 0) {
            csvData.push([supplier, qty, code, desc]);
            emailBody += `${supplier}\t${qty}\t${code}\t${desc}\n`;
        }
    });

    // Genera e scarica il CSV
    const csvContent = csvData.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "compressori.csv";
    a.click();

    // Apri il client email
    const mailtoLink = `mailto:?subject=Dati Compressori&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
};
