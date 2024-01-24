const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, maxLength: 256, require: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255, require: true },
        videoId: { type: String, maxLength: 255 },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name' },
    },
    {
        timestamps: true,
    },
);


//plugin
mongoose.plugin(slug);
Course.plugin(mongoose_delete, {
    deletedAt: true,
    overrideMethods: 'all',

});

module.exports = mongoose.model('Course', Course);
