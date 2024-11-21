import React from 'react';
import {Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import PaginatedTable from "../../components/PaginatedTable";

const VoucherRulesOthersList = () => {
    const columns = [
        { label: "Actions"},
        { field: 'otherRuleId', label: "#Id"},
        { field: 'ruleId', label: "RuleId"},
        { field: 'activityTypeId', label: "Activity TypeId"},
        { field: 'associatedCompanyId', label: "AssociatedCompanyId"},
        { field: 'serviceId', label: "ServiceId"},
        { field: 'modalityId', label: "ModalityId"},
        { field: 'supplierCarId', label: "SupplierCarId"},
        { field: 'cmdId', label: "CmdId"},
        { field: 'categoryId', label: "CategoryId"},
        { field: 'cmdGdsId', label: "CmdGdsId"},
        { field: 'activityIntegrationId', label: "Activity IntegrationId"},
    ];

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
                    keyField="otherRuleId"
                    basePath="/voucherRulesOthers"
                    columns={columns}
                    dataObjectName="vouplaVoucherRulesOthers"
                />
            </Container>
        </div>
    );
};
export default VoucherRulesOthersList;
