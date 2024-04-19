import { useContext, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskCoponent from '../Todos/TaskCoponent'
import EditCategoryModal from '../Todos/TaskModal/EditCategoryModal'
import AddNewTaskModal from '../Todos/TaskModal/AddNewTaskModal'
import TodoDataContext from '../../ContextApi/TodoDataContext'

function CategoryTodo({ id }) {

    const { todoCategories, deleteCategory, clearAllTasks, updateCategoryName, deleteTodo, addTaskToCategory } = useContext(TodoDataContext);
    // const [allTasks, setAllTasks] = useState(tasks);

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


    // const handleSaveTask = (newTaskText) => {
    //     setAllTasks([...allTasks, newTaskText]);
    //     handleCloseModal();
    // };
    const handleAddTask = () => {

        addTaskToCategory(id, { ...newTaskData, id: Math.random(), taskImage: newTaskData.imageURL });
        setNewTaskData({
            taskText: '',
            taskProperty: '',
            date: newTaskData.date,
            imageURL: ''
        });
        handleCloseModal();
    };
    // const handleAddTask = (newTaskData) => {
    //     addTaskToCategory(id, { ...newTaskData, id: Math.random() });
    //     handleCloseModal();
    // };

    const handleClearAll = () => {
        clearAllTasks(id);
        setAllTasks([]);
    }

    const handleDeleteTask = (taskId) => {
        deleteTodo(id, taskId);
    };
    const handleUpdateCategory = () => {
        updateCategoryName(id, newCategoryName);
        handleCloseEditCategoryModal();
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
                        <h6 className='fw-semibold'>{category.name}</h6>

                        <div className="hstack gap-2">
                            <div className='add-kanban-title'>
                                {/* {category.name === 'Todo' ? (<AddIcon onClick={handleShowModal} />) : ('')} */}

                                {/* {category.name === 'Todo' ? (<AddIcon onClick={() => addTaskToCategory(id)} , {handleShowModal}/>) : ('')} */}


                                {/* <AddNewTaskModal show={showModal} onHide={handleCloseModal} onSave={handleSaveTask} taskProperties={taskProperties} /> */}
                                {/* <AddNewTaskModal categoryId={id} show={showModal} onHide={handleCloseModal} /> */}
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
                                    categoryId={id}
                                    newCategoryName={newCategoryName}
                                    setNewCategoryName={setNewCategoryName}
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
