import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    app.use(cookieParser());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            // forbidNonWhitelisted: true,
            exceptionFactory: (errors) => {
                const errorMessages = {};
                errors.forEach((error) => {
                    if (error.children?.length) {
                        if (!errorMessages[error.property]) {
                            errorMessages[error.property] = {};
                        }
                        error.children.forEach((error2) => {
                            errorMessages[error.property][error2.property] =
                                Object.values(error2.constraints || {})
                                    .join('. ')
                                    .trim();
                        });
                    } else {
                        errorMessages[error.property] = Object.values(
                            error.constraints || {},
                        )
                            .join('. ')
                            .trim();
                    }
                });
                return new BadRequestException(errorMessages);
            },
        }),
    );

    // app.useGlobalPipes(
    //     new ValidationPipe({ whitelist: true, transform: true }),
    // );

    app.enableCors({
        allowedHeaders: ['content-type'],
        origin: 'http://localhost:3001',
        credentials: true,
    });

    await app.listen(3000);
}
bootstrap();
