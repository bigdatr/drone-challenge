import React, {Component} from 'react';
import {Layout} from "antd";
import style from '../assets/styles/app.module.scss';
import droneLogo from '../assets/images/drone.svg'
import CommandForm from "./CommandForm";
import NetworkHelper from "../helper/NetworkHelper";
import {START_DRONE_BY_COMMAND_STRING} from "../const/api";
const { Header, Footer, Content } = Layout;

class Dashboard extends Component{

    sendCommand(command) {
        console.log(command)

        NetworkHelper.post(START_DRONE_BY_COMMAND_STRING, command).then((res) => {
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
                            <img alt='logo' src={droneLogo} />
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
