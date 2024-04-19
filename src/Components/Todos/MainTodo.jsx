import { useContext } from 'react'
import CategoryTodo from '../Todos/CategoryTodo'
import '../Todos/TodoStyle.css'
import Header from '../Header/Header'
import TodoDataContext from '../../ContextApi/TodoDataContext'


function MainTodo() {

  const { todoCategories } = useContext(TodoDataContext);
  return (
    <>
      <Header />
      <div className='category-container'>
        {todoCategories.map(category => (
          <CategoryTodo
            key={category.id}
            id={category.id}
          />
        ))}

      </div >

    </>
  )
}

export default MainTodo


// {todoCategories.map(category => (
//   <CategoryTodo
//     key={category.id}
//     title={category.name}
//     tasks={category.child}
//     id={category.id}
//   />
// ))}