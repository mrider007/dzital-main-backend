const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbconfig');
const { join, resolve } = require('path');
const http = require('http');
_ = require("underscore");
const dotenv = require("dotenv");
dotenv.config()

const app = express();

app.use(express.json());

app.use(cors());

global.appRoot = join(__dirname, '/');
config = require(resolve(join(__dirname, '/config', 'index')));
global.project_name = config.app.project_name;

const getPort = config.app.getPort;

connectDB();

const user = require('./routes/user.routes');
const service = require('./routes/service_master.routes');
const membership_plan = require('./routes/membership_plan.routes');
const payment = require('./routes/payment.routes');
const review = require('./routes/review.routes');
const admin = require('./routes/admin.routes');
const role = require('./routes/role.routes');
const promocode = require('./routes/promo_code.routes');
const cms = require('./routes/cms.routes');
const faq = require('./routes/faq.routes');
const product = require('./routes/product.routes');
const product_jobs = require('./routes/product_job.routes');
const product_job_type = require('./routes/product_job_type.routes');
const product_job_proposal = require('./routes/product_job_proposal.routes');
const product_electronics = require('./routes/product_electronics.routes');
const product_real_estate = require('./routes/product_real_estate.routes');
const product_wishlist = require('./routes/product_wishlist.routes');
const product_fashion = require('./routes/product_fashion.routes');
const product_goods = require('./routes/product_goods.routes');
const product_education = require('./routes/product_education.routes');
const store_setting = require('./routes/store_setting.routes');
const email_setting = require('./routes/email_setting.routes');
const payment_method = require('./routes/payment_method.routes');
const master_setting = require('./routes/master_setting.routes');
const currency = require('./routes/currency.routes');
const country = require('./routes/country.routes');

global.BASE_URL = `http://${process.env.HOST}:${getPort}`;

app.use('/api', user);
app.use('/api', service);
app.use('/api', membership_plan);
app.use('/api', payment);
app.use('/api', review);
app.use('/api', admin);
app.use('/api', role);
app.use('/api', promocode);
app.use('/api', cms);
app.use('/api', faq);
app.use('/api', store_setting);
app.use('/api', email_setting);
app.use('/api', payment_method);
app.use('/api', master_setting);
app.use('/api', product_job_type);
app.use('/api', product_job_proposal);
app.use('/api', product);
app.use('/api', product_jobs);
app.use('/api', product_wishlist);
app.use('/api', product_real_estate);
app.use('/api', product_electronics);
app.use('/api', product_fashion);
app.use('/api', product_goods);
app.use('/api', product_education);
app.use('/api', currency);
app.use('/api', country);

app.use('/uploads', express.static('uploads'))

const server = http.createServer(app);
server.listen(getPort);
console.log(`Server is running on ${(global.BASE_URL && global.BASE_URL !== '') ? global.BASE_URL : `http://${process.env.HOST}:${getPort}`}`);