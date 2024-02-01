import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { addBook, fetchAllBooks } from "../Redux/BookListReducer/action";

export const AddBook = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "publishedYear" ? parseInt(value, 10) : value,
    }));
  };

  const handleAddBook = () => {
    dispatch(addBook(formData))
      .then((result) => {
        dispatch(fetchAllBooks);
      })
      .catch((error) => {
        dispatch(fetchAllBooks);
      });
    setModalOpen(false);
    setFormData({
      title: "",
      author: "",
      publishedYear: 0,
    });
  };

  return (
    <>
      <button
        className="flex items-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <IoMdAddCircleOutline className="mr-2" />
        Add Book
      </button>

      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        <form className="mx-auto max-w-lg">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-600"
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="publishedYear"
              className="block text-sm font-medium text-gray-600"
            >
              Published Year:
            </label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer w-full"
              onClick={handleAddBook}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
