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
                console.log(todoCategories);

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

    // clear all task const clearAllTasks = async (categoryId) => {
    const clearAllTasks = async (categoryId) => {
        try {
            await axios.delete('/api/TodoData/clearTasks', { data: { categoryId } });
            // Update todoCategories state to reflect the cleared tasks
            setTodoCategories(prevCategories =>
                prevCategories.map(category => {
                    if (category.id === categoryId) {
                        return { ...category, child: [] }; // Clear all tasks for this category

                    }
                    return category;

                })
            );
        } catch (error) {
            console.error('Error clearing tasks:', error);
        }
    };


    // const addCategory = (categoryName) => {
    //     const newCategory = {
    //         id: Math.random(),
    //         name: categoryName,
    //         child: []
    //     };
    //     setTodoCategories(prevCategories => [...prevCategories, newCategory]);
    // };
    const addCategory = async (categoryName) => {
        try {
            const response = await axios.post('/api/TodoData/addCategory', { categoryName });
            setTodoCategories(prevCategories => [...prevCategories, response.data]);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };


    // const deleteCategory = (categoryId) => {
    //     setTodoCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
    // };

    // const clearAllTasks = (categoryId) => {
    //     setTodoCategories(prevCategories => prevCategories.map(category => {
    //         if (category.id === categoryId) {
    //             return { ...category, child: [] };
    //         }
    //         return category;
    //     }));
    // };


    const updateCategoryName = async (categoryId, newName) => {
        try {
            // Make a PUT request to update the category name
            await axios.put(`/api/TodoData/updateCategory/${categoryId}`, { categoryName: newName });

            // Update the state with the new category name
            setTodoCategories(prevCategories =>
                prevCategories.map(category =>
                    category.id === categoryId ? { ...category, name: newName } : category
                )
            );
        } catch (error) {
            console.error('Error updating category name:', error);
        }
    };

    const deleteTodo = (taskId) => {
        setTodoCategories(prevCategories => {
            return prevCategories.map(category => {
                const updatedChild = category.child.filter(task => task.id !== taskId);
                return { ...category, child: updatedChild };
            });
        });
    };

    //add task 
    const addTaskToCategory = async (categoryId, newTask) => {
        try {
            await axios.post('/api/TodoData/addTask', { categoryId, taskData: newTask });
            setTodoCategories(prevCategories => {
                return prevCategories.map(category => {
                    if (category.id === categoryId) {
                        return { ...category, child: [...category.child, newTask] };

                    }
                    return category;

                });
            });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };



    return (
        <TodoDataContext.Provider value={{ todoCategories, addCategory, deleteCategory, clearAllTasks, updateCategoryName, deleteTodo, addTaskToCategory }}>
            {children}
        </TodoDataContext.Provider>
    );

}


export default TodoDataContext;