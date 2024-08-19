import { html } from "../../lib.js";





export const taskTemplate = (task) => html`
<li class="unchecked" ><input class="checkboxes" type="checkbox" unchecked> ${task}</li>
`


