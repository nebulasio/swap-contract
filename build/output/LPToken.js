const crypto = require('crypto.js')


var Allowed = function (obj) {
    this.allowed = {};
    this.parse(obj);
}

Allowed.prototype = {
    toString: function () {
        return JSON.stringify(this.allowed);
    },

    parse: function (obj) {
        if (typeof obj != "undefined") {
            var data = JSON.parse(obj);
            for (var key in data) {
                this.allowed[key] = new BigNumber(data[key]);
            }
        }
    },

    get: function (key) {
        return this.allowed[key];
    },

    set: function (key, value) {
        this.allowed[key] = new BigNumber(value);
    }
}

var LPToken = function () {

    this.__contractName = 'LPToken';

    LocalContractStorage.defineProperties(this, {
        _swap: null,
        _name: null,
        _symbol: null,
        _decimals: null,
        _totalSupply: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        }
    });

    LocalContractStorage.defineMapProperties(this, {
        "balances": {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        "allowed": {
            parse: function (value) {
                return new Allowed(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        }
    });
};

LPToken.prototype = {

    init: function (swap, name, symbol, decimals) {
        this._swap = swap;
        this._name = name;
        this._symbol = symbol;
        this._decimals = decimals || 18;
        this._totalSupply = new BigNumber(0);
    },

    swap: function () {
        return this._swap;
    },

    name: function () {
        return this._name;
    },

    symbol: function () {
        return this._symbol;
    },

    decimals: function () {
        return this._decimals;
    },

    totalSupply: function () {
        return this._totalSupply.toString(10);
    },

    balanceOf: function (owner) {
        var balance = this.balances.get(owner);

        if (balance instanceof BigNumber) {
            return balance.toString(10);
        } else {
            return "0";
        }
    },

    mint: function (to, value) {
        if (Blockchain.transaction.from != this._swap) {
            throw new Error("only swap can mint.");
        }

        value = new BigNumber(value);
        if (value.lt(0)) {
            throw new Error("invalid value.");
        }

        var toBalance = this.balances.get(to) || new BigNumber(0);
        this.balances.set(to, toBalance.plus(value));
        this._totalSupply = this._totalSupply.plus(value);

        this._transferEvent(true, Blockchain.transaction.to, to, value);
    },

    burn: function (value) {
        value = new BigNumber(value);
        if (value.lt(0)) {
            throw new Error("invalid value.");
        }

        var from = Blockchain.transaction.from;
        var balance = this.balances.get(from) || new BigNumber(0);

        if (balance.lt(value)) {
            throw new Error("transfer failed.");
        }

        this.balances.set(from, balance.minus(value));
        this._totalSupply = this._totalSupply.minus(value);

        this._transferEvent(true, from, Blockchain.transaction.to, value);
    },

    burnFrom: function (from, value) {
        var spender = Blockchain.transaction.from;
        var balance = this.balances.get(from) || new BigNumber(0);

        var allowed = this.allowed.get(from) || new Allowed();
        var allowedValue = allowed.get(spender) || new BigNumber(0);
        value = new BigNumber(value);

        if (value.gte(0) && balance.gte(value) && allowedValue.gte(value)) {

            this.balances.set(from, balance.minus(value));
            this._totalSupply = this._totalSupply.minus(value);

            allowed.set(spender, allowedValue.minus(value));
            this.allowed.set(from, allowed);

            this._transferEvent(true, from, Blockchain.transaction.to, value);
        } else {
            throw new Error("transfer failed.");
        }
    },

    transfer: function (to, value) {
        value = new BigNumber(value);
        if (value.lt(0)) {
            throw new Error("invalid value.");
        }

        var from = Blockchain.transaction.from;
        var balance = this.balances.get(from) || new BigNumber(0);

        if (balance.lt(value)) {
            throw new Error("transfer failed.");
        }

        this.balances.set(from, balance.minus(value));
        var toBalance = this.balances.get(to) || new BigNumber(0);
        this.balances.set(to, toBalance.plus(value));

        this._transferEvent(true, from, to, value);
    },

    transferFrom: function (from, to, value) {
        var spender = Blockchain.transaction.from;
        var balance = this.balances.get(from) || new BigNumber(0);

        var allowed = this.allowed.get(from) || new Allowed();
        var allowedValue = allowed.get(spender) || new BigNumber(0);
        value = new BigNumber(value);

        if (value.gte(0) && balance.gte(value) && allowedValue.gte(value)) {

            this.balances.set(from, balance.minus(value));

            allowed.set(spender, allowedValue.minus(value));
            this.allowed.set(from, allowed);

            var toBalance = this.balances.get(to) || new BigNumber(0);
            this.balances.set(to, toBalance.plus(value));

            this._transferEvent(true, from, to, value);
        } else {
            throw new Error("transfer failed.");
        }
    },

    _transferEvent: function (status, from, to, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Transfer: {
                from: from,
                to: to,
                value: value
            }
        });
    },

    approve: function (spender, currentValue, value) {
        var from = Blockchain.transaction.from;

        var oldValue = this.allowance(from, spender);
        if (oldValue != currentValue.toString()) {
            throw new Error("current approve value mistake.");
        }

        var balance = new BigNumber(this.balanceOf(from));
        var value = new BigNumber(value);

        if (value.lt(0) || balance.lt(value)) {
            throw new Error("invalid value.");
        }

        var owned = this.allowed.get(from) || new Allowed();
        owned.set(spender, value);

        this.allowed.set(from, owned);

        this._approveEvent(true, from, spender, value);
    },

    _approveEvent: function (status, from, spender, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Approve: {
                owner: from,
                spender: spender,
                value: value
            }
        });
    },

    allowance: function (owner, spender) {
        var owned = this.allowed.get(owner);

        if (owned instanceof Allowed) {
            var spender = owned.get(spender);
            if (typeof spender != "undefined") {
                return spender.toString(10);
            }
        }
        return "0";
    }
};

module.exports = LPToken;
