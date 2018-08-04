let createButton = document.getElementById('create');

createButton.addEventListener('click', () => {
    window.location.href="form.html";
});

document.addEventListener('copy', event => {
    console.log(event);
});

function listItems() {
    let clipboardItems = document.getElementById('clipboardItems');
    chrome.storage.sync.get(null, items => {
        for (let title in items) {
            let titleButton = document.createElement('button');
            titleButton.innerText = title;
            titleButton.classList.add('titleButton');
            titleButton.setAttribute('value', items[title])
            titleButton.setAttribute('alt', title);
            titleButton.setAttribute('title', title);
            titleButton.addEventListener('click', paste)

            let copyButton = document.createElement('i');
            copyButton.classList.add('fas', 'fa-copy', 'copyButton');
            copyButton.setAttribute('title', 'Copy');
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(items[title]);
            }) 

            let editButton = document.createElement('i');
            editButton.classList.add('fas', 'fa-pencil-alt', 'editButton');
            editButton.setAttribute('title', 'Edit');
            editButton.addEventListener('click', event => {
                if(editForm.classList.contains('show')) {
                    editForm.classList.remove('show');
                } else {
                    editForm.classList.add('show');
                    editForm.focus();
                }
            });

            let deleteButton = document.createElement('i');
            deleteButton.classList.add('fas', 'fa-trash-alt', 'deleteButton');
            deleteButton.setAttribute('title', 'Delete');
            deleteButton.addEventListener('click', () => {
                chrome.storage.sync.remove(title);
                window.location.href = "popup.html";
            })

            let titleContainer = document.createElement('div');
            titleContainer.classList.add('titleContainer');
            titleContainer.appendChild(titleButton);
            titleContainer.appendChild(copyButton);
            titleContainer.appendChild(editButton);
            titleContainer.appendChild(deleteButton);

            let itemBody = document.createElement('textarea');
            itemBody.setAttribute('id', items[title]);
            itemBody.value = items[title];

            let saveButton = document.createElement('button');
            saveButton.classList.add('saveButton');
            saveButton.type = "submit"
            saveButton.innerText = "Save";

            let editForm = document.createElement('form');
            editForm.addEventListener('submit', event => {
                event.preventDefault();
                let itemBody = document.getElementById(items[title]);
                if (title && itemBody.value) {
                    chrome.storage.sync.set({ [title]: itemBody.value }, () => {
                        editForm.classList.remove('show');
                    })
                }
            })
        
            editForm.appendChild(itemBody);
            editForm.appendChild(saveButton);

            let itemContainer = document.createElement('div');
            itemContainer.classList.add('itemContainer')
            itemContainer.appendChild(titleContainer);
            itemContainer.appendChild(editForm);

            clipboardItems.appendChild(itemContainer);
        }
    });
}

function paste(event) {
    chrome.tabs.executeScript({
        code: `document.activeElement.value += '${event.target.value}';`
    });
}

listItems();