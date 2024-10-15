const { shell } = require('electron');

const goButton = document.getElementById('goButton');
const idInput = document.getElementById('idInput');
const result = document.getElementById('result');

// ID ile URL arasındaki eşlemeleri tanımlayın
const idToUrlMap = {
  "SKZ20240909UV": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRwLpoEMTBXlPWRX7s2e6fNiy4aoOzXdTN03MsXTF2UHkEpBkTc0G16IujY3B9kPL-SQPboIUR055zg/pubhtml",
  // Diğer ID-URL eşlemelerinizi buraya ekleyebilirsiniz
  "ID123456": "https://www.example.com/page1",
  "ID654321": "https://www.example.com/page2",
  // ...
};

goButton.addEventListener('click', () => {
  const id = idInput.value.trim().toUpperCase(); // ID'yi büyük harfe çevirerek tutarlı hale getiriyoruz
  if (id) {
    if (idToUrlMap.hasOwnProperty(id)) {
      const url = idToUrlMap[id];
      shell.openExternal(url); // URL'i varsayılan tarayıcıda aç
      result.textContent = `ID'nizle ${url} adresine yönlendiriliyorsunuz...`;
      result.style.color = 'green';
    } else {
      result.textContent = 'Geçersiz ID girdiniz. Lütfen geçerli bir ID girin.';
      result.style.color = 'red';
    }
  } else {
    result.textContent = 'Lütfen bir ID girin.';
    result.style.color = 'red';
  }
});
