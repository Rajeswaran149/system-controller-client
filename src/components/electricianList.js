import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchElectricians } from '../redux/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const ElectricianList = () => {
  const dispatch = useDispatch();
  const [editingID, setEditingID] = useState(null);
  const [addMode, setAddMode] = useState({});
  const [modal, setModal] = useState(false);
  const electricians = useSelector(state => state.electricians);
  const [editChg, setEditChg] = useState({});

  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(fetchElectricians());
  }, [dispatch]);

  const addNewElectrician = async () => {
    try {
      const len = electricians.length+1;
      addMode["ID"] = len;
      await axios.post('http://localhost:5000/api/electricians/add', addMode);
      dispatch(fetchElectricians());
      setAddMode({});
      toggle();
    } catch (err) {
      console.error('Error adding electrician:', err);
    }
  };

  const handleNewElectrician = (event, field) => {
    const { value } = event.target;
    setAddMode({ ...addMode, [field]: value });
  };

  const handleEditClick = (id) => setEditingID(id);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/electricians/${id}`);
      dispatch(fetchElectricians());
    } catch (err) {
      console.error('Error deleting electrician:', err);
    }
  };

  const handleSaveClick = async () => {
    try {
      const objIndex = electricians.findIndex(e => e.ID === editingID);
      const findObj = electricians.find(e => e.ID === editingID);
      const newObj = { ...findObj, ...editChg };
      
      await axios.post('http://localhost:5000/api/electricians/edit', newObj);
      dispatch(fetchElectricians());
      setEditingID(null);
    } catch (err) {
      console.error('Error saving electrician:', err);
    }
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setEditChg({ ...editChg, [field]: value });
  };

  const handleCancelClick = () => setEditingID(null);

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Electricians</h2>
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
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="Name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => handleNewElectrician(e, 'Name')}
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  id="contact"
                  type="text"
                  name="Contact"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => handleNewElectrician(e, 'Contact')}
                />
              </div>
              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                  Occupation
                </label>
                <input
                  id="occupation"
                  type="text"
                  name="Occupation"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => handleNewElectrician(e, 'Occupation')}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-solid border-2">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-solid border-2">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-solid border-2">Occupation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-solid border-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {electricians.map((e) => (
              <tr key={e.ID} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-solid border-2">{e.ID}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-2">
                  {editingID === e.ID ? (
                    <input
                      type="text"
                      name="Name"
                      defaultValue={e.Name}
                      className="border border-gray-300 rounded-md py-1 px-2"
                      onChange={(e) => handleInputChange(e, 'Name')}
                    />
                  ) : (
                    e.Name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-2">
                  {editingID === e.ID ? (
                    <input
                      type="text"
                      name="Contact"
                      defaultValue={e.Contact}
                      className="border border-gray-300 rounded-md py-1 px-2"
                      onChange={(e) => handleInputChange(e, 'Contact')}
                    />
                  ) : (
                    e.Contact
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-2">
                  {editingID === e.ID ? (
                    <input
                      type="text"
                      name="Occupation"
                      defaultValue={e.Occupation}
                      className="border border-gray-300 rounded-md py-1 px-2"
                      onChange={(e) => handleInputChange(e, 'Occupation')}
                    />
                  ) : (
                    e.Occupation
                  )}
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
                        className="text-white hover:text-blue-900 mr-2 bg-blue-500 px-4 py-1 rounded-sm"
                        onClick={() => handleEditClick(e.ID)}
                      >
                        Edit
                      </button>
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

export default ElectricianList;
