var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema   = new Schema({
    name: String,
    category : String,
    price : nubmer
});

module.exports = mongoose.model('Bear', BearSchema);