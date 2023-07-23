import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function appStart() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(PORT, () => {
    console.log(`SUCCESS START on ${PORT}`);
  });
}
appStart();
