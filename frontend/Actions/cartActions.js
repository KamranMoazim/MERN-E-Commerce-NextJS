


// following are local functions
export const addItemToCart = (item) => {
    // console.log(item)
    let cart = []
    if (process.browser) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({...item, count:1})
        cart = Array.from(new Set(cart.map((p)=>(p._id)))).map((id)=>{
            return cart.find(p => p._id === id)
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        // next()
    }
}

export const itemTotal = () => {
    if (process.browser) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart")).length
        }
        return 0
    }
}

export const getCart = () => {
    if (process.browser) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"))
        }
        return []
    }
}


export const updateItem = (id, count) => {
    let cart = []
    if (process.browser) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((pro, ind)=>{
            if (pro._id === id) {
                cart[ind].count = count;
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}

export const removeItem = (id) => {
    // console.log(id)
    let cart = []
    if (process.browser) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((pro, ind)=>{
            if (pro._id === id) {
                cart.splice(ind, 1)
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart
}



export const emptyCart = () => {
    if (process.browser) {
        if (localStorage.getItem("cart")) {
            localStorage.removeItem("cart")
        }
    }
}
