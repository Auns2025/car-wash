import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })

  console.log('Navigating to http://localhost:3000/ ...')
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' })

  // Wait for loading screen to complete and fade out
  await new Promise(r => setTimeout(r, 2200))

  const outputDir = path.resolve('public', 'verify_screenshots')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 1. Scene 1 - Hero Arrive
  console.log('Capturing Scene 1 (Hero Arrive - y=0)...')
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await new Promise(r => setTimeout(r, 500))
  await page.screenshot({ path: path.join(outputDir, '01_scene_hero.jpg'), type: 'jpeg', quality: 90 })

  // 2. Scene 2 - Wash It (y=1050)
  console.log('Capturing Scene 2 (Wash It - y=1050)...')
  await page.evaluate(() => window.scrollTo({ top: 1050, behavior: 'instant' }))
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({ path: path.join(outputDir, '02_scene_wash.jpg'), type: 'jpeg', quality: 90 })

  // 3. Scene 3 - Look Closer (y=2000)
  console.log('Capturing Scene 3 (Look Closer - y=2000)...')
  await page.evaluate(() => window.scrollTo({ top: 2000, behavior: 'instant' }))
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({ path: path.join(outputDir, '03_scene_inspect.jpg'), type: 'jpeg', quality: 90 })

  // 4. Scene 4 - Swirls Out Glass On (y=2800)
  console.log('Capturing Scene 4 (Swirls Out Glass On - y=2800)...')
  await page.evaluate(() => window.scrollTo({ top: 2800, behavior: 'instant' }))
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({ path: path.join(outputDir, '04_scene_glass.jpg'), type: 'jpeg', quality: 90 })

  // 5. Scene 5 - Keys Back (y=3600)
  console.log('Capturing Scene 5 (Keys Back Sunset - y=3600)...')
  await page.evaluate(() => window.scrollTo({ top: 3600, behavior: 'instant' }))
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({ path: path.join(outputDir, '05_scene_keys.jpg'), type: 'jpeg', quality: 90 })

  // 6. Scene 6 - Booking Section (y=4700)
  console.log('Capturing Scene 6 (Booking Section - y=4700)...')
  await page.evaluate(() => window.scrollTo({ top: 4700, behavior: 'instant' }))
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({ path: path.join(outputDir, '06_scene_booking.jpg'), type: 'jpeg', quality: 90 })

  // 7. Modal Open
  console.log('Opening modal...')
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await new Promise(r => setTimeout(r, 400))
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'))
    const bookBtn = btns.find(b => b.textContent && b.textContent.includes('Book Your Detail'))
    if (bookBtn) bookBtn.click()
  })
  await new Promise(r => setTimeout(r, 600))
  await page.screenshot({ path: path.join(outputDir, '07_modal_open.jpg'), type: 'jpeg', quality: 90 })

  console.log('All 7 keyframes captured successfully!')
  await browser.close()
}

run().catch(err => {
  console.error('Error running capture:', err)
  process.exit(1)
})
