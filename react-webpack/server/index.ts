import express,{Request,Response} from 'express'
import {router} from "../src/router";
import path from 'path';
import fs from 'fs';
import { build } from './build-client';

/* 1. 클라이언트 번들 파일을 빌드합니다. */
build();

const app = express();
const port = 3000;

const {renderToString} = require('react-dom/server')

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*',(req:Request, res:Response) => {
    const component = router.find(r=> r.path === req.path)?.component
    const html = renderToString(component())
    let template = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
    template = template.replace('<!--RENDER_FROM_SERVER-->', html);
    res.send(template);
})

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})