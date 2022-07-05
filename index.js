const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/api/users/register', (req, res) => {
    // 회원가입 정보 client에서 가져와 데이터베이스에 넣기
    const user = new User(req.body)
    console.log(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })

})

app.post('/api/users/login', (req, res) => {

    // 1. 요청 된 이메일을 데이터베이스에서 찾기
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "이메일이 일치하는 유저가 없습니다."
            })
        }
        // 2. 요청된 이메일이 데이터 베이스에 있다면 비밀번호 일치여부 확인

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            // 3. 비밀번호 일치 시 Token 생성
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
                // 토큰 저장
            res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id });

            })
        })
    })
})

app.get('/api/users/auth', auth ,(req,res)=>{
    // 여기까지 미들웨어를 통과 한것 => auth가 true
    // 라이언트에 정보전달
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.role,
        role: req.user.role,
        image:req.user.image
    })
})

app.get('/api/users/logout',auth, (req, res) => {
    User.findOneAndUpdate({_id:req.user._id},
        {token:''},
        (err,user)=>{
        if(err) return res.json({siccess:false,err});
        return res.status(200).send({
            success:true
        })
    })
})

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World!')

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
