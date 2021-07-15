import logger from "pino"
import dayjs from "dayjs"

const log = logger({
    prettyPrint: true,
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
})

// console.log locks the io don't use it

export default log;