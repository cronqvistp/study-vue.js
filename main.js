var app = new Vue({
    el: '#app',
    data:{
        product: "Wine",
        brand: "Puuri",
        description: "Alchoolic drinks. ",
        selectedVariant: 0,
        link: "https://www.aa.org/",
        details: ['Made in France','Harvest in 1782', '96 percent of alcohol'],
        variants:[
            {variantId: 3783,
                variantColor: "Red",
                variantImage: "red.jpg",
                variantQuantity: 0,
                onSale: false
        },
        {
            variantId: 7827,
            variantColor: "White",
            variantImage: "white.jpg",
            variantQuantity: 10,
            onSale: true
        }],

        cart: 0,

        // sizes:['P','M','G','GG', 'EXTRA GG']
     
    },

    
    methods: {
        addToCart: function(){
            this.cart+=1
        },

        updateSelectedVariant: function(index){
            this.selectedVariant= index
            console.log(index)
        },

        deleteCart: function(){
            if(this.cart>0){
                this.cart-=1
            }
            
             
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
        }
    }

})