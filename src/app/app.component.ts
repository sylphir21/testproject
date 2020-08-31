import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ena-sum-project';
  pricesString = "100,25,50,5";
  rangeMin = 100;
  rangeMax = 105;
  prices = ["d","d"];

  onGetSum() {
    this.prices = [];
    const test = <any>document.getElementById("pricesString");
    this.rangeMin = (<any>document.getElementById("rangeMin")).value;
    this.rangeMax = (<any>document.getElementById("rangeMax")).value;
    const priceList = test.value.split(",");
    if (priceList.length > 0) {
      priceList.forEach(item => {
        const newPriceList = [...priceList];
        const index = newPriceList.indexOf(item, 0);
        newPriceList.splice(index,1);
        if (newPriceList.length > 0) {
          const newListPrices = this.computePrice(item, newPriceList);
          if (newListPrices.length > 0) {
            this.prices = [].concat(this.prices, newListPrices);
          }
        }
      });
    }

    let i: number = 0;
    let priceLength = this.prices.length;
    while (i < this.prices.length - 1) {
      let y = i + 1;
      while (y < this.prices.length) { 
        var xPrice = this.prices[i].substring(this.prices[i].indexOf('='));
        var yPrice = this.prices[y].substring(this.prices[y].indexOf('='));
        if (this.arraysEqual(xPrice.split(","), yPrice.split(","))) {
          const index = this.prices.indexOf(this.prices[y], 0);
          this.prices.splice(index,1);
          y = y - 1;
          priceLength = priceLength - 1;
        }
        y = y + 1;
      }
      i++;
    }

    this.prices = [...this.prices];

    
    console.log(this.prices);
  }

  computePrice(price, priceList): string[] {
    let prices = [];
    const priceTotal = this.getPriceTotal(price);
    priceList.forEach(item => {
      if (+item + priceTotal >= this.rangeMin && +item + priceTotal <= this.rangeMax) {
        prices.push(price + "," + item + "=" + (+item + priceTotal));
      } 
      if (+item + priceTotal <= this.rangeMax) {
        const newPriceList = [...priceList];
        const index = newPriceList.indexOf(item, 0);
        newPriceList.splice(index,1);
        if (newPriceList.length > 0) {
          const newListPrices = this.computePrice(price + "," + item, newPriceList);
          if (newListPrices.length > 0) {
            prices = [].concat(prices, newListPrices);
          }
        }
      }
    });
    return prices
  }

  getPriceTotal(priceString): number {
    const priceList = priceString.split(",");
    let totalPrice = 0;
    priceList.forEach(price => {
      totalPrice = totalPrice + +price;
    });
    return totalPrice;
  }

  arraysEqual(_arr1, _arr2) {
    if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length)
      return false;

    var arr1 = _arr1.concat().sort();
    var arr2 = _arr2.concat().sort();

    for (var i = 0; i < arr1.length; i++) {

        if (arr1[i] !== arr2[i])
            return false;

    }

    return true;
  } 
}
