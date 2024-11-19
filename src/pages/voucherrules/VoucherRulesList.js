import React from 'react';
import {Container, Button, ButtonGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import PaginatedTable from "../../components/PaginatedTable";
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
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={`/voucherRules/${voucherRule.ruleId}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-pencil"
                             viewBox="0 0 16 16">
                            <path
                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                    </Button>
                    <Button size="sm" color="info" tag={Link} to={`/voucherRules/${voucherRule.ruleId}?clone`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-copy"
                             viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                        </svg>
                    </Button>
                </ButtonGroup>
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
