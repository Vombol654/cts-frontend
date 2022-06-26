import { Fragment } from "react";

const Payment=()=>{
   const amount= sessionStorage.getItem('amount')
   function isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }
    console.log(typeof(+amount))
  const  isObj = (val) => {
        return typeof val === 'object'
    }

   const stringifyValue = (val) => {
        if (isObj(val) && !isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

  const buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value',stringifyValue(params[key]))
            form.appendChild(input)
        })
        return form
    }

 const post = (details) => {
        const form = buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

   const getData = (data) => {
        return fetch(`http://localhost:8085/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(err))
    }
    const handlePayment=()=>{
            // Payment API Call 
            const paymentObj = {
                amount: (+amount),
                email: "ananda@gmail.com"
            };

        getData(paymentObj).then(response => {
                var information = {
                    action: "https://securegw-stage.paytm.in/order/process",
                    params: response
                }
                post(information)
            })
        
    }
   
return(
    <Fragment>
        <button className="btn btn-info" onClick={handlePayment}>Pay Now</button>
    </Fragment>
)
}
export default Payment;