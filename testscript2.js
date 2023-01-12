import "../cb_scripts/style.css";
//import Chatbox from "../cb_scripts/app";

window.addEventListener('load', function () {
    console.log("script loaded from testscript");
});

// var link = document.createElement('link');
// link.rel = 'stylesheet';
// //link.href = 'https://cdn.jsdelivr.net/gh/Amarnathiiti/chatbot@newfeatures/style.css';
// link.href = "/home/amarnath/Desktop/chatbot/chatbot/src/cb_scripts/style.css";
// document.head.appendChild(link);

var div = document.createElement('div');

div.innerHTML = `<div class="container">
                    <div class="chatbox">
                        <div class="chatbox__support">
                            <div class="chatbox__header">
                                <div class="chatbox__image--header">
                                    <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="someimage" />
                                </div>
                                <div class="chatbox__content--header">
                                    <h4 class="chatbox__heading--header">Chat support</h4>
                                        <p class="chatbox__description--header">Hi. My name is Biva. How can I help you?</p>
                                </div>
                            </div>
                            <div class="chatbox__messages">
                                <div></div>
                            </div>
                            <div class="chatbox__footer">
                                <input type="text" class="chatbox_input" placeholder="Write a message..." />
                                <button class="chatbox__send--footer send__button">Send</button>
                            </div>
                        </div>
                        <div  style="width:100px;float:right">
                            <button class="chatbox__button" ><img src="https://res.cloudinary.com/dbkmv79ja/image/upload/v1672985093/chatbot_qr9f9w.png" width="100px" alt="someImage"/></button>
                        </div>
                    </div>
                </div>`


document.body.appendChild(div);

let state = false;
const messages = [];


const suggestedQuestions = {
    "1": "How do I access the mock tests",
    "2": "How do I contact customer support",
    "3": "Do I have to pay anything for giving quizzes",
    "4": "I am unable to give quizzes",
    "5": "How can I track my progress?"
}


Object.entries(suggestedQuestions).forEach(([key, value]) => {
    let msg = { name: "suggestions", message: value };
    messages.push(msg);
});
   

// suggestedQuestions.forEach((text) => {
//     let msg = { name: "suggestions", message: text };
//     messages.push(msg);
// })

function fetchSuggestions() {
    fetch('http://192.168.177.16:3044/fetch_suggestion', {
           method: 'GET',
           mode: 'cors',
           headers: {
               'Content-Type': 'application/json'
           },
       }).then(r => r.json())
           .then(r => {
               Object.entries(r).forEach(([key, value]) => {
                let msg = { name: "suggestions", message: value };
                messages.push(msg);
            });
               
           });
}


const openButton = document.querySelector('.chatbox__button');
const chatBox = document.querySelector('.chatbox__support');
const sendButton = document.querySelector('.send__button');



   function display() {

        openButton.addEventListener('click', () => toggleState())

        sendButton.addEventListener('click', () => onSendButton())

        const node = document.querySelector('.chatbox_input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                onSendButton()
            }
        })
       
       //fetchSuggestions();
        updateChatText();
       
       
    }

    function toggleState() {
        state = !state;
        // show or hides the box
        if(state) {
            chatBox.classList.add('chatbox--active')
        } else {
            chatBox.classList.remove('chatbox--active')
        }
    }

    function onSendButton() {
        var textField = document.querySelector('.chatbox_input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        messages.push(msg1);
        
        fetch('http://192.168.177.16:3044/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 , type: "user_input"}),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
            .then(r => {
                if (r.type === "suggestions") {
                    let msg = { name: "suggestions", message: r.answer };
                    messages.push(msg);
                }
                else {
                    let msg2 = { name: "Biva", message: r.answer };
                     messages.push(msg2);
                }
            updateChatText();
            textField.value = ''

        }).catch((error) => {
            console.log('Error:', error);
            let msg3 = { name: "Biva", message: "Unable to get response local." };
            messages.push(msg3);
            updateChatText();
            textField.value = ''
          });
    }

    
    function querySuggestions(text){
        console.log(text);

        let msg4 = { name: "User", message: text };
        messages.push(msg4);
        
        var textField = document.querySelector('.chatbox_input');
        textField.value = text;
        
        fetch('http://192.168.177.16:3044/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text , type: "suggestions"}),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            if (r.type === "suggestions") {
                let msg = { name: "suggestions", message: r.answer };
                messages.push(msg);
            }
            else {
                let msg2 = { name: "Biva", message: r.answer };
                 messages.push(msg2);
            }
            updateChatText();
            textField.value = ''

        }).catch((error) => {
            //console.error('Error:', error);
            console.log(error);
            let msg3 = { name: "Biva", message: "Unable to get response local." };
            messages.push(msg3);
            updateChatText();
            textField.value = ''
          });
        
    }

function updateChatText() {
        var html = '';
        messages.slice().reverse().forEach(function (item, index) {
            if (item.name === "suggestions") {
                html += '<div class="messages__item messages__item--suggestion"><button class="server_suggestion_button" >' + item.message + '</button></div>'
                console.log("added");
            }
            else if (item.name === "Biva")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = document.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
        const server_response_button = document.querySelectorAll('.server_suggestion_button')
        if (server_response_button !== null) {
            server_response_button.forEach((button) => {
                button.addEventListener('click', () => querySuggestions(button.innerHTML));
            })
        }
    }

display();

