import app from "./app.js";
import connectDB from "./config/database.js";

//port
const PORT = process.env.PORT;

//listen
app.listen(PORT, async () =>{
    try {
        //DB Connection
        await connectDB();
        console.log(`Server Running on ${process.env.DEV_MODE} mode on http://localhost:${PORT}`.bgMagenta);
    } catch (error) {
        console.log(error.message);
    }
});