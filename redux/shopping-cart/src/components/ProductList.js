import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import products from '../data/products';

function ProductList() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div>
      <h2>Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-3" key={product.id}>
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p>${product.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
