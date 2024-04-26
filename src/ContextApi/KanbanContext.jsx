import { createContext, useState, useEffect } from "react"
import axios from 'axios'


const KanbanDataContext = createContext();


export const KanbanDataContextProvider = ({ children }) => {

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

    const deleteTodo = async (taskId, setTodoCategories) => {
        try {
            const response = await axios.delete('/api/TodoData/deleteTask', { data: { taskId } });
            setTodoCategories(response.data);

        } catch (error) {
            handleError(error.message);
        }
    };

    return (
        <KanbanDataContext.Provider value={{ todoCategories, addCategory, deleteCategory, clearAllTasks, deleteTodo, setError }}>
            {children}
        </KanbanDataContext.Provider>
    );

}


export default KanbanDataContext;