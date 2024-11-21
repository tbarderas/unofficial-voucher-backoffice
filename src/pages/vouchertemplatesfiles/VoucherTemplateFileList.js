import React from 'react';
import {Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import PaginatedTable from "../../components/PaginatedTable";

const VoucherTemplateFilesList = () => {
    const columns = [
        { label: "Actions", width: '5%'},
        { field: 'idTempFile', label: "#Id"},
        { field: 'templateId', label: "Template ID"},
        { field: 'formatOut', label: "Format out"},
    ];

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="row mt-4 page-title">
                    <h3 className="col-md-9">VoucherTemplateFiles</h3>
                    <Button color="success" tag={Link} to="/voucherTemplateFiles/new" className="col-md-2">Add VoucherTemplateFile</Button>
                    <div className="col-md-1">&nbsp;</div>
                </div>
                <PaginatedTable
                    keyField="idTempFile"
                    basePath="/voucherTemplateFiles"
                    columns={columns}
                    dataObjectName="vouplaVoucherTemplateFile"
                />
            </Container>
        </div>
    );
};
export default VoucherTemplateFilesList;
