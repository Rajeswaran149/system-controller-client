import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchComplaints } from '../redux/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { base_url } from '../config';

const CustomerComplaint = () => {
  const dispatch = useDispatch();
  const [editingID, setEditingID] = useState(null);
  const [addMode, setAddMode] = useState({});
  const [modal, setModal] = useState(false);
  const complaints = useSelector(state => state.complaints);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);
 console.log(complaints)

 function generateRandomId() {
    return Math.floor(10000 + Math.random() * 90000); // Ensures the number is always 5 digits
}


  const addNewElectrician = async () => {
    try {
      addMode["ID"] = generateRandomId();
      await axios.post(`${base_url}/api/complaints/add`, addMode);
      dispatch(fetchComplaints());
      setAddMode({});
      toggle();
    } catch (err) {
      console.error('Error adding complaint:', err);
    }
  };

  const handleNewElectrician = (event, field) => {
    const { value } = event.target;
    setAddMode({ ...addMode, [field]: value });
  };

 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/api/complaints/${id}`);
      dispatch(fetchComplaints());
    } catch (err) {
      console.error('Error deleting electrician:', err);
    }
  };

  const handleSaveClick = async () => {
    try {
      const findObj = complaints.find(e => e.ID === editingID);
      const newObj = { ...findObj};
      
      await axios.post(`${base_url}/api/complaints/edit`, newObj);
      dispatch(fetchComplaints());
      setEditingID(null);
    } catch (err) {
      console.error('Error saving electrician:', err);
    }
  };

 
  const handleCancelClick = () => setEditingID(null);

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="overflow-x-auto">
        <button
          className="text-white hover:text-green-900 mr-2 bg-green-500 px-4 py-1 rounded-sm"
          onClick={toggle}
        >
          Add
        </button>

        <Modal isOpen={modal} toggle={toggle} className="relative max-w-lg mx-auto my-4">
          <ModalHeader toggle={toggle} className="bg-gray-100 border-b border-gray-200">
            Add New
          </ModalHeader>
          <ModalBody className="p-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  id="customerName"
                  type="text"
                  name="customerName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => handleNewElectrician(e, 'customerName')}
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Customer Address
                </label>
                <input
                  id="customerAddress"
                  type="text"
                  name="customerAddress"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => handleNewElectrician(e, 'customerAddress')}
                />
              </div>
              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <input
                  id="category"
                  type="text"
                  name="category"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => handleNewElectrician(e, 'category')}
                />
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  name="description"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => handleNewElectrician(e, 'description')}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="bg-gray-100 border-t border-gray-200">
            <Button color="primary" onClick={addNewElectrician} className="w-full py-2 px-4 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Save
            </Button>
          </ModalFooter>
        </Modal>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-solid border-2">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-solid border-2">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-solid border-2">Customer Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-solid border-2">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-solid border-2">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-solid border-2">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-solid border-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((e) => (
              <tr key={e.ID} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-solid border-2">{e.ID}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-2">
                   { e.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-2">
                    {e.customerAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-2">
                   { e.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-2">
                    {e.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-2">
                    {e.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingID === e.ID ? (
                    <>
                      <button
                        className="text-white hover:text-blue-900 mr-2 bg-blue-500 px-4 py-1 rounded-sm"
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                      <button
                        className="text-white hover:text-red-900 mr-2 bg-red-500 px-4 py-1 rounded-sm"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                     
                      <button
                        className="text-white hover:text-red-900 mr-2 bg-red-500 px-4 py-1 rounded-sm"
                        onClick={() => handleDelete(e.ID)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerComplaint;
