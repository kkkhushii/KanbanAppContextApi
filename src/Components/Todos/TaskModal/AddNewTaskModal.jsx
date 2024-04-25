import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

function AddNewList({ show, onHide, onSave, taskProperties, newTaskData, setNewTaskData, updateTasks }) {
    const { task, taskText, taskProperty, date, taskImage } = newTaskData;

    const handleSave = () => {
        onSave();
        updateTasks();
    };


    const todayDate = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(todayDate);


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="task" className='AddTaskstyle'>
                        <Form.Control
                            type="text"
                            placeholder="task"
                            value={task}

                            onChange={(e) => setNewTaskData({ ...newTaskData, task: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="taskText" className='AddTaskstyle'>
                        <Form.Group controlId="taskText" className='AddTaskstyle'>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="task text"
                                value={taskText}
                                onChange={(e) => setNewTaskData({ ...newTaskData, taskText: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="taskText" className='AddTaskstyle'>
                            <Form.Control
                                type='text'
                                placeholder="Add image URL"
                                onChange={(e) => setNewTaskData({ ...newTaskData, taskImage: e.target.value })}
                            />
                        </Form.Group>
                        {taskImage !== undefined ?
                            <img src={taskImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
                            : ''}

                    </Form.Group>

                    <Form.Group controlId="taskProperty" className='AddTaskstyle'>
                        <Form.Select
                            value={taskProperty}
                            onChange={(e) => setNewTaskData({ ...newTaskData, taskProperty: e.target.value })}
                        >
                            <option value="">Select Task Property</option>
                            {taskProperties.map(property => (
                                <option key={property} value={property}>
                                    {property}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="dueDate" className='AddTaskstyle'>
                        {/* <DatePicker
                            selected={date}
                            dateFormat="dd MMMM"
                            // onChange={(date) => setNewTaskData({ ...newTaskData, date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }) })}
                            onChange={(date) => setNewTaskData({ ...newTaskData, date: date })}
                            className="form-control"
                        /> */}
                        <input
                            type="date"
                            // value={date}
                            // onChange={(e) => setNewTaskData({ ...newTaskData, date: e.target.value })}
                            className="form-control"
                            value={selectedDate} // Use selected date state
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}

export default AddNewList;
