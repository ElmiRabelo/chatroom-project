// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then( () => newChatForm.reset() )
    .catch( err => console.log(err) );
});

//update username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  //update name via chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  //reset form
  newNameForm.reset();

  //show then hide the update message
  updateMsg.innerText = `Your name was updated to ${newName}`;
  updateMsg.style.display = 'block';
  setTimeout( () => updateMsg.style.display = 'none', 3000 );

});

rooms.addEventListener('click', e => {
  if( e.target.tagName === 'BUTTON' ) {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats( data => chatUI.render(data) );
  }

});

// check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon' 

//class instances
const chatroom = new Chatroom('general', username);
const chatUI = new ChatUI(chatList);

//get chats from the server and render
chatroom.getChats( data => chatUI.render(data) );
