import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalHttpInterceptor } from './interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Multi-Tenant SaaS API')
    .setDescription('API documentation for Multi-Tenant SaaS application')
    .setVersion('1.0')
    .addBearerAuth() // Enable Bearer token for secure endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins =
        process.env.ALLOWED_ORIGINS?.split(',').map((origin) => {
          if (origin.includes('*')) {
            const regexPattern = origin
              .replace(/\./g, '\\.')
              .replace(/\*/g, '.*');
            return new RegExp(`^${regexPattern}$`);
          }
          return origin.trim();
        }) || [];

      if (
        !origin || // Allow non-browser requests
        allowedOrigins.some((allowedOrigin) =>
          typeof allowedOrigin === 'string'
            ? allowedOrigin === origin
            : allowedOrigin.test(origin),
        )
      ) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error if non-DTO properties are present
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );
  app.useGlobalInterceptors(new GlobalHttpInterceptor());
  await app.listen(3000);
}
bootstrap();
