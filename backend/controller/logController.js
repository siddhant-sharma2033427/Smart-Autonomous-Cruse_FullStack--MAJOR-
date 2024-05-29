import log_data from "../models/logs.js"

//we hv to make end points now

export const addlogs = async (req, res) => {
    try {
        const { message } = req.body;

        // Validate required fields
        if (message === undefined) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Create new sensor data document
        const newData = await log_data.create({
            message
        });

        return res.status(201).json({ success: true, data: newData });
    } catch (error) {
        console.error('Error creating sensor data:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}
export const gettlogs = async (req, res) => {
    try {

        const newData = await log_data.find({});
        return res.status(201).json({ success: true, data: newData });
    } catch (error) {
        console.error('Error creating sensor data:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

export const deletelogs = async (req, res) => {
    try {
        // Delete all documents from the logs collection
        const result = await log_data.deleteMany({});
        console.log(`${result.deletedCount} logs deleted successfully.`);
        return res.status(201).json({ success: true, message: `${result.deletedCount} logs deleted successfully.` })
    } catch (error) {
        console.error("Error deleting logs:", error);
        throw error;
    }
}
// The streamAllLogs function fetches all logs initially using log_data.find().sort({ timestamp: -1 }).cursor() to create a cursor that iterates over all logs.

// It iterates over all logs using the cursor and emits each log to the provided callback function.

// It sets up a MongoDB Change Stream using log_data.watch() to listen for changes in the logdatas collection.

// When a new log entry is inserted (change.operationType === 'insert'), it fetches the newly inserted log entry using log_data.findById(change.documentKey._id) and emits it to the callback function.
export const streamAllLogs = async (req, res) => {
    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Function to send logs to the client
    const sendLog = (log) => {
        res.write(`data: ${JSON.stringify(log)}\n\n`);
    };

    // Start streaming logs to the client
    streamAllLogs(sendLog);

    // Handle client disconnects
    req.on('close', () => {
        console.log('Client disconnected');
        // Clean up resources (e.g., close database cursors, streams, etc.)
        // In this case, there's no specific cleanup needed since we're using MongoDB Change Streams.
    });
};