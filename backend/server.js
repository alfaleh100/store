/*const express = require('express');
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');

i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        preload: ['en', 'ar'], // preload all supported languages
        backend: {
            loadPath: path.join(__dirname, 'locales/{{lng}}.json')
        }
    });

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(middleware.handle(i18next));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
// Home route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
mongoose.connect('mongodb://127.0.0.1:27017/myapp_db', )
    .then(() => {
        console.log('✅ Connected to MongoDB');

        // Start the server *after* successful DB connection
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });

*/
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); 
const routes = require('./routes/routes');
require('dotenv').config();

// const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require('./routes/adminRoutes')
//const productRoutes = require("./routes/productRoutes");
// const cartRoutes = require("./routes/cartRoutes.js");
// const orderRoutes = require('./routes/ordeRoutes');


dotenv.config(); // تحميل متغيرات البيئة من ملف .env


const app = express();
app.use(cors());
app.use(express.json()); // تمكين التعامل مع JSON
app.use('/api/', routes);
// الاتصال بقاعدة البيانات وتشغيل السيرفر
connectDB();

// مسارات المشروع
// app.use('/api/auth', authRoutes);
// app.use('/api/admin' , adminRoutes)
//app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);


// تشغيل الخادم
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
