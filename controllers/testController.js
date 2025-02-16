
export const testingController = {
    testing: async(req, res) => {
        try {
            
            res.status(200).send("<h1>Hello World !!</h1>");
        } catch (error) {
            console.log(error.message);
            
        }
    }
};

//export
export default testingController;