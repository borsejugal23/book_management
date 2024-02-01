const express = require('express');
const Book = require('../model/book.model');
const { auth } = require('../middleware/auth.middleware');

const bookRouter = express.Router();


const roleBaseAuth=(allRole)=> (req, res, next)=>{
  
  const isRole= allRole.some(role => req.user.roles.includes(role))

  if(isRole) {
    next()
  }
  else {
    return res.status(403).json({messagee : "You are unauthorized to this operation"})
  }
}


// GET all books
bookRouter.get('/', auth, roleBaseAuth(["CREATOR", "VIEW_ALL"]),  async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// POST a new book
bookRouter.post('/', auth, roleBaseAuth(["CREATOR"]), async (req, res) => {
  try {
    const {userID, }= req.user ;
    const { title, author, publishedYear, createdAt} = req.body
    
    const newBook = new Book({creator: userID, title, author, publishedYear,createdAt });
    await newBook.save();
    res.status(201).json({ msg: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Patch a new book
bookRouter.patch('/:bookId', auth, roleBaseAuth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findOneAndUpdate({_id: bookId}, {...req.body})
    res.status(201).json({ msg: 'Book created successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a book (accessible only to "CREATOR" role)
bookRouter.delete('/delete/:bookId', auth, roleBaseAuth,async (req, res) => {
  try {
    const { user } = req;
    const { bookId } = req.params;

    // Check if the user has the "CREATOR" role
    if (!user.role.includes('CREATOR')) {
      return res.status(403).json({ msg: 'Permission denied' });
    }

    // Delete the book by ID
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    res.status(200).json({ msg: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = bookRouter;
