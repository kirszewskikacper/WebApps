module.exports = function accessLoggerFactory() {
  return function accessLogger(req, res, next) {
    const start = Date.now();
    res.on('finish', async () => {
      try {
        const db = req.app.locals.db;
        if (!db) return;
        const safeBody = { ...req.body };
        if (safeBody.password) delete safeBody.password;
        const log = {
          method: req.method,
          path: req.originalUrl,
          query: req.query,
          params: req.params,
          body: safeBody,
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          status: res.statusCode,
          durationMs: Date.now() - start,
          timestamp: new Date()
        };
        await db.collection('accessLogs').insertOne(log);
      } catch (e) {
        console.error('Access log error', e);
      }
    });
    next();
  };
};