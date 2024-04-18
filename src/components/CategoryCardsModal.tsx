import React, { FC } from 'react';

interface Category {
  name: string;
  description: string;
}

interface CategoryCardsModalProps {
  categories: Category[];
  isOpen: boolean;
  toggleModal: () => void; // Function to open/close the modal
  onCategoryClick: (category: Category) => void;
  wordListCount: number;
}

const CategoryCardsModal: FC<CategoryCardsModalProps> = ({ categories, isOpen, toggleModal, onCategoryClick, wordListCount }) => {
  if (!categories.length) return null;  // Handle case with no categories

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <div key={index} className="card bg-gray-100 p-4 rounded hover:bg-gray-200 cursor-pointer" onClick={() => onCategoryClick(category)}>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              ))}
            </div>
            {wordListCount > 0 && (
              <button
                className="mt-4 text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded"
                onClick={toggleModal}
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryCardsModal;
