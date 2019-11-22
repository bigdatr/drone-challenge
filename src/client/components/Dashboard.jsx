import React, {Component} from 'react';
import {Layout} from "antd";
import style from '../assets/styles/app.module.scss';
import droneLogo from '../assets/images/drone.svg'
import CommandForm from "./CommandForm";
import NetworkHelper from "../helper/NetworkHelper";
import {START_DRONE_BY_COMMAND_FILE, START_DRONE_BY_COMMAND_STRING} from "../const/api";
import {COMMAND_TYPE_FILE} from "../const/const";

const {Header, Footer, Content} = Layout;

class Dashboard extends Component {

    sendCommand(type, command) {
        const sendCommand = type === COMMAND_TYPE_FILE ?
            NetworkHelper.formPost(START_DRONE_BY_COMMAND_FILE, command) :
            NetworkHelper.jsonPost(START_DRONE_BY_COMMAND_STRING, command);
        sendCommand.then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    }


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
                </Content>
                <Footer className={style.footer}>
                    Created by Luke Lu @2019
                </Footer>
            </Layout>
        )
    }
}

export default Dashboard
