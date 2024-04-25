import { createContext, useState, useEffect } from "react"
import axios from 'axios'


const TodoDataContext = createContext();


export const TodoDataProvider = ({ children }) => {

    const [todoCategories, setTodoCategories] = useState([]);
    const [error, setError] = useState(null);


    // this is for get data 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/TodoData');
                setTodoCategories(response.data);
                setError(null);
            } catch (error) {
                handleError(error.message);
            }
        };

        fetchData();
    }, []);

    const handleError = (errorMessage) => {
        setError(errorMessage);
    };

    const deleteCategory = async (categoryId, setTodoCategories) => {
        try {

            const response = await axios.delete('/api/TodoData', { data: { id: categoryId } });
            setTodoCategories(response.data);
            setError(null);
        } catch (error) {
            handleError(error.message);
        }
    };


    const clearAllTasks = async (categoryId) => {
        try {
            const response = await axios.delete('/api/TodoData/clearTasks', { data: { categoryId } });
            const updatedTodoData = response.data;
            setTodoCategories(updatedTodoData);
            setError(null);
        } catch (error) {
            handleError(error.message);
        }
    };


    const addCategory = async (categoryName) => {
        try {
            const response = await axios.post('/api/TodoData/addCategory', { categoryName });
            setTodoCategories(prevCategories => [...prevCategories, response.data]);
            setError(null);
        } catch (error) {
            handleError(error.message);
        }
    };

    const deleteTodo = async (taskId) => {
        try {
            await axios.delete('/api/TodoData/deleteTask', { data: { taskId } });
            // Update the tasks state directly by filtering out the deleted task
            setTodoCategories(prevCategories => {
                const updatedCategories = prevCategories.map(category => ({
                    ...category,
                    child: category.child.filter(task => task.id !== taskId)
                }));
                return updatedCategories;
            });
        } catch (error) {
            handleError(error.message);
        }
    };

    return (
        <TodoDataContext.Provider value={{ todoCategories, addCategory, deleteCategory, clearAllTasks, deleteTodo, setError }}>
            {children}
        </TodoDataContext.Provider>
    );

}


export default TodoDataContext;