import MainTodo from './Components/Todos/TaskManager'
import { Container } from 'react-bootstrap';
import { KanbanDataContextProvider } from './ContextApi/KanbanContext'
function Page() {

    return (
        <div className="d-flex align-items-center justify-content-center m-5 ">
            <Container className="rounded bg-custom p-2 container">
                <KanbanDataContextProvider>
                    <MainTodo />
                </KanbanDataContextProvider>
            </Container>
        </div>
    )
}
export default Page
