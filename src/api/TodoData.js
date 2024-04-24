import image1 from '../assets/kanban-img-1.jpg';
import image2 from '../assets/kanban-img-2.jpg';
import image3 from '../assets/my-card.jpg';
import image4 from '../assets/profilebg.jpg';
import mock from '../_MockApis/mock';


const TodoData = [
    {
    id:1,
    name:'Todo',
    child:[
        {
            id: 1,
            task: 'This is first task',
            taskImage:image1,
            taskText: '',
            date: '24 july',
            taskProperty: 'Design'
    
        },
        {
            id: 2,
            task: 'lets do some task on pd',
            taskImage:'',
            taskText:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, o eiusmod tempor incid.',
            date: '24 july',
            taskProperty: 'Developement',
            
    
        },
        {
            id: 3,
            task: 'Do some projects on React Native with Flutter',

            taskImage:'',
            taskText:'',
            date: '24 july',
            taskProperty: 'Mobile',
    
        },
    ]
},
{
    id:2,
    name:'Progress',
    child:[
        {
            id: 1,
            task: 'Design navigation changes',
            taskImage:'',
            taskText:'',
            date: '24 july',
            taskProperty: 'Mobile',
    
        },
        {
            id: 2,
            task: 'Battle with fire',
            taskImage:image2,
            taskText:'',
            date: '24 july',
            taskProperty: 'Design',
    
        },
        {
            id: 3,
            task: 'First design concept',
            taskImage:'',
            taskText:'',
            date: '24 july',
            taskProperty: 'Mobile',
    
        }

    ]
},
{
    id:3,
    name:'Pending',
    child:[
        {
            id: 7,
            task: 'Persona development',
            taskImage:'',
            taskText:'Create user personas based on the research data to represent different user groups and their characteristics, gols, and behaviors..',
            date: '24 july',
            taskProperty: 'UX Stage',
            category:'Pending'
        },
        {
            id: 8,
            task: 'Redesign overview',
            taskImage:image3,
            taskText:'',
            date: '14 july',
            taskProperty: 'Design',
            category:'Pending'
    
        }

    ]
},
{
    id:4,
    name:'Done',
    child:[
        {
            id: 9,
            task: 'Usability testing',
            taskImage:image4,
            taskText:'',
            date: '24 july',
            taskProperty: 'Research',
            category:'Done'
    
        },
        {
            id: 10,
            task: 'Introduce new navigation',
            taskImage:'',
            taskText:'',
            date: '24 july',
            taskProperty: 'Data Science',
            category:'Done'
    
        },
        {
            id:11,
            task:'Branding visual identity',
            taskImage:'',
            taskText:'',
            date: '4 july',
            taskProperty: 'Branding',
            category:'Done'
        },
        {
            id:12,
            task:'Competitor research',
            taskImage:'',
            taskText:"research competitors and identify weakness and strengths each of them. comparing their product features, quelity...",
            date: '14 july',
            taskProperty: 'UX Stage',
            category:'Done'
        }
    ]
}
]

mock.onGet('/api/TodoData').reply(200, TodoData);

// this is for delete category  
mock.onDelete('/api/TodoData').reply(config => {
    const { id } = JSON.parse(config.data);
    const updatedTodoData = TodoData.filter(category => category.id !== id);
    return [200, updatedTodoData];
  });

//this is for clear all task
mock.onDelete('/api/TodoData/clearTasks').reply(config => {
    const { categoryId } = JSON.parse(config.data);
    // Find the category by ID and clear all tasks
    const updatedTodoData = TodoData.map(category => {
        if (category.id === categoryId) {
            return { ...category, child: [] }; 
        }
        return category;
    });
    return [200, updatedTodoData];
});

//add new task 
mock.onPost('/api/TodoData/addTask').reply(config => {
    const { categoryId, newTaskData } = JSON.parse(config.data);
    const updatedTodoData = TodoData.map(category => {
        if (category.id === categoryId) {
            return { ...category, child: [...category.child, newTaskData] };
        }
        return category;
    });
    return [200, updatedTodoData];
});

// addnew cataegory
mock.onPost('/api/TodoData/addCategory').reply(config => {
    const { categoryName } = JSON.parse(config.data);
    const newCategory = {
        id: Math.random(),
        name: categoryName,
        child: []
    };
    TodoData.push(newCategory);
    return [200, newCategory];
});

//updatecategoryname 
mock.onPost('/api/TodoData/updateCategory').reply(config => {
    const { categoryId, categoryName } = JSON.parse(config.data);
    const updatedTodoData = TodoData.map(category => {
        if (category.id === categoryId) {
            return { ...category, name: categoryName };
        }
        return category;
    });
    return [200, updatedTodoData];
});

//edittask
mock.onPut('/api/TodoData/editTask').reply(config => {
    const { taskId, newData } = JSON.parse(config.data);
    TodoData.forEach(category => {
        category.child.forEach(task => {
            if (task.id === taskId) {
                Object.assign(task, newData);
            }
        });
    });

    return [200, TodoData];
});

// deletetask
let tasks = [];
mock.onDelete('/api/TodoData/deleteTask').reply(config => {
    const { taskId } = JSON.parse(config.data);

     tasks = tasks.filter(task => task.id !== taskId);
  
    return [200, { message: 'Task deleted successfully' }];
  });


export default TodoData;