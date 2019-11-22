import React, {Component} from 'react';
import {Layout, Skeleton, Statistic, Divider, Row, Col, List} from "antd";
import style from '../assets/styles/app.module.scss'

class Result extends Component {
    render() {
        const {isLoading, result} = this.props;
        return (
            <Layout>

                <div className={style.form_content + ' ' + style.padding_top_0}>
                    <div>
                        <Skeleton loading={isLoading}/>
                        {
                            result ? <div>
                                <Row>
                                    <Col span={8}>
                                        <Statistic title='Billboards Count' value={result.uniqueBillboards}/>
                                    </Col>
                                    <Col span={16}>
                                        <List
                                            header='Drone Status'
                                            bordered
                                            dataSource={result.droneStatus}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={`Drone ${item.index} took ${item.totalBillboard} photos`}
                                                        description={`Current location: {x: ${item.position.x}, y: ${item.position.y}}`}
                                                  />
                                                </List.Item>
                                            )}
                                        />
                                    </Col>
                                </Row>
                            </div> : ''
                        }

                    </div>
                </div>
            </Layout>
        )
    }
}

export default Result;
