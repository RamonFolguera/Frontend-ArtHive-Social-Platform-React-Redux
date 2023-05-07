import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalTemplate.css'

export const ModalTemplate = ({
    className,
    title,
    body,
    button1,
    button2,
    clickFunction1,
    clickFunction2,

}) =>{
  return (
    <div
      className={className}
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title className='modalTitle'>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="modalBody">{body}</p>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" className="modalBtn me-5" onClick={() => clickFunction1()} >{button1}</Button>
          <Button variant="secondary" className="modalBtn" onClick={() => clickFunction2()} >{button2}</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

