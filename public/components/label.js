import { html } from "../node_modules/lit-html/lit-html.js";
export default ({ content, classes }) => {
  const _class = ["mx-half", "text-capitalize"]
    .concat(classes)
    .filter(Boolean)
    .join(" ");
  return html`<label class=${_class}>${content}</label>`;
};
