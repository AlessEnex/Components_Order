// Load JSON data
const fetchData = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
};

// Populate table
const populateTable = (data) => {
    const tableBody = document.getElementById("table-body");
    for (let i = 0; i < 10; i++) {
        const row = document.createElement("tr");

        // Quantità cell
        const qtyCell = document.createElement("td");
        const qtyInput = document.createElement("input");
        qtyInput.type = "number";
        qtyInput.classList.add("quantita");
        qtyCell.appendChild(qtyInput);
        row.appendChild(qtyCell);

        // Codice cell
        const codeCell = document.createElement("td");
        const codeInput = document.createElement("input");
        codeInput.type = "text";
        codeInput.classList.add("codice");
        codeInput.addEventListener("input", () => updateDescription(row, data));
        codeCell.appendChild(codeInput);
        row.appendChild(codeCell);

        // Descrizione cell
        const descCell = document.createElement("td");
        const descSpan = document.createElement("span");
        descSpan.classList.add("descrizione");
        descCell.appendChild(descSpan);
        row.appendChild(descCell);

        tableBody.appendChild(row);
    }
};

// Update description
const updateDescription = (row, data) => {
    const codeInput = row.querySelector(".codice").value.trim();
    const descSpan = row.querySelector(".descrizione");
    descSpan.textContent = data[codeInput] || "Codice non valido";
};

// Export to CSV
const exportToCSV = () => {
    const rows = Array.from(document.querySelectorAll("#table-body tr"));
    const csvData = [["Quantità", "Codice", "Descrizione"]];
    rows.forEach((row) => {
        const qty = row.querySelector(".quantita").value;
        const code = row.querySelector(".codice").value.trim();
        const desc = row.querySelector(".descrizione").textContent;

        if (qty > 0) {
            csvData.push([qty, code, desc]);
        }
    });

    const csvContent = csvData.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "compressori.csv";
    a.click();
};

document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchData();
    populateTable(data);

    document.getElementById("generaCSV").addEventListener("click", exportToCSV);
});
