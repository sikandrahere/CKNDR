class apiError extends Error {
    constructor(
        statusCode,
        message = 'Internal server error', 
        errors = [],
        stack = ""  
    ) {
        super(message);        
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        this.stack = stack;
    }
}
export default apiError;
