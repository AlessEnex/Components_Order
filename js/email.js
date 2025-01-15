export const openOutlookWithEmail = (subject) => {
    const rows = Array.from(document.querySelectorAll("#table-body tr"));
    let emailBody = "Dati compressori:\n\n";
    emailBody += "Fornitore       | Quantità | Codice     | Descrizione\n";
    emailBody += "-----------------------------------------------------\n";

    rows.forEach((row) => {
        const supplier = row.querySelector("select").value.padEnd(15, " ");
        const qty = row.querySelector("input[type='number']").value.padStart(8, " ");
        const code = row.querySelector("input[placeholder='Codice']").value.trim().padEnd(10, " ");
        const desc = row.querySelector("input[placeholder='Descrizione']").value;

        if (qty > 0) {
            emailBody += `${supplier} | ${qty} | ${code} | ${desc}\n`;
        }
    });

    // Costruisci il link mailto
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Debug del link mailto
    console.log("Link mailto generato:", mailtoLink);

    // Apri il client email
    window.location.href = mailtoLink;
};
