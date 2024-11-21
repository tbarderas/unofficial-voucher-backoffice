import React from 'react';
import {Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import PaginatedTable from "../../components/PaginatedTable";
import ItemActions from "../../components/ItemActions";

const VoucherTemplateFilesList = () => {
    const columns = [
        { label: "Actions"},
        { label: "#Id"},
        { label: "Template ID"},
        { label: "Format out"},
    ];
    const renderRow = (voucherTemplateFile) => (
        <tr key={voucherTemplateFile.otherRuleId}>
            <td>
                <ItemActions
                    urlPath="/voucherRulesOthers"
                    itemId={voucherTemplateFile.otherRuleId}
                />
            </td>
            <td style={{whiteSpace: 'nowrap'}}>{voucherTemplateFile.idTempFile}</td>
            <td>{voucherTemplateFile.templateId}</td>
            <td>{voucherTemplateFile.formatOut}</td>
        </tr>
    );
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
                    columns={columns}
                    renderRow={renderRow}
                    dataObjectName="vouplaVoucherTemplateFile"
                />
            </Container>
        </div>
    );
};
export default VoucherTemplateFilesList;
