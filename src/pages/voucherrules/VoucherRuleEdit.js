import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {Container} from "reactstrap";
import {mapBooleanToRadioOption, updateDB, VoucherItemForm} from "../../components/VoucherItemForm";

class VoucherRuleEdit extends Component {

    emptyItem = {
        ruleId: '',
        isActive: '',
        isGeneral: '',
        temporaryId: '',
        application: '',
        webpageId: '',
        domain: '',
        groupId: '',
        incomingOfficeId: '',
        supplierIncomingOffice: '',
        bookingDateFrom: '',
        bookingDateTo: '',
        serviceDateFrom: '',
        serviceDateTo: '',
        productTypeId: '',
        associatedCompanyId: '',
        channelInterfaceId: '',
        clientId: '',
        agencyCode: '',
        languageCode: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

        if (this.props.match.params.id !== 'new') {
            const voucherRule = await (await fetch(`/vouplaVoucherRules/${this.props.match.params.id}`)).json();
            voucherRule['isActiveChecked'] = mapBooleanToRadioOption(voucherRule.isActive);
            voucherRule['isGeneralChecked'] = mapBooleanToRadioOption(voucherRule.isGeneral)
            this.setState({item: voucherRule});
        }
    }

    handleChange(event, index = 0) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let item = this.state.item;
        item[name] = value;

        if (name.startsWith('is')) {
            item[name + 'Checked'] = index
        }
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/vouplaVoucherRules' + (item.ruleId ? '/' + item.ruleId : ''), {
            method: (item.ruleId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Requested-By': 'vouchers-local-backoffice'
            },
            body: JSON.stringify(item),
        }).then((response) => {
            if (!response.ok) {
                response.json().then((json) => {
                    console.log('Fail:' + json.message);
                    alert('Cant save item: ' + json.message);
                })
            } else {
                updateDB('voupla-voucher-rule');
                this.props.history.push('/voucherRules');
            }
        });
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.ruleId ? 'Editing VoucherRule #' + item.ruleId : 'Adding VoucherRule'}</h2>;
        const columns = [
            { field: 'isActive', label: 'isActive', type: 'radio', values: [
                { label: 'YES', value: true}, { label: 'NO', value: false}
                ]},
            { field: 'isGeneral', label: 'isGeneral', type: 'radio', values: [
                    { label: 'YES', value: true}, { label: 'NO', value: false}
                ]},
            { field: 'temporaryId', label: 'temporaryId'},
            { field: 'application', label: 'application'},
            { field: 'webpageId', label: 'webpageId'},
            { field: 'domain', label: 'domain'},
            { field: 'groupId', label: 'groupId'},
            { field: 'incomingOfficeId', label: 'incomingOfficeId'},
            { field: 'supplierIncomingOffice', label: 'supplierIncomingOffice'},
            { field: 'bookingDateFrom', label: 'bookingDateFrom'},
            { field: 'bookingDateTo', label: 'bookingDateTo'},
            { field: 'serviceDateFrom', label: 'serviceDateFrom'},
            { field: 'serviceDateTo', label: 'serviceDateTo'},
            { field: 'productTypeId', label: 'productTypeId'},
            { field: 'associatedCompanyId', label: 'associatedCompanyId'},
            { field: 'channelInterfaceId', label: 'channelInterfaceId'},
            { field: 'clientId', label: 'clientId'},
            { field: 'agencyCode', label: 'agencyCode'},
            { field: 'languageCode', label: 'languageCode'}
        ]

        return (
                <div>
                    <AppNavbar/>
                    <Container>
                        <div className="row mt-4 page-title">
                            <h3 className="col-md-8">{title}{item.clone ? ' [ CLONING ]' : ''}</h3>
                            <div className="col-md-1">&nbsp;</div>
                        </div>

                        <VoucherItemForm
                            entityName="voucherRules"
                            item={item}
                            columns={columns}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        />

                    </Container>
                </div>
        );
    }
}

export default withRouter(VoucherRuleEdit);