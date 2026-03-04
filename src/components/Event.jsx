import { useState } from "react";
import { Button, Card, Col, Alert, Form } from "react-bootstrap";

const Event = ({ event, onLike, onBook, onDelete, onUpdate }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: event.name,
    img: event.img,
    price: event.price,
    nbTickets: event.nbTickets,
    nbParticipants: event.nbParticipants,
  });

  const handleLike = () => {
    onLike(event.id, !event.like);
  };

  const handleTicket = () => {
    if (event.nbTickets > 0) {
      onBook(event);

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartEdit = () => {
    setEditForm({
      name: event.name,
      img: event.img,
      price: event.price,
      nbTickets: event.nbTickets,
      nbParticipants: event.nbParticipants,
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    onUpdate(event.id, {
      name: editForm.name,
      img: editForm.img,
      price: Number(editForm.price) || 0,
      nbTickets: Number(editForm.nbTickets) || 0,
      nbParticipants: Number(editForm.nbParticipants) || 0,
    });

    setIsEditing(false);
  };

  return (
    <Col md={4}>
      <Card>
        <Card.Img
          variant="top"
          src={
            event.nbTickets === 0
              ? "/images/sold_out.png"
              : `/images/${event.img}`
          }
          style={{ height: 400 }}
        />

        <Card.Body>
          {isEditing ? (
            <Form onSubmit={handleSaveEdit}>
              <Form.Group className="mb-2">
                <Form.Control
                  name="name"
                  value={editForm.name}
                  onChange={handleEditInputChange}
                  placeholder="Event name"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Control
                  name="img"
                  value={editForm.img}
                  onChange={handleEditInputChange}
                  placeholder="Image (event1.jpg)"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Control
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditInputChange}
                  placeholder="Price"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Control
                  type="number"
                  name="nbTickets"
                  value={editForm.nbTickets}
                  onChange={handleEditInputChange}
                  placeholder="Tickets"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  name="nbParticipants"
                  value={editForm.nbParticipants}
                  onChange={handleEditInputChange}
                  placeholder="Participants"
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="me-2">
                Save
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </Form>
          ) : (
            <>
              <Card.Title>{event.name}</Card.Title>
              <Card.Text>Price: {event.price}</Card.Text>
              <Card.Text>Nb. Tickets: {event.nbTickets}</Card.Text>
              <Card.Text>Nb. Participants: {event.nbParticipants}</Card.Text>

              {showAlert && (
                <Alert variant="info">Ticket purchased successfully!</Alert>
              )}

              <Button onClick={handleLike} className="me-2">
                {event.like ? "Dislike" : "Like"}
              </Button>

              <Button onClick={handleTicket} disabled={event.nbTickets === 0}>
                {event.nbTickets === 0 ? "Sold Out" : "Book an event"}
              </Button>

              <Button
                variant="warning"
                className="ms-2"
                onClick={handleStartEdit}
              >
                Edit
              </Button>

              <Button
                variant="danger"
                className="ms-2"
                onClick={() => onDelete(event.id)}
              >
                Delete
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Event;
