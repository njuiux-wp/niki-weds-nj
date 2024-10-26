import React, { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/solid';
import axios from 'axios';
import EventModal from './EventModal';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

    // Fetch all events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${backendUrl}/events`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleAddEvent = () => {
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleEditEvent = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleSaveEvent = (eventData) => {
        if (selectedEvent) {
            // Update existing event
            axios.put(`${backendUrl}/events/${selectedEvent._id}`, eventData)
                .then(response => {
                    setEvents((prevEvents) =>
                        prevEvents.map(event => event._id === response.data._id ? response.data : event)
                    );
                    setIsModalOpen(false);
                })
                .catch(error => console.error('Error updating event:', error));
        } else {
            // Add new event
            axios.post(`${backendUrl}/events`, eventData)
                .then(response => {
                    setEvents((prevEvents) => [...prevEvents, response.data]);
                    setIsModalOpen(false);
                })
                .catch(error => console.error('Error adding event:', error));
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="title-font-xl">Events</h2>
                <button className="btn-icon fs-14 underline" onClick={handleAddEvent}>
                    Add
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {events.map((event) => (
                    <div key={event._id} className="app-card">
                        <div>
                            <span className="title-font-m">{event.name}</span>
                            <p className="desc-font-s">
                                {event.eventTime}, {new Date(event.eventDate).toLocaleDateString()}
                            </p>
                        </div>
                        <button
                            className="btn-icon"
                            type="button"
                            onClick={() => handleEditEvent(event)}
                        >
                            <PencilIcon className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <EventModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onEventAdded={handleSaveEvent}
                    initialData={selectedEvent}
                />
            )}
        </>
    );
};

export default EventList;