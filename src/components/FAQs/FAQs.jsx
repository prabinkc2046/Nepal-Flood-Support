import React, { useState } from 'react';
import './FAQs.css';
import { faqs } from '../../Constants/faqs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';

const FAQs = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="card section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item card ${
              expandedIndex === index ? 'expanded' : ''
            }`}
            key={index}
            onClick={() => handleToggle(index)}
          >
            <div className="faq-header">
              <h4>{faq.question}</h4>
              <FontAwesomeIcon
                icon={expandedIndex === index ? faCircleMinus : faCirclePlus}
                className="toggle-icon"
              />
            </div>
            <div
              className="faq-answer"
              style={{
                maxHeight: expandedIndex === index ? '200px' : '0',
                transition: 'max-height 0.3s ease',
              }}
            >
              <p className="secondary-paragraph">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
