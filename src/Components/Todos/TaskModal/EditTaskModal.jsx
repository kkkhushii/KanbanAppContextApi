/* eslint-disable react/prop-types */
import { Modal, Button, Dropdown } from 'react-bootstrap';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import axios from 'axios'

function EditTaskModal({ show, onHide, editedTask, onSave }) {
    const [tempEditedTask, setTempEditedTask] = useState(editedTask);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempEditedTask({ ...tempEditedTask, [name]: value });
    };
    const handlePropertyChange = (property) => {
        setTempEditedTask({ ...tempEditedTask, taskProperty: property });
    };

    const handleDateChange = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const formattedDate = `${day} ${month}`;
        setTempEditedTask({ ...tempEditedTask, date: formattedDate });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setTempEditedTask({ ...tempEditedTask, taskImage: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSaveChanges = () => {
        onSave(tempEditedTask);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Task</label>
                        <input
                            type="text"
                            className="form-control"
                            name="task"
                            value={tempEditedTask.task}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Task Text</label>
                        <textarea className="form-control" name="taskText" value={tempEditedTask.taskText} onChange={handleChange} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Task Image</label>
                        {tempEditedTask.taskImage ? (
                            <div>
                                <img src={tempEditedTask.taskImage} alt="Task Image" className="img-fluid" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control"
                                    name="taskImageFile"
                                    onChange={(e) => handleImageChange(e)}
                                />
                            </div>
                        ) : (
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                name="taskImageFile"
                                onChange={(e) => handleImageChange(e)}
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Task Property</label>
                        <Dropdown>
                            <Dropdown.Toggle variant='none' id="dropdown-basic">
                                {tempEditedTask.taskProperty} <ArrowDropDownIcon />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handlePropertyChange('Design')}>
                                    Design
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePropertyChange('Developement')}>
                                    Development
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePropertyChange('Mobile')}>
                                    Mobile
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePropertyChange('UX Stage')}>
                                    UX Stage
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePropertyChange('Research')}>
                                    Research
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePropertyChange('Data Science')}>
                                    Data Science
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handlePropertyChange('Branding')}>
                                    Branding
                                </Dropdown.Item>


                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date</label>
                        <div>
                            <DatePicker selected={tempEditedTask.date} onChange={handleDateChange} className="form-control" />
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditTaskModal
