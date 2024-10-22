import React from 'react';
import './ContactDetailSkeleton.css'; // Skeleton styles

const ContactDetailSkeleton = () => {
  return (
    <div className="contact-skeleton-container">
      {/* Skeleton for Contact Details */}
      <div className="contact-details-skeleton card">
        <div className="contact-item-skeleton">
          <div className="icon-skeleton" />
          <div className="text-skeleton" />
        </div>
        <div className="contact-item-skeleton">
          <div className="icon-skeleton" />
          <div className="text-skeleton" />
        </div>
        <div className="contact-item-skeleton">
          <div className="icon-skeleton" />
          <div className="text-skeleton" />
        </div>
      </div>

      {/* Skeleton for Contact Form */}
      <div className="contact-form-container-skeleton card">
        <div className="form-header-skeleton" />
        <div className="input-skeleton" />
        <div className="input-skeleton" />
        <div className="textarea-skeleton" />
        <div className="button-skeleton" />
      </div>
    </div>
  );
};

export default ContactDetailSkeleton;
