import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../store/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <p className="mb-0">{item.name}</p>
        <p className="mb-0">${item.price}</p>
      </div>
      <div>
        <button className="btn btn-sm btn-secondary" onClick={handleDecrease}>
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button className="btn btn-sm btn-secondary" onClick={handleIncrease}>
          +
        </button>
      </div>
      <button className="btn btn-sm btn-danger" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
