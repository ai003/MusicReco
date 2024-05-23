import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner: React.FC = () => (
    <div className='spinner'>
        <div className='double-bounce1'></div>
        <div className='double-bounce2'></div>
    </div>
);

export default LoadingSpinner