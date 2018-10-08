import { html } from "../node_modules/lit-html/lit-html.js";
/**
 *
 */
export default function IconButton({ onClick, icon, className, round }) {
  const classes = [
    round && "border-pill",
    !round && "border-roundish",
    `py-min max-content ${className}`,
  ]
    .filter(Boolean)
    .join(" ");
  return html`<button class=${classes} @click=${onClick}>${icon}</button>`;
}
