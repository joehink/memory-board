let form = document.getElementById('createItemForm');
let title = document.getElementById('title');
let cancelButton = document.getElementById('cancelButton');

title.focus();

form.addEventListener('submit', event => {
    event.preventDefault();

    let title = document.getElementById('title');
    let body = document.getElementById('body');
    if (title.value && body.value) {
        chrome.storage.sync.set({ [title.value]: body.value }, () => {
            window.location.href='popup.html';
        })
    }
});

cancelButton.addEventListener('click', () => window.location.href='popup.html')