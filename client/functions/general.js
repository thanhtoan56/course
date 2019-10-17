export default {
    methods:{
        formatNumber(number) {
            number = parseInt(number);
              return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        formatPrice(list){
            if (list != "" && list !== null && list !== undefined) {
                if (list.price_promotion != null) { return this.numberTotalPay(list.price_promotion) }
                else { return this.numberTotalPay(list.price_origin) }
            }
        },

        total(data){
            var total = 0
            if (data != "" && data !== null && data !== undefined) {
                if (data.price_promotion != null) { total = data.quantity * data.price_promotion }
                else { total = data.quantity * data.price_origin }
            }
            return total;
        },

        numberWithCommas(x) {
            var value = "" + this.total(x);
            var parts = value.split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        },

        numberTotalPay(x) {
            var value = "" + x;
            var parts = value.split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        },

        totalPay(){
            var total = 0;
            if (this.dataCart != "" && this.dataCart !== null && this.dataCart !== undefined) {
                for (var i = 0; i < this.dataCart.length; i++) {
                    if (this.dataCart[i].price_promotion != 0) { total += this.dataCart[i].quantity * this.dataCart[i].price_promotion }
                    else { total += this.dataCart[i].quantity * this.dataCart[i].price_origin }
                }
            }
            return this.numberTotalPay(total);
        },

        mathNumberCart(data){
            var total = 0
            if (data != "") {
                for (var i = 0; i < data.length; i++) { total += data[i].quantity }
            }
            return total;
        },
        
    }
}