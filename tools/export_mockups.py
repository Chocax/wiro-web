"""
Exporta cada pantalla de la app como PNG transparente en public/mockups/{en,es}/.

Uso (con el sitio corriendo, por ejemplo `npx ng serve` en el puerto 4200):
    pip install playwright && playwright install chromium
    python tools/export_mockups.py http://localhost:4200
"""
import asyncio, os, sys
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4200'
CHROME = os.environ.get('CHROME_PATH')  # opcional: ruta a un Chrome ya instalado
SCREENS = ['home', 'rule', 'send', 'received', 'declined', 'pockets', 'goal', 'escrow', 'scheduled']
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'mockups')


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=CHROME) if CHROME else await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 900, 'height': 960}, device_scale_factor=2.5)
        for lang in ('en', 'es'):
            os.makedirs(os.path.join(OUT, lang), exist_ok=True)
            for s in SCREENS:
                await page.goto(f'{BASE}/record?s={s}&lang={lang}&clean=1&bg=transparent', wait_until='networkidle')
                await page.wait_for_timeout(700)  # deja terminar la animación de entrada
                frame = page.locator('.ph-frame')
                await frame.screenshot(path=os.path.join(OUT, lang, f'{s}.png'), omit_background=True)
                print('ok', lang, s)
        await browser.close()


asyncio.run(main())
