'use strict';

/**
 * Don't forget to enable UDP 514
 * root@raspberrypi:~# nano /etc/rsyslog.conf
 * Uncomment
 * #module(load="imudp")
 * #input(type="imudp" port="514")
 * Save, quit and reboot
 **/

const dgram = require('dgram');
const {hostname} = require('os');

const facility = {
    kernel: 0,
    user: 1,
    mail: 2,
    system: 3,
    daemon: 3,
    auth: 4,
    syslog: 5,
    lpr: 6,
    news: 7,
    uucp: 8,
    cron: 9,
    authpriv: 10,
    ftp: 11,
    audit: 13,
    alert: 14,
    local0: 16,
    local1: 17,
    local2: 18,
    local3: 19,
    local4: 20,
    local5: 21,
    local6: 22,
    local7: 23
};

const severity = {
    emergency: 0,
    alert: 1,
    critical: 2,
    error: 3,
    warning: 4,
    notice: 5,
    informational: 6,
    debug: 7
};

class SysLog {
    constructor() {
        this.options = {
            port: 514,
            address: "localhost",
            facility: facility.user,
            appName: process.title.substring(process.title.lastIndexOf("/") + 1, 48),
            processId: process.pid,
            msgId: "-",
            structuredData: "-",
        }
        this.init();
    }

    init(options = this.options) {
        this.port = options.port || this.port;
        this.address = options.address || this.address;
        this.facility = options.facility || this.facility;
        this.appName = options.appName || this.appName;
        this.processId = options.processId || this.processId;
        this.msgId = options.msgId || this.msgId;
        this.structuredData = options.structuredData || this.structuredData;
    }

    _format(msg, severity) {
        // RFC 5424: https://tools.ietf.org/html/rfc5424
        const priority = this.facility * 8 + severity;
        const date = new Date().toISOString();
        const formatted = `<${priority}>1 ${date} ${hostname} ${this.appName} ${this.processId} ${this.msgId} ${this.structuredData} ${msg}`;
        // console.log(formatted);
        return Buffer.from(formatted);
    }

    _send(msg, severity) {
        const socket = dgram.createSocket('udp4');
        const buffer = this._format(msg, severity);
        socket.send(buffer, this.port, this.address, (err) => {
            if (err) console.error(err);
            socket.close();
        });
    }

    log(msg) {
        this._send(msg, severity.notice);
    }

    error(msg) {
        this._send(msg, severity.error);
    }

    warn(msg) {
        this._send(msg, severity.warning);
    }
}

module.exports = new SysLog();