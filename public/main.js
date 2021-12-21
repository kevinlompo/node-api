async function loadTodoItems() {
  const items = await (await fetch("/api/items")).json();
  console.log(items);
  const lis = items
    .map(
      ({ id, description, done }) => `<li id="item-${id}">
     <input onclick="itemChecked(${id})" id="item-checkbox-${id}" type="checkbox" ${
        done ? 'checked="checked"' : ""
      }"/>
     <label for="item-checkbox-${id}" class="${
        done ? "strikethrough" : ""
      }">${description}</label>
      <button onclick="removeItem(${id})">DELETE</button>
    </li>`
    )
    .join(" ");
  const ul = document.getElementById("list-root");
  ul.innerHTML = lis;
}

loadTodoItems();

async function itemChecked(id) {
  const checkbox = document.getElementById(`item-checkbox-${id}`);
  await fetch(`/api/item/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      done: checkbox.checked,
    }),
  });
  const label = document.querySelector(`label[for='item-checkbox-${id}']`);
  label.classList.toggle("strikethrough");
}

async function removeItem(id) {
  await fetch(`/api/item/${id}`, {
    method: "DELETE",
  });
  loadTodoItems();
}

async function addNewItem() {
  const idInput = document.getElementById("new-item-id");
  const id = idInput.value;
  const descriptionInput = document.getElementById("new-item-description");
  const description = descriptionInput.value;
  await fetch("/api/item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      description,
      done: false,
    }),
  });
  loadTodoItems();
  idInput.value = "";
  descriptionInput.value = "";
}
