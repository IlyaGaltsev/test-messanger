import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function appStart() {
  const PORT = process.env.PORT || 5000

  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors()

  await app.listen(PORT, () => {
    console.log(`success start on ${PORT}`)
  })
}
appStart()
