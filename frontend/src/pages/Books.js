import React, { useState, useEffect } from 'react';
import { booksAPI } from '../utils/api';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [filters, setFilters] = useState({ search: '', category: '', status: '' });
  const [formData, setFormData] = useState({
    book_id: '',
    name_of_book: '',
    category: '',
    name_of_writer: '',
    price_of_book: '',
    year_of_purchase: '',
    remarks: '',
    theme_of_book: ''
  });

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const fetchBooks = async () => {
    try {
      const response = await booksAPI.getAll(filters);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await booksAPI.update(editingBook.book_id, formData);
      } else {
        await booksAPI.create(formData);
      }
      setShowForm(false);
      setEditingBook(null);
      resetForm();
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData(book);
    setShowForm(true);
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await booksAPI.delete(bookId);
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      book_id: '',
      name_of_book: '',
      category: '',
      name_of_writer: '',
      price_of_book: '',
      year_of_purchase: '',
      remarks: '',
      theme_of_book: ''
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Books Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Book
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search books or authors..."
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <select
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="Law">Law</option>
            <option value="Literature">Literature</option>
            <option value="Biography">Biography</option>
            <option value="History">History</option>
            <option value="Mythology">Mythology</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Issued">Issued</option>
          </select>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.book_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.book_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.name_of_book}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.name_of_writer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    book.current_status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {book.current_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(book)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.book_id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                placeholder="Book ID"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.book_id}
                onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
                disabled={editingBook}
              />
              <input
                type="text"
                placeholder="Book Name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.name_of_book}
                onChange={(e) => setFormData({ ...formData, name_of_book: e.target.value })}
              />
              <input
                type="text"
                placeholder="Author"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.name_of_writer}
                onChange={(e) => setFormData({ ...formData, name_of_writer: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.price_of_book}
                onChange={(e) => setFormData({ ...formData, price_of_book: e.target.value })}
              />
              <input
                type="number"
                placeholder="Year of Purchase"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.year_of_purchase}
                onChange={(e) => setFormData({ ...formData, year_of_purchase: e.target.value })}
              />
              <textarea
                placeholder="Theme"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.theme_of_book}
                onChange={(e) => setFormData({ ...formData, theme_of_book: e.target.value })}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBook(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingBook ? 'Update' : 'Add'} Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;