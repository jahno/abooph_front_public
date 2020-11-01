import React, { useEffect, useState } from 'react';

import { useRouteMatch, useHistory } from "react-router-dom";
import { Table, Tag, Space, Button } from 'antd';

import { getOrders } from 'services/api';

function Orders() {
    const [ state, setState ] = useState({
        items: {
            total:  1,
            perPage: 1,
            page: 1,
            lastPage: 1,
            data: [],
        }, 
        loading: true,
    })

    const { url } = useRouteMatch();
    const history = useHistory()

    useEffect(() => {
        getOrders(null, (res) => {
            setState(state => ({
                ...state, 
                items: res.results,
                loading: false,
            }));
        })
    },[])

    const columns = [
        {
          title: 'Livraison',
          dataIndex: 'livraison',
          key: 'livraison',
          render: (state, item) => item.livraison + ' FCFA'
        },
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'total',
          render: (state, item) => item.total + ' FCFA'
        },
        {
          title: 'Adresse',
          dataIndex: 'adresse',
          key: 'adresse',
        },
        {
          title: 'Statut',
          key: 'state',
          dataIndex: 'state',
          render: (state, item) => (
            <Tag color='green'>
                {item.etatText[item.etat].toUpperCase()}
            </Tag>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, item) => (
            <Space size="middle">
              <Button onClick={() => history.push(`${url}/${item.id}/detail`)}>Détail</Button>
            </Space>
          ),
        },
    ];

    return (
        <>
            <div className="page-title">
                <h2>Mes Commandes</h2>
            </div>

            <Table loading={state.loading} columns={columns} dataSource={state.items.data} style={{overflow: 'auto'}}/>
        </>
    )
}

export default Orders;
