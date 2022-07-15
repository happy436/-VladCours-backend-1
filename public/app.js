const allCardsButtons = document.querySelectorAll(".card__buttons");
const allCardsForms = document.querySelectorAll(".card__form");
const editsButtons = document.querySelectorAll(".edit");

/* Для закрытие всех форм Edit при нажатии по кнопке Edit*/
editsButtons.forEach(function (btn) {
    btn.addEventListener("click", () => {
        for (let i = 0; i < allCardsButtons.length; i++) {
            allCardsButtons[i].hidden = false;
            allCardsForms[i].hidden = true;
        }
    });
});

document.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    const noteElement = event.target.closest("li");

    if (event.target.dataset.type === "remove") {
        remove(id).then(() => {
            noteElement.remove();
        });
    }

	/* Функция для уменьшения кода */
	/* Функция для изменения рендера либо кнопок либо формы edit */
	function toggleForm(buttonBool, formBool){
		for (let i = 0; i < noteElement.children.length; i++) {
            if (noteElement.children[i].className === "card__buttons") {
                noteElement.children[i].hidden = buttonBool;
            }
            if (noteElement.children[i].className === "card__form") {
                noteElement.children[i].hidden = formBool;
            }
        }
	}


	/* При нажатии на кнопку Edit */
    if (event.target.dataset.type === "edit") {
        toggleForm(true, false)
    }

	/* При нажатии на кнопку Save */
	if(event.target.dataset.type === "save"){
		const text = noteElement.children[1].children[0].value
		update(id, text).then(() => {
			location.reload();
		});
	}

	/* При нажатии на кнопку х */
	if(event.target.dataset.type === "close"){
		toggleForm(false, true)
	}
});



async function update(id, title) {
    await fetch(`/${id}&${title}`, { method: "PUT" });
}

async function remove(id) {
    await fetch(`/${id}`, { method: "DELETE" });
}
