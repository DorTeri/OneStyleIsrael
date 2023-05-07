import React, { useEffect } from 'react'
import { useForm } from '../customHooks/useForm'
import { productService } from '../services/product.service'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { saveProduct } from '../store/actions/products.actions'

export function ProductEdit() {

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    const [product, handleChange, setProduct] = useForm(productService.getEmptyProduct())

    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(!user || !user.isAdmin) navigate('/')
        loadProduct()
    }, [])

    async function loadProduct() {
        const productId = params.id
        if (productId) {
            try {
                const product = await productService.getProductById(productId)
                setProduct(product)
            } catch (err) {
                console.log('load product', err);
            }
        }
    }

    async function onSaveProduct(ev) {
        ev.preventDefault()
        try {
            product.createdAt = Date.now()
            console.log(product)
            dispatch(saveProduct(product))
            navigate(-1)
        } catch (error) {
            console.log('error:', error)
        }
    }

    if(!user || !user.isAdmin) return
    const {brand , ctg , model , type , price , prevPrice , url1 , url2 , url3 , url4} = product
    return (
        <section className='product-edit'>
            <h1>{product._id ? 'Edit' : 'Add'} Product</h1>
            <div className='form-wrapper'>
                {<img src={product.url1? product.url1 : `https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGRlZmF1bHQlMjBzaG9lJTIwaW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60`} alt='Product image'/>}
                <form onSubmit={onSaveProduct}>
                    <label htmlFor="brand">Brand</label>
                    <input value={brand} onChange={handleChange} type="text" name="brand" id="brand" />
                    <label htmlFor="ctg">Category</label>
                    <input value={ctg} onChange={handleChange} type="text" name="ctg" id="ctg" />
                    <label htmlFor="model">Model</label>
                    <input value={model} onChange={handleChange} type="text" name="model" id="model" />
                    <label htmlFor="type">Type</label>
                    <input value={type} onChange={handleChange} type="text" name="type" id="type" />
                    <label htmlFor="price">Price</label>
                    <input value={price} onChange={handleChange} type="number" name="price" id="price" />
                    <label htmlFor="prevPrice">Prev price</label>
                    <input value={prevPrice} onChange={handleChange} type="number" name="prevPrice" id="prevPrice" />
                    <label htmlFor="url1">Url 1</label>
                    <input value={url1} onChange={handleChange} type="text" name="url1" id="url1" />
                    <label htmlFor="url2">Url 2</label>
                    <input value={url2} onChange={handleChange} type="text" name="url2" id="url2" />
                    <label htmlFor="url3">Url 3</label>
                    <input value={url3} onChange={handleChange} type="text" name="url3" id="url3" />
                    <label htmlFor="url4">Url 4</label>
                    <input value={url4} onChange={handleChange} type="text" name="url4" id="url4" />
                    <button>{product._id ? 'Edit' : 'Add'} Product</button>
                </form>
            </div>
            <button onClick={() => navigate(-1)}>Back</button>
        </section>
    )
}
