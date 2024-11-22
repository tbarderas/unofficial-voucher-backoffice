import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

const VoucherItemForm = memo(({ entityName, item, columns, handleChange, handleSubmit }) => {
    const noTransform = (x) => x;

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {columns.map((col, idx) => {
                    const valueAdapter = col.adapter || noTransform;
                    return (
                        <FormGroup className={col.className || ''}>
                            <Label for={col.field}>{col.label}</Label>
                            <Input type={col.type || 'text'} name={col.field} id={col.field}
                                   value={item[col.field] ? valueAdapter(item[col.field]) : ''}
                                   rows={col.rows || ''}
                                   className={col.inputClass || ''}
                                   onChange={handleChange}/>
                        </FormGroup>
                    )}
                )}

                <FormGroup className="submit-line">
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to={"/" + entityName}>Cancel</Button>
                </FormGroup>
            </Form>
        </div>
    )

});

export default VoucherItemForm;