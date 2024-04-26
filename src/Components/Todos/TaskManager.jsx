import { useContext } from 'react'
import '../Todos/Style.css'
import Header from '../Header/Header'
import KanbanDataContext from '../../ContextApi/KanbanContext'
import CategoryTaskList from './CategoryTaskList'


function MainTodo() {

  const { todoCategories } = useContext(KanbanDataContext);
  return (
    <>
      <Header />
      <div className='category-container'>
        {todoCategories.map(category => (
          <CategoryTaskList
            key={category.id}
            id={category.id}

          />
        ))}
      </div >

    </>
  )
}

export default MainTodo
