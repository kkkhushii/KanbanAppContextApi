import { Modal, Button, Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { TaskProperties } from '../../../api/TaskData'

// function AddNewList({ show, onHide, onSave, taskProperties, newTaskData, setNewTaskData, updateTasks }) {
function AddNewList({ show, onHide, onSave, newTaskData, setNewTaskData, updateTasks }) {

    const { task, taskText, taskProperty, date, taskImage } = newTaskData;

    const handleSave = () => {
        onSave();
        updateTasks();
    };

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
                            onChange={(e) => setNewTaskData({ ...newTaskData, taskProperty: e.target.value })}>
                            <option value="">Select Task Property</option>
                            {TaskProperties.map(property => (
                                <option key={property} value={property}>
                                    {property}
                                </option>

                            ))}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="dueDate" className='AddTaskstyle'>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setNewTaskData({ ...newTaskData, date: e.target.value })}
                            className="form-control"
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
