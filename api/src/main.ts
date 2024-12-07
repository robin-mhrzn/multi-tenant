import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalHttpInterceptor } from './interceptors/response.interceptor';

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
      const allowedOrigins = [
        'http://localhost:5173', // Root domain
        /\.localhost:5173$/, // Subdomains of localhost:5173
      ];

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

  // app.enableCors({
  //   origin: 'http://dev.localhost:5173', // Allow requests from this origin
  //   credentials: true, // If you're using cookies or other credentials
  // });
  app.useGlobalInterceptors(new GlobalHttpInterceptor());
  await app.listen(3000);
}
bootstrap();
