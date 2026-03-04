import { useState, useEffect } from "react";
import { Container, Row, Alert, Form, Button } from "react-bootstrap";
import Event from "./Event.jsx";
import {
  getEvents,
  updateEvent,
  createEvent,
  deleteEvent,
} from "../service/api.js";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [newEvent, setNewEvent] = useState({
    name: "",
    img: "event1.jpg",
    price: "",
    nbTickets: "",
    nbParticipants: "",
    like: false,
    description: "",
  });

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch {
        setError(
          "Unable to load events. Please start json-server and try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();

    setShowWelcome(true);

    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLike = async (id, like) => {
    try {
      const updated = await updateEvent(id, { like });
      setEvents((prev) =>
        prev.map((event) => (event.id === id ? updated : event)),
      );
    } catch {
      setError("Unable to update event like status.");
    }
  };

  const handleBook = async (event) => {
    if (event.nbTickets <= 0) {
      return;
    }

    try {
      const updated = await updateEvent(event.id, {
        nbTickets: event.nbTickets - 1,
        nbParticipants: event.nbParticipants + 1,
      });

      setEvents((prev) =>
        prev.map((item) => (item.id === event.id ? updated : item)),
      );
    } catch {
      setError("Unable to book ticket.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    if (!newEvent.name.trim()) {
      setError("Event name is required.");
      return;
    }

    try {
      const created = await createEvent({
        ...newEvent,
        price: Number(newEvent.price) || 0,
        nbTickets: Number(newEvent.nbTickets) || 0,
        nbParticipants: Number(newEvent.nbParticipants) || 0,
        like: false,
      });

      setEvents((prev) => [...prev, created]);
      setNewEvent({
        name: "",
        img: "event1.jpg",
        price: "",
        nbTickets: "",
        nbParticipants: "",
        like: false,
        description: "",
      });
    } catch {
      setError("Unable to create event.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch {
      setError("Unable to delete event.");
    }
  };

  const handleUpdate = async (id, eventPatch) => {
    try {
      const updated = await updateEvent(id, eventPatch);
      setEvents((prev) =>
        prev.map((event) => (event.id === id ? updated : event)),
      );
    } catch {
      setError("Unable to update event.");
    }
  };

  return (
    <Container className="mt-3">
      {showWelcome && (
        <Alert variant="success" className="text-center">
          Hey welcome to Esprit Events
        </Alert>
      )}

      {isLoading && (
        <Alert variant="secondary" className="text-center">
          Loading events...
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      <Form onSubmit={handleCreate} className="mb-4">
        <Row className="g-2">
          <Form.Group className="col-md-3">
            <Form.Control
              placeholder="Event name"
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="col-md-2">
            <Form.Control
              placeholder="Image (event1.jpg)"
              name="img"
              value={newEvent.img}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="col-md-2">
            <Form.Control
              type="number"
              placeholder="Price"
              name="price"
              value={newEvent.price}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="col-md-2">
            <Form.Control
              type="number"
              placeholder="Tickets"
              name="nbTickets"
              value={newEvent.nbTickets}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="col-md-2">
            <Form.Control
              type="number"
              placeholder="Participants"
              name="nbParticipants"
              value={newEvent.nbParticipants}
              onChange={handleInputChange}
            />
          </Form.Group>

          <div className="col-md-1 d-grid">
            <Button type="submit">Add</Button>
          </div>
        </Row>
      </Form>

      <Row className="mt-4">
        {events.map((event) => (
          <Event
            key={event.id}
            event={event}
            onLike={handleLike}
            onBook={handleBook}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Events;
