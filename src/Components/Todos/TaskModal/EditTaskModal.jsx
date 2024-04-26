import { Modal, Button, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

function EditTaskModal({ show, onHide, editedTask, onSave }) {
    const [tempEditedTask, setTempEditedTask] = useState(editedTask);

    // this is for formated date 24 july to mm/dd/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempEditedTask({ ...tempEditedTask, [name]: value });
    };
    const handlePropertyChange = (property) => {
        setTempEditedTask({ ...tempEditedTask, taskProperty: property });
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
                <Form>
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
                                    type="text"
                                    className="form-control mt-2"
                                    placeholder="Change Image URL"
                                    name="taskImageURL"
                                    value={tempEditedTask.taskImage}
                                    onChange={(e) => setTempEditedTask({ ...tempEditedTask, taskImage: e.target.value })}
                                />

                            </div>
                        ) : (
                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Type Image URL"
                                name="taskImageURL"
                                value={tempEditedTask.taskImage}
                                onChange={(e) => setTempEditedTask({ ...tempEditedTask, taskImage: e.target.value })}
                            />

                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Task Property</label>
                        <Form.Group controlId="taskProperty" className='AddTaskstyle'>
                            <Form.Select
                                value={tempEditedTask.taskProperty}
                                onChange={(e) => handlePropertyChange(e.target.value)}
                                className="form-select">
                                <option value="Design">Design</option>
                                <option value="Developement">Development</option>
                                <option value="Mobile">Mobile</option>
                                <option value="UX Stage">UX Stage</option>
                                <option value="Research">Research</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Branding">Branding</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date</label>
                        <div>
                            <input
                                type="date"
                                value={formatDate(tempEditedTask.date)}
                                onChange={(e) => setTempEditedTask({ ...tempEditedTask, date: e.target.value })}
                                className="form-control"
                            />
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            </Modal.Footer>
        </Modal >
    )
}

export default EditTaskModal
