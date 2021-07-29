const Note = require('../models/note');

exports.fetchUserMovieNote = async (req, res) => {
    const userId = req?.profile?.id;
    const { movieId } = req.params;

    if (!movieId) {
        throw new Error('Movie id missing');
    }

    try {
        let note = await Note.findOne({
            where: { userId, movieId: movieId }
        });
        
        res.status(200).send({ note });
    } catch (error) {
        res.status(400).send({ error });
    }
}

exports.create = async (req, res) => {
    try {
        const {
            movieId,
            note
        } = req.body;

        const userId = req?.profile?.id;

        const newNote = await Note.create({
            movieId,
            note,
            userId
        });

        await newNote.save();

        res.status(201).send({ message: 'New note added succesfully.' });
    } catch (error) {
        res.status(400).send({ error });
    }
}

exports.updateNote = async (req, res) => {
    const userId = req?.profile?.id;
    const { note } = req.body;
    const { noteId } = req.params;

    if (!noteId) {
        throw new Error('Note id missing');
    }

    try {
        const noteToUpdate = await Note.findOne({ where: { id: noteId }});

        if (noteToUpdate.userId !== userId) {
            throw new Error('Note cannot be updated');
        }

        if (!noteToUpdate) {
            throw new Error('Note can not be found.');
        }

        await noteToUpdate.update({note});

        res.status(200).send({ message: 'Updated' });
    } catch (error) {
        return res.status(400).send({ error });
    }
}