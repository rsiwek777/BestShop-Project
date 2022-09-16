function Calculator(form1, summary1) {
    this.prices = {
        products: 0.5,
        orders: 0.25,
        package: {
            basic: 0,
            professional: 25,
            premium: 60
        },
        accounting: 35,
        terminal: 5
    };
    this.total = 0;
    /**
	 * Inputs / Select / Checkbox
	 */ this.form = {
        products: form1.querySelector("#products"),
        orders: form1.querySelector("#orders"),
        package: form1.querySelector("#package"),
        accounting: form1.querySelector("#accounting"),
        terminal: form1.querySelector("#terminal")
    };
    /**
	 * Summary elements
	 */ this.summary = {
        list: summary1.querySelector("ul"),
        items: summary1.querySelector("ul").children,
        total: {
            container: summary1.querySelector("#total-price"),
            price: summary1.querySelector(".total__price")
        }
    };
    // Init
    this.addEvents();
}
Calculator.prototype.addEvents = function() {
    // Inputs
    this.form.products.addEventListener("change", this.inputEvent.bind(this));
    this.form.products.addEventListener("keyup", this.inputEvent.bind(this));
    this.form.orders.addEventListener("change", this.inputEvent.bind(this));
    this.form.orders.addEventListener("keyup", this.inputEvent.bind(this));
    // Select
    this.form.package.addEventListener("click", this.selectEvent.bind(this));
    // Checkboxes
    this.form.accounting.addEventListener("change", this.checkboxEvent.bind(this));
    this.form.terminal.addEventListener("change", this.checkboxEvent.bind(this));
};
Calculator.prototype.updateTotal = function() {
    const show = this.summary.list.querySelectorAll(".open").length > 0;
    if (show) {
        const productSum = this.form.products.value < 0 ? 0 : this.form.products.value * this.prices.products;
        const ordersSum = this.form.orders.value < 0 ? 0 : this.form.orders.value * this.prices.orders;
        const packagePrice = this.form.package.dataset.value.length === 0 ? 0 : this.prices.package[this.form.package.dataset.value];
        const accounting = this.form.accounting.checked ? this.prices.accounting : 0;
        const terminal = this.form.terminal.checked ? this.prices.terminal : 0;
        this.summary.total.price.innerText = "$" + (productSum + ordersSum + packagePrice + accounting + terminal);
        this.summary.total.container.classList.add("open");
    } else this.summary.total.container.classList.remove("open");
};
Calculator.prototype.updateSummary = function(id, calc, total, callback) {
    const summary2 = this.summary.list.querySelector("[data-id=" + id + "]");
    const summaryCalc = summary2.querySelector(".item__calc");
    const summaryTotal = summary2.querySelector(".item__price");
    summary2.classList.add("open");
    if (summaryCalc !== null) summaryCalc.innerText = calc;
    summaryTotal.innerText = "$" + total;
    if (typeof callback === "function") callback(summary2, summaryCalc, summaryTotal);
};
Calculator.prototype.inputEvent = function(e) {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    const singlePrice = this.prices[id];
    const totalPrice = value * singlePrice;
    this.updateSummary(id, value + " * $" + singlePrice, totalPrice, function(item, calc, total) {
        if (value < 0) {
            calc.innerHTML = null;
            total.innerText = "Value should be greater than 0";
        }
        if (value.length === 0) item.classList.remove("open");
    });
    this.updateTotal();
};
Calculator.prototype.selectEvent = function(e) {
    this.form.package.classList.toggle("open");
    const value = typeof e.target.dataset.value !== "undefined" ? e.target.dataset.value : "";
    const text = typeof e.target.dataset.value !== "undefined" ? e.target.innerText : "Choose package";
    if (value.length > 0) {
        this.form.package.dataset.value = value;
        this.form.package.querySelector(".select__input").innerText = text;
        this.updateSummary("package", text, this.prices.package[value]);
        this.updateTotal();
    }
};
Calculator.prototype.checkboxEvent = function(e) {
    const checkbox = e.currentTarget;
    const id = checkbox.id;
    const checked = e.currentTarget.checked;
    this.updateSummary(id, undefined, this.prices[id], function(item) {
        if (!checked) item.classList.remove("open");
    });
    this.updateTotal();
};
const form = document.querySelector(".calc__form");
const summary = document.querySelector(".calc__summary");
new Calculator(form, summary);

//# sourceMappingURL=index.672d4772.js.map
