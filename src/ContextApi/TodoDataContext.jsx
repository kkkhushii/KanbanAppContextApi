import { createContext, useState, useEffect } from "react"
import axios from 'axios'


const TodoDataContext = createContext();


export const TodoDataProvider = ({ children }) => {

    const [todoCategories, setTodoCategories] = useState([]);

    // this is for get data 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/TodoData');
                setTodoCategories(response.data);
                // console.log(todoCategories);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // this is for delete categoty 
    const deleteCategory = async (categoryId) => {
        try {
            await axios.delete('/api/TodoData', { data: { id: categoryId } });
            setTodoCategories(prevCategories =>
                prevCategories.filter(category => category.id !== categoryId)
            );
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const clearAllTasks = async (categoryId) => {
        try {
            await axios.delete('/api/TodoData/clearTasks', { data: { categoryId } });
            setTodoCategories(prevCategories =>
                prevCategories.map(category => {
                    if (category.id === categoryId) {
                        return { ...category, child: [] };

                    }
                    return category;
                })
            );
        } catch (error) {
            console.error('Error clearing tasks:', error);
        }
    };


    const addCategory = async (categoryName) => {
        try {
            const response = await axios.post('/api/TodoData/addCategory', { categoryName });
            setTodoCategories(prevCategories => [...prevCategories, response.data]);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };


    const deleteTodo = async (taskId) => {
        try {
            await axios.delete('/api/TodoData/deleteTask', { data: { taskId } });
            setTodoCategories(prevCategories => {
                return prevCategories.map(category => {
                    const updatedChild = category.child.filter(task => task.id !== taskId);
                    return { ...category, child: updatedChild };
                });
            });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('404 Error: Resource not found');
            } else {
                console.error('Error deleting task:', error);
            }
        }
    };

    return (
        <TodoDataContext.Provider value={{ todoCategories, addCategory, deleteCategory, clearAllTasks, deleteTodo }}>
            {children}
        </TodoDataContext.Provider>
    );

}


export default TodoDataContext;