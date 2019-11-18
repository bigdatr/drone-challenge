import React, {Component} from 'react';
import style from '../assets/styles/app.module.scss'
import {Layout, Form, Button, InputNumber, Radio, Input, Upload, Icon, message} from "antd";
import _ from 'lodash';
import {COMMAND_TYPE_FILE, COMMAND_TYPE_INPUT} from "../const/const";

const {TextArea} = Input;
const {Dragger} = Upload;

class CommandForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        };
        this.SubmitCommand = this.SubmitCommand.bind(this);
    }

    SubmitCommand(event) {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                message.error('Form is invalid');
            } else if (this.props.form.getFieldValue('type') === COMMAND_TYPE_FILE
                && this.state.fileList.length === 0) {
                message.error('No File found');
            } else {
                const formData = new FormData();
                formData.append('username', 'Chris');
                formData.append('quantity', values.quantity);
                formData.append('type', values.type);
                if (values.type === COMMAND_TYPE_FILE) {
                    formData.append('files[]', this.state.fileList[0]);
                } else {
                    formData.append('command', values.command);
                }

                this.props.onSubmitCommand(formData);
            }
        });
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const {getFieldDecorator} = this.props.form;
        const uploadProps = {
            name: 'file',
            accept: '.txt',
            listType: 'text',
            onRemove: file => {
                console.log(file);
                this.setState(state => {
                    return {
                        fileList: [],
                    };
                });

                this.props.form.setFieldsValue({file: {}});
                return null;
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [file]
                }));
                return false
            }
        };
        return (
            <Layout>
                <div className={style.form_title}>
                    Please enter your command to drone
                </div>
                <div className={style.form_wrapper}>
                    <div className={style.form_content}>
                        <Form {...formItemLayout} onSubmit={this.SubmitCommand}>
                            <Form.Item label='Number of Drones'>
                                {getFieldDecorator('quantity', {
                                    rules: [
                                        {required: true, message: 'Required!'},
                                        {type: 'number', message: 'Number only'},
                                        {
                                            validator(rule, value, callback) {
                                                if (_.isNumber(value) && value < 1) {
                                                    callback('You need at least 1 drone')
                                                } else {
                                                    callback()
                                                }
                                            }
                                        }
                                    ],
                                })(
                                    <InputNumber/>
                                )}
                            </Form.Item>

                            <Form.Item label='Command Type'>
                                {getFieldDecorator('type', {
                                    rules: [{
                                        required: true, message: 'Required'
                                    }]
                                })(
                                    <Radio.Group>
                                        <Radio value={COMMAND_TYPE_INPUT}>Input</Radio>
                                        <Radio value={COMMAND_TYPE_FILE}>Upload</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>

                            {
                                this.props.form.getFieldValue('type') === COMMAND_TYPE_INPUT ?
                                    <Form.Item label='Command'>
                                        {getFieldDecorator('command', {
                                            rules: [
                                                {required: true, message: 'Required'}
                                            ],
                                        })(
                                            <TextArea rows={4} placeholder='e.g. xx>>x'/>
                                        )}
                                    </Form.Item> : ''
                            }

                            {
                                this.props.form.getFieldValue('type') === COMMAND_TYPE_FILE ?
                                    <Form.Item label='Select a command'>
                                        <Dragger {...uploadProps} fileList={this.state.fileList}>
                                            <div>
                                                <p className={style.uploader_icon}><Icon type='file-add'/></p>
                                                <p className={style.uploader_title}>Click or drag file to this area
                                                    (.txt file only)</p>
                                            </div>
                                        </Dragger>
                                    </Form.Item> : ''
                            }


                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Run
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Form.create({name: 'Command'})(CommandForm)
