import React from 'react';
import {Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import PaginatedTable from "../../components/PaginatedTable";
import ItemActions from "../../components/ItemActions";

const VoucherRulesOthersList = () => {
    const columns = [
        { label: "Actions"},
        { label: "#Id"},
        { label: "RuleId"},
        { label: "Activity TypeId"},
        { label: "AssociatedCompanyId"},
        { label: "ServiceId"},
        { label: "ModalityId"},
        { label: "SupplierCarId"},
        { label: "CmdId"},
        { label: "CategoryId"},
        { label: "CmdGdsId"},
        { label: "Activity IntegrationId"},
    ];
    const renderRow = (voucherRuleOther) => (
        <tr key={voucherRuleOther.otherRuleId}>
            <td>
                <ItemActions
                    urlPath="/voucherRulesOthers"
                    itemId={voucherRuleOther.otherRuleId}
                />
            </td>
            <td style={{whiteSpace: 'nowrap'}}>{voucherRuleOther.otherRuleId}</td>
            <td>{voucherRuleOther.ruleId}</td>
            <td>{voucherRuleOther.activityTypeId}</td>
            <td>{voucherRuleOther.associatedCompanyId}</td>
            <td>{voucherRuleOther.serviceId}</td>
            <td>{voucherRuleOther.modalityId}</td>
            <td>{voucherRuleOther.supplierCarId}</td>
            <td>{voucherRuleOther.cmdId}</td>
            <td>{voucherRuleOther.categoryId}</td>
            <td>{voucherRuleOther.cmdGdsId}</td>
            <td>{voucherRuleOther.activityIntegrationId}</td>
        </tr>
    );
    return (
        <div>
            <AppNavbar/>
            <Container fluid>
            <div className="row mt-4 page-title">
                    <h3 className="col-md-9">VoucherRulesOthers</h3>
                    <Button color="success" tag={Link} to="/voucherRulesOthers/new" className="col-md-2">Add VoucherRuleOther</Button>
                    <div className="col-md-1">&nbsp;</div>
                </div>
                <PaginatedTable
                    columns={columns}
                    renderRow={renderRow}
                    dataObjectName="vouplaVoucherRulesOthers"
                />
            </Container>
        </div>
    );
};
export default VoucherRulesOthersList;
