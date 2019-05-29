'use strict';

//import { getCategories() } from './fetch.js'

let clickedBtn;
let categoryId;
let headline;
let pageId;
let loadedSettings = localStorage.getItem('displaySettings');


function loadSettings() {
  let buttons = document.querySelectorAll('.small-btn');
  console.log(buttons);

  for (let btn of buttons) {
    console.log(loadedSettings);
    console.log(btn);
    console.log(btn.id);
    if (loadedSettings.includes(btn.id)) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
    console.log(btn);
  }
};

// Show specific message when redirected from notification click
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
let postSlug = getUrlParameter('postSlug');
console.log(postSlug);
if (postSlug != "") {
  showPost(postSlug);
};

function showPost(postSlug) {
  let url = 'https://komediehuset.com/wp-json/wp/v2/posts?_embed&slug=' + postSlug;
  console.log(url);
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(messages) {
      appendMessages(messages);
      document.querySelector('#msg-modal').style.display = "block";
    });
};

// Categories
function getCategories() {
  fetch('https://komediehuset.com/wp-json/wp/v2/categories?parent=46&per_page=100')
    .then(function(response) {
      return response.json();
    })
    .then(function(categories) {
      console.log(categories)
      appendCategories(categories);
    });
};
getCategories();

// Make buttons and checkboxes
function appendCategories(categories) {
  for (let category of categories) {
    if (category.slug != "faelles-beskeder") {
      // Checkboxes

      document.querySelector("#settings-modal").innerHTML += `
          <li class="checklist"> <label class="set-label" for="${category.id}">${category.name}</label>
          <input type="checkbox" class="set-checkbox" id="${category.id}" name="${category.name}"></li>
                  `;

      // Buttons
      document.querySelector("#teams-p1").innerHTML += `
              <button class="small-btn" id="${category.id}" onclick="showCategory(${category.id})">${category.name}</button>
              `;

    };

  };
  // Save settings button
  document.querySelector("#settings-modal").innerHTML += `
<section class="confirm-buttons"><button class="ok-btn" id="save-settings" onclick="saveSettings()">GEM</button></section>
`;
  loadSettings();
};

// Display message
function showCategory(id) {
  let url = 'https://komediehuset.com/wp-json/wp/v2/posts?_embed&categories=' + id;
  console.log(url);
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(messages) {
      appendMessages(messages);
      document.querySelector('#msg-modal').style.display = "block";
    });
};

function appendMessages(messages) {
  let messageTemplate = "";
  for (let message of messages) {
    messageTemplate += `
        <section class="messages">
        <button id="close" onclick="closeModal()">X</button>
          <div class="message">
            <h4 class="msg-title">${message.title.rendered}</h4>
            <p class="msg-content">${message.content.rendered}</p>
          </div>
          </section>
        `;
  };
  document.querySelector("#msg-modal").innerHTML = messageTemplate;
};

// Display menu
function openMenu() {
  document.querySelector('#menu-modal').style.display = "block";
};

//display settings
function openSettings() {
  document.querySelector('#settings-modal').style.display = "flex";
};

// Close modals
function closeModal() {
  console.log('close');
  document.querySelector('.modal').style.display = 'none';
  document.querySelector('#msg-modal').style.display = 'none';
  document.querySelector('#menu-modal').style.display = 'none';
  document.querySelector('#settings-modal').style.display = 'none';
};

function saveSettings() {
  let displaySettings = [];
  let settings = document.querySelectorAll('.checklist input');
  for (let setting of settings) {
    if (setting.checked == true) {
      displaySettings.push(setting.id);
    }
  };

  console.log(displaySettings);
  localStorage.setItem("displaySettings", displaySettings);

  closeModal();
  location.reload();
};
