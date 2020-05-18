import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useRouter} from "next/router";
import {Input} from 'semantic-ui-react';

function AddToCart({user, itemID}) {

    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let timeout;
        if (success) {
         timeout = setTimeout(() => setSuccess(false), 3000);
        }
        return () => {
          clearTimeout(timeout);
        }
      }, [success]);

      async function handleAddProductToCart() {
        try {
          setLoading(true);
          const url = `${'/carts/'}`;
          const payload = {quantity, itemID};

          await axios.put(url, payload);
          setSuccess(true)
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      return (
         <div>
            <Input
                type="number"
                min="1"
                value={quantity}
                onChange={event => setQuantity(Number(event.target.value))}
                placeholder="Quantity"
            />
            <button onClick={handleAddProductToCart}>AddToCart</button>
         </div>         
      );
}
export default AddToCart;