//Solve coinId return undefined
// line 46 link
// error code => to={`/crypto/${currency.id}`}  correction => key={currency.uuid} to={`/crypto/${currency.uuid}`}

import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);  // rename data to cryptosList
    const [ cryptos, setCryptos ] = useState();
    // console.log(cryptos)
    const [ searchTerm, setSearchTerm] = useState('');

    // useEffect happening at the start, component did mount, srypto useSate can set to none
    useEffect( () => {
        setCryptos(cryptosList?.data?.coins);  // get crypto coins at the start

        const filteredData = cryptosList?.data?.coins.filter( (item) => item.name.toLowerCase().includes(searchTerm));

        setCryptos(filteredData);
    }, [cryptosList, searchTerm] 
    );

    if(isFetching) return <Loader />;

    return (
        <>
            {!simplified && (
                 <div className='search-crypto'>
                <Input placeholder='Search Cryptocurrencies' onChange={(e) => setSearchTerm(e.target.value)}></Input>
            </div>
            )}         
            <Row gutter={[32,32]} className='crypto-card-container'>
                {cryptos?.map((currency) => (
                    <Col 
                        xs={24} 
                        sm={12} 
                        lg={6} 
                        className='crypto-card' 
                        key={currency.id}
                    >                                             
                        <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}> 
                            <Card 
                                title={`${currency.rank}. ${currency.name}`} 
                                extra={<img className='crypto-image' src={currency.iconUrl}/>}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}               
            </Row>
        </>
    )
}

export default Cryptocurrencies; 