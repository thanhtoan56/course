
require('../../../db/index');
const indexS = require('../../../db/models/indexs/indexsSchema');

module.exports = {
    async insert_index_collection(nameCollection, index){
        const indexs = new indexS({ "nameCollection": nameCollection, "index": index});
        try{
            const result = await indexs.save();
            console.log("Result: ", result);
        } catch(err) { console.log("Error: ", err); }
    },

    async update_index_collection(nameCollection, index){
        try{
            const result = await indexS.findOneAndUpdate({ "nameCollection" : nameCollection },
                {  $set:{ index: parseInt(index+1), updated_at: new Date().getTime() } },
                { new: true, runValidators: true, useFindAndModify: false }
            );
            console.log("Result: ", result);
        } catch(err) { console.log("Error: ", err); }
    }
};