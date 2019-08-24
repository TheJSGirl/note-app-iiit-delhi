const Note = require('./models');
const { response } = require('../../utils');

async function list(req, res) {

  const notes = await Note.find({ deleted: false });
  const total = await Note.count();
  console.log(notes)
  res.status(200).send(response({ notes, total }, '', true));
}

async function listMyBooks(req, res) {
  const limit = parseInt(req.query.limit, 10) || 100;
  const skip = parseInt(req.query.skip, 10) || 0;
  const books = await Note.find({ deleted: false, user: req.user._id }).skip(skip).limit(limit);
  const total = await Note.count();
  res.status(200).send(response({ books, total }, '', true));
}

async function listOne(req, res) {
  const { id } = req.params;
  const book = await Note.findOne({ _id: id, deleted: false });
  res.status(200).json(response(book, '', true));
}

async function create(req, res) {
  // Admins only can create books as of now
  // if (!req.permission.admin) {
  //   return res.status(401).send(response({}, 'Unauthorized request', false));
  // }
  const note = await Note
    .create({ ...req.body });
  if (!note) {
    return res.status(400).send(response({}, 'Something went wrong', false));
  }
  return res.status(200).send(response(note, '', true));
}

async function edit(req, res) {
  const { id } = req.params;
  const note = await Note
    .findOneAndUpdate({  _id: id }, { ...req.body }, { new: true });
  if (!note) {
    return res.status(400).send(response({}, 'Something went wrong', false));
  }
  return res.status(200).send(response(note, 'Successfully Updated the note', true));
}

async function remove(req, res) {
  const { id } = req.params;
  const note = await Note
    .findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
  if (!note) {
    return res.status(400).send(response({}, 'Something went wrong', false));
  }
  return res.status(200).send(response({}, 'Successfully deleted the note', true));
}

module.exports = {
  list,
  listOne,
  create,
  remove,
  edit,
  listMyBooks,
};
