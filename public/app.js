document.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    const content = event.target.dataset.title
    if (event.target.dataset.type === "remove") {
        remove(id).then(() => {
            event.target.closest("li").remove();
        });
    } 
    if (event.target.dataset.type === "update") {
        console.log(content)
        const text = prompt("Edit message", content)
        if(text !== null){
            update(id, text).then(() => {location.reload()});
        }
    }
});

async function update(id, title) {
    await fetch(`/${id}&${title}`, { method: "PUT" });
}

async function remove(id) {
    await fetch(`/${id}`, { method: "DELETE" });
}
