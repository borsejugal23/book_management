import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { deleteBook, fetchAllBooks } from "../Redux/BookListReducer/action";
import { AiTwotoneDelete } from "react-icons/ai";

export const DeleteBook = ({ bookId }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDeleteBook = () => {
    // Dispatch the deleteBook action
    dispatch(deleteBook(bookId));

    // Dispatch the fetchAllBooks action to get the updated list
    dispatch(fetchAllBooks);

    // Close the modal after dispatching
    setModalOpen(false);
  };

  return (
    <>
      <button
        className="inline-block p-2 mx-1 mb-2 md:mb-0 border border-red-300 hover:border-red-600"
        onClick={() => setModalOpen(true)}
      >
        <AiTwotoneDelete />
      </button>

      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        <div className="mx-auto max-w-lg">
          <p className="text-xl font-semibold text-gray-800 mb-4">
            Are you sure you want to delete this book?
          </p>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-700 cursor-pointer mr-2"
              onClick={handleDeleteBook}
            >
              Confirm
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 cursor-pointer"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
