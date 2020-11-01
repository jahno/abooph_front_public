import React, { useState, useEffect } from 'react';

import { Table, Tag, Space, Button, Steps  } from 'antd';
import { Link, useRouteMatch, useHistory, useParams } from 'react-router-dom';

import { PUBLIC_ROUTE } from 'constants/api';
import { getOrderDetail } from 'services/api';
import { order } from 'constants/urls';

const { Step } = Steps;

function OrderDetail() {
    const [ state, setState ] = useState({
        order: {},
        loading: true,
    })

    const { url } = useRouteMatch();
    const history = useHistory()
    const params = useParams()

    useEffect(() => {
        getOrderDetail(params.id, (res) => {
            setState(state => ({
                ...state, 
                order: res,
                loading: false,
            }));
        })
    },[])

    if(state.loading) return 'Veuillez patienter ...'
    
    const columns = [
        {
            title: 'Image',
            key: 'image',
            render: (item) => {
                return (
                    <Link to={`${process.env.PUBLIC_URL}/article/${item.id}`}>
                        <img 
                            width={50}
                            height={50}
                            src={`${PUBLIC_ROUTE}/${item.images[0].chemin}`} 
                            // src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                            alt="" 
                        />
                    </Link>
                )
            }
        },
        {
          title: 'Nom',
          dataIndex: 'nom',
          key: 'nom',
          render: (nom, item) => (
            <Link to={`${process.env.PUBLIC_URL}/article/${item.id}`}>
                {nom}
            </Link>
          ),
        },
        {
          title: 'Prix',
          dataIndex: 'prix',
          key: 'prix',
          render: prix => prix + ' FCFA'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
        {
          title: 'Action',
          key: 'action',
          render: (text, item) => (
            <Space size="middle">
              <Button onClick={() => history.push(`${process.env.PUBLIC_URL}/article/${item.id}`)}>Détail</Button>
            </Space>
          ),
        },
    ];

    return (
        <>
            <div className="page-title">
                <h2>Détail Commande</h2>
            </div>
            <br/>

            {order.coursier && (
                <>
                    <div className="box-account box-info">
                        <div>
                            <div className="box">
                                <div className="box-title">
                                    <h3>Courtier</h3>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h6>Nom et prénom</h6>
                                        <address>
                                            {order.coursier.nom} {order.coursier.prenom}
                                        </address>

                                        <div style={{height: 6}}/>

                                        <img 
                                            width={70}
                                            height={70}
                                            src={`${PUBLIC_ROUTE}/${order.coursier.avatar}`}
                                            alt="" 
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <h6>Contacts</h6>
                                        <address>
                                            {order.coursier.numero}<br/>
                                            {order.coursier.email}
                                        </address>

                                        <div style={{height: 5}}/>
                                        
                                        <h6>Adresse</h6>
                                        <address>
                                            {order.coursier.Adresse_geographique}
                                        </address>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                </>
            )}

            <div className="box-account box-info">
                <div>
                    <div className="box">
                        <div className="box-title">
                            <h3>Statuts</h3>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">

                            <Steps direction='horizontal' current={1}>
                                <Step title="Finished" description="This is a description." />
                                <Step title="In Progress" description="This is a description." />
                                <Step title="Waiting" description="This is a description." />
                            </Steps>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>

            <div className="box-account box-info">
                <div>
                    <div className="box">
                        <div className="box-title">
                            <h3>Liste des articles</h3>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <Table columns={columns} dataSource={state.order.panier.articles} style={{overflow: 'auto'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </>
    )
}

const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
];

export default OrderDetail;
