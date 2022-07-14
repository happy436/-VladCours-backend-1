const express = require("express")
const port = 3000;
const chalk = require("chalk");
const path = require("path")
const { addNote, getNotes, removeNote, updateNote } = require("./notes.controller");

const app = express()

app.set("view engine", "ejs")
app.set("views", "pages")

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", async (req,res) => {
     res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created:false
    })
})

app.post("/", async (req,res) => {
    await addNote(req.body.title)
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: true
    })
})

app.put(`/:id&:title`, async (req, res) => {
    await updateNote(req.params)
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false
    })
})

app.delete("/:id", async (req, res) => {
    removeNote(req.params.id)
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false
    })
})

app.listen(port, () => {
    console.log(chalk.bgGreen(`Server has been started on port: ${port}`));
});
