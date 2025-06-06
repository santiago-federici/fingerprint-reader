import { app, BrowserWindow } from "electron";
import * as path from "path";

/**
 * Usa app.isPackaged; es más fiable que mirar NODE_ENV,
 * porque algunos empaquetadores no definen la variable.
 */
const isDev = !app.isPackaged;

// ---------------------------
//  Mantener referencia global
// ---------------------------
let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true, // si realmente lo necesitás
      contextIsolation: false, // o true, según cómo estés manejando el contexto
    },
  });

  // Mostrar solo cuando esté listo para evitar pantallazos en blanco
  mainWindow.once("ready-to-show", () => mainWindow!.show());

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    // En el paquete, dist/ va al mismo nivel que dist-electron/
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  // Liberar la referencia cuando la ventana se cierre
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// --------------
//  Ciclo de vida
// --------------
app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  // En macOS es común dejar la app viva; en Windows/Linux la cerramos
  if (process.platform !== "darwin") app.quit();
});
