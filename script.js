const wrapper = document.querySelector('.wrapper'),
generateBtn = wrapper.querySelector('.form button')
qrInput = wrapper.querySelector('.form input');
qrImg = wrapper.querySelector('.qr-code img'),
scanQrCodeBtn = wrapper.querySelector('.scan-btn'),
btnLink = scanQrCodeBtn.querySelector('a');
// butona basıldığına qr kod oluşturuyor
generateBtn.addEventListener('click', () => {
    let qrValue = qrInput.value;
    if(!qrValue) return;
    generateBtn.innerText = "Generating QR Code..."
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`
    qrImg.addEventListener('load', () => {
        wrapper.classList.add('active');
        generateBtn.innerText = "Generate QR Code";
    });
})
// inputa her veri girildiğinde qr oluşturuyor
qrInput.addEventListener('keypress', () => {
    let qrValue = qrInput.value;
    if(!qrValue) return;
    generateBtn.innerText = "Generating QR Code..."
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`
    qrImg.addEventListener('load', () => {
        wrapper.classList.add('active');
        generateBtn.innerText = "Generate QR Code";
    });
})
// inputta veri kalmadığında formu küçültüyor && qr'ı gizliyor
qrInput.addEventListener('keyup', () => {
    if(!qrInput.value) {
        wrapper.classList.remove("active");
    }
})
scanQrCodeBtn.addEventListener('click', () => btnLink.click());