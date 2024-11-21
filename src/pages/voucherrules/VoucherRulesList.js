import React from 'react';
import {Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import PaginatedTable from "../../components/PaginatedTable";

const VoucherRulesList = () => {
    const columns = [
        { label: "Actions"},
        { field: 'ruleId', label: "#Id"},
        { field: 'isActive', label: "act.?", className: 'text-center', adapter: (x) => x ? 'Y' : 'N'},
        { field: 'isGeneral', label: "gral.?", className: 'text-center', adapter: (x) => x ? 'Y' : 'N'},
        { field: 'temporaryId', label: "Temporary Id"},
        { field: 'application', label: "Application"},
        { field: 'webpageId', label: "WebpageId"},
        { field: 'domain', label: "Domain"},
        { field: 'groupId', label: "GroupId"},
        { field: 'incomingOfficeId', label: "Incoming OfficeId"},
        { field: 'supplierIncomingOffice', label: "Supplier Incoming Office"},
        { field: 'bookingDateFrom', label: "BookingDate From", className: "x-small-text"},
        { field: 'bookingDateTo', label: "BookingDate To", className: "x-small-text"},
        { field: 'serviceDateFrom', label: "ServiceDate From", className: "x-small-text"},
        { field: 'serviceDateTo', label: "ServiceDate To", className: "x-small-text"},
        { field: 'associatedCompanyId', label: "Associated CompanyId"},
        { field: 'channelInterfaceId', label: "Channel InterfaceId"},
        { field: 'clientId', label: "ClientId"},
        { field: 'agencyCode', label: "Agency Code"},
        { field: 'languageCode', label: "Language Code"},
    ];

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="row mt-4 page-title">
                    <h3 className="col-md-9">VoucherRules</h3>
                    <Button color="success" tag={Link} to="/voucherRules/new" className="col-md-2">Add
                        VoucherRule</Button>
                    <div className="col-md-1">&nbsp;</div>
                </div>
                <PaginatedTable
                    keyField="ruleId"
                    basePath="/voucherRules"
                    columns={columns}
                    dataObjectName="vouplaVoucherRules"
                />
            </Container>
        </div>
    );
};
export default VoucherRulesList;
