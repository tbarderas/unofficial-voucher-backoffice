import React, {memo, useEffect, useRef, useState} from 'react';
import {Button, ButtonGroup, Input, Table} from 'reactstrap';
import {FadeLoader} from 'react-spinners';
import ItemActions from "./ItemActions";

const PaginatedTable = memo(({ keyField, basePath, columns, dataObjectName }) => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ self: 0, next: 0, last: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState("");
    const noTransform = (x) => x;
    const renderRow = (listItem, keyField, basePath, columns) => (
        <tr key={listItem[keyField]}>
            <td>
                <ItemActions
                    urlPath={basePath}
                    itemId={listItem[keyField]}
                />
            </td>
            {columns.filter((col) => !!col.field).map((col, idx) => {
                const adapter = col.adapter || noTransform;
                return (
                    <td width={col.width} className={col.className}>{adapter(listItem[col.field])}</td>
                )
            })}
        </tr>
    );
    const loadPage = async (page) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/${dataObjectName}/search/customSearchWithFilter?sort=${keyField},asc&page=${page}`);
            const result = await response.json();
            const fetchedData = result["_embedded"][dataObjectName] || [];
            setData(fetchedData);
            setPagination({
                self: result["page"]["number"],
                next: Math.min(result["page"]["number"] + 1, result["page"]["totalPages"] - 1),
                last: result["page"]["totalPages"] - 1,
            });
            setFilteredData(fetchedData);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPage(0).then(r => console.log('Page 0 loaded')); // Initial load
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    const goToPageInput = useRef();

    const goToPage = () => {
        changePage(goToPageInput.current.value);
    }

    const changePage = (direction) => {
        let targetPage = pagination.self;
        if (direction === 'first') targetPage = 0;
        else if (direction === 'prev') targetPage = Math.max(0, pagination.self - 1);
        else if (direction === 'next') targetPage = Math.min(pagination.next, pagination.last);
        else if (direction === 'last') targetPage = pagination.last;
        else if (direction >= 1 && direction <= pagination.last + 1) targetPage = direction - 1
        if (targetPage !== pagination.self) loadPage(targetPage).then((targetPage) => console.log('Page ' + targetPage + 'loaded'));
    };

    const handleFilterChange = (event) => {
        const value = event.target.value.toLowerCase();
        setFilter(value);
        setFilteredData(
            data.filter((item) => {
                return columns.some((col) => {
                    const fieldValue = item[col.field]?.toString().toLowerCase() || "";
                    return fieldValue.includes(value);
                });
            })
        );
    };
    if (isLoading) {
        return <div className="col-md-12 align-content-center"><FadeLoader /></div>;
    }
    return (
        <div>
            <div className="pagination-controls mt-12">
                <ButtonGroup>
                    <Button outline color="dark" onClick={() => changePage('first')}>First</Button>
                    <Button outline color="dark" onClick={() => changePage('prev')} disabled={pagination.self === 0}>Prev.</Button>
                    <Button outline color="dark" disabled style={{whiteSpace: "nowrap"}}>Page {pagination.self + 1} of {pagination.last + 1}</Button>
                    <Button outline color="dark" onClick={() => changePage('next')} disabled={pagination.self === pagination.last}>Next</Button>
                    <Button outline color="dark" onClick={() => changePage('last')} disabled={pagination.self === pagination.last}>Last</Button>

                    <div className="col-md-1">&nbsp;</div>
                    <Input type="text" ref={goToPageInput} placeholder={"page to go"}/>
                    <Button color="info" onClick={goToPage} style={{whiteSpace: "nowrap"}}>Go to page</Button>

                    <Input type="text" className={"ms-3"} placeholder={"Filter..."} onChange={handleFilterChange} value={filter}/>

                </ButtonGroup>


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
                {filteredData.map((item) => renderRow(item, keyField, basePath, columns))}
                </tbody>
            </Table>
        </div>
    );
});
export default PaginatedTable;
