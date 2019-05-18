import React from 'react';

const CalendarLegend = () => (
  <div style={{ display: 'flex', height: '50px' }}>
    <span
      style={{
        color: 'rgba(255, 0, 0, 0.5)',
        fontSize: '40px',
        margin: '0'
      }}
    >
      ■
    </span>{' '}
    <p style={{ marginTop: '17px' }}>period</p>
    <span
      style={{
        color: ' rgb(255, 255, 0, 0.7)',
        fontSize: '40px',
        margin: '0'
      }}
    >
      ■
    </span>
    <p style={{ marginTop: '17px' }}>ovulation</p>
    <span
      style={{
        color: ' rgba(255, 0, 0, 0.1)',
        fontSize: '40px',
        margin: '0'
      }}
    >
      ■
    </span>
    <p style={{ marginTop: '17px' }}>period prediction</p>
  </div>
);

export default CalendarLegend;
