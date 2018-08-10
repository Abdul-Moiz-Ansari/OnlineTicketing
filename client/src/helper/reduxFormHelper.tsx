
import * as React from 'react';

export default class ReduxFormHelper{

    public createRenderer = render => ({input, meta, label, ...rest}) =>
        <div className="col-md-6">
            <label className="col-md-3">Title</label>
            <div className="col-md-8">
                {render(input, label, rest)}

                <div className="text-help">
                    {meta.touched ? meta.error : ''}
                </div>
            </div>
        </div>

    public createInput = this.createRenderer((input, label) =>
        <input {...input} className="form-control" />
    )

    public createSelect = this.createRenderer((input, label, {children}) =>
        <select {...input} className="form-control" >
            <option>Select</option>
            {children}
        </select>
    )

}

export const required = value => (value ? undefined : 'Required')
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

export const requiredSelect = initValue => value =>
  value && value === initValue ? `Required` : undefined;

export const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined