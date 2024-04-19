import MainTodo from '../src/Components/Todos/MainTodo'
import { Container } from 'react-bootstrap';
import { TodoDataProvider } from './ContextApi/TodoDataContext'
function Page() {

    return (
        <div className="d-flex align-items-center justify-content-center m-5 ">
            <Container className="rounded bg-custom p-2 container">
                <TodoDataProvider>
                    <MainTodo />
                </TodoDataProvider>
            </Container>
        </div>
    )
}
export default Page
