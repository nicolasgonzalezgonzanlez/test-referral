"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMessages = exports.messages = void 0;
const commonMessages = {};
exports.commonMessages = commonMessages;
const messages = {
    client: {
        info: {},
    },
    info: {
        common: {
            callingExternalEndpoint: 'Calling external endpoint method: ',
            success: 'Success calling external endpoint method: ',
        },
    },
    error: {
        common: {
            callingExternalEndpoint: 'Error calling external endpoint method: ',
        },
    },
    events: {
        info: {
            onProcessKillMessage: 'Service termination signal received',
            finishServer: 'Finishing server',
        },
    },
    methods: {
        user: {
            getAll: 'getUserInfo()',
            getId: 'getUser()',
        },
    },
};
exports.messages = messages;
