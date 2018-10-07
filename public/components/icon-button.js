import { html } from "../node_modules/lit-html/lit-html.js";
/**
 *
 */
export default function IconButton({ onClick, icon, className }) {
  const classes = `border-pill py-min max-content ${className}`;
  return html`<button class=${classes} @click=${onClick}>${icon}</button>`;
}
