import React from 'react';
import {Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import PaginatedTable from "../../components/PaginatedTable";
import ItemActions from "../../components/ItemActions";

const VoucherTemplatesList = () => {
    const columns = [
        { label: "Actions"},
        { label: "#Id"},
        { label: "Status"},
        { label: "Template name"},
        { label: "Description"},
        { label: "Format type T"},
        { label: "Format type"},
        { label: "Language code"},
        { label: "Output format"},
    ];
    const renderRow = (voucherTemplate) => (
        <tr key={voucherTemplate.ruleId}>
            <td>
                <ItemActions
                    urlPath="/voucherTemplates"
                    itemId={voucherTemplate.templateId}
                />
            </td>
            <td style={{whiteSpace: 'nowrap'}}>{voucherTemplate.templateId}</td>
            <td>{voucherTemplate.status}</td>
            <td>{voucherTemplate.templateName}</td>
            <td>{voucherTemplate.description}</td>
            <td>{voucherTemplate.formatTypeT}</td>
            <td>{voucherTemplate.formatType}</td>
            <td>{voucherTemplate.languageCode}</td>
            <td>{voucherTemplate.outputFormat}</td>
        </tr>
    );
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
                    columns={columns}
                    renderRow={renderRow}
                    dataObjectName="vouplaVoucherTemplate"
                />
            </Container>
        </div>
    );
};
export default VoucherTemplatesList;
