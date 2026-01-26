
import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/491727751060"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle size={32} />
            <span className="whatsapp-tooltip">¡Hablemos de su proyecto!</span>
        </a>
    );
};

export default WhatsAppButton;
