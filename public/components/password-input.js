import { html } from "../node_modules/lit-html/lit-html.js";
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
    : html`<div class="flx-row mx1">
      <label class="mx1-2">${label}</label>
      <input id=${id} type="password" @keyup=${onKeyup} ?disabled=${disabled} />
      <button class="mx1-2" @click=${onClick} ?disabled=${disabled}>${submitLabel} </button>
    </div>`;
}
