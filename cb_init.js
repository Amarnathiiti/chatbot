var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/gh/Amarnathiiti/chatbot/style.css';
document.head.appendChild(link);


var div = document.createElement('div');
div.innerHTML = <div class="container">
<div class="chatbox">
    <div class="chatbox__support">
        <div class="chatbox__header">
            <div class="chatbox__image--header">
                <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
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
            <input type="text" placeholder="Write a message..." />
            <button class="chatbox__send--footer send__button">Send</button>
        </div>
    </div>
    <div class="chatbox__button">
        <button><img src="{{ url_for('static', filename='images/chatbox-icon.png') }}" /></button>
    </div>
</div>
</div>


document.body.appendChild(div);


var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/gh/Amarnathiiti/chatbot/app.js';
script.type = 'text/javascript';
//script.async = true;
document.body.appendChild(script);