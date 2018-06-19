import React, {Component} from 'react';
import PropTypes from 'prop-types';

class OrderBook extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>


                <div className="pt-card pt-elevation-1 ">
                    <h5>{this.props.bookName}</h5>
                    {
                        this.props.loading &&
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
                    }
                    {
                        !this.props.loading &&
                        <p>Back-end infrastructure for integrating, managing, and securing data of any kind, from any source, at massive scale.</p>
                    }

                </div>
            </div>
        )
    }
}

OrderBook.propTypes = {
    bookName: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
}
OrderBook.defaultProps = {
    loading: true
}

export default OrderBook;