import React from 'react';
import {Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import PaginatedTable from "../../components/PaginatedTable";

const VoucherLabelsList = () => {
    const columns = [
        { label: "Actions"},
        { field: 'labelId', label: "#Id"},
        { field: 'templateId', label: "Template ID"},
        { field: 'labelName', label: "Label name"},
        { field: 'domain', label: "Domain"},
        { field: 'languageCode', label: "Language Code"},
        { field: 'text', label: "Text"},
    ];

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="row mt-4 page-title">
                    <h3 className="col-md-9">VoucherTemplateFiles</h3>
                    <Button color="success" tag={Link} to="/voucherLabels/new" className="col-md-2">Add VoucherLabel</Button>
                    <div className="col-md-1">&nbsp;</div>
                </div>
                <PaginatedTable
                    keyField="labelId"
                    basePath="/voucherLabels"
                    columns={columns}
                    dataObjectName="vouplaTemplateLabel"
                />
            </Container>
        </div>
    );
};
export default VoucherLabelsList;
