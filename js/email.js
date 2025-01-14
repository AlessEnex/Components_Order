export const openOutlookWithEmail = () => {
    const rows = Array.from(document.querySelectorAll("#table-body tr"));
    let emailBody = "Dati compressori:\n\n";
    emailBody += "Fornitore\tQuantità\tCodice\tDescrizione\n";

    rows.forEach((row) => {
        const supplier = row.querySelector("select").value;
        const qty = row.querySelector("input[type='number']").value;
        const code = row.querySelector("input[type='text']").value.trim();
        const desc = row.querySelector("span").textContent;

        if (qty > 0) {
            emailBody += `${supplier}\t${qty}\t${code}\t${desc}\n`;
        }
    });

    const mailtoLink = `mailto:?subject=Dati Compressori&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
};