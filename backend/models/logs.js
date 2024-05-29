import mongoose from 'mongoose';

const logsSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    time: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const log_data = mongoose.model('logdatas', logsSchema);

export default log_data;
