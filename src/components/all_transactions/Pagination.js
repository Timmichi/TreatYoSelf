import React, { Component, Fragment } from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { transactionsPerPage, totalTransactions, currentPage, paginate, nextPage, prevPage } = this.props;
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalTransactions / transactionsPerPage); i++) {
            pageNumbers.push(i);
        }

        if (pageNumbers.length <= 1) {
            return <Fragment></Fragment>
        }
        console.log("pagenum: ", pageNumbers.length);
        return (
            <nav className="list-group flex-column">
                <ul className="pagination justify-content-center">
                    {currentPage === 1 ?
                        <li></li> :
                        <li className="page-item">
                            <a className="page-link" href="#/budget/all_transactions/" style={{ color: "#12A874" }} onClick={() => prevPage()}>Previous</a>
                        </li>}
                    {pageNumbers.map(num => (
                        currentPage === num ?
                            <li className="page-item active" key={num}>
                                <a href="#/budget/all_transactions/" style={{ color: "white" }} className="page-link" onClick={() => paginate(num)}>{num}</a>
                            </li> :
                            <li className="page-item" key={num}>
                                <a href="#/budget/all_transactions/" style={{ color: "black" }} className="page-link" onClick={() => paginate(num)}>{num}</a>
                            </li>
                    ))}
                    {currentPage === pageNumbers.length ?
                        <li></li> :
                        <li className="page-item">
                            <a className="page-link" href="#/budget/all_transactions/" style={{ color: "black" }} onClick={() => nextPage()}>Next</a>
                        </li>}
                </ul>
            </nav>
        )
    }
}

export default Pagination;