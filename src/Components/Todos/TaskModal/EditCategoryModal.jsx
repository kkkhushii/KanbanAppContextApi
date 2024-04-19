import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

function EditCategoryModal({ showModal, handleCloseModal, newCategoryName, setNewCategoryName, handleUpdateCategory }) {


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
                <Button variant="primary" onClick={handleUpdateCategory}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditCategoryModal
