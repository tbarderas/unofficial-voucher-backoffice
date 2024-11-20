import React, { useState, useEffect, memo } from 'react';
import { Button, Table } from 'reactstrap';
import { FadeLoader } from 'react-spinners';
const PaginatedTable = memo(({ fetchUrl, columns, renderRow,pageName }) => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ self: 0, next: 0, last: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const loadPage = async (page) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${fetchUrl}&page=${page}`);
            const result = await response.json();
            setData(result["_embedded"][`${pageName}`] || []);
            setPagination({
                self: result["page"]["number"],
                next: Math.min(result["page"]["number"] + 1, result["page"]["totalPages"] - 1),
                last: result["page"]["totalPages"] - 1,
            });
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadPage(0); // Initial load
    }, [fetchUrl]);
    const changePage = (direction) => {
        let targetPage = pagination.self;
        if (direction === 'first') targetPage = 0;
        else if (direction === 'prev') targetPage = Math.max(0, pagination.self - 1);
        else if (direction === 'next') targetPage = Math.min(pagination.next, pagination.last);
        else if (direction === 'last') targetPage = pagination.last;
        if (targetPage !== pagination.self) loadPage(targetPage);
    };
    if (isLoading) {
        return <div className="col-md-12 align-content-center"><FadeLoader /></div>;
    }
    return (
        <div>
            <div className="pagination-controls mt-12">
                <Button outline color="dark" onClick={() => changePage('first')}>First</Button>
                <Button outline color="dark" onClick={() => changePage('prev')} disabled={pagination.self === 0}>Prev.</Button>
                <Button outline color="dark" disabled>Page {pagination.self + 1} of {pagination.last + 1}</Button>
                <Button outline color="dark" onClick={() => changePage('next')} disabled={pagination.next > pagination.last}>Next</Button>
                <Button outline color="dark" onClick={() => changePage('last')} disabled={pagination.self === pagination.last}>Last</Button>
            </div>
            <Table className="mt-4 table-condensed table-hover" striped bordered>
                <thead>
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx} width={col.width}>{col.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map(renderRow)}
                </tbody>
            </Table>
        </div>
    );
});
export default PaginatedTable;
