import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpectionFilters } from './filters/expection-filters';
import { TransformInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3002;
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ExpectionFilters);
  console.log(`Server starts on port ${port}`);
  await app.listen(port);
}
bootstrap();
