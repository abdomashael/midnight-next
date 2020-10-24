import React, {useState} from "react";
import {Form, Input, TextArea, Button, Select, Header} from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import Flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import Label from "semantic-ui-react/dist/commonjs/elements/Label";


const genderOptions = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
    {key: 'o', text: 'Other', value: 'other'},
]
const ProfileDetails = () => {
    // ${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`
    const [birthDate, setBirthDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false);
    return (
        <div>

            <Form inverted>

                <Form.Group widths='equal'>
                    <Form.Field
                        id='form-input-control-first-name'
                        control={Input}
                        label='First name'
                        placeholder='First name'
                    />
                    <Form.Field
                        id='form-input-control-last-name'
                        control={Input}
                        label='Last name'
                        placeholder='Last name'
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field
                        id='form-input-control-birth-day'
                    >
                        <label  >Birthday</label>
                        <Input value={    `${birthDate.getDay()}/${birthDate.getMonth()}/${birthDate.getFullYear()}`
                        } placeholder='Last name' onClick={()=>{setShowPicker(true)}}/>
                        {showPicker?<Calendar
                            value={birthDate}
                            onChange={date => {
                                setBirthDate(date);
                                setShowPicker(false)
                            }}/>:""}

                    </Form.Field>

                    <Form.Field
                        control={Select}
                        options={genderOptions}
                        label={{children: 'Gender', htmlFor: 'form-select-control-gender'}}
                        placeholder='Gender'
                        search
                        searchInput={{id: 'form-select-control-gender'}}
                    />

                </Form.Group>
                <Form.Field
                    id='form-input-control-error-email'
                    control={Input}
                    label='Email'
                    placeholder='joe@schmoe.com'
                    error={{
                        content: 'Please enter a valid email address',
                        pointing: 'below',
                    }}
                />
                <Form.Field
                    id='form-button-control-public'
                    control={Button}
                    content='Confirm'
                />
            </Form>
        </div>)
}

export default ProfileDetails
