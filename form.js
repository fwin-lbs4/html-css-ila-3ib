/**
 * Name: form.js
 * Author: Florian Windisch
 * Description: ILA-KPT_ÜBUNG1
 */
const form = document.querySelector("#form");
const dialog = document.querySelector(".dialog");
const dialogPre = document.querySelector(".dialog > div > pre");
const dialogClose = document.querySelector(".dialog > div > button");

/**
 * Take the formdata and display it in a dialog
 * @param {Event} e
 */
const submitForm = (e) => {
  const formData = new FormData(e.target, e.submitter);

  // reset the pre-tag
  dialogPre.textContent = "";

  for (const [key, value] of formData) {
    // if value is falsy or an object with size 0 skip
    if (!value || (typeof value === "object" && value.size === 0)) {
      continue;
    }

    // if the file field is set use the size property on the file object instead
    const isFile =
      typeof value === "object" && value.size !== 0 && value.name !== "";

    // write the current key and value into the pre and add a newline
    dialogPre.textContent += `${key}: ${isFile ? value.name : value}\n`;
  }

  // open the dialog
  dialog.showModal();
};

// listen to submit on the form, prevent default action and use custom submitHandler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm(e);
  return false;
});

// listen to click events on the close button and close the dialog on click
dialogClose.addEventListener("click", () => {
  dialog.close();
});
