export const openOutlookWithEmail = (subject) => {
    const rows = Array.from(document.querySelectorAll("#table-body tr"));
    let emailBody = `
        <h2>Dati compressori</h2>
        <table border="1" style="border-collapse: collapse; width: 100%;">
            <thead>
                <tr>
                    <th style="padding: 5px; text-align: left;">Fornitore</th>
                    <th style="padding: 5px; text-align: left;">Quantità</th>
                    <th style="padding: 5px; text-align: left;">Codice</th>
                    <th style="padding: 5px; text-align: left;">Descrizione</th>
                </tr>
            </thead>
            <tbody>
    `;

    rows.forEach((row) => {
        const supplier = row.querySelector("select").value;
        const qty = row.querySelector("input[type='number']").value;
        const code = row.querySelector("input[type='text']").value.trim();
        const desc = row.querySelector("span").textContent;

        if (qty > 0) {
            emailBody += `
                <tr>
                    <td style="padding: 5px;">${supplier}</td>
                    <td style="padding: 5px;">${qty}</td>
                    <td style="padding: 5px;">${code}</td>
                    <td style="padding: 5px;">${desc}</td>
                </tr>
            `;
        }
    });

    emailBody += `
            </tbody>
        </table>
    `;

    // Converti il corpo dell'email in formato URI compatibile
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Apri il client email
    window.location.href = mailtoLink;
};
