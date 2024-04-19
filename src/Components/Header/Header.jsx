import { useState, useContext } from 'react'
import '../Header/Header.css'
import HouseIcon from '@mui/icons-material/House';
import { Modal, Button } from 'react-bootstrap';
import TodoDataContext from '../../ContextApi/TodoDataContext';

function Header() {


    const { addCategory } = useContext(TodoDataContext);

    const [show, setShow] = useState(false);
    const [listName, setListName] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {

        addCategory(listName);
        setListName('');
        setShow(false);

    };
    return (
        <>
            <div className="card card-body p-2 mb-2">
                <div className='row align-items-center'>
                    <div className='col-12'>
                        <div className='d-sm-flex align-items-center justify-space-between'>
                            <h4 className='mb-4 mb-md-0 card-title'>Kanban</h4>
                            <nav aria-label="breadcrumb" className="ms-auto">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item d-flex align-items-center  justify-content-center">
                                        <HouseIcon className="fs-8" style={{ color: "#526b7a" }} />
                                    </li>
                                    <li className="breadcrumb-item" aria-current="page">
                                        <span className="badge fw-medium">
                                            Kanban
                                        </span>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="action-btn layout-top-spacing mb-4 d-flex align-items-center justify-content-between flex-wrap gap-6">
                <h5 className="mb-0 fs-5">Improving Work Processes</h5>
                <button id="add-list" className="btn btn-primary" onClick={handleShow} >Add List</button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="List Name"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave} >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    )
}

export default Header
