import store from 'store';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getProfiles } from '../../actions/profile';

import { Row, Col, Table, Input, Avatar } from 'antd';

import classNames from 'classnames/bind';
import styles from './index.scss';
const cx = classNames.bind(styles);
const colors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#689F38',
    '#C0CA33',
    '#FBC02D',
    '#EF6C00',
    '#FF5722',
    '#795548',
];

class Profiles extends Component {
    static propTypes = {
        profiles: PropTypes.object,
        getProfiles: PropTypes.func,
    };

    state = {
        initialProfiles: [],
        profiles: {},
    };

    componentDidMount() {
        this.props.getProfiles();
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        const initialProfiles = JSON.parse(JSON.stringify(nextProps.profiles));
        const isEmptyProfiles = !Object.keys(nextState.profiles).length;
        return {
            initialProfiles,
            profiles: isEmptyProfiles ? nextProps.profiles : nextState.profiles,
        };
    }

    getColumns = () => {
        return [
            {
                title: '',
                key: 'photoURL',
                dataIndex: 'photoURL',
                width: 30,
                render: (text, item) => {
                    const index = Math.floor(Math.random() * colors.length);
                    const bgColor = colors[index];
                    return (
                        <div>
                            {text && <Avatar src={text} />}
                            {(!text || !text.length) && (
                                <Avatar style={{ backgroundColor: bgColor }}>
                                    {item.displayName.charAt(0).toUpperCase()}
                                </Avatar>
                            )}
                        </div>
                    );
                },
            },
            {
                title: 'Name',
                key: 'name',
                render: (text, item) => {
                    return <span>{item.displayName}</span>;
                },
                sorter: (a, b) => {
                    if (a.displayName > b.displayName) {
                        return 1;
                    } else if (a.displayName < b.displayName) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
            },
            {
                title: 'Email',
                key: 'email',
                dataIndex: 'email',
                sorter: (a, b) => {
                    if (a.email > b.email) {
                        return 1;
                    } else if (a.email < b.email) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
            },
            {
                title: 'Job Title',
                key: 'jobTitle',
                dataIndex: 'jobTitle',
            },
            {
                title: 'Skills',
                key: 'skills',
                render: (text, item) => {
                    const skills = (item.skills || []).join(',');
                    return <span>{skills}</span>;
                },
            },
            {
                title: 'Degree',
                key: 'degree',
                dataIndex: 'degree',
            },
        ];
    };

    onSearch = value => {
        const { initialProfiles } = this.state;
        console.log(initialProfiles);
        const initialProfilesList = this.getProfiles(initialProfiles);
        const filteredProfiles = initialProfilesList.filter(profile => {
            return (
                profile.displayName.toLowerCase().includes(value.toLowerCase()) ||
                profile.email.toLowerCase().includes(value.toLowerCase()) ||
                profile.jobTitle.toLowerCase().includes(value.toLowerCase()) ||
                (profile.skills || [])
                    .join(',')
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                profile.degree.toLowerCase().includes(value.toLowerCase())
            );
        });
        const data = {};
        filteredProfiles.forEach(p => {
            const item = JSON.parse(JSON.stringify(p));
            const key = item.id;
            delete item.id;
            data[key] = item;
        });
        this.setState(
            {
                profiles: data,
            },
            () => {
                console.log(this.state.profiles);
            }
        );
    };

    getProfiles = profiles => {
        const entries = [];
        console.log(profiles);
        for (let key in profiles) {
            const profile = {
                id: key,
                ...profiles[key],
            };
            entries.push(profile);
        }
        return entries;
    };

    decodeProfiles = profiles => {};

    render() {
        const { profiles } = this.state;
        const dataSource = this.getProfiles(profiles);
        return (
            <div className={cx('Profiles__content')}>
                <Row className={cx('Input__Search')}>
                    <Col span={6} offset={16}>
                        <Input.Search onSearch={this.onSearch} enterButton />
                    </Col>
                </Row>
                <Row>
                    <Col span={20} offset={2}>
                        <Table
                            rowKey={row => row.id}
                            dataSource={dataSource}
                            columns={this.getColumns()}
                            pagination={{
                                pageSize: 10,
                            }}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profiles: state.profiles,
});

const mapDispatchToProps = dispatch => ({
    getProfiles: bindActionCreators(getProfiles, dispatch),
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);