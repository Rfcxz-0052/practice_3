document.querySelector('.submitButton').addEventListener('click', function () {
    const style = document.querySelector('input[name="style"]:checked');
    const color = document.querySelector('input[name="color"]:checked');
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value);

    if (!style || !color || !quantity || quantity <= 0) {
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

    let found = false;
    for (let row of tableBody.rows) {
        const styleText = row.cells[0].textContent;
        const colorText = row.cells[1].textContent;

        if (styleText === styleTextMap[style.value] && colorText === colorTextMap[color.value]) {
            let oldQty = parseInt(row.cells[2].textContent);
            row.cells[2].textContent = oldQty + quantity;
            found = true;
            break;
        }
    }

    if (!found) {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = styleTextMap[style.value];
        newRow.insertCell(1).textContent = colorTextMap[color.value];
        newRow.insertCell(2).textContent = quantity;
    }

    // 清除輸入
    document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    quantityInput.value = 1;
});
