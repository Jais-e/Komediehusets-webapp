'use strict';

let clickedBtn;
let categoryId;
let headline;
/*
document.querySelector('.small-btn').addEventListener('click', function() {
     	clickedBtn = (this.id);
      console.log(clickedBtn);
    });
*/
$('.large-btn').click(function() {
  clickedBtn = (this.id);
  console.log(clickedBtn);
  whatMessage()
  getMessages();
  $('.msg-modal').css('display','block') ;
});
$('.small-btn').click(function() {
  clickedBtn = (this.id);
  console.log(clickedBtn);
  whatMessage()
  getMessages();
  $('.msg-modal').css('display','block') ;
});

/*
$('#close').click(function(){
  $('.msg-modal').css('display','none') ;
  console.log('close');
});
*/

document.querySelector('#close').onclick = function() {
  document.querySelector('.msg-modal').style.display = 'none';
  console.log('close');
};


function whatMessage() {
  if (clickedBtn == "latest-btn") {
    categoryId = 'http://komediehuset.com/wp-json/wp/v2/posts?_embed&categories=46';
    headline = '<h2>Seneste beskeder<br></2>'
  } else
  if (clickedBtn == "hold-a") {
    categoryId = 'http://komediehuset.com/wp-json/wp/v2/posts?_embed&categories=47';
    headline = '<h2>Beskeder hold A<br></2>'
  }
};

function getMessages() {
  fetch(categoryId)
    .then(function(response) {
      return response.json();
    })
    .then(function(messages) {
      appendMessages(messages);
    });
};

function appendMessages(messages) {
  let messageTemplate = headline;
  for (let message of messages) {
    messageTemplate += `
        <section class="messages">
          <div class="message">
            <h4>${message.title.rendered}</h4>
            <p>Besked: ${message.content.rendered}</p>
          </div>
          </section>
        `;
  };

  document.querySelector(".msg-modal").innerHTML = messageTemplate;
};
