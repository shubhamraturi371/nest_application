import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {CommandFactory} from "nest-commander";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import session from "express-session";
async function bootstrap() {

    // await CommandFactory.run(AppModule, new LogService());
    // or, if you only want to print Nest's warnings and errors
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Job Management API')
        .setDescription('This is Job Management Api')
        .setVersion('1.0')
        .addBearerAuth(
            {
                description: `Please paste your token here after login`,
                name: 'Authorization',
                bearerFormat: 'Bearer',
                scheme: 'Bearer',
                type: 'http',
                in: 'Header'
            },
            'access_token',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1', app, document);
    await CommandFactory.run(AppModule, ['warn', 'error']);
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    await app.listen(8000);
    app.use(
        session({
            secret: 'my-secret',
            resave: false,
            saveUninitialized: false,
        }),
    );
}

bootstrap().then(r => {

    return r;
}).catch(e=>{
    return e;
});