'use strict';

//import { getCategories() } from './fetch.js'

let clickedBtn;
let categoryId;
let headline;
let pageId;

// Categories
function getCategories() {
  fetch('http://komediehuset.com/wp-json/wp/v2/categories?parent=46&per_page=100')
    .then(function(response) {
      return response.json();
    })
    .then(function(categories) {
      console.log(categories)
      appendCategories(categories);
    });
};

getCategories();

function appendCategories(categories) {
  let i = 0;
  for (let category of categories) {
        if (i < 8){
          pageId = 1;
          document.querySelector("#teams-p1").innerHTML += `
              <button class="small-btn" id="${category.id}" onclick="showCategory(${category.id})">${category.name}</button>
              `;
          document.querySelector(".arrow-nav").innerHTML = '<button class="arrow-btn" id="next-btn" onclick="nextPage()">></button>';

        }
        else if (i >= 8 && i < 16){
          pageId = 2;
            document.querySelector("#teams-p2").innerHTML += `
                <button class="small-btn" id="${category.id}" onclick="showCategory(${category.id})">${category.name}</button>
                `;
            document.querySelector(".arrow-nav").innerHTML = '<button class="arrow-btn" id="back-btn"><</button><button class="arrow-btn" id="next-btn" onclick="nextPage()">></button>'
          }
        else if (i >= 16 && i < 24) {
          pageId = 3;
            document.querySelector("#teams-p3").innerHTML += `
                <button class="small-btn" id="${category.id}" onclick="showCategory(${category.id})">${category.name}</button>
                `;
            document.querySelector(".arrow-nav").innerHTML = '<button class="arrow-btn" id="back-btn"><</button><button class="arrow-btn" id="next-btn" onclick="nextPage()">></button>'
        }

      };
i ++;

};

function showCategory(id){
  let url = 'http://komediehuset.com/wp-json/wp/v2/posts?_embed&categories=' + id;
  console.log(url);
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(messages) {
      appendMessages(messages);
      $('.msg-modal').show();
    });
};

  function appendMessages(messages) {
    let messageTemplate = "headline";
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

    document.querySelector(".msg-modal").innerHTML = messageTemplate;
  };

  function closeModal() {
    console.log('close');
    document.querySelector('.msg-modal').style.display = 'none';
  };

function nextPage(){
  if (pageId === 1){
    document.querySelector('#teams-p1').style.display = 'none';
    document.querySelector('#teams-p2').style.display = 'flex';
    console.log('page 2');
  }else{
    if (pageId === 2){
      document.querySelector('#teams-p1').style.display = 'none';
      document.querySelector('#teams-p2').style.display = 'flex';
      document.querySelector('#teams-p3').style.display = 'none';
      document.querySelector('#next-btn').style.display = 'none';
    }
  }
};
