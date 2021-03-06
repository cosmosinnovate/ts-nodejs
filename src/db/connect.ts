import mongoose from "mongoose"
import config from "config"
import log from "../logger"

function connect() {
    const dbUri = config.get("dbUri") as string;
    try {
        mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        log.info("Database connected");
    } catch (error) {
        log.error("Database error", error);
        process.exit(1)
    }
}

export default connect