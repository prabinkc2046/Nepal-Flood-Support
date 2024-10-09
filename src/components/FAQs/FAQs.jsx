import React from 'react';
import './FAQs.css';
import { faqs } from '../../Constants/faqs';

const FAQs = () => {
  return (
    <div id="faqs" className="qna-container card">
      <h2>Frequently Asked Questions (FAQs)</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item fund-card" key={index}>
            <h4>{faq.question}</h4>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
