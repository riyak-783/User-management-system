import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import UserForm from "./UserForm";
import { toast } from "react-toastify";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error('Failed to load users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users: " + error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = (user) => {
    navigate(`/user/${user.id}`); // Navigate to the user detail page
  };

  const handleAddUser = () => {
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEditUser = (user, event) => {
    event.stopPropagation(); // Prevent row click
    setIsEditMode(true);
    setEditingUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleFormSubmit = (userData) => {
    if (isEditMode) {
      const updatedUsers = users.map((user) =>
        user.id === userData.id ? userData : user
      );
      setUsers(updatedUsers);
      toast.success("User updated successfully!");
    } else {
      const newId = users.length + 1;
      setUsers([...users, { ...userData, id: newId }]);
      toast.success("User added successfully!");
    }
    setShowModal(false);
  };

  const handleDeleteUser = (userId, event) => {
    event.stopPropagation(); // Prevent row click
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    toast.success("User deleted successfully!"); // Change to success notification
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    // Check if no users are found when search value changes
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filteredUsers.length === 0 && searchValue.trim() !== "") {
      toast.info("No such user found!"); // Notify user when no match is found
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container  mx-auto p-4">
      <div className="flex  justify-between items-center mb-4">
        <h1 className="text-2xl text-black font-serif font-bold">List of Users</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 bg-white text-black   rounded px-4 py-2 w-full md:w-1/3"
        />
      </div>

      <UserForm
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleFormSubmit={handleFormSubmit}
        editingUser={editingUser}
        isEditMode={isEditMode}
      />

      {loading ? ( // Conditional rendering based on loading state
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-700"><span className="loading loading-spinner loading-lg"></span></p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-[#e05596] text-black">
                <th className="py-2 px-4 border-b font-serif">ID No.</th>
                <th className="py-2 px-4 border-b font-serif">Name</th>
                <th className="py-2 px-4 border-b font-serif">Username</th>
                <th className="py-2 px-4 border-b font-serif">Email</th>
                <th className="py-2 px-4 border-b font-serif">Phone</th>
                <th className="py-2 px-4 border-b font-serif">Website</th>
                <th className="py-2 px-4 border-b font-serif">Company Name</th>
                <th className="py-2 px-4 border-b font-serif">Address</th>
                <th className="py-2 px-4 border-b font-serif">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`text-center text-white ${index % 2 === 0 ? "bg-[#e682a6]" : "bg-[#9e84eb]"}`}
                  onClick={() => handleRowClick(user)} 
                >
                  <td className="py-2 px-4 border-b font-mono ">{user.id}</td>
                  <td className="py-2 px-4 border-b font-mono ">{user.name}</td>
                  <td className="py-2 px-4 border-b font-mono">{user.username}</td>
                  <td className="py-2 px-4 border-b font-mono">{user.email}</td>
                  <td className="py-2 px-4 border-b font-mono">{user.phone}</td>
                  <td className="py-2 px-4 border-b font-mono">{user.website}</td>
                  <td className="py-2 px-4 border-b font-mono">{user.company.name}</td>
                  <td className="py-2 px-4 border-b font-mono">
                    {user.address.street}, {user.address.city}, {user.address.zipcode}
                  </td>
                  <td className="py-2 px-4 border-b font-mono">
                    <button
                      className="bg-yellow-400 text-white px-4 py-1 mb-2 rounded-xl hover:bg-yellow-600"
                      onClick={(event) => handleEditUser(user, event)} 
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded-xl hover:bg-red-600"
                      onClick={(event) => handleDeleteUser(user.id, event)} 
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;
