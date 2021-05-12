const testService = require('../services/testService')

exports.test = async (req, res, next) => {

const data=await testService.test();
try {
    res.json(data);
  } catch (error) {
    res.status(400).json("Error: " + error);
  } 
      /*
      const result= await testservice.getalbum
      testservice.getalbum().then();
      try {
    res.json(allProducts);
  } catch (error) {
    res.status(400).json("Error: " + error);
  } */
}