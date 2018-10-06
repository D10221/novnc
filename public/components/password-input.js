import { html } from "../node_modules/lit-html/lit-html.js";
import Label from "./label.js";
/**
 *
 * @param {{disabled: boolean, submit: (password: string)=> any}} param0
 */
export default function({ disabled, submit, submitLabel, label, id, hide }) {
  id = id || "password";
  label = label || "Password";
  submitLabel = submitLabel || "Submit";

  const onClick = () => submit(document.getElementById(id).value);
  const onKeyup = e => {
    e.keyCode === 13 && submit(document.getElementById(id).value);
  };
  return !!hide
    ? html``
    : html`<div class="flex-row mx center-items">
      ${Label({ content: label })}
      <input id=${id} type="password" @keyup=${onKeyup} ?disabled=${disabled} />
      <button class="mx-half bg03 color07 border-pill px py-half" @click=${onClick} ?disabled=${disabled}>${submitLabel} </button>
    </div>`;
}
