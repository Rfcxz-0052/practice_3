document.querySelector('.submitButton').addEventListener('click', function () {
    const style = document.querySelector('input[name="style"]:checked');
    const color = document.querySelector('input[name="color"]:checked');
    const size = document.querySelector('input[name="size"]:checked');
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value);

    if (!style || !color || !size || !quantity || quantity <= 0) {
        alert('請選擇衣服樣式、顏色並輸入正確數量');
        return;
    }

    const tableBody = document.getElementById('clothingTable').querySelector('tbody');

    const styleTextMap = {
        hoodie: '帽T',
        tshirt: '短T'
    };
    const colorTextMap = {
        white: '白色',
        black: '黑色',
        blue: '藍色',
        beige: '米色',
        gray: '灰色',
        green: '綠色'
    };

    const sizeTextMap = {
        S: 'S號',
        M: 'M號',
        L: 'L號',
        XL: 'XL號',
        '2XL': '2XL號',
    }

    let found = false;
    for (let row of tableBody.rows) {
        const styleText = row.cells[0].textContent;
        const colorText = row.cells[1].textContent;
        const sizeText = row.cells[2].textContent;

        if (styleText === styleTextMap[style.value] && colorText === colorTextMap[color.value] && sizeText === sizeTextMap[size.value]) {
            let oldQty = parseInt(row.cells[3].textContent);
            row.cells[3].textContent = oldQty + quantity;
            found = true;
            break;
        }
    }

    if (!found) {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = styleTextMap[style.value];
        newRow.insertCell(1).textContent = colorTextMap[color.value];
        newRow.insertCell(2).textContent = sizeTextMap[size.value];
        newRow.insertCell(3).textContent = quantity;
    }

    // 清除輸入
    document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    quantityInput.value = 1;
});
