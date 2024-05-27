let links = document.querySelectorAll(".delete");
for (let link of links) {
    link.addEventListener("click",function(){
        const userConfirmed = confirm("Are you sure that you want to delete this chat?");
        if(userConfirmed) {
            const chatId = this.getAttribute("chat-id");
            fetch (`/chats/${chatId}/delete`);
            alert("Chat deleted successfully!");
        }
    });
}
