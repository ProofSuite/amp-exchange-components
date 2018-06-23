import React from 'react';

const Loading = () => (
    <div className="loading-overlay">
        <div className="pt-spinner .pt-large">
            <div className="pt-spinner-svg-container">
                <svg viewBox="0 0 100 100">
                    <path className="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
                    <path className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
                </svg>
            </div>
        </div>
    </div>
);

export default Loading;