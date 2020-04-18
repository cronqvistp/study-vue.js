Vue.component("product", {
    props:{
        premium:{
            type: Boolean,
            required: true
        },

        details:{
            type: Array,
            required: false
        }

    },
    template: `
    <div class="product">
    <div class="product-image">
        <img :src="image">
        
    </div>

    <div class="product-info">

        <h1>{{title}}</h1>
        <h2>{{description}} </h2>


        <p v-if=inStock>In Stock</p>
        <p v-else
        :class="{ outOfStock : !inStock}">Out of Stock :( </p>

        <p> Shipping: {{shipping}}</p>

        <productDetails :details="details"></productDetails>

        <div v-for="(variant, index) in variants" 
        :key="variant.variantId"
        class="color-box"
        :style="{backgroundColor: variant.variantColor}"
        @mouseover="updateSelectedVariant(index)">

      
        
        </div>

        <p v-if=onSale> {{onSaleText}}</p>

        <button v-on:click="addToCart"
        :disabled="!inStock"
        :class="{disabledButton: !inStock}">Add to cart</button>


        <button v-on:click="deleteCart">delete</button>



        <!-- <ul>
            <li v-for="size in sizes">{{size}}</li>
        </ul> -->
    
    
        <h6><a :href="link">Need Help?</a></h6>

    </div>

    

</div>`,

data(){
    return{
        product: "Wine",
        brand: "Puuri",
        description: "Alchoolic drinks. ",
        selectedVariant: 0,
        link: "https://www.aa.org/",
        variants:[
            {variantId: 3783,
                variantColor: "Red",
                variantImage: "red.jpg",
                variantQuantity: 3,
                onSale: false
        },
        {
            variantId: 7827,
            variantColor: "White",
            variantImage: "white.jpg",
            variantQuantity: 10,
            onSale: true
        }],
    
    
        // sizes:['P','M','G','GG', 'EXTRA GG']
     
    }

    },


methods: {
    addToCart: function(){
        if (this.variants[this.selectedVariant].variantQuantity > 0){

            this.variants[this.selectedVariant].variantQuantity -=1
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        }
        
    },

    updateSelectedVariant: function(index){
        this.selectedVariant= index
        console.log(index)
    },

    deleteCart: function(){
        this.$emit('remove-cart', this.variants[this.selectedVariant].variantId, this.increaseQuantity)
        
    },

    increaseQuantity: function(){
        this.variants[this.selectedVariant].variantQuantity +=1
        
    }
},

computed:{
    title(){
        return this.brand + ' ' + this.product
    },

    image(){
        return this.variants[this.selectedVariant].variantImage
    },

    inStock(){
        return this.variants[this.selectedVariant].variantQuantity
    },

    onSale(){
        return this.variants[this.selectedVariant].onSale
    },

    onSaleText(){
        return "" + this.variants[this.selectedVariant].variantColor + ' ' + this.product + ' is on Sale'    
    },

    shipping(){
        if(this.premium){
            return "Free"
        }
        return "2.99"
    }
}
})


Vue.component('productDetails', {

    props: {

        details:{
            type: Array,
            required: false

        }
    },

    template: `
    <ul>
    <li v-for="detail in details">{{detail}}</li>
    </ul>`

})

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        details: ['Made in France','Harvest in 1782', '96 percent of alcohol'],
        cart: [],

    },

    methods:{

        updateCart(id){
            this.cart.push(id)

        },

        removeCart(id, callback){
            if (this.cart.length>0){
                if(this.cart.indexOf(id) != -1){
                    this.cart.splice(this.cart.indexOf(id), 1)
                    callback()
                }
                
            }

            

            
        }

    }

})