document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the product title from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const namaProduk = urlParams.get('product');
    const hargaProduk = urlParams.get('price')

    // Display the selected product title on the page
    const productTitleElement = document.getElementById('pilihJudulProduk');
    productTitleElement.value = namaProduk;

    const productPriceElement = document.getElementById('labelHarga')
    productPriceElement.value = hargaProduk
});

document.addEventListener("DOMContentLoaded", function() {
    const hargaProdukElement = document.getElementById('labelHarga');
    const bungaRataRataElement = document.getElementById('bungaRataRata');
    const uangMukaElement = document.getElementById('uangMuka');
    const lamaCicilanElement = document.getElementById('lamaCicilan');
    const submitBtn = document.getElementById('tombolSubmit');
    const hasilPerhitunganDiv = document.getElementById('hasilPerhitungan');
    const namaPembeliElement = document.getElementById('namaPembeliInput');
    const namaProdukElement = document.getElementById('pilihJudulProduk');
    const noHpElement = document.getElementById('noHP');

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();

        // hasil dari input terus proses => 
        const hargaProduk = parseInt(hargaProdukElement.value);
        const bungaRataRata = parseFloat(bungaRataRataElement.value);
        const uangMuka = parseInt(uangMukaElement.value);
        const lamaCicilan = parseInt(lamaCicilanElement.value);
        const namaPembeli = namaPembeliElement.value;
        const namaProdukHp = namaProdukElement.value;
        const noHpPembeli = noHpElement.value;

        // melakukan perhitungan
        const loanAmount = hargaProduk - uangMuka;

        // Perhitungan rata rata bunga pe bulan
        const bungaPerBulan = (bungaRataRata / 100) / 12;

        // Perhitungan Cicilan
        const cicilanPerBulan = loanAmount * (bungaPerBulan / (1 - Math.pow(1 + bungaPerBulan, - lamaCicilan)));

        // Calculate installment details
        const detailCicilan = [];
        let remainingLoanAmount = loanAmount;

        for (let i = 1; i <= lamaCicilan; i++) {
            const interest = remainingLoanAmount * bungaPerBulan;
            const principal = cicilanPerBulan - interest;
            const totalPayment = cicilanPerBulan;
            remainingLoanAmount -= principal;

            detailCicilan.push({
                installmentNumber: i,
                principal,
                interest,
                totalPayment,
                remainingLoanAmount
            });
        }

        // Display the results in the table
        const informasiPembeli = document.getElementById('namaPembeli');
        informasiPembeli.innerHTML = namaPembeli
        const informasiNoHp = document.getElementById('noHpPembeli');
        informasiNoHp.innerHTML = noHpPembeli
        const informasiProduk = document.getElementById('produkPembeli');
        informasiProduk.innerHTML = namaProdukHp

        const installmentTableBody = document.getElementById('installmentTableBody');
        installmentTableBody.innerHTML = '';

        detailCicilan.forEach((installment) => {
            const row = document.createElement('tr');

            const installmentNumberCell = document.createElement('td');
            installmentNumberCell.textContent = installment.installmentNumber;
            row.appendChild(installmentNumberCell);

            const principalCell = document.createElement('td');
            principalCell.textContent = `Rp. ${installment.principal.toLocaleString()}`;
            row.appendChild(principalCell);

            const interestCell = document.createElement('td');
            interestCell.textContent = `Rp. ${installment.interest.toLocaleString()}`;
            row.appendChild(interestCell);

            const totalPaymentCell = document.createElement('td');
            totalPaymentCell.textContent = `Rp. ${installment.totalPayment.toLocaleString()}`;
            row.appendChild(totalPaymentCell);

            const remainingLoanAmountCell = document.createElement('td');
            remainingLoanAmountCell.textContent = `Rp. ${installment.remainingLoanAmount.toLocaleString()}`;
            row.appendChild(remainingLoanAmountCell);

            installmentTableBody.appendChild(row);
        });

        // Show the results
        hasilPerhitunganDiv.classList.remove('d-none');
    });
});