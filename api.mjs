import express from 'express'
import bp from 'body-parser'
import morgan from 'morgan'

const app = express()

app.use(bp.urlencoded({extended: true}))
app.use(bp.json())
app.use(morgan('dev'))

// install dotenv
const PORT = process.env.PORT || 5000
let db = []

const switchDay = (dayInNum) => {
    switch (dayInNum) {
        case 1:
            return 'Monday'
            break;
        case 2:
            return 'Tuesday'
            break;
        case 3:
            return 'Wednesday'
            break;
        case 4:
            return 'Thursday'
            break;
        case 5:
            return 'Friday'
            break;
        case 6:
            return 'Saturday'
            break;
        case 0:
            return 'Sunday'
            break
        default:
            return 'This is not a valid day of the week'
    }
}

app.get('/api', (req, res) => {
    const time = new Date()
    if (req.query.slack_name && req.query.track) {
        let info = {slack_name: req.query.slack_name, current_day: switchDay(time.getDay()), utc_time: time.toISOString(), track: req.query.track, github_file_url: '', github_repo_url: '', status_code: res.statusCode}
        db.push(info)
    }
    res.json(db)
})

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})
