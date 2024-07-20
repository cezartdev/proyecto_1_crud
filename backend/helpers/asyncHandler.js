const asyncHandler = (fn) => async (request, response, next) => {
    try {
      await Promise.resolve(fn(request, response, next));
    } catch (error) {
      console.log(error);
      // Puedes adaptar esto según tus necesidades en ES6
      response.render('error', { error });
    }
  };
  
  export default asyncHandler;