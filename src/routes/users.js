//пример с использованием "asyncWrapper"
router.post('/signup', userValidation, asyncWrapper(signupController))