import { html, render as renderBase} from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';

const root = document.querySelector('main');

function renderer(template){
    renderBase(template,root);
}

export {
    html,
    renderer,
    page
}