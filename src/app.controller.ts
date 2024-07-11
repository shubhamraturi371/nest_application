import {Controller, Get, MessageEvent, Request, Post, UseGuards, Render, Sse, Res} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {JobsService} from "./jobs/jobs.service";
import {ApiExcludeController} from "@nestjs/swagger";
import {interval, map, Observable} from "rxjs";
import EventSource from "eventsource";

@ApiExcludeController()
@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly jobService: JobsService) {
    }

    @Get()
    @Render('index')
    async home() {
        return {data: await this.jobService.getAllJobs()};

    }

    @Get('register')
    @Render('register')
    async register() {
        return {data: await this.jobService.getAllJobs()};

    }

    @Get('test')
    async test(@Request() req) {
        const eventSource = new EventSource('/sse');
        eventSource.onmessage = ({ data }) => {
            console.log('New message', JSON.parse(data));
        };
    }

    @Sse('sse')
    sse(): Observable<MessageEvent> {
      let i = 0 ;
        return interval(1000).pipe(map((index) => ({data: {hello: i++}})));
    }
}