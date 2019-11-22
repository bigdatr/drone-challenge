import React, {Component} from 'react';
import {Layout, message} from "antd";
import style from '../assets/styles/app.module.scss';
import droneLogo from '../assets/images/drone.svg'
import CommandForm from "./CommandForm";
import NetworkHelper from "../helper/NetworkHelper";
import {START_DRONE_BY_COMMAND_FILE, START_DRONE_BY_COMMAND_STRING} from "../const/api";
import {COMMAND_TYPE_FILE} from "../const/const";
import Result from "./Result";

const {Header, Footer, Content} = Layout;

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            droneStatus: null
        };
    }

    sendCommand = (type, command) => {
        this.setState({
            isLoading: true,
            droneStatus: null
        }, () => {
            const sendCommand = type === COMMAND_TYPE_FILE ?
                NetworkHelper.formPost(START_DRONE_BY_COMMAND_FILE, command) :
                NetworkHelper.jsonPost(START_DRONE_BY_COMMAND_STRING, command);
            sendCommand.then((res) => {
                if (res.status) {
                    this.setState({
                        droneStatus: res.data
                    })
                } else {
                    message.error(res.message)
                }
            }).catch((err) => {
                message.error(err.message)
            }).finally(() => {
                this.setState({
                    isLoading: false
                });
            })
        });
    };


    render() {
        return (
            <Layout className={style.full_screen}>
                <Header className={style.header}>
                    <div className={style.header_logo}>
                        <img alt='logo' src={droneLogo}/>
                    </div>
                </Header>
                <Content className={style.padding_40}>
                    <CommandForm onSubmitCommand={this.sendCommand}/>
                    <Result isLoading={this.state.isLoading} result={this.state.droneStatus}/>
                </Content>
                <Footer className={style.footer}>
                    Created by Luke Lu @2019
                </Footer>
            </Layout>
        )
    }
}

export default Dashboard
