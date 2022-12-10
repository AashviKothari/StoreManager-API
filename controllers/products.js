const Product = require('../models/product')

const getAllProductsStatic = async (req,res)=>{
    const products = await Product.find({price:{$gt:30}})
    .sort('price')
    .select('name price')
    .limit(10)
    .skip(5)
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req,res)=>{
    const {featured, company, name, sort, fields, numericFilters } = req.query
    const queryObj = {}

    if(featured){
        queryObj.featured = featured === 'true'? true :false;
    }
    if(company){
        queryObj.company=company
    }
    if(name){
        queryObj.name={$regex: name, $options:'i'}
    }
    // console.log(queryObj)
    // const products = await Product.find(queryObj)
    if(numericFilters){
        const operator = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }

        const regex = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regex, (match)=>`-${operator[match]}-`
        )
        console.log(filters)
    }
    
    let result = Product.find(queryObj)
    if(sort){
        const resultList = sort.split(',').join(' ');
        result = result.sort(resultList)
    }
    else{
        result = result.sort('createdAt')
    }

    // select fields
    if(fields){
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList)
    }

    

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page -1)*limit

    result = result.skip(skip).limit(limit)
    const products = await result // Sorting using params
    res.status(200).json({products, nbHits: products.length})
}

module.exports = 
{
    getAllProducts,
    getAllProductsStatic
}