import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppNavbar from "./AppNavBar";
import {Button, Container} from "reactstrap";

class VoucherTemplateFileEdit extends Component {

    emptyItem = {
        idTempFile: '',
        templateId: '',
        formatOut: 'HTML',
        tempSourceT: '',
        tempSource: ''
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
            const voucherTemplateFile = await (await fetch(`/vouplaVoucherTemplateFile/${this.props.match.params.id}`)).json();
            this.setState({item: voucherTemplateFile});
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

        await fetch('/vouplaVoucherTemplateFile' + (item.idTempFile ? '/' + item.idTempFile : ''), {
            method: (item.idTempFile) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Requested-By': 'vouchers-local-backoffice'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/vouplaVoucherTemplateFile');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.idTempFile ? 'Editing voucherTemplateFile #' + item.idTempFile : 'Adding voucherTemplateFile'}</h2>;

        return (
                <div>
                    <AppNavbar/>
                    <Container>
                        <div className="row mt-4 page-title">
                            <h3 className="col-md-8">{title}</h3>
                            <Button color="warning" tag={Link} to="/voucherTemplateFiles" className="col-md-3">Back to list</Button>
                            <div className="col-md-1">&nbsp;</div>
                        </div>
                    </Container>
                </div>
        );
    }
}

export default withRouter(VoucherTemplateFileEdit);