import React from 'react';
import {Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import PaginatedTable from "../../components/PaginatedTable";
import ItemActions from "../../components/ItemActions";

const VoucherLabelsList = () => {
    const columns = [
        { label: "Actions"},
        { label: "#Id"},
        { label: "Template ID"},
        { label: "Label name"},
        { label: "Domain"},
        { label: "Language Code"},
        { label: "Text"},
    ];
    const renderRow = (voucherLabel) => (
        <tr key={voucherLabel.otherRuleId}>
            <td>
                <ItemActions
                    urlPath="/voucherLabels"
                    itemId={voucherLabel.otherRuleId}
                />
            </td>
            <td style={{whiteSpace: 'nowrap'}}>{voucherLabel.labelId}</td>
            <td>{voucherLabel.templateId}</td>
            <td>{voucherLabel.labelName}</td>
            <td>{voucherLabel.domain}</td>
            <td>{voucherLabel.languageCode}</td>
            <td>{voucherLabel.text}</td>
        </tr>
    );
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
                    columns={columns}
                    renderRow={renderRow}
                    dataObjectName="vouplaTemplateLabel"
                />
            </Container>
        </div>
    );
};
export default VoucherLabelsList;
