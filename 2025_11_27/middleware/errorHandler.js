module.exports = function errorHandlerFactory() {
  return async function errorHandler(err, req, res, next) {
    try {
      const db = req.app.locals.db;
      if (db) {
        const safeBody = { ...req.body };
        if (safeBody.password) delete safeBody.password;
        const errorLog = {
          message: err.message,
          stack: err.stack,
          method: req.method,
          path: req.originalUrl,
          body: safeBody,
          ip: req.ip,
          timestamp: new Date()
        };
        await db.collection('errorLogs').insertOne(errorLog);
      }
    } catch (e) {
      console.error('Error logging failed', e);
    }
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Internal Server Error' });
  };
};