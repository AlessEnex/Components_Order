import { createRow } from "./table.js";
import { exportToCSV } from "./csv.js";
import { openOutlookWithEmail } from "./email.js";

const JSON_URL = "data.json";
const SUPPLIERS_URL = "suppliers.json";

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Errore nel caricamento del file: ${url}`);
    }
    return await response.json();
};


// Funzione per generare l'oggetto della mail dinamicamente
const getMailSubject = () => {
    const anno = document.getElementById("anno").value.trim();
    const numeroCommessa = document.getElementById("numero-commessa").value.trim();
    const nomeCommessa = document.getElementById("nome-commessa").value.trim();

    return `Dati Commessa - Anno ${anno}, Commessa ${numeroCommessa}: ${nomeCommessa}`;
};

// Aggiungi un evento al pulsante "Invia Email"
document.getElementById("generaEmail").addEventListener("click", () => {
    const subject = getMailSubject();
    openOutlookWithEmail(subject);
});


// Pulsante per generare CSV
document.getElementById("generaCSV").addEventListener("click", exportToCSV);



document.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await fetchData(JSON_URL);
        const suppliers = await fetchData(SUPPLIERS_URL);

        // Crea la prima riga vuota
        createRow(data, suppliers);

        // Eventi per i pulsanti
        document.getElementById("generaCSV").addEventListener("click", exportToCSV);
        document.getElementById("generaEmail").addEventListener("click", openOutlookWithEmail);
    } catch (error) {
        console.error(error);
        alert("Errore nel caricamento dei dati.");
    }
});
