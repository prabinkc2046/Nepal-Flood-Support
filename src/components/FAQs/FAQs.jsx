import React, { useState } from 'react';
import './FAQs.css';
import { faqs } from '../../Constants/faqs';

const FAQs = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = index => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle open/close
  };

  return (
    <div id="faqs" className="qna-container card">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item fund-card ${
              expandedIndex === index ? 'expanded' : ''
            }`}
            key={index}
            onClick={() => handleToggle(index)}
          >
            <h4>{faq.question}</h4>
            {expandedIndex === index && <p>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
