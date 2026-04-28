const { readNotes, saveNotes } = require("../services/notes.service");

function getAllNotes(req, res) {
  const notes = readNotes();

  res.json({
    status: "success",
    count: notes.length,
    data: notes,
  });
}

function getOneNote(req, res) {
  const notes = readNotes();

  const note = notes.find(
    (item) => String(item.id) === req.params.id
  );

  if (!note) {
    return res.status(404).json({
      status: "error",
      message: "Note not found",
    });
  }

  res.json({
    status: "success",
    data: note,
  });
}

function createNote(req, res) {
  const notes = readNotes();

  const newNote = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content,
  };

  notes.push(newNote);
  saveNotes(notes);

  res.status(201).json({
    status: "success",
    message: "Note created",
    data: newNote,
  });
}

function updateNote(req, res) {
  const notes = readNotes();

  const noteIndex = notes.findIndex(
    (item) => String(item.id) === req.params.id
  );

  if (noteIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Note not found",
    });
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    title: req.body.title,
    content: req.body.content,
  };

  saveNotes(notes);

  res.json({
    status: "success",
    message: "Note updated",
    data: notes[noteIndex],
  });
}

function deleteNote(req, res) {
  const notes = readNotes();

  const newNotes = notes.filter(
    (item) => String(item.id) !== req.params.id
  );

  if (notes.length === newNotes.length) {
    return res.status(404).json({
      status: "error",
      message: "Note not found",
    });
  }

  saveNotes(newNotes);

  res.json({
    status: "success",
    message: "Note deleted",
  });
}

module.exports = {
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
};