// File JSON URLs
const JSON_URL = "../data.json"; // Per i codici e descrizioni
const SUPPLIERS_URL = "../suppliers.json"; // Per i fornitori

// Funzione per caricare dati da un file JSON
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Errore nel caricamento del file JSON: ${url}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        alert("Impossibile caricare i dati.");
        return [];
    }
};

// Funzione per creare una nuova riga nella tabella
const createRow = (data, suppliers) => {
    const tableBody = document.getElementById("table-body");

    const row = document.createElement("tr");

    // Cella per Fornitore
    const supplierCell = document.createElement("td");
    const supplierSelect = document.createElement("select");
    supplierSelect.classList.add("fornitore");

    // Aggiungi le opzioni al menu a tendina
    suppliers.forEach((supplier) => {
        const option = document.createElement("option");
        option.value = supplier;
        option.textContent = supplier;
        supplierSelect.appendChild(option);
    });
    supplierCell.appendChild(supplierSelect);
    row.appendChild(supplierCell);

    // Cella per Quantità
    const qtyCell = document.createElement("td");
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.placeholder = "Quantità";
    qtyInput.classList.add("quantita");
    qtyInput.addEventListener("input", () => handleQuantityInput(row, data, suppliers));
    qtyCell.appendChild(qtyInput);
    row.appendChild(qtyCell);

    // Cella per Codice
    const codeCell = document.createElement("td");
    const codeInput = document.createElement("input");
    codeInput.type = "text";
    codeInput.placeholder = "Codice";
    codeInput.classList.add("codice");
    codeInput.addEventListener("input", () => updateDescription(row, data));
    codeCell.appendChild(codeInput);
    row.appendChild(codeCell);

    // Cella per Descrizione
    const descCell = document.createElement("td");
    const descSpan = document.createElement("span");
    descSpan.classList.add("descrizione");
    descSpan.textContent = "Inserisci un codice";
    descCell.appendChild(descSpan);
    row.appendChild(descCell);

    tableBody.appendChild(row);
};

// Funzione per aggiornare la descrizione basata sul codice
const updateDescription = (row, data) => {
    const codeInput = row.querySelector(".codice").value.trim();
    const descSpan = row.querySelector(".descrizione");

    if (data[codeInput]) {
        descSpan.textContent = data[codeInput];
        descSpan.style.color = "black"; // Colore normale per i codici validi
    } else {
        descSpan.textContent = "Codice non valido";
        descSpan.style.color = "red"; // Colore rosso per i codici non validi
    }
};

// Funzione per gestire l'input nella colonna Quantità
const handleQuantityInput = (row, data, suppliers) => {
    const qtyInput = row.querySelector(".quantita");
    const qtyValue = parseInt(qtyInput.value, 10);

    // Se la quantità è maggiore di 0 e non ci sono altre righe vuote, aggiungi una nuova riga
    if (qtyValue > 0) {
        const tableBody = document.getElementById("table-body");
        const rows = Array.from(tableBody.querySelectorAll("tr"));
        const isLastRow = rows.indexOf(row) === rows.length - 1;

        if (isLastRow) {
            createRow(data, suppliers);
        }
    }
};

// Funzione per esportare i dati in CSV
const exportToCSV = () => {
    const rows = Array.from(document.querySelectorAll("#table-body tr"));
    const csvData = [["Fornitore", "Quantità", "Codice", "Descrizione"]];
    rows.forEach((row) => {
        const supplier = row.querySelector(".fornitore").value;
        const qty = row.querySelector(".quantita").value;
        const code = row.querySelector(".codice").value.trim();
        const desc = row.querySelector(".descrizione").textContent;

        if (qty > 0) {
            csvData.push([supplier, qty, code, desc]);
        }
    });

    const csvContent = csvData.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "compressori.csv";
    a.click();
};

// Inizializzazione al caricamento della pagina
document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchData(JSON_URL); // Codici e descrizioni
    const suppliers = await fetchData(SUPPLIERS_URL); // Fornitori
    createRow(data, suppliers); // Crea la prima riga

    document.getElementById("generaCSV").addEventListener("click", exportToCSV);
});
