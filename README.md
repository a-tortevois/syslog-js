# syslog.js

Easiest syslog helper for your node.js application.

Don't forget to enable UDP 514 !

```bash
root@raspberrypi:~# nano /etc/rsyslog.conf
```

Uncomment

```bash
#module(load="imudp")
#input(type="imudp" port="514")
```

Save, quit and reboot

Try-it by yourself ;)

```bash
root@raspberrypi:~/syslog-js# node example.js
root@raspberrypi:~/syslog-js# cat /var/log/syslog
...
Feb 19 15:38:42 raspberrypi syslog-js[803] Simple log generated on 2021-02-19T15:38:42.538Z
Feb 19 15:38:44 raspberrypi syslog-js[803] Warning log generated on 2021-02-19T15:38:44.037Z
Feb 19 15:38:46 raspberrypi syslog-js[803] Error log generated on 2021-02-19T15:38:46.538Z
```