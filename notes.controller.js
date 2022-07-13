const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString(),
    };
    notes.push(note);
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log(
        notes.length !== 0
            ? chalk.bgBlue("Here is the list of notes: \n===========")
            : chalk.bgRed("Notes list empty")
    );
    notes.forEach((note, index) => {
        console.log(
            chalk.bgBlue(index + 1 + ".", `${note.title}\nid: ${note.id}\n===========`)
        );
    });
}

async function removeNoteById(id) {
    const notes = await getNotes();
    const newNotes = notes.filter((note) => note.id !== id.toString());
    await fs.writeFile(notesPath, JSON.stringify(newNotes));
    console.log(chalk.bgGreen("Note was deleted!"));
}

async function removeAll() {
    await fs.writeFile(notesPath, JSON.stringify([]));
}

module.exports = {
    addNote,
    printNotes,
    removeNoteById,
    removeAll,
};
