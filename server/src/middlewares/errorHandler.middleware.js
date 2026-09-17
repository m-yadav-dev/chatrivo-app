

import {error} from "node:console";


export const errorHandler = (err, req, res, next) => {
    console.error(`errorHandler middleware invoked for ${req?.method} ${req?.originalUrl}`);
    error(`Error: ${err?.message}`);
    error(`Stack Trace: ${err?.stack}`);
    if (res && typeof res.status === "function") {
        return res.status(500).json({
            success: false,
            message: "An internal server error occurred.",
        });
    }
    // If res isn't available for some reason, delegate to next error handler
    next(err);
}