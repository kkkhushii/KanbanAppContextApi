/* eslint-disable react/prop-types */
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dropdown } from 'react-bootstrap';
import EditTaskModal from '../Todos/TaskModal/EditTaskModal';
import { useEffect, useState } from 'react'
import axios from 'axios'

function TaskCoponent({ task, onDeleteTask }) {

    // edittask
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedTask, setEditedTask] = useState(task);


    const handleShowEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);


    const backgroundColor = editedTask.taskProperty === 'Design' ? '#36c76c' :
        editedTask.taskProperty === 'Developement' ? '#ffd648' :
            editedTask.taskProperty === 'Mobile' ? '#635bff' :
                editedTask.taskProperty === 'UX Stage' ? '#ffd648' :
                    editedTask.taskProperty === 'Research' ? '#46caeb' :
                        editedTask.taskProperty === 'Data Science' ? '#ff6692' :
                            editedTask.taskProperty === 'Branding' ? '#36c76c' : '#fff';



    const handleSaveEditedTask = async (editedTaskData) => {
        try {
            const response = await axios.put('/api/TodoData/editTask', {
                taskId: editedTaskData.id,
                newData: editedTaskData
            });
            if (response.status === 200) {
                setEditedTask(editedTaskData);
            } else {

                throw new Error('Failed to edit task');
            }
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };


    // const handleSaveEditedTask = async (editedTaskData) => {
    //     try {
    //         console.log('Edited Task Data:', editedTaskData); // Log the edited task data

    //         const response = await fetch('/api/TodoData/editTask', {

    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 taskId: editedTaskData.id,
    //                 newData: editedTaskData,
    //             }),
    //         })

    //         // const response = await fetch('/api/TodoData/editTask');
    //         // console.log(response);
    //         // const json = await response.json();
    //         // setEditedTask(json);


    //         if (!response.ok) {
    //             throw new Error('Failed to edit task');
    //         }

    //         // Update the task data in the state if the request is successful
    //         setEditedTask(editedTaskData);
    //         console.log('Edited Task Data:', editedTaskData);

    //     } catch (error) {
    //         console.error('Error editing task:', error);
    //         // Handle the error or display an error message to the user
    //     }
    // };





    const handleDeleteClick = () => {
        onDeleteTask(task.id);
    };

    return (
        <div className='card-body bg-white' >
            <div className='task-header'>
                <div>
                    <h4>{editedTask.task}</h4>

                </div>
                <div className='dropdown'>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" variant="none" className="custom-toggle" >
                            <MoreVertIcon />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleShowEditModal}><EditIcon />  Edit</Dropdown.Item>
                            <Dropdown.Item onClick={handleDeleteClick}> <DeleteIcon /> Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <EditTaskModal
                        show={showEditModal}
                        onHide={handleCloseEditModal}
                        task={task}
                        editedTask={editedTask}
                        onSave={handleSaveEditedTask}
                    />
                </div>
            </div>
            <div className='task-content'>

                {editedTask.taskImage && (
                    <img src={editedTask.taskImage} alt="Task Image" className='img-fluid' />
                )}
            </div>
            <div className='task-content'><p>{editedTask.taskText}</p></div>
            <div className="task-body">
                <div className="task-bottom">
                    <div className="tb-section-1">
                        <span className="hstack gap-2">
                            <CalendarTodayIcon style={{ fontSize: "1.125rem" }} />
                            {editedTask.date}
                        </span>
                    </div>
                    <div className="tb-section-2">
                        <span className="badge" style={{ backgroundColor, color: "white" }}>{editedTask.taskProperty}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCoponent



