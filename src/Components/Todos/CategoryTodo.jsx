import { useContext, useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskCoponent from '../Todos/TaskCoponent'
import EditCategoryModal from '../Todos/TaskModal/EditCategoryModal'
import AddNewTaskModal from '../Todos/TaskModal/AddNewTaskModal'
import TodoDataContext from '../../ContextApi/TodoDataContext'
import axios from 'axios'

function CategoryTodo({ id }) {

    const { todoCategories, deleteCategory, clearAllTasks, deleteTodo } = useContext(TodoDataContext);
    const category = todoCategories.find(cat => cat.id === id);

    const [allTasks, setAllTasks] = useState(category ? category.child : []);
    const [showModal, setShowModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState(category.name);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [showContainer, setShowContainer] = useState(true);
    const taskProperties = ['Design', 'Development', 'UI Design', 'Research', 'UX Stage', 'Data Science', 'Branding'];
    const [newTaskData, setNewTaskData] = useState({
        task: '',
        taskText: '',
        taskProperty: '',
        date: new Date(),
        imageURL: null
    });

    // this is for add task in category modal
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    // this is for edit modal 
    const handleShowEditCategoryModal = () => setShowEditCategoryModal(true);
    const handleCloseEditCategoryModal = () => setShowEditCategoryModal(false);


    const handleUpdateCategory = async (updatedName) => {
        try {
            const response = await axios.post('/api/TodoData/updateCategory', {
                categoryId: id,
                categoryName: updatedName
            });
            if (response.status === 200) {
                setNewCategoryName(updatedName);
            } else {
                throw new Error('Failed to update category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleAddTask = async () => {
        try {

            const response = await axios.post('/api/TodoData/addTask', {
                categoryId: id,
                newTaskData: { ...newTaskData, id: Math.random(), taskImage: newTaskData.imageURL }
            });
            if (response.status === 200) {

                setNewTaskData({
                    taskText: '',
                    taskProperty: '',
                    date: newTaskData.date,
                    imageURL: ''
                });

                handleCloseModal();
                setNewTaskData('Task added successfully');
                console.log('Task added successfully:', response.data);

            } else {

                throw new Error('Failed to add task');
            }
        } catch (error) {

            console.error('Error adding task:', error);
        }
    };


    const handleClearAll = () => {
        clearAllTasks(id);
        setAllTasks([]);
    }


    const handleDeleteTask = (taskId) => {
        deleteTodo(taskId);
        setAllTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const handleDeleteClick = () => {
        setShowContainer(false);
        deleteCategory(id);
    };


    const backgroundColor = category ? (
        category.name === 'Todo' ? '#eff4fa' :
            category.name === 'Progress' ? 'rgba(20, 233, 226, 0.2)' :
                category.name === 'Pending' ? 'rgba(70, 202, 235, 0.2)' :
                    category.name === 'Done' ? '#36c76c2e' : '#dfe5ef'
    ) : '#dfe5ef';


    return (
        <div className='task-list-container'>
            {showContainer && category && (
                <div className='connect-sorting connect-sorting-todo' style={{ backgroundColor }}>

                    <div className='task-container-header'>
                        <h6 className='fw-semibold'>{newCategoryName}</h6>
                        <div className="hstack gap-2">
                            <div className='add-kanban-title'>
                                {category.name === 'Todo' && (
                                    <>
                                        <AddIcon onClick={handleShowModal} />
                                        <AddNewTaskModal
                                            show={showModal}
                                            onHide={handleCloseModal}
                                            onSave={handleAddTask}
                                            taskProperties={taskProperties}
                                            newTaskData={newTaskData}
                                            setNewTaskData={setNewTaskData}

                                            updateTasks={() => setAllTasks([...allTasks, newTaskData])}
                                        />
                                    </>
                                )}

                                <EditCategoryModal
                                    showModal={showEditCategoryModal}
                                    handleCloseModal={handleCloseEditCategoryModal}
                                    initialCategoryName={newCategoryName}
                                    handleUpdateCategory={handleUpdateCategory}
                                />
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="custom-toggle" variant="none">
                                    <MoreVertIcon className='icon' />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleShowEditCategoryModal}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={handleDeleteClick}>Delete</Dropdown.Item>
                                    <Dropdown.Item onClick={handleClearAll}>Clear All</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <div className='connect-sorting-content'>
                        {allTasks.map(task => (
                            <TaskCoponent key={task.id} task={task} onDeleteTask={handleDeleteTask} />
                        ))}

                    </div>

                </div >
            )}
        </div>
    )
}

export default CategoryTodo
