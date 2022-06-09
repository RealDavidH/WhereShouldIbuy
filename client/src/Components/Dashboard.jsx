import React, { useState } from 'react'
import axios from 'axios'


const Dashboard = () => {
    const [item, setItem] = useState()
    const [error, setError] = useState([])
    const [submitted, setSubmit] = useState(false)
    const [amazonItem, setAmazon] = useState()
    const [walmartItem, setWalmart] = useState()

    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("c50fb38a9d8278c8b5b09c6caf8593fcd47d3536a2154c213616705f1d7304c6");

    const params = {
        engine: "walmart",
        query: "Coffee"
    };

    const callback = function (data) {
        console.log(data['organic_results']);
    };

    // Show result as JSON


    const amazonOptions = {
        method: 'GET',
        url: 'https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-search-by-keyword-asin',
        params: {
            domainCode: 'com',
            keyword: item,
            page: '1',
        },
        headers: {
            'X-RapidAPI-Host': 'axesso-axesso-amazon-data-service-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '9ee8e61b49msh8421405bf627120p1adea9jsn6788a28ace8f'
        }
    };

    const getWalmart = async () => {
        const response = await axios.request('https://serpapi.com/search.json?engine=walmart&query=Coffee&api_key=c50fb38a9d8278c8b5b09c6caf8593fcd47d3536a2154c213616705f1d7304c6', {mode: 'no-cors'})
        return response.data
    }

    const testWalmart = () => {
        getWalmart()
        // search.json(params, callback);
    }

    const handleChange = (e) => {
        setItem(e.target.value)
    }

    const getAmazon = async () => {
        const response = await axios.request(amazonOptions) //Axios request for amazon 
        return response.data.searchProductDetails[0]
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true)
        getAmazon()
            .then(setAmazon)

    }


    return (
        <div className='d-flex justify-content-center flex-column w-75 mx-auto'>
            <form className='d-flex text-center flex-column mx-auto justify-content-center' onSubmit={handleSubmit}>
                <h1>Where should I buy a...</h1>
                <input type="text" className='w-50 mx-auto' placeholder='ex: GameCube' onChange={handleChange} />
                <div>
                    <input type="submit" value="Find Item" className='btn btn-primary mt-2 w-25 text-center' />
                </div>
                {error.map((err, i) => <div className='text-center' key={i}><p>{err}</p></div>)}
            </form>
            <input type="button" value="Walmart" onClick={testWalmart} />
            {submitted && amazonItem &&
                <a href={`https://www.amazon.com${amazonItem.dpUrl}`} className='text-decoration-none text-dark'>
                    <div className='bg-light border mt-5 d-flex'>
                        <img src={amazonItem.imgUrl} className='img-thumbnail rounded border-0 col-4' alt={amazonItem.productDescription} />
                        <div className='d-flex col-8 flex-column'>
                            <p className='fs-3 mx-auto'>{amazonItem.productDescription}</p>
                            <p>Price: ${amazonItem.price}</p>
                        </div>
                    </div>
                </a>
            }
            {submitted && !amazonItem &&
                <div>
                    <p className='fs-2 text-dark'>Searching Amazon</p>
                    <p class="placeholder-glow">
                        <span class="placeholder col-12"></span>
                    </p>
                </div>
            }

        </div>
    )
}

export default Dashboard