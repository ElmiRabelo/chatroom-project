// dom queries
const chatList = document.querySelector('.chat-list');

//class instances
const chatroom = new Chatroom('gaming', 'golden');
const chatUI = new ChatUI(chatList);

//get chats from the server and render
chatroom.getChats( data => chatUI.render(data) );
