function Delegator (host, target) {
    if (!(this instanceof Delegator)) {
        return new Delegator(host, target)
    }
    this.host = host
    this.target = target
    this.methods = []
    this.getters = []
    this.setters = []
    
    Delegator.prototype.method = function (name) {
        const {
            host,
            target,
            methods
        } = this
        methods.push(name)
        host[name] = function () {
            return this[target][name].apply(this[target], arguments)
        }
        return this
    }

    Delegator.prototype.getter = function (name) {
        const {
            host,
            target,
            getters
        } = this
        getters.push(name)
        Object.defineProperty(host, name, {
            getter () {
                return this[target][name]
            }
        })
        return this
    }

    Delegator.prototype.setter = function (name) {
        const {
            host,
            target,
            setters
        } = this
        setters.push(name)
        Object.defineProperty(host, name, {
            setter (val) {
                this[target][name] = val
            }
        })
        return this
    }

    Delegator.prototype.access = function (name) {
        return this.getter(name).setter(name)
    }
}

module.exports = Delegator