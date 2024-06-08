const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbconfig');
const { join, resolve } = require('path');
const http = require('http');
_ = require("underscore");
const dotenv = require("dotenv");
const path = require('path');
const axios = require('axios');
dotenv.config()

const app = express();

app.use(express.json());

// app.use(express.static(path.join(__dirname, 'build')));

// app.use(express.static(path.join(__dirname, 'aws')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'aws', 'index.html'));
// });

app.get('/', async (req, res) => {
    const code = req.query.code;
    console.log('code', code);
    //res.send('Hello All');
    try {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.REDIRECT_URI
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`
            }
        });
        console.log('response', response.data);
        res.send(response.data.access_token);
    } catch (error) {
        console.error('Error', error);
        res.send('Error');
    }
});

app.get('/auth/zoom', (req, res) => {
    const clientId = process.env.ZOOM_API_KEY;
    const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI);
    const responseType = 'code';
    const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirect_uri}`;
    res.redirect(authorizationUrl);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('No code provided');
    }
    try {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.REDIRECT_URI
            }, headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('response', response);
        res.send(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.send('Error obtaining token');
    }
});

app.get('/refreshToken', async (req, res) => {
    try {
        const refresh_token = req.query.refreshToken;

        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.send(response.data);

    } catch (error) {
        console.error('Error', error);
        res.send('Error refreshing token')
    }
});

app.use(cors());

global.appRoot = join(__dirname, '/');
config = require(resolve(join(__dirname, '/config', 'index')));
global.project_name = config.app.project_name;

const getPort = config.app.getPort;

const port = process.env.PORT || 4200;

connectDB();

const user = require('./routes/user.routes');
const service = require('./routes/service_category.routes');
const membership_plan = require('./routes/membership_plan.routes');
const payment = require('./routes/payment.routes');
const review = require('./routes/review.routes');
const admin = require('./routes/admin.routes');
const role = require('./routes/role.routes');
const cms = require('./routes/cms.routes');
const faq = require('./routes/faq.routes');
const product = require('./routes/product.routes');
const product_jobs = require('./routes/product_job.routes');
const product_job_proposal = require('./routes/product_job_proposal.routes');
const product_electronics = require('./routes/product_electronics.routes');
const product_real_estate = require('./routes/product_real_estate.routes');
const product_wishlist = require('./routes/product_wishlist.routes');
const product_cart = require('./routes/product_cart.routes');
const product_fashion = require('./routes/product_fashion.routes');
const product_goods = require('./routes/product_goods.routes');
const product_education = require('./routes/product_education.routes');
const product_freelancer = require('./routes/product_freelancer.routes');
const store_setting = require('./routes/store_setting.routes');
const email_setting = require('./routes/email_setting.routes');
const promo_code = require('./routes/promo_code.routes');
const payment_method = require('./routes/payment_method.routes');
const currency = require('./routes/currency.routes');
const country = require('./routes/country.routes');
const admin_action = require('./routes/admin_action.routes');
const admin_module = require('./routes/admin_module.routes');
const admin_permission = require('./routes/admin_permission.routes');
const language = require('./routes/language.routes');
const attribute = require('./routes/attribute.routes');
const attribute_value = require('./routes/attribute_value.routes');
const attribute_option = require('./routes/attribute_option.routes');
const bid_history = require('./routes/bid_history.routes');
const order = require('./routes/order.routes');
const job_apply = require('./routes/job_apply.routes');
const room = require('./routes/room.routes');

global.BASE_URL = `http://${process.env.HOST}:${getPort}`;

app.use('/api', user);
app.use('/api', service);
app.use('/api', membership_plan);
app.use('/api', payment);
app.use('/api', review);
app.use('/api', admin);
app.use('/api', role);
app.use('/api', cms);
app.use('/api', faq);
app.use('/api', store_setting);
app.use('/api', email_setting);
app.use('/api', promo_code);
app.use('/api', payment_method);
app.use('/api', product_job_proposal);
app.use('/api', product);
app.use('/api', product_jobs);
app.use('/api', product_wishlist);
app.use('/api', product_real_estate);
app.use('/api', product_electronics);
app.use('/api', product_fashion);
app.use('/api', product_goods);
app.use('/api', product_education);
app.use('/api', product_freelancer);
app.use('/api', currency);
app.use('/api', country);
app.use('/api', admin_action);
app.use('/api', admin_module);
app.use('/api', admin_permission);
app.use('/api', language);
app.use('/api', attribute);
app.use('/api', attribute_value);
app.use('/api', attribute_option);
app.use('/api', bid_history);
app.use('/api', product_cart);
app.use('/api', order);
app.use('/api', job_apply);
app.use('/api', room);

app.use('/uploads', express.static('uploads'));

const server = http.createServer(app);
server.listen(port);
console.log(`Server is running on ${(global.BASE_URL && global.BASE_URL !== '') ? global.BASE_URL : `http://${process.env.HOST}:${getPort}`}`);