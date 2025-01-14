// Load descriptions from the JSON file
fetch('descriptions.json')
    .then(response => response.json())
    .then(descriptions => {
        const tableBody = document.getElementById('compressors-table-body');

        // Generate 10 rows dynamically
        for (let i = 0; i < 10; i++) {
            const row = document.createElement('tr');

            // Quantity cell
            const quantityCell = document.createElement('td');
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.min = '0';
            quantityInput.value = '0';
            quantityCell.appendChild(quantityInput);
            row.appendChild(quantityCell);

            // Code cell
            const codeCell = document.createElement('td');
            const codeInput = document.createElement('input');
            codeInput.type = 'text';
            codeInput.placeholder = 'Enter code';
            codeCell.appendChild(codeInput);
            row.appendChild(codeCell);

            // Description cell
            const descriptionCell = document.createElement('td');
            descriptionCell.className = 'description-cell';
            descriptionCell.textContent = '';
            row.appendChild(descriptionCell);

            // Add event listener to update description on code change
            codeInput.addEventListener('input', () => {
                const code = codeInput.value;
                descriptionCell.textContent = descriptions[code] || 'Invalid code';
            });

            tableBody.appendChild(row);
        }

        // Export to CSV functionality
        document.getElementById('export-btn').addEventListener('click', () => {
            const rows = Array.from(tableBody.querySelectorAll('tr'));
            const csvData = [
                ['Quantity', 'Code', 'Description'] // Header row
            ];

            rows.forEach(row => {
                const quantity = row.cells[0].querySelector('input').value;
                const code = row.cells[1].querySelector('input').value;
                const description = row.cells[2].textContent;

                if (quantity > 0) {
                    csvData.push([quantity, code, description]);
                }
            });

            // Convert to CSV format
            const csvContent = csvData.map(e => e.join(",")).join("\n");

            // Download the CSV file
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'results.csv';
            link.click();
        });
    })
    .catch(error => console.error('Error loading descriptions:', error));
