const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const qtyInput = document.getElementById('quantity');
const barcodeInput = document.getElementById('barcode');

const addButton = document.getElementById('add');
const table = document.getElementById('sale-table');
const tableBody = document.getElementById('table-body');
const totalPriceElement = document.getElementById('total');

let items = [];
let totalPrice = 0;

let formatter = Intl.NumberFormat('en-US', {
    currency: 'USD',
    minimumFractionDigits: 2,
});

const validate = () => {
    return barcodeInput.value != '' && nameInput.value != '' && priceInput.value != '' && qtyInput.value != '';
};

addButton.addEventListener('click', () => {
    if (validate()) {
        let name = nameInput.value.trim();
        let price = Number(priceInput.value.trim()) || 0;
        let qty = Number(qtyInput.value.trim()) || 0;
        let barcode = barcodeInput.value.trim();
        let total = qty * price;

        totalPrice += total;

        items.push({
            barcode,
            name,
            qty,
            price,
            total,
        });

        qtyInput.value = '';
        nameInput.value = '';
        priceInput.value = '';
        barcodeInput.value = '';
        updateTable();
    } else {
        alert('invalid data');
    }
});

const add = (index) => {
    console.log(index);
    items[index].qty = items[index].qty + 1;
    items[index].total = items[index].total + items[index].price;
    totalPrice = totalPrice + items[index].price;
    updateTable();
};

const sub = (index) => {
    console.log(index);
    if (items[index].qty == 1) return;
    items[index].qty = items[index].qty - 1;
    items[index].total = items[index].total - items[index].price;
    totalPrice = totalPrice - items[index].price;
    updateTable();
};

const updateTable = () => {
    tableBody.innerHTML = '';
    for (let item of items) {
        let barcodeElement = document.createElement('td'),
            nameElement = document.createElement('td'),
            qtyElement = document.createElement('td'),
            priceElement = document.createElement('td'),
            totalElement = document.createElement('td'),
            qtyInput2 = document.createElement('input');
        qtyInput2.style.width = '50px';
        qtyInput2.style.margin = '0 8px';
        qtyAddBtn = document.createElement('button');
        qtySubBtn = document.createElement('button');

        qtyAddBtn.classList.add('add-qty-button');
        qtySubBtn.classList.add('add-qty-button');

        qtyAddBtn.innerText = '+';
        qtySubBtn.innerText = '-';

        let length = items.length ? items.length - 1 : 0;

        qtyAddBtn.addEventListener('click', () => add(length));
        qtySubBtn.addEventListener('click', () => sub(length));

        qtyInput2.type = 'number';
        qtyInput2.value = item.qty;

        barcodeElement.innerText = item.barcode;
        nameElement.innerText = item.name;
        priceElement.innerText = item.price;
        totalElement.innerText = item.total;
        qtyElement.append(qtySubBtn);
        qtyElement.append(qtyInput2);
        qtyElement.append(qtyAddBtn);

        let rowElement = document.createElement('tr');
        rowElement.append(barcodeElement);
        rowElement.append(nameElement);
        rowElement.append(qtyElement);
        rowElement.append(priceElement);
        rowElement.append(totalElement);

        tableBody.append(rowElement);
    }

    totalPriceElement.innerHTML = `$${formatter.format(totalPrice)}`;
};
