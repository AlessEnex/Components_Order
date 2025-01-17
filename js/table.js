// Funzione per creare una nuova riga
export const createRow = (data, suppliers) => {
    console.log("Creazione di una nuova riga...");
    const tableBody = document.getElementById("table-body");
    const row = document.createElement("tr");

    // Fornitore
    const supplierCell = document.createElement("td");
    const supplierSelect = document.createElement("select");
    suppliers.forEach((supplier) => {
        const option = document.createElement("option");
        option.value = supplier;
        option.textContent = supplier;
        supplierSelect.appendChild(option);
    });
    supplierCell.appendChild(supplierSelect);
    row.appendChild(supplierCell);

    // Quantità
    const qtyCell = document.createElement("td");
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.placeholder = "Quantità";
    qtyInput.addEventListener("input", () => {
        console.log("Evento input su quantità rilevato");
        handleQuantityInput(row, data, suppliers);
    }); // Evento di input per aggiungere una riga
    qtyCell.appendChild(qtyInput);
    row.appendChild(qtyCell);

    // Codice
    const codeCell = document.createElement("td");
    const codeInput = document.createElement("input");
    codeInput.type = "text";
    codeInput.placeholder = "Codice";
    codeInput.addEventListener("input", () => updateDescription(row, data));
    codeCell.appendChild(codeInput);
    row.appendChild(codeCell);

    // Descrizione
    const descCell = document.createElement("td");
    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.placeholder = "Descrizione";
    descInput.className = "description-input"; // Classe specifica
    descInput.addEventListener("input", () => filterSuggestions(descInput, data, codeInput));
    descCell.appendChild(descInput);

    const suggestionBox = document.createElement("ul");
    suggestionBox.className = "suggestion-box";
    descCell.appendChild(suggestionBox);

    row.appendChild(descCell);

    tableBody.appendChild(row);
    console.log("Riga aggiunta:", row);
};

// Funzione per aggiungere una nuova riga se la quantità > 0
const handleQuantityInput = (row, data, suppliers) => {
    const qtyInput = row.querySelector("input[type='number']").value;
    const tableBody = document.getElementById("table-body");
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    console.log(`Quantità inserita: ${qtyInput}, Indice riga: ${rows.indexOf(row)}, Ultima riga: ${rows.length - 1}`);

    // Controlla se è l'ultima riga e se la quantità è > 0
    if (qtyInput > 0 && rows.indexOf(row) === rows.length - 1) {
        console.log("Aggiungo una nuova riga...");
        createRow(data, suppliers);
    } else {
        console.log("Non aggiungo una nuova riga");
    }
};

// Aggiorna la descrizione in base al codice inserito
export const updateDescription = (row, data) => {
    const codeInput = row.querySelector("input[type='text']").value.trim();
    const descInput = row.querySelector(".description-input");

    if (!descInput) {
        console.error("Elemento descInput non trovato");
        return;
    }

    if (data[codeInput]) {
        descInput.value = data[codeInput];
    } else {
        descInput.value = "Codice non valido";
    }
};

// Filtra suggerimenti basati sull'input della descrizione
const filterSuggestions = (input, data, codeInput) => {
    const query = input.value.toLowerCase();
    const suggestionBox = input.nextElementSibling;

    // Svuota i suggerimenti precedenti
    suggestionBox.innerHTML = "";

    // Mostra le corrispondenze
    Object.entries(data).forEach(([code, description]) => {
        if (description.toLowerCase().includes(query)) {
            const suggestionItem = document.createElement("li");
            suggestionItem.textContent = description;
            suggestionItem.addEventListener("click", () => {
                input.value = description;
                codeInput.value = code;
                suggestionBox.innerHTML = "";
            });
            suggestionBox.appendChild(suggestionItem);
        }
    });
};
