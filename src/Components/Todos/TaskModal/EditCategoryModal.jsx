import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditCategoryModal({ showModal, handleCloseModal, handleUpdateCategory, initialCategoryName }) {

    const [newCategoryName, setNewCategoryName] = useState(initialCategoryName);
    const handleSave = () => {
        handleUpdateCategory(newCategoryName);
        handleCloseModal();
    };
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    type="text"
                    placeholder="Enter new category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default EditCategoryModal
