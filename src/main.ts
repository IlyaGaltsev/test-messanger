import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function appStart() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'static'))
  app.enableCors();

  await app.listen(PORT, () => {
    console.log(`Success start on ${PORT}`);
  });
}
appStart();
