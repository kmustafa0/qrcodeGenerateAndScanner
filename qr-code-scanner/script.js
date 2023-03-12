const wrapper = document.querySelector('.wrapper'),
form = wrapper.querySelector('form'),
fileInp = form.querySelector('input'),
infoText = form.querySelector('p'),
copyBtn = wrapper.querySelector('.copy'),
closeBtn = wrapper.querySelector('.close'),
buttonLink = wrapper.querySelector('.button-link');
buttonLinkA = buttonLink.querySelector('a');

function fetchRequest(formData, file) {
    infoText.innerText = "Scanning QR Code..."
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerHTML = result ? "Upload QR Code to Scan" : "Couldn't Scan QR Code";
        if(!result) return;
        wrapper.querySelector('textarea').innerText = result;
        /* Eğer qr code bir url ise linki yeni sekmede açıyor */
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        if(result.match(urlRegex)) {
            const link = document.createElement('a');
            link.setAttribute('href', result);
            link.setAttribute('target', "_blank")
            link.click();
        }
        form.querySelector('img').src = URL.createObjectURL(file)
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Couldn't Scan QR Code";
    })
}

fileInp.addEventListener('change', e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append("file", file)
    fetchRequest(formData, file);
});

copyBtn.addEventListener('click', () => {
    let text = wrapper.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text);
});


form.addEventListener('click', () => fileInp.click());
closeBtn.addEventListener('click', () => wrapper.classList.remove("active"));
buttonLink.addEventListener('click', () => buttonLinkA.click());