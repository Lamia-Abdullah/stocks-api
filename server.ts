import fastfyAutoload from '@fastify/autoload';
import fastfySwageer from '@fastify/swagger';
import fastfy from "fastify";
import {join} from 'path';

export const server =fastfy ({logger:true});


server.register(fastfySwageer,{
    routePrefix :'/docs',
    exporeRoute:true,
    mode: 'dynamic',
    openapi:{
        info:{
            title:'stocks API',
            version:'0.0.0.1',
        },
    },
});
server.register(fastfyAutoload,{
    dir:join(__dirname,'routes'),
});