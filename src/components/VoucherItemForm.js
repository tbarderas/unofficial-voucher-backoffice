import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {FormCheck} from "react-bootstrap";

export const mapBooleanToRadioOption = (x) => x ? 0 : 1;

export const VoucherItemForm = memo(({entityName, item, columns, handleChange, handleSubmit}) => {
    const noTransform = (x) => x;

    const renderGenericInput = (column) => {
        const valueAdapter = column.adapter || noTransform;
        return (
            <Input type={column.type || 'text'} name={column.field} id={column.field}
                   value={item[column.field] ? valueAdapter(item[column.field]) : ''}
                   rows={column.rows || ''}
                   className={column.inputClass || ''}
                   onChange={handleChange}/>
        );
    }

    const renderRadioOption = (column) => {
        if (column.values === undefined) {
            return (<i>No values for radioButton {column.label}</i>)
        }

        return column.values.map((inputValue, idx) =>
            <FormCheck
                type="radio"
                inline
                reverse
                id={`${column.field}-${inputValue.value}`}
                name={column.field}
                label={inputValue.label}
                value={inputValue.value}
                className={column.inputClass || ''}
                checked={item[`${column.field}Checked`] === idx}
                onChange={(event) => handleChange(event, idx)}
            />
        )
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {columns.map((col, idx) => {
                        const formInput = col.type === 'radio' ? renderRadioOption(col) : renderGenericInput(col)
                        return (
                            <FormGroup className={col.className || ''}>
                                <Label for={col.field}>{col.label}</Label>
                                {formInput}
                            </FormGroup>
                        );
                    }
                )}

                <FormGroup className="submit-line">
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to={"/" + entityName}>Cancel</Button>
                </FormGroup>
            </Form>
        </div>
    )

});

