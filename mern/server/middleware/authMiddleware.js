
export const middleware = (req,res,next) => {
    console.log('my middleware')
    next()
}

