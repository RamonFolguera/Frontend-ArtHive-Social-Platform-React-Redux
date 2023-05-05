import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalTemplate.css'

export const ModalTemplate = ({
    className,
    title,
    body,
    button,
    clickFunction,
}) =>{
  return (
    <div
      className={className}
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog className="dialogModal">
        <Modal.Header className="modalCloseBtn" closeButton>
          <Modal.Title className='modalTitle'>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="modalBody">{body}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" className="modalBtn" onClick={() => clickFunction()} >{button}</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

