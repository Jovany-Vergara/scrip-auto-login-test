const puppeteer = require('puppeteer');

const URL = 'url de la página de inicio de sesión';
const NEW_URL = 'segunda url';
const INPUT_SELECTOR = 'input[type="email"], input[type="password"]';
const USERNAME = 'tu nombre de usuario';
const PASSWORD = 'tu contraseña';

// Crea una función asíncrona autoejecutable
(async () => {
  try {
    // Lanza un nuevo navegador y crea una nueva página
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-fullscreen'] });
    const page = await browser.newPage();

    // Navega a la página de inicio de sesión y espera a que los campos de entrada estén presentes
    await page.goto(URL);
    await page.waitForSelector(INPUT_SELECTOR);

    // Selecciona todos los campos de entrada y comprueba que hay al menos dos
    const inputFields = await page.$$(INPUT_SELECTOR);
    if (inputFields.length < 2) throw new Error('No se encontraron suficientes campos de entrada');

    // Introduce el nombre de usuario y la contraseña
    await inputFields[0].type(USERNAME);
    await inputFields[1].type(PASSWORD);

    // Haz clic en el botón de inicio de sesión y espera a que la navegación se complete
    await Promise.all([page.waitForNavigation(), page.click('button[type="submit"]')]);

    // Espera 5 segundos
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Navega a la nueva URL
    await page.goto(NEW_URL);

    // Espera 5 segundos
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Cierra el navegador
    await browser.close();
  } catch (error) {
    console.error('Hubo un error al intentar iniciar sesión:', error);
  }
})();