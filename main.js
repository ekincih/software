const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // Node.js entegrasyonunu etkinleştiriyoruz
      contextIsolation: false, // Context isolation'ı kapatıyoruz
    }
  });

  win.loadFile('index.html');

  // Menü Şablonu
  const menuTemplate = [
    {
      label: 'Dosya',
      submenu: [
        { role: 'quit', accelerator: 'CmdOrCtrl+Q' }
      ]
    },
    {
      label: 'Yardım',
      submenu: [
        {
          label: 'Uygulama Hakkında',
          accelerator: 'CmdOrCtrl+I',
          click: () => {
            const aboutWin = new BrowserWindow({
              width: 300,
              height: 200,
              title: 'Hakkında',
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
              }
            });
            aboutWin.loadFile('about.html');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
