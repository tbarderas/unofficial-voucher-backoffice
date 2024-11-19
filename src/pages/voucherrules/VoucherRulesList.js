import React from 'react';
import {Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import PaginatedTable from "../../components/PaginatedTable";
import ItemActions from "../../components/ItemActions";

const VoucherRulesList = () => {
    const columns = [
        { label: "Actions"},
        { label: "#Id"},
        { label: "act.?"},
        { label: "gral.?"},
        { label: "Temporary Id"},
        { label: "Application"},
        { label: "WebpageId"},
        { label: "Domain"},
        { label: "GroupId"},
        { label: "Incoming OfficeId"},
        { label: "Supplier Incoming Office"},
        { label: "BookingDate From"},
        { label: "BookingDate To"},
        { label: "ServiceDate From"},
        { label: "ServiceDate To"},
        { label: "Associated CompanyId"},
        { label: "Channel InterfaceId"},
        { label: "ClientId"},
        { label: "Agency Code"},
        { label: "Language Code"},
    ];
    const renderRow = (voucherRule) => (
        <tr key={voucherRule.ruleId}>
            <td>
                <ItemActions
                    urlPath="/voucherRules"
                    itemId={voucherRule.otherRuleId}
                />
            </td>
            <td>{voucherRule.ruleId}</td>
            <td className="text-center">{voucherRule.isActive ? 'Y' : 'N'}</td>
            <td className="text-center">{voucherRule.isGeneral ? 'Y' : 'N'}</td>
            <td>{voucherRule.temporaryId}</td>
            <td>{voucherRule.application}</td>
            <td>{voucherRule.webpageId}</td>
            <td>{voucherRule.domain}</td>
            <td>{voucherRule.groupId}</td>
            <td>{voucherRule.incomingOfficeId}</td>
            <td>{voucherRule.supplierIncomingOffice}</td>
            <td className="x-small-text">{voucherRule.bookingDateFrom}</td>
            <td className="x-small-text">{voucherRule.bookingDateTo}</td>
            <td className="x-small-text">{voucherRule.serviceDateFrom}</td>
            <td className="x-small-text">{voucherRule.serviceDateTo}</td>
            <td>{voucherRule.associatedCompanyId}</td>
            <td>{voucherRule.channelInterfaceId}</td>
            <td>{voucherRule.clientId}</td>
            <td>{voucherRule.agencyCode}</td>
            <td>{voucherRule.languageCode}</td>
        </tr>
    );
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
                    fetchUrl="/vouplaVoucherRules/search/customSearchWithFilter?sort=desc"
                    columns={columns}
                    renderRow={renderRow}
                />
            </Container>
        </div>
    );
};
export default VoucherRulesList;
