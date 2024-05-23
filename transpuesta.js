const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const directoryPath = '.';
const averages = {};

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('No se pudo leer el directorio: ' + err);
    }

    files = files.filter(file => file.startsWith('MM_transpuesta') && file.endsWith('.dat'));

    files.sort((a, b) => {
        const matrixSizeA = parseInt(a.split('-')[1]);
        const threadA = parseInt(a.split('-')[3].split('.')[0]);
        const matrixSizeB = parseInt(b.split('-')[1]);
        const threadB = parseInt(b.split('-')[3].split('.')[0]);

        if (matrixSizeA !== matrixSizeB) {
            return matrixSizeA - matrixSizeB;
        } else {
            return threadA - threadB;
        }
    });

    function processFile(index) {
        if (index >= files.length) {
            return;
        }

        const file = files[index];
        const matrixSize = file.split('-')[1];

        fs.readFile(path.join(directoryPath, file), 'utf8', function (err, data) {
            if (err) {
                return console.log('No se pudo leer el archivo: ' + err);
            }

            const lines = data.split('\n');
            let sum = 0;
            let count = 0;

            for (let line of lines) {
                const match = line.match(/:->\s+(\d+)/);
                if (match) {
                    sum += parseInt(match[1], 10);
                    count++;
                }
            }

            if (count > 0) {
                const average = sum / (count*1000000);
                if (!averages[matrixSize]) {
                    averages[matrixSize] = [];
                }
                averages[matrixSize].push(average);
            }

            processFile(index + 1);
        });
    }

    processFile(0);


    // Espera un poco para asegurarte de que todos los archivos se han leído antes de escribir en el archivo de Excel
    setTimeout(function() {
        const workbook = XLSX.utils.book_new();
        for (let size in averages) {
            const worksheet = XLSX.utils.json_to_sheet(averages[size].map((avg) => ({Average: avg})));
            XLSX.utils.book_append_sheet(workbook, worksheet, `Size ${size}`);
        }
        XLSX.writeFile(workbook, 'averagesTranspuesta.xlsx');
    }, 5000);
});