function Plugin(messenger, options, api, deviceObj) {

    if (typeof deviceObj === 'string') {
        this.name = deviceObj;
    } else {
        this.name = deviceObj.name;

        this.uuid = deviceObj.uuid;
    }

    this.messenger = messenger;
    this.options = options;

    this.api = api; // Mobile Specific

    this.api.logActivity({
        type: deviceObj.name,
        html: 'Greetings Initialized'
    });

    return this;
}

var optionsSchema = {
    type: 'object',
    properties: {
        greetingPrefix: {
            type: 'string',
            required: true
        }
    }
};

var messageSchema = {
    type: 'object',
    properties: {
        text: {
            type: 'string',
            required: true
        }
    }
};

Plugin.prototype.onMessage = function (message, fn) {
    var data = message.message || message.payload;
    console.log(this.options.greetingPrefix + ', ' + message.fromUuid);

    var resp = {
        greeting: this.options.greetingPrefix + ' back atcha: ' + data.text
    };

    if (message.fromUuid && fn) {
        resp.withCallback = true;
        fn(resp);
    } else if (message.fromUuid) {
        this.messenger.send({
            devices: message.fromUuid,
            payload: resp
        });
    }

};

// Mobile Specific
Plugin.prototype.onEnable = function () {
    this.api.logActivity({
        type: this.name,
        html: 'Greetings plugin enabled'
    });
};

// Mobile Specific
Plugin.prototype.onDisable = function () {
    this.api.logActivity({
        type: this.name,
        html: 'Greetings plugin disabled'
    });
};

// Mobile Specific
Plugin.prototype.onInstall = function () {
    this.api.logActivity({
        type: this.name,
        html: 'Greetings plugin installed'
    });
};

Plugin.prototype.destroy = function () {
    //clean up
    this.api.logActivity({
        type: this.name,
        html: 'Destroying Greeting plugin'
    });

};

module.exports = {
    Plugin: Plugin, // Required
    optionsSchema: optionsSchema, // Optional
    messageSchema: messageSchema // Optional
};