import { createContext, useState } from "react"
import TodoData from '../Data/TodoData';


const TodoDataContext = createContext();


export const TodoDataProvider = ({ children }) => {

    const [todoCategories, setTodoCategories] = useState(TodoData);


    const addCategory = (categoryName) => {
        const newCategory = {
            id: Math.random(),
            name: categoryName,
            child: []
        };
        setTodoCategories(prevCategories => [...prevCategories, newCategory]);
    };


    const deleteCategory = (categoryId) => {
        setTodoCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
    };

    const clearAllTasks = (categoryId) => {
        setTodoCategories(prevCategories => prevCategories.map(category => {
            if (category.id === categoryId) {
                return { ...category, child: [] };
            }
            return category;
        }));
    };

    const updateCategoryName = (categoryId, newName) => {
        setTodoCategories(prevCategories => prevCategories.map(category => {
            if (category.id === categoryId) {
                return { ...category, name: newName };
            }
            return category;
        }));
    };

    const deleteTodo = (taskId) => {
        setTodoCategories(prevCategories => {
            return prevCategories.map(category => {
                const updatedChild = category.child.filter(task => task.id !== taskId);
                return { ...category, child: updatedChild };
            });
        });
    };
    const addTaskToCategory = (categoryId, newTask) => {
        setTodoCategories(prevCategories => {
            return prevCategories.map(category => {
                if (category.id === categoryId) {
                    return { ...category, child: [...category.child, newTask] };
                }
                return category;
            });
        });
    };

    return (
        <TodoDataContext.Provider value={{ todoCategories, addCategory, deleteCategory, clearAllTasks, updateCategoryName, deleteTodo, addTaskToCategory }}>
            {children}
        </TodoDataContext.Provider>
    );

}


export default TodoDataContext;