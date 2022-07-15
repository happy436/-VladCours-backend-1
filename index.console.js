const yargs = require("yargs");
const {
    addNote,
    getNotes,
    removeNote,
    editNote,
} = require("./notes.controller");

yargs.command({
    command: "add",
    describe: "Add new note to list",
    builder: {
        title: {
            type: "string",
            describe: "Note title",
            demandOption: true,
        },
    },
    handler({ title }) {
        addNote(title);
    },
});

yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler() {
        console.log(await getNotes());
    },
});

yargs.command({
    command: "remove",
    describe: "Remove note by id",
    builder: {
        id: {
            type: "string",
            describe: "note id",
            demandOption: true,
        },
    },
    handler({ id }) {
        removeNote(id);
    },
});

yargs.command({
    command: "edit",
    describe: "Edit note by id",
    builder: {
        title: {
            type: "string",
            describe: "New note title",
            demandOption: true,
        },
        id: {
            type: "string",
            describe: "Note ID of which is being changed",
            demandOption: true,
        },
    },
    handler({ id, title }) {
        editNote(id, title);
    },
});

yargs.parse();
