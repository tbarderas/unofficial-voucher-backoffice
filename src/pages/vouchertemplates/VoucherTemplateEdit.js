import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppNavbar from "../../components/AppNavBar";
import {Button, Container} from "reactstrap";

class voucherTemplateEdit extends Component {

    emptyItem = {
        templateId: '',
        status: '',
        templateName: '',
        description: '',
        formatTypeT: '',
        formatType: '',
        languageCode: '',
        outputFormat: ''
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
            const voucherTemplate = await (await fetch(`/vouplaVoucherTemplate/${this.props.match.params.id}`)).json();
            this.setState({item: voucherTemplate});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/vouplaVoucherTemplate' + (item.templateId ? '/' + item.templateId : ''), {
            method: (item.templateId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Requested-By': 'vouchers-local-backoffice'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/vouplaVoucherTemplate');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.templateId ? 'Editing voucherTemplate #' + item.templateId : 'Adding voucherTemplate'}</h2>;

        return (
                <div>
                    <AppNavbar/>
                    <Container>
                        <div className="row mt-4 page-title">
                            <h3 className="col-md-8">{title}</h3>
                            <Button color="warning" tag={Link} to="/voucherTemplates" className="col-md-3">Back to list</Button>
                            <div className="col-md-1">&nbsp;</div>
                        </div>
                    </Container>
                </div>
        );
    }
}

export default withRouter(voucherTemplateEdit);