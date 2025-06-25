const errorMiddleware = (err,req,res,next) => {
    try{
      let error={...err};
      error.message = err.message;

      console.error(err);

      if(err.name === 'CastError'){
          const meaasge = `Resource not found`;
          error = new Error(meaasge);
          error.statusCode= 404;

      }
      if(err.code === 11000){
          const meaasge = `Duplicate field value entered`;
          error = new Error(meaasge);
          error.statusCode= 400;
      }
      if(err.name === 'ValidationError'){
          const meaasge = Object.values(err.errors).map(val => val.message);
          error = new Error(meaasge.join(','));
          error.statusCode= 400;
      }
      res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || 'Server Error'
      });
    }
    catch(error){
        next(error);
    }
};

export default errorMiddleware;