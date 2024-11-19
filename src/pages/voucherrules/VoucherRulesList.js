import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {FadeLoader} from "react-spinners";

class VoucherRulesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voucherRules: [],
            pagination: {
                self: 0,
                next: 0,
                last: 1000
            },
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({voucherRules: [], pagination: this.state.pagination, isLoading: true});
        this.loadPage(0);
    }

    changePage(event) {
        let currentPagination = this.state.pagination;
        let targetPage = event.target.value;
        let targetPageNumber = currentPagination.self;

        if (targetPage === 'first') {
            targetPageNumber = 0;
        } else if (targetPage === 'prev') {
            targetPageNumber = Math.max(0, currentPagination.self - 1);
        } else if (targetPage === 'last') {
            targetPageNumber = currentPagination.last;
        } else if (targetPage === 'next') {
            targetPageNumber = currentPagination.next;
        }

        this.setState({
            voucherRules: this.state.voucherRules,
            pagination: {
                self: targetPageNumber,
                next: Math.min(targetPageNumber + 1, currentPagination.last),
                last: currentPagination.last
            },
            isLoading: true
        });
        console.log('targetPage:' + targetPage + ' - pagination.self:' + targetPageNumber);
        this.loadPage(targetPageNumber);
    }

    loadPage(pageToLoad) {
        let pageFilter = pageToLoad !== 0 ? '&page=' + pageToLoad : '';
        console.log('loading page:' + pageToLoad + ' - using filter: ' + pageFilter);
        fetch('/vouplaVoucherRules/search/customSearchWithFilter?sort=desc' + pageFilter)
            .then(response => response.json())
            .then(data => this.setState({
                voucherRules: data["_embedded"]["vouplaVoucherRules"],
                pagination: {
                    self: data["page"]["number"],
                    next: Math.min(data["page"]["number"] + 1, data["page"]["totalPages"] - 1),
                    last: data["page"]["totalPages"] - 1,
                },
                isLoading: false}));
    }

    render() {
        const {voucherRules, pagination, isLoading} = this.state;

        if (isLoading) {
            return <div className="col-md-12 align-content-center"><FadeLoader/></div>
        }

        const voucherRulesList = voucherRules?.map(voucherRule => {
            return <tr key={voucherRule.ruleId}>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/voucherRules/" + voucherRule.ruleId}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                        </Button>
                        <Button size="sm" color="info" tag={Link} to={"/voucherRules/" + voucherRule.ruleId + '?clone'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy"
                                 viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                            </svg>
                        </Button>
                    </ButtonGroup>
                </td>
                <td style={{whiteSpace: 'nowrap'}}>{voucherRule.ruleId}</td>
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
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="row mt-4 page-title">
                        <h3 className="col-md-9">VoucherRules</h3>
                        <Button color="success" tag={Link} to="/voucherRules/new" className="col-md-2">Add VoucherRule</Button>
                        <div className="col-md-1">&nbsp;</div>
                    </div>
                    <div className="mt-12">
                        <Button outline={true} color="dark"  disabled={pagination.self === 0}value="first" onClick={e => {this.changePage(e);}}>First</Button>
                        <Button outline={true} color="dark"  disabled={pagination.self === 0}value="prev" onClick={e => {this.changePage(e);}}>Prev.</Button>
                        <Button outline={true} disabled={true} color="dark">Page {pagination.self + 1} of {pagination.last + 1}</Button>
                        <Button outline={true} color="dark" disabled={pagination.next >= pagination.last} value="next" onClick={e => {this.changePage(e);}}>Next</Button>
                        <Button outline={true} color="dark" disabled={pagination.self === pagination.last} value="last" onClick={e => {this.changePage(e);}}>Last</Button>
                    </div>
                    <Table className="mt-4 table-condensed table-hover" striped bordered>
                        <thead>
                        <tr className="small">
                            <th width="4%">Actions</th>
                            <th width="4%">#Id</th>
                            <td width="4%">act.?</td>
                            <td width="4%">gral.?</td>
                            <td width="4%">Temporary<br/>Id</td>
                            <td width="6%">Application</td>
                            <td width="6%">WebpageId</td>
                            <td width="6%">Domain</td>
                            <td width="6%">GroupId</td>
                            <td width="4%">Incoming<br/>OfficeId</td>
                            <td width="4%">Supplier<br/>Incoming<br/>Office</td>
                            <td width="6%">BookingDate<br/>From</td>
                            <td width="6%">BookingDate<br/>To</td>
                            <td width="6%">ServiceDate<br/>From</td>
                            <td width="6%">ServiceDate<br/>To</td>
                            <td width="4%">Associated<br/>CompanyId</td>
                            <td width="4%">Channel<br/>InterfaceId</td>
                            <td width="4%">ClientId</td>
                            <td width="4%">Agency<br/>Code</td>
                            <td width="4%">Language<br/>Code</td>
                        </tr>
                        </thead>
                        <tbody>
                        {voucherRulesList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default VoucherRulesList;
