import type { Response, Request, NextFunction } from 'express'
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
const LOGIN_URL = 'https://smena.samokat.ru/login'

class LoginController {
  async request(req: Request, res: Response, next: NextFunction) {
    let array: string[] = []
    async function parse() {
      const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        env: {
          DISPLAY: ':10.0',
        },
      })
      const page = await browser.newPage()

      // Открываем страницу логина
      await page.goto(LOGIN_URL)

      // Вводим логин и пароль
      // await page.type('#phoneNumber', '9374477523')
      // await page.type('#password', '02006130')

      // // Отправляем форму и ждем завершения
      // await Promise.all([
      //   page.waitForNavigation({ waitUntil: 'networkidle0' }),
      //   page.click('button[type="submit"]'),
      // ])

      // await Promise.all([
      //   page.waitForNavigation({ waitUntil: 'networkidle0' }),
      //   page.click('a[href="/timesheet"]'),
      // ])
      //   await page.goto(SMENA_URL)

      // page.on('response', async (response) => {
      //   try {
      //     const url = response.url()
      //     console.log(url)
      //     console.log(
      //       url === 'https://api-p01.samokat.ru/staff/actions/getStatistic'
      //     )

      //     // Проверяем, возвращает ли запрос JSON-данные
      //     if (url.includes('/actions/getStatistic')) {
      //       // Замените на интересующий вас адрес
      //       try {
      //         const jsonData = await response.json() // Получаем JSON-ответ
      //         console.log(`Ответ от ${url}:`, jsonData)
      //       } catch (err) {
      //         //   console.error(`Ошибка при обработке JSON-ответа с ${url}:`, err)
      //       }
      //     }
      //   } catch (err) {
      //     console.error(`Ошибка при обработке ответа: ${err}`)
      //   }
      // })
      // Переход на защищенную страницу с токеном в заголовках
      //   await page.setExtraHTTPHeaders({
      //     Authorization: `Bearer ${token}`,
      //   })

      // Переход на страницу dashboard
      // await page.waitForSelector('.EmployeeInfo__container--faf7')
      // Можно дальше парсить нужные данные
      const content = await page.content()
      // const $ = cheerio.load(content)
      // $('.EmployeeInfo__container--faf7').each((i, el) => {
      //   array.push($(el).children('.EmployeeInfo__name--da9c').text())
      // })
      console.log(content)

      await browser.close()
    }

    await parse()

    res.json({ data: array, status: 'ok' })
  }
}

export default new LoginController()
