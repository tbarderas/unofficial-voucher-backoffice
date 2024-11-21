import React from 'react';
import {Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import PaginatedTable from "../../components/PaginatedTable";

const VoucherTemplatesList = () => {
    const columns = [
        { label: "Actions"},
        { field: 'templateId', label: "#Id"},
        { field: 'status', label: "Status"},
        { field: 'templateName', label: "Template name"},
        { field: 'description', label: "Description"},
        { field: 'formatTypeT', label: "Format type T"},
        { field: 'formatType', label: "Format type"},
        { field: 'languageCode', label: "Language code"},
        { field: 'outputFormat', label: "Output format"},
    ];

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="row mt-4 page-title">
                    <h3 className="col-md-9">VoucherTemplates</h3>
                    <Button color="success" tag={Link} to="/voucherTemplates/new" className="col-md-2">Add VoucherTemplate</Button>
                    <div className="col-md-1">&nbsp;</div>
                </div>
                <PaginatedTable
                    keyField="templateId"
                    basePath="/voucherTemplates"
                    columns={columns}
                    dataObjectName="vouplaVoucherTemplate"
                />
            </Container>
        </div>
    );
};
export default VoucherTemplatesList;
