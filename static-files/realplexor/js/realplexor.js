Realplexor = {

    daemon: {},
    host: $("body").attr("data-rpl_host"),
    namespace: $("body").attr("data-rpl_namespace"),
    currentuser_id: $("body").attr("data-currentuser_id"),
    listeners: [],

    events: {
        add: function (event, callback) {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event].push(callback);
        },
        fire: function (event, data) {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            for (idx in this.listeners[event]) {
                var callback = this.listeners[event][idx];
                callback.call(null, data);
            }
        }
    },
    init: function () {
        this.daemon = new Dklab_Realplexor(
            "http://" + this.host + "/rpl/?0",  // URL of engine
            rpl_namespace // namespace
        )
        this.daemon.subscribe("user_" + this.currentuser_id, function (data) {
            this.events.fire(data.event, data);
        });
        this.daemon.subscribe("all", function (data) {
            this.events.fire(data.event, data);
        });
        this.daemon.execute();
    }

}

$(function () {

    Realplexor.init();

});