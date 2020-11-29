/** Local simulation environment code; Do not modify */
const neblocal = require('../../lib/neblocal')
const crypto = require('../../lib/crypto')
const BigNumber = require('bignumber.js')
const Blockchain = neblocal.Blockchain
const LocalContractStorage = neblocal.LocalContractStorage
const Event = neblocal.Event
/** Local simulation environment code; End. */


const MAX_OWNER_COUNT = 50;

class Utils {
    static isNull(o) {
        return typeof o === 'undefined' || o == null
    }

    static verifyNumber(value) {
        let v = value + ''
        if (!/^\-?\d+$/.test(v)) {
            throw value + ' is not a integer.'
        }
    }

    static verifyAddress(address) {
        if (Blockchain.verifyAddress(address) === 0) {
            throw new Error(`Not a valid address: ${address}`)
        }
    }
}

class MultiSig {
    constructor() {
        // You need to ensure that each contract has a different __contractName
        this.__contractName = 'MultiSig'

        LocalContractStorage.defineMapProperty(this, "storage", null)
        LocalContractStorage.defineProperties(this, {
            _owners: null,      
            _required: null,
            _proposalCount: null,  
        })
    }

    init (owners, required) {
        if (!owners || owners.length === 0) {
            throw ("Need at least one owners");
        }
        for (let i = 0; i < owners.length; ++i) {
            Utils.verifyAddress(owners[i]);
        }
        if (required > MAX_OWNER_COUNT) {
            throw ('required need below:' + MAX_OWNER_COUNT)
        }

        this._owners = owners
        this._required = required
        this._proposalCount = 0
    }

    _verifyOwner() {
        if (this._owners.indexOf(Blockchain.transaction.from) < 0) {
            throw ('Owner Permission Denied!')
        }
    }

    _addOwner(owner) {
        Utils.verifyAddress(owner)
        let owners = this._owners;
        if (owners.indexOf(owner) > 0) {
            throw ('owner has been added:' + owner)
        }

        owners.push(owner)
        this._owners = owners

        Event.Trigger('addOwner', {owner: owner})
    }

    _removeOwner(owner) {
        Utils.verifyAddress(owner)
        let owners = this._owners;
        for (let i = 0; i < owners.length; i++) {
            if (owners[i] === owner) {
                owners.splice(i,1)
                break
            }
        }
        this._owners = owners

        if (this._required > owners.length) {
            this._changeRequirement(owners.length)
        }

        Event.Trigger('removeOwner', {owner: owner})
    }

    _replaceOwner(oldOwner, newOwner) {
        Utils.verifyAddress(oldOwner)
        Utils.verifyAddress(newOwner)

        let found = false
        let owners = this._owners;
        for (let i = 0; i < owners.length; i++) {
            if (owners[i] === oldOwner) {
                owners[i] = newOwner
                found = true
                break
            }
        }

        if (!found) {
            throw ('old owner not found:', oldOwner)
        }
        this._owners = owners

        Event.Trigger('replaceOwner', {oldOwner: oldOwner, newOwner: newOwner})
    }

    _changeRequirement(required) {
        Utils.verifyNumber(required)
        if (required <= 0) {
            throw ('required need bigger than 0')
        }
        if (required > MAX_OWNER_COUNT) {
            throw ('required need below:' + MAX_OWNER_COUNT)
        }

        this._required = required
    }

    getOwners () {
        return this._owners
    }

    getRequired() {
        return this._required
    }

    getProposalCount() {
        return this._proposalCount
    }

    addProposal(target, value, func, args) {
        this._verifyOwner()
        if (target && target.length > 0) {
            Utils.verifyAddress(target)
        }
        Utils.verifyNumber(value)

        let id = this._proposalCount
        let proposal = {
            id: id,
            target: target,
            value: value,
            func: func,
            args: args,
            confirmed: [],
            executed: false
        }
        this.storage.set(id, proposal)
        this._proposalCount = id + 1

        Event.Trigger('addProposal', proposal)
    }

    getProposalById(id) {
        return this.storage.get(id)
    }

    confirmProposal(id) {
        this._verifyOwner()
        
        let proposal = this.storage.get(id)
        if (Utils.isNull(proposal)) {
            throw ('proposal not found')
        }
        if (proposal.executed) {
            throw ('proposal has been executed')
        }

        let sender = Blockchain.transaction.from
        if (proposal.confirmed.indexOf(sender) < 0) {
            proposal.confirmed.push(sender)
        } else {
            throw ('proposal has been confirmed')
        }

        Event.Trigger('confirmProposal', {proposal: id, confirmed: sender})

        if (proposal.confirmed.length >= this._required) {
            this._execute(proposal)
        }
        // update proposal
        this.storage.set(id, proposal)
    }

    _execute(proposal) {
        if (Utils.isNull(proposal.target)) {
            this[proposal.func](...proposal.args)
        } else {
            let contract = new Blockchain.Contract(proposal.target)
            contract = contract.value(proposal.value)

            let args = [proposal.func, ...proposal.args]
            contract['call'](...args)
        }
        proposal.executed = true
        Event.Trigger('executeProposal', proposal)
    }


    accept() {
        Event.Trigger('accept', {
            from: Blockchain.transaction.from,
            to: Blockchain.transaction.to,
            value: Blockchain.transaction.value,
        })
    }

}


module.exports = MultiSig
