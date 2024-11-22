import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {Container} from "reactstrap";
import {VoucherItemForm} from "../../components/VoucherItemForm";

class VoucherRuleOthersEdit extends Component {

    emptyItem = {
        otherRuleId: '',
        ruleId: '',
        activityTypeId: '',
        associatedCompanyId: '',
        serviceId: '',
        modalityId: '',
        supplierCarId: '',
        cmdId: '',
        categoryId: '',
        cmdGdsId: '',
        activityIntegrationId: ''
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
            const voucherRuleOthers = await (await fetch(`/vouplaVoucherRulesOthers/${this.props.match.params.id}`)).json();
            this.setState({item: voucherRuleOthers});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.state.item;
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/vouplaVoucherRulesOthers' + (item.otherRuleId ? '/' + item.otherRuleId : ''), {
            method: (item.otherRuleId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Requested-By': 'vouchers-local-backoffice'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/voucherRulesOthers');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.otherRuleId ? 'Editing VoucherRuleOthers #' + item.otherRuleId : 'Adding VoucherRuleOthers'}</h2>;
        const columns = [
            { field: 'ruleId', label: 'Rule ID'},
            { field: 'activityTypeId', label: 'Activity Type ID'},
            { field: 'associatedCompanyId', label: 'Associated Company ID'},
            { field: 'serviceId', label: 'Service ID'},
            { field: 'modalityId', label: 'Modality ID'},
            { field: 'supplierCarId', label: 'Supplier Car ID'},
            { field: 'cmdId', label: 'Cmd ID'},
            { field: 'categoryId', label: 'Category ID'},
            { field: 'cmdGdsId', label: 'Cmd Gds ID'},
            { field: 'activityIntegrationId', label: 'Activity Integration ID'}
        ]

        return (
                <div>
                    <AppNavbar/>
                    <Container>
                        <div className="row mt-4 page-title">
                            <h3 className="col-md-8">{title}</h3>
                            <div className="col-md-1">&nbsp;</div>
                        </div>

                        <VoucherItemForm
                            entityName="voucherRulesOthers"
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

export default withRouter(VoucherRuleOthersEdit);
