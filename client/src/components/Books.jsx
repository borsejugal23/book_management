import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../Redux/BookListReducer/action";
import { CiEdit } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import Banner from "../pages/Banner";
import Footer from "../pages/Footer";
import { Spinner } from "@chakra-ui/react"; // Import Spinner from Chakra UI

const formatDateTime = (dateTimeString) => {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const dateTime = new Date(dateTimeString);
  const formattedDate = dateTime.toLocaleDateString(undefined, options);

  return `${formattedDate}`;
};

export const Books = () => {
  const dispatch = useDispatch();
  const { isLoading, books } = useSelector((store) => store.bookReducer);
  let id = localStorage.getItem("id");
  // Split the roles into an array using a comma as a separator
  const rolesString = localStorage.getItem("roles") || "";
  const role = rolesString.split(",");
  useEffect(() => {
    dispatch(fetchAllBooks);
  }, []);
  console.log(books, id);
  return (
    <>
      <Banner />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="w-11/12 m-auto overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 ">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-r">Title</th>
              <th className="py-2 px-4 border-r">Author</th>
              <th className="py-2 px-4 border-r">Published Year</th>
              <th className="py-2 px-4 border-r">Created</th>
              {role.includes("CREATOR") && (
                <th className="py-2 px-4">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? ( // Show spinner if data is loading
              <tr>
                <td
                  colSpan={role.includes("CREATOR") ? 5 : 4}
                  className="text-center py-4"
                >
                  <div className="flex justify-center items-center">
                    <Spinner
                      thickness="3px"
                      speed="0.600s"
                      emptyColor="gray.200"
                      color="black.500"
                      size="xl"
                    />
                  </div>
                </td>
              </tr>
            ) : role.includes("CREATOR") ? (
              books?.filter((item) => item.creator === id).length > 0 ? (
                books
                  ?.filter((item) => item.creator === id)
                  .map((item, i) => (
                    <tr key={i + 1} className="border hover:bg-neutral-200">
                      <td className="py-2 px-4 border-r">{item.title}</td>
                      <td className="py-2 px-4 border-r">{item.author}</td>
                      <td className="py-2 px-4 border-r">
                        {item.publishedYear}
                      </td>
                      <td className="py-2 px-4 border-r">
                        {formatDateTime(item.createdAt)}
                      </td>
                      {role.includes("CREATOR") && (
                        <td className="py-2 px-4">
                          <button className="inline-block p-2 mx-1 mb-2 md:mb-0 border border-blue-300 hover:border-blue-600">
                            <CiEdit />
                          </button>
                          <button className="inline-block p-2 mx-1 mb-2 md:mb-0 border border-red-300 hover:border-red-600">
                            <AiTwotoneDelete />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                  .reverse()
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <div className="flex flex-col items-center justify-center text-center">
                      <img
                        src="https://students.masaischool.com/static/media/assignment-article.306c336bf8778468914b433407306985.svg"
                        alt="Data not found"
                        className="w-1/6 md:w-1/3 lg:w-24"
                      />
                      <h1 className="text-lg md:text-md lg:text-lg">
                        Add new data
                      </h1>
                    </div>
                  </td>
                </tr>
              )
            ) : books.length > 0 ? (
              books
                .map((item, i) => (
                  <tr key={i + 1} className="border hover:bg-neutral-200">
                    <td className="py-2 px-4 border-r">{item.title}</td>
                    <td className="py-2 px-4 border-r">{item.author}</td>
                    <td className="py-2 px-4 border-r">{item.publishedYear}</td>
                    <td className="py-2 px-4 border-r">
                      {formatDateTime(item.createdAt)}
                    </td>
                  </tr>
                ))
                .reverse()
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  <div className="flex flex-col items-center justify-center text-center">
                    <img
                      src="https://students.masaischool.com/static/media/assignment-article.306c336bf8778468914b433407306985.svg"
                      alt="Data not found"
                      className="w-1/6 md:w-1/3 lg:w-24"
                    />
                    <h1 className="text-lg md:text-md lg:text-lg">
                      Data not found
                    </h1>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Books;
